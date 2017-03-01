class Score extends Phaser.BitmapText {

	constructor(game, x, y, text) {

		super(game, x, y, 'font', text, 40, "align");		
		this.game.stage.addChild(this);
		this.setScore(text);                
	}

	setScore(score){
		this.setText(score);
	}
    
}

export default Score;