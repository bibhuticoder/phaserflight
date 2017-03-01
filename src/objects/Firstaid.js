class Firstaid extends Phaser.Sprite {

	constructor(game, asset, state) {                
		super(game, game.rnd.integerInRange(game.width, game.width*2), game.rnd.integerInRange(50, game.height/2), asset, 1);	
        game.physics.arcade.enable(this);       
        this.body.velocity.x = -50;
        this.body.acceleration.x = game.rnd.integerInRange(-1, -5);      
		game.stage.addChild(this);
		state.firstaids.add(this);		      
	}
}

export default Firstaid;