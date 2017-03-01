import Play from 'states/Play';
import Preload from 'states/Preload';
import Gameover from 'states/Gameover';
import Mainmenu from 'states/Mainmenu';

class Game extends Phaser.Game {

	constructor() {
		super(1000, 600, Phaser.AUTO, 'content', null);
        
        //add states
        this.state.add('Preload', Preload, false);
		this.state.add('Play', Play, false);
        this.state.add('Gameover', Gameover, false);
        this.state.add('Mainmenu', Mainmenu, false);
        
		this.state.start('Preload');
	}

}

new Game();
