import Player from 'objects/Player';
import Enemy from 'objects/Enemy';
import Cloud from 'objects/Cloud';
import Ship from 'objects/Ship';
import Score from 'objects/Score';
import Warship from 'objects/Warship';
import Land from 'objects/Land';
import Firstaid from 'objects/Firstaid';

class Play extends Phaser.State {
    
	create() {    
        
        //background        
        this.game.add.sprite(0, 0, 'bg');     
       
        this.game.physics.startSystem(Phaser.Physics.ARCADE);   
        
        //player
        this.player = new Player(this.game, 150, 245, 'player', this);        
                      
        //bullets, fireballs, enemies & clouds
        this.enemies = this.game.add.group();  
        this.bullets = this.game.add.group();  
        this.fireballs = this.game.add.group(); 
        this.clouds = this.game.add.group();
        this.warships = this.game.add.group();   
        this.cannonballs = this.game.add.group();
        this.firstaids = this.game.add.group();
        this.ships = this.game.add.group();         
        
        //score
        this.score = 0;
        this.scoreText = new Score(this.game, this.game.width-100, 16, this.score); 
               
        //health
        this.health = 10;
        this.healthbar = new HealthBar(this.game, {
            width: 150,
            height: 20,
            x: 100,
            y: 25,
            bg: {
              color: 'whitesmoke'
            },
            bar: {
              color: '#373737'
            },
            animationDuration: 200,
            flipped: false
          });
        this.healthbar.setPercent(this.health * 10);
                 
        //enemyTimer
        this.enemyTimer = this.game.time.create(false);        
        this.enemyTimer.loop(3000, this.spawnEnemies, this);        
        this.enemyTimer.start();
        
        //cloudTimer
        this.cloudTimer = this.game.time.create(false);        
        this.cloudTimer.loop(5000, this.spawnClouds, this);        
        this.cloudTimer.start();

        //shipTimer
        this.shipTimer = this.game.time.create(false);        
        this.shipTimer.loop(20000, this.spawnShips, this);        
        this.shipTimer.start();

        //warshipTimer
        this.cityTimer = this.game.time.create(false);        
        this.cityTimer.loop(10000, this.spawnWarships, this);        
        this.cityTimer.start();

        //firstaidTimer
        this.firstaidTimer = this.game.time.create(false);        
        this.firstaidTimer.loop(15000, this.spawnFirstaids, this);        
        this.firstaidTimer.start();
                
        //controls
        this.ctrlKey = this.game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
        this.ctrlKey.onDown.add(fire, this);
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(fire, this);
        function fire(){this.player.fire();}
        
        this.game.input.mouse.capture = true;

        //init
        for(var i=0; i<1; i++) this.spawnEnemies();
        for(var i=0; i<2; i++) this.spawnClouds();
        for(var i=0; i<1; i++) this.spawnShips();
    }  
    
    update(){
        this.checkCollission();
        this.handlePlayer();   
        this.checkBounds(); 
    }

    handlePlayer(){
        //move player and its components
        this.player.body.velocity.y = 200;        
        this.player.smokeEmitter.emitParticle();        
        this.player.angle = 2;
       
        //controls
        if(this.game.input.activePointer.leftButton.isDown){
            this.player.rise();
        }
    }

    checkBounds(){
        //check out of bounds
        var self = this;
        this.enemies.forEachAlive(function(e){
            if(e.body.x <= -200) e.kill();
            else if(e.body.y > self.game.height+50) e.kill();
        });
        this.clouds.forEachAlive(function(e){
            if(e.body.x <= -200) e.kill();
        });           
        this.bullets.forEachAlive(function(e){
            if(e.body.x > self.game.width+50) e.kill();
            else if(e.body.y > self.game.height+50) e.kill();
        });
        this.fireballs.forEachAlive(function(e){
            if(e.body.x <= -200) e.kill();
        });
        this.warships.forEachAlive(function(e){
            if(e.body.x <= -200) e.kill();
        });
        this.cannonballs.forEachAlive(function(e){
            if(e.body.y <= -200) e.kill();
        });
        this.ships.forEachAlive(function(e){
            if(e.body.y <= -200) e.kill();
        });

        if(this.player.body.y > self.game.height+50 || this.player.body.y < -50){
            self.player.kill();
            self.scoreText.kill();
            self.state.start('Gameover', true, false, this.score);
        } 

    }

    checkCollission(){
        
        //player and enemy
        this.game.physics.arcade.overlap(this.player, this.enemies, fallPlayer, null, this);
        this.game.physics.arcade.overlap(this.player, this.cities, fallPlayer, null, this);        
        function fallPlayer (player, enemy) {  
            if(enemy.alive)  player.fall();            
        }

        //player and firstaid
        this.game.physics.arcade.overlap(this.player, this.firstaids, incHealth, null, this);
        function incHealth(player, firstaid){
            firstaid.kill();
            this.healthbar.setPercent(++this.health * 10);
            if(this.health > 10) this.health = 10;
        }
        
        //fireballs, cannonballs and player
        this.game.physics.arcade.overlap(this.player, this.fireballs, decScore, null, this);
        this.game.physics.arcade.overlap(this.player, this.cannonballs, decScore, null, this); 
        function decScore(player, ball){                         
            if(ball.type === "cannonball") --this.health;
            if(this.health < 0){                
                player.fall();                          
            }  
            ball.kill(); 
            this.player.animations.play("hurt");
            this.healthbar.setPercent(--this.health * 10);
        }

       
        //bullet and enemy
        this.game.physics.arcade.overlap(this.enemies, this.bullets, killEnemy, null, this);
        //bullet and city
        this.game.physics.arcade.overlap(this.warships, this.bullets, killEnemy, null, this);
        function killEnemy (enemy, bullet) {   
            bullet.kill();      
            enemy.fireTimer.stop();         
            if(enemy.fall) enemy.fall();
            else enemy.kill();           
            this.scoreText.setScore(++this.score);
        }
      
    }
            
    spawnEnemies(){        
        var o = new Enemy(this.game, this.player, 'enemy' + this.game.rnd.integerInRange(1, 3), this); 
    }
    
    spawnClouds(){        
        var o = new Cloud(this.game, 'cloud' + this.game.rnd.integerInRange(1, 2), this);        
    }

    spawnWarships(){        
        var w = new Warship(this.game, this.player, 'warship', this); 
    }

    spawnFirstaids(){        
        var f = new Firstaid(this.game, 'firstaid', this); 
    }

    spawnShips(){        
        var s = new Ship(this.game, 'ship' + this.game.rnd.integerInRange(1, 2), this);        
    }
    
}

export default Play;
