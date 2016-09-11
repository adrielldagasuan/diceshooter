
BasicGame.Preloader = function (game) {
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	preload: function () {
			this.load.image('tile','assets/tiles/tile_01.png');
			this.load.image('tri','assets/player/tri.png');
			this.load.image('particle', 'assets/bullets/particle.png');

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
					this.load.image('bullet'+i,'assets/bullets/bullet_00'+i+'.png');
			}

	},

	create: function () {
			
	},

	update: function () {

		this.ready = true;
		this.state.start('Game');

	}

};
