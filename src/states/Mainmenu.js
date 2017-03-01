import Play from './Play';

class Mainmenu extends Phaser.State {
    
	create() {    
        
        //background
        this.game.add.sprite(0, 0, 'bg');

        this.game.add.sprite(this.game.width/2 - this.game.cache.getImage('name').width/2, 50, 'name');
        
        //buttons                
        this.start =  this.game.add.button(this.game.width/2 - this.game.cache.getImage('startBtn').width/2, 300, 'startBtn', start, this, 2, 1, 0);
       
        function start(){
            this.state.start('Play');
        }        
	} 	
}

export default Mainmenu;
