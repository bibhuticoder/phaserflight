class Cannonball extends Phaser.Sprite {

	constructor(game, x, y, asset) {
        
		super(game, x, y, asset, 1);	
                game.physics.arcade.enable(this);
                this.type = "cannonball";                
                this.body.velocity.y = -250;
                this.body.angularVelocity = -100;        
                this.body.acceleration.y = -10;
                this.body.gravity.x = game.rnd.integerInRange(-20, 20);
        	game.stage.addChild(this);
               	        
	}
    
}

export default Cannonball;