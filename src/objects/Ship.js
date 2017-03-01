class Ship extends Phaser.Sprite {

	constructor(game, asset, state) {                
		super(game, game.rnd.integerInRange(game.width, game.width+100), game.height - 150, asset, 1);	
        game.physics.arcade.enable(this);
        this.body.velocity.x = -40;
        this.body.acceleration.x = game.rnd.integerInRange(-1, -5);       
		game.stage.addChild(this);
		state.ships.add(this);		
	}
}

export default Ship;