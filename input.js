export class InputHandler {
    constructor(game){
        this.game = game;
        this.keys = [];
        window.addEventListener('keydown', e => {
            if   (( e.key === 's' ||
                    e.key === 'w' ||
                    e.key === 'a' ||
                    e.key === 'd' ||
                    e.key === 'm' 
            ) && this.keys.indexOf(e.key) === -1){  
                this.keys.push(e.key);
            } else if (e.key === '0') this.game.debug = !this.game.debug;
            /* console.log(e.key, this.keys); */
        });
        window.addEventListener('keyup', e => {
            if (e.key === 's' ||
                e.key === 'w' ||
                e.key === 'a' ||
                e.key === 'd' ||
                e.key === 'm'
            ){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            /* console.log(e.key, this.keys); */
        });
    }
}