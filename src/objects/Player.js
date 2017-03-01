import Bullet from './Bullet';
import Play from '../states/Play';

class Player extends Phaser.Sprite {
    
	constructor(game, x, y, asset, state) {
                
		super(game, x, y, asset, 1);
        this.playState = state;
        this.scale.setTo(0.7, 0.7);
        game.physics.arcade.enable(this);        
		game.stage.addChild(this);
        
        this.fireFlag = true;
        this.alive = true;

        this.animations.add('hurt', [0, 1, 0], 5, false);
        this.animations.add('fall', [0, 1, 0], 5, true);  
        this.frame = 0;
        
        //fire timer
        this.fireTimer = this.game.time.create(false);        
        this.fireTimer.loop(1000, this.enableFire, this);        
        this.fireTimer.start();

        //smoke particles
        this.smokeEmitter = game.add.emitter(0, 0, 0);
        this.smokeEmitter.makeParticles('smoke');
        this.smokeEmitter.setXSpeed(-10, -100);        
        this.smokeEmitter.start(false, 500, 20);

        this.addChild(this.smokeEmitter);
        this.smokeEmitter.y = 40;
        this.smokeEmitter.x = 5;
        this.smokeEmitter.lifespan = 250;
        this.smokeEmitter.maxParticleSpeed = new Phaser.Point(-100,50);
        this.smokeEmitter.minParticleSpeed = new Phaser.Point(-200,-50);

	}
    
    rise() {  
        if(this.alive){
            this.body.velocity.y = -200;            
            this.angle = -5;
        }        
    }
    
    fire(){
        if(this.fireFlag && this.alive){
            var b = new Bullet(this.game, this.body.x + 25, this.body.y + 5, 'bullet');
            this.game.stage.addChild(b);            
            this.playState.bullets.add(b);
            this.fireFlag = false;
        }        
    }
    
    enableFire(){
        this.fireFlag = true;
    }

    fall(){
        this.alive = false; 
        this.animations.play("fall");
        this.body.angularVelocity = 1000;
        this.angle = 10;
        this.body.gravity.y = 500;       
    }

    killPlayer(){

    }
    
    
}

export default Player;