
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {

      this.game.state.add('Level1', BasicGame.Level1);

      this.game.playerScore = 0;
      this.game.addScore = function (game, points) {
        console.log('AddScore');
        game.playerScore += points;
      }

      startText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY - 50, 'gameFont', 'Start Game', 20);
      optionsText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'gameFont', 'Options', 20);
      hiScoreText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY + 50, 'gameFont', 'High Score', 20);

      startText.anchor.set(0.5);
      optionsText.anchor.set(0.5);
      hiScoreText.anchor.set(0.5);

      dotSelect = this.game.add.sprite(startText.x - (startText.width/2) - 20, startText.y, 'particle');
      dotSelect.anchor.set(0.5);
      dotSelect.scale.x = 2;
      dotSelect.scale.y = 2;

      options = ['start', 'options', 'hiscore'];

      // set keyboard controls

      this.game.wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
      this.game.aKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
      this.game.sKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
      this.game.dKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
      this.game.eKey = this.input.keyboard.addKey(Phaser.Keyboard.E);
      this.game.qKey = this.input.keyboard.addKey(Phaser.Keyboard.Q);
      this.game.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.game.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.game.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.game.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      this.game.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      this.game.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);

      lastPress = this.game.time.now;
      pressRate = 200;

      ctr = 0;

      /*
      this.game.state.add('Level1', BasicGame.Level1);
      this.game.state.start('Level1');
      */
    },

    update: function () {
      if (this.game.downKey.isDown && this.game.time.now > lastPress && dotSelect.y <= hiScoreText.y-1) {
        dotSelect.y += 50;
        ctr++;
        lastPress = this.game.time.now + pressRate;
      } else if (this.game.upKey.isDown && this.game.time.now > lastPress && dotSelect.y >= startText.y+1) {
        dotSelect.y -= 50;
        lastPress = this.game.time.now + pressRate;
        ctr--;
      }

      if (this.game.enterKey.isDown && this.game.time.now > lastPress) {
        lastPress = this.game.time.now + pressRate;

        if (options[ctr] == 'start') {
          console.log(options[ctr]);
          this.state.start('Level1');
        }
      }
    },

    render: function () {

    },

    quitGame: function (pointer) {

    },



};
