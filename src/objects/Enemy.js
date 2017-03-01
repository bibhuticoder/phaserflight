import Fireball from './Fireball';

class Enemy extends Phaser.Sprite {

	constructor(game, player, asset, state) {                
		super(game, game.rnd.integerInRange(game.width, game.width*2), game.rnd.integerInRange(0, game.height/2), asset, 1);	
        game.physics.arcade.enable(this);
        this.body.velocity.x = -250;
        this.scale.setTo(0.7, 0.7);
        this.body.acceleration.x = game.rnd.integerInRange(-10, -20);
		game.stage.addChild(this);
		state.enemies.add(this);

		this.alive = true;

		this._game = game;
		this._player = player;
		this._state = state;

		//fire timer
		this.fireTimer = this.game.time.create(false);        
        this.fireTimer.loop(2000, this.fire, this);        
        this.fireTimer.start();  
             
	}

	fire(){
		var f = new Fireball(this._game, this._player, this.body.x, this.body.y, 'fireball');
		this._state.fireballs.add(f);
	}

	fall(){
		this.alive = false;
		this.body.angularVelocity = 200;
		this.body.gravity.y = 2000;
		this.body.velocity.x = -50;
	}
    
}

export default Enemy;