import { Dust, Fire, Splash} from './particles.js'

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    JUMPFALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6

}

class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State {
    constructor(game){
        super('SITTING', game);
        this.player = player;
    }
    enter(){

        this.game.player.frameX = 0;
        this.game.player.maxFrame = 4;
        this.game.player.frameY = 5;
        
    }
    handleInput(input){
        if (input.includes('a') || input.includes('d')){
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes('m')){
            this.game.player.setState(states.ROLLING, 2);
        }

    }

}
export class Running extends State {
    constructor(game){
        super('RUNNING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 8;
        this.game.player.frameY = 3;
        
    }
    handleInput(input){
        // draw DUST partciles while Running
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.4, this.game.player.y + this.game.player.height));
        //   ^^   ^^
        //note.mad_1.1_Line58: && !input.includes('a') && !input.includes('d')
        if (input.includes('s') && !input.includes('a') && !input.includes('d')){
            this.game.player.setState(states.SITTING, 0);
        } else if (input.includes('w')){
            this.game.player.setState(states.JUMPING, 1)
        } else if (input.includes('m')){
            this.game.player.setState(states.ROLLING, 2);
        }

    }
}
export class Jumping extends State {
    constructor(game){
        super('JUMPING', game);
    }
    enter(){
        if(this.game.player.onGround()) this.game.player.vy -= 27;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 1;
        
    }
    handleInput(input){
        if (this.game.player.vy > this.game.player.gravity){
            this.game.player.setState(states.JUMPFALLING, 1);
        } else if (input.includes('m')){
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes('s')){
            this.game.player.setState(states.DIVING, 0);
        }

    }
}
export class JumpFalling extends State {
    constructor(game){
        super('JUMPFALLING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 2;
        
    }
    handleInput(input){
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes('s')){
            this.game.player.setState(states.DIVING, 0);
        }

    }
}

export class Rolling extends State {
    constructor(game){
        super('ROLLING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        
    }
    handleInput(input){
        // draw FIRE partciles while Rolling
         this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        //   ^^   ^^
        if (!input.includes('m') && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if (!input.includes('m') && !this.game.player.onGround()){
            this.game.player.setState(states.JUMPFALLING, 1);
        } else if (input.includes('m') && input.includes('w') && this.game.player.onGround()){
            this.game.player.vy -= 27;
        } else if (input.includes('s') && !this.game.player.onGround()){
            this.game.player.setState(states.DIVING, 0);
        }

    }
}
export class Diving extends State {
    constructor(game){
        super('DIVING', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 6;
        this.game.player.frameY = 6;
        this.game.player.vy = 15;
        
    }
    handleInput(input){
        // draw FIRE particles while Rolling
        this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        // checks player onGround value if its true, then state changes to Running 
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
            //  draw SPLASH particles on change state from DIVING to RUNNING
            for (let i = 0; i < 30; i++){
                this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height))
            }
        } else if (input.includes('m') && this.game.player.onGround()){
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}
export class Hit extends State {
    constructor(game){
        super('HIT', game);
    }
    enter(){
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.frameY = 4;
        
        
    }
    handleInput(input){
        
        // checks player HIT animation frame has run once, then one of those conditions make state change to Running or JumpgFalling. 
        if (this.game.player.frameX >= 10 && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()){
            this.game.player.setState(states.JUMPFALLING, 1);
        }
    }
}