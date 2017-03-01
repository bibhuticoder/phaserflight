class Bullet extends Phaser.Sprite {

	constructor(game, x, y, asset) {
        
		super(game, x, y, asset, 1);	
        game.physics.arcade.enable(this);
        this.scale.setTo(0.7, 0.7);
        this.body.velocity.x = 250;
        this.body.angularVelocity = 30;
        this.body.gravity.y = 250;
        this.body.acceleration.x = 10;
		game.stage.addChild(this);
		
	}
    
}

export default Bullet;