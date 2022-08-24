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
    constructor(state){
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player){
        super('SITTING');
        this.player = player;
    }
    enter(){

        this.player.frameX = 0;
        this.player.maxFrame = 4;
        this.player.frameY = 5;
        
    }
    handleInput(input){
        if (input.includes('a') || input.includes('d')){
            this.player.setState(states.RUNNING, 1);
        } else if (input.includes('m')){
            this.player.setState(states.ROLLING, 2);
        }

    }

}
export class Running extends State {
    constructor(player){
        super('RUNNING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 8;
        this.player.frameY = 3;
        
    }
    handleInput(input){
        if (input.includes('s')){
            this.player.setState(states.SITTING, 0);
        } else if (input.includes('w')){
            this.player.setState(states.JUMPING, 1)
        } else if (input.includes('m')){
            this.player.setState(states.ROLLING, 2);
        }

    }
}
export class Jumping extends State {
    constructor(player){
        super('JUMPING');
        this.player = player;
    }
    enter(){
        if(this.player.onGround()) this.player.vy -= 27;
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 1;
        
    }
    handleInput(input){
        if (this.player.vy > this.player.gravity){
            this.player.setState(states.JUMPFALLING, 1);
        } else if (input.includes('m')){
            this.player.setState(states.ROLLING, 2);
        }

    }
}
export class JumpFalling extends State {
    constructor(player){
        super('JUMPFALLING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 2;
        
    }
    handleInput(input){
        if (this.player.onGround()){
            this.player.setState(states.RUNNING, 1);
        }

    }
}

export class Rolling extends State {
    constructor(player){
        super('ROLLING');
        this.player = player;
    }
    enter(){
        this.player.frameX = 0;
        this.player.maxFrame = 6;
        this.player.frameY = 6;
        
    }
    handleInput(input){
        if (!input.includes('m') && this.player.onGround()){
            this.player.setState(states.RUNNING, 1);
        } else if (!input.includes('m') && !this.player.onGround()){
            this.player.setState(states.JUMPFALLING, 1);
        } else if (input.includes('m') && input.includes('w') && this.player.onGround()){
            this.player.vy -= 27;
        }

    }
}