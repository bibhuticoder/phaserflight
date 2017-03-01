
class Preload extends Phaser.State {    
    preload(){
        

        this.msgText = this.game.add.text(200, 150, 'Loading...', { fontSize: '30px', fill: 'whitesmoke' });
        this.msgText.x = this.game.width/2 - this.msgText.width/2;
        this.msgText.y = this.game.height/2 - this.msgText.height/2;

        this.load.image('name', 'assets/name.png');       
        this.load.image('bg', 'assets/bg.gif');        
        this.load.image('cloud1', 'assets/cloud1.png');
        this.load.image('cloud2', 'assets/cloud2.png');
        this.load.image('ship1', 'assets/ship1.png');
        this.load.image('ship2', 'assets/ship2.png');       
        this.game.load.atlasJSONHash('player', 'assets/player.png', 'assets/player.json');             
        this.load.image('enemy1', 'assets/enemy1.png');
        this.load.image('enemy2', 'assets/enemy2.png');
        this.load.image('enemy3', 'assets/enemy3.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('fireball', 'assets/fireball.png');
        this.load.image('smoke', 'assets/smoke.png');
        this.load.image('warship', 'assets/warship.png');       
        this.load.image('cannonball', 'assets/cannonball.png');  
        this.load.image('firstaid','assets/firstaid.png');           
        this.load.image('startBtn', 'assets/btnStart.png'); 
        //font
        this.game.load.bitmapFont('font', 'assets/font/font.png', 'assets/font/font.xml');                       
    }  
    
    create(){
        this.state.start('Mainmenu');
    }
    
	
}

export default Preload;
