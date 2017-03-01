class Fireball extends Phaser.Sprite {

	constructor(game, player, x, y, asset) {
        
		super(game, x, y, asset, 1);	
        game.physics.arcade.enable(this);       
        this.body.velocity.x = -450;       
        this.body.acceleration.x = -10;
        this.body.gravity.y = 100;
		game.stage.addChild(this);
  
	}
    
}

export default Fireball;