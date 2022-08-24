class Particle {
    constructor(game){
        this.game = game;
        this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedX + this.speedY;
        this.size *= 0.95;
        if (this.size < 0.5) this.markedForDeletion = true;

    }
}

export class Dust extends Particle {
    constructor(game, x, y){
        super(game)
    }
}
export class Splash extends Particle {
    constructor(game, x, y){
        super(game)
        
    }
    
}
export class Fire extends Particle {
    constructor(game, x, y){
        super(game)
    
    }

}