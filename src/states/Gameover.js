import Play from './Play';

class Gameover extends Phaser.State {
    
    init(score){
        this.score = score;
    }

	create() {    
        
        //background
        var bg = this.game.add.sprite(0, 0, 'bg');
                
        //game over message
        this.msgText = this.game.add.text(200, 150, 'Game Over ', { fontSize: '80px', fill: 'maroon' });
        this.msgText.x = this.game.width/2 - this.msgText.width/2;

        this.scoreText = this.game.add.text(330, 280, 'Score : ' + this.score, { fontSize: '30px', fill: '#373737' });
        this.scoreText.x = this.game.width/2 - this.scoreText.width/2;

        this.restart =  this.game.add.button(this.game.width/2 - this.game.cache.getImage('startBtn').width/2, 350, 'startBtn', restart, this, 2, 1, 0);
       
        function restart(){
            this.state.start('Play');
        }                  

	} 	
}

export default Gameover;
