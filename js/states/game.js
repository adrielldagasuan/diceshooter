
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

        this.upPoint = {x: this.game.width/2, y: this.game.height - 64-32};
        this.frontPoint = {x: this.game.width/2, y: this.game.height - 64};
        this.downPoint = {x: this.game.width/2, y: this.game.height - 64+32};
        this.rightPoint = {x: this.game.width/2+32, y: this.game.height - 64};
        this.leftPoint = {x: this.game.width/2-32, y: this.game.height - 64};
        this.backPoint = {x: 10, y: 10};

        this.game.stage.backgroundColor = "#4488AA";
        this.gridBackground = this.add.tileSprite(this.frontPoint.x-16, this.frontPoint.y-16, 32*40, 32*30, 'tile');

        // set faces

        faces = this.game.add.group();
        upFace = faces.create(this.upPoint.x, this.upPoint.y, 'face1');
        frontFace = faces.create(this.frontPoint.x, this.frontPoint.y, 'face2');
        downFace = faces.create(this.downPoint.x, this.downPoint.y, 'face3');
        rightFace = faces.create(this.rightPoint.x, this.rightPoint.y, 'face4');
        leftFace = faces.create(this.leftPoint.x, this.leftPoint.y, 'face5');
        backFace = faces.create(this.frontPoint.x, this.frontPoint.y, 'face6');
        faces.setAll('enableBody',true);
        faces.setAll('physicsBodyType',Phaser.Physics.ARCADE);
        this.game.physics.enable(faces,Phaser.Physics.ARCADE);

        upFace.anchor.set(0.5,0.5);
        //upFace.alpha = 0.0;
        frontFace.anchor.set(0.5,0.5);
        downFace.anchor.set(0.5,0.5);
        //downFace.alpha = 0.2;
        rightFace.anchor.set(0.5,0.5);
        //rightFace.alpha = 0.2;
        leftFace.anchor.set(0.5,0.5);
        //leftFace.alpha = 0.2;
        //backFace.anchor.set(0.5,0.5);
        backFace.alpha = 0;
        this.gridBackground.anchor.set(0.5,0.5);


        this.temp = ''; // set placeholder used in texture swapping
        this.dicex = null;
        this.dicey = null;

        this.rollTimer = 180; // set rate of dice roll
        this.lastRoll = this.game.time.now; // set initial cooldown time

        this.spinTimer = 180; // set rate of dice roll
        this.lastSpin = this.game.time.now; // set initial cooldown time

        // set keyboard controls
        this.setKeyboardControls();

        console.log(faces);

    },

    update: function () {

      // handles mage movement
      this.diceController();

    },

    render: function () {
      //this.game.debug.spriteInfo(mage,32,32);
      //this.game.debug(this.game.physics.arcade.angleToPointer());

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    },

    setKeyboardControls: function () {
      this.wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
      this.aKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
      this.sKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
      this.dKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
      this.eKey = this.input.keyboard.addKey(Phaser.Keyboard.E);
      this.qKey = this.input.keyboard.addKey(Phaser.Keyboard.Q);
      this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    },

    diceController: function () {

      if (this.wKey.isDown) {
        this.moveUp();
      }

      if (this.dKey.isDown) {
        this.moveRight();
      }

      if (this.sKey.isDown) {
        this.moveDown();
      }

      if (this.aKey.isDown){
        this.moveLeft();
      }

      if (this.eKey.isDown) {
        this.spinRight();
      }

      if (this.qKey.isDown) {
        this.spinLeft();
      }

      if (this.leftKey.isDown) {
        if ((faces.x + this.game.width / 2) > 96) {
          this.dicex -= 30;
        } else {
          this.gridBackground.x += 32;
        }
      }

      if (this.rightKey.isDown) {
        if ((faces.x + this.game.width / 2) < this.game.width - 96) {
          this.dicex += 30;
        } else {
          this.gridBackground.x -= 32;
        }
      }
      /*
      if (this.upKey.isDown) {
        if ((faces.y + this.game.height / 2) > 96) {
          this.dicey -= 20;
        } else {
          this.gridBackground.y += 32;
        }
      }

      if (this.downKey.isDown) {
        if ((faces.y + this.game.height / 2 ) < this.game.height - 96) {
          this.dicey += 20;
        } else {
          this.gridBackground.y -= 32;
        }
      }
      */
      faces.x = this.game.math.snapTo(this.dicex, 32);
      faces.y = this.game.math.snapTo(this.dicey, 32);
    },

    moveUp: function () {

      if (this.game.time.now > this.lastRoll) {
        this.lastRoll = this.game.time.now + this.rollTimer;
        this.temp = upFace.texture;
        upFace.texture = frontFace.texture;
        frontFace.texture = downFace.texture;
        downFace.texture = backFace.texture;
        backFace.texture = this.temp;
        this.temp = null;
      }
    },

    moveRight: function () {
      if (this.game.time.now > this.lastRoll) {
        this.lastRoll = this.game.time.now + this.rollTimer;
        this.temp = rightFace.texture;
        rightFace.texture = frontFace.texture;
        frontFace.texture = leftFace.texture;
        leftFace.texture = backFace.texture;
        backFace.texture = this.temp;
        this.temp = null;
      }
    },

    moveDown: function () {
      if (this.game.time.now > this.lastRoll) {
          this.lastRoll = this.game.time.now + this.rollTimer;
          this.temp = downFace.texture;
          downFace.texture = frontFace.texture;
          frontFace.texture = upFace.texture;
          upFace.texture = backFace.texture;
          backFace.texture = this.temp;
          this.temp = null;
      }
    },

    moveLeft: function () {
      if (this.game.time.now > this.lastRoll) {
          this.lastRoll = this.game.time.now + this.rollTimer;
          this.temp = leftFace.texture;
          leftFace.texture = frontFace.texture;
          frontFace.texture = rightFace.texture;
          rightFace.texture = backFace.texture;
          backFace.texture = this.temp;
          this.temp = null;
      }
    },

    spinRight: function () {
      if (this.game.time.now > this.lastSpin) {
        this.lastSpin = this.game.time.now + this.spinTimer;
        this.temp = upFace.texture;
        upFace.texture = leftFace.texture;
        leftFace.texture = downFace.texture;
        downFace.texture = rightFace.texture;
        rightFace.texture = this.temp;
        this.temp = null;
      }
    },

    spinLeft: function () {
      if (this.game.time.now > this.lastSpin) {
        this.lastSpin = this.game.time.now + this.spinTimer;
        this.temp = upFace.texture;
        upFace.texture = rightFace.texture;
        rightFace.texture = downFace.texture;
        downFace.texture = leftFace.texture;
        leftFace.texture = this.temp;
        this.temp = null;
      }
    }


};
