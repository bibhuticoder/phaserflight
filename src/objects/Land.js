class Land extends Phaser.Sprite {
    
	constructor(game, x, y, asset) {
                
		super(game, x, y, asset, 1);       
         game.physics.arcade.enable(this);
        // this.body.collideWorldBounds = true;
         this.body.immovable = true;
		game.stage.addChild(this);      
        
	}
    
   
}

export default Land;