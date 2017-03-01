import Cannonball from './Cannonball';

class Warship extends Phaser.Sprite {

	constructor(game, player, asset, state) {                
		super(game, game.rnd.integerInRange(game.width, game.width*2), game.height-200, asset, 1);	
        game.physics.arcade.enable(this);
        this.body.velocity.x = -200;  
		game.stage.addChild(this);
		state.warships.add(this);
		
		this._game = game;
		this._player = player;
		this._state = state;

		//fire timer
		this.fireTimer = this.game.time.create(false);        
        this.fireTimer.loop(3000, this.fire, this);        
        this.fireTimer.start(); 
         
	}

	fire(){
		var c = new Cannonball(this._game, this.body.x, this.body.y, 'cannonball');
		this._state.cannonballs.add(c);		
	}	
}

export default Warship;