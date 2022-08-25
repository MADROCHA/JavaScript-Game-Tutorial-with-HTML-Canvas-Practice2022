import { Sitting, Running, Jumping, JumpFalling, Rolling, Diving, Hit } from "./playerStates.js";
import { CollisionAnimation } from './collisionAnimation.js'
import { FloatingMessage } from "./floatingMessages.js";

export class Player {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height - this.game.bottomMargin;
        this.vy = 0;
        this.gravity = 1;
        this.image = document.getElementById('player');

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;

        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;

        this.speed = 0;
        this.maxSpeed = 10;

        // PLAYER STATES  
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new JumpFalling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        // HORIZONTAL MOVEMENT  
        this.x += this.speed;
        // note:  && this.currentState !== this.states[6]
        // Disables horizontal speed while HIT
        if (input.includes('d') && this.currentState !== this.states[6]) this.speed = this.maxSpeed;
        else if (input.includes('a') && this.currentState !== this.states[6]) this.speed = -this.maxSpeed;
        else this.speed = 0;
        // HORIZONTAL BOUNDARIES  
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // VERTICAL MOVEMENT  
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.gravity;
        else this.vy = 0;
        // VERTICAL BOUNDARIES  
        if (this.y > this.game.height - this.height - this.game.bottomMargin)
        this.y = this.game.height - this.height - this.game.bottomMargin; 
        
        // SPRITE ANIMATION
        /* if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0; */
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        /* context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height); */
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.bottomMargin;
    }
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        /* console.log(this.game.speed); */
        this.currentState.enter(); 
    }
    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if(
                // COLLISION DETECTED
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
                
            ){      
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
                //  if collision happened while Rolling or Diving, score +1.
                if (this.currentState === this.states[4] || this.currentState === this.states[5] ){
                    this.game.score++;
                    this.game.floatingMessages.push(new FloatingMessage('+1', enemy.x, enemy.y, 150, 50));
                    //  other collisions set player state to Hit.
                } else {
                    //  Hit and unable to 'move' due to playerState#.
                    this.setState(6, 0);
                    this.game.score -= 3;
                    this.game.lives--;
                    if (this.game.lives <= 0) this.game.gameOver = true;
                }
                
                // COLLISION DETECTED
            }
        });
    }
}