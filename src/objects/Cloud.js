class Cloud extends Phaser.Sprite {

	constructor(game, asset, state) {                
		super(game, game.rnd.integerInRange(game.width, game.width*2), game.rnd.integerInRange(0, game.height/3), asset, 1);	
        game.physics.arcade.enable(this);
        this.body.velocity.x = -20;
        this.body.acceleration.x = game.rnd.integerInRange(-1, -5);
        this.body.z = -10;
		game.stage.addChild(this);
		state.clouds.add(this);		
	}
}

export default Cloud;