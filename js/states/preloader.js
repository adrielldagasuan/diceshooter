
BasicGame.Preloader = function (game) {
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	preload: function () {
			this.load.image('tile','assets/tiles/tile_01.png');
			this.load.image('tri','assets/player/ship.png'); //this is the player sprite
			this.load.image('particle', 'assets/bullets/particle.png');
			this.game.load.bitmapFont('gameFont', 'assets/bitmapfonts/font.png', 'assets/bitmapfonts/font.fnt');

			// preload faces
			for (i = 1; i < 7; i++) {
				this.load.image('face'+i,'assets/dice/face_00'+i+'.png');
			}

			// preload enemies
			for (i = 1; i < 3; i++){
					this.load.image('enemy'+i,'assets/enemies/enemy_00'+i+'.png');
			}

			// preload bullets
			for (i = 1; i < 7; i++){
					//this.load.image('bullet'+i,'assets/bullets/bullet_00'+i+'.png');
					this.load.image('bullet'+i,'assets/bullets/bullet.png');
			}
                        // sound effects
                        this.game.load.audio('laserSound','assets/audio/weapon/laser4.wav');
                        this.game.load.audio('enemyExplode','assets/audio/enemies/explode.ogg');
                        this.game.load.audio('enemyHit','assets/audio/enemies/hit.wav');
                        this.game.load.audio('playerHit','assets/audio/player/hit.wav');
                        this.game.load.audio('level1music','assets/audio/music/level1/soundtrack.mp3');

	},

	create: function () {

	},

	update: function () {

		this.ready = true;
		this.state.start('Game');

	}

};
