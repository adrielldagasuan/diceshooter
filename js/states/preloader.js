
BasicGame.Preloader = function (game) {
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	preload: function () {
			this.load.atlas('mageSpritesheet','assets/player/mage-spritesheet.png','assets/player/mage-spritesheet-json.json');
			this.load.spritesheet('fireball','assets/fireball/fireball.png', 64, 64);
			this.load.image('tile','assets/tiles/tile.png');
			this.load.image('face1','assets/dice/face1.png');
			this.load.image('face2','assets/dice/face2.png');
			this.load.image('face3','assets/dice/face3.png');
			this.load.image('face4','assets/dice/face4.png');
			this.load.image('face5','assets/dice/face5.png');
			this.load.image('face6','assets/dice/face6.png');
	},

	create: function () {

	},

	update: function () {

		this.ready = true;
		this.state.start('Game');

	}

};
