export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Play';
        this.livesImage = document.getElementById('lives');
    }
    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // SCORE
        context.fillStyle = 'azure';
        context.fillText('Score: ' + this.game.score, 20, 50);
        // TIMER
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20 ,80);
        // PLAYER LIVES
        context.save()
        context.fillStyle = 'azure';
        context.shadowOffsetX = -2.2;
        context.shadowOffsetY =  2.2;
        context.shadowColor = 'azure';
        context.shadowBlur = 0;
        for (let i = 0; i < this.game.lives; i++){
            context.drawImage(this.livesImage, 30* i + 20, 90, 30, 30)
        }
            context.restore();
    // GAME OVER MESSAGES
    if (this.game.gameOver){
        // 1st message
        // black message
        if (this.game.score > this.game.winningScore){
            context.fillStyle = 'azure';
            context.textAlign = 'center';
            context.font = this.fontSize * 1.5 + 'px ' + this.fontFamily;
            context.fillText('STAGE', this.game.width * 0.5, this.game.height * 0.5 - 20 );
            // white message offset
            // 2nd message
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
            context.fillText("CLEARED", this.game.width * 0.5, this.game.height * 0.5 + 10);
            
        } else {
            context.fillStyle = 'azure';
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('GAME OVER', this.game.width * 0.5, this.game.height * 0.5 - 20 );
            // white message offset
            // 2nd message
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
            context.fillText('Try Again?', this.game.width * 0.5, this.game.height * 0.5 + 10);
        }
    }

    }
}