
BasicGame.Level1 = function (game) {

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

BasicGame.Level1.prototype = {

    create: function () {

        this.stageBackground = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'tile');
        this.stageBackground.autoScroll(0,40);

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

        player = new Player(this.game);
        enemies = new Enemy(this.game);
        gameCollider = new GameCollision(this.game);
        player.create();
        enemies.create();
        console.log(this.game);
    },

    update: function () {
      player.update();
      enemies.update();
      gameCollider.weaponEnemies(player.weapon, enemies);
      gameCollider.playerEnemies(player, enemies);

      //this.game.physics.arcade.overlap(player.bullets,enemies.minions001);
    },

    render: function () {
      this.game.debug.text(this.game.playerScore, 10, 30);
    },

    quitGame: function (pointer) {

    }


};
