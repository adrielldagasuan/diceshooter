Player = function (game) {
  this.game = game;
}

Player.prototype = {
  create: function (){

    this.upPoint = {x: 0+64, y: this.game.height - 64-32};
    this.frontPoint = {x: 0+64, y: this.game.height - 64};
    this.downPoint = {x: 0+64, y: this.game.height - 64+32};
    this.rightPoint = {x: 0+64+32, y: this.game.height - 64};
    this.leftPoint = {x: 0+64-32, y: this.game.height - 64};
    this.backPoint = {x: 10, y: 10};

    tri = this.game.add.sprite(this.game.width/2,this.game.height - 96,'tri');
    this.game.physics.enable(tri,Phaser.Physics.ARCADE);
    tri.anchor.set(0.5,0.5);

    upFace = this.game.add.sprite(this.upPoint.x, this.upPoint.y, 'face1');
    frontFace = this.game.add.sprite(this.frontPoint.x, this.frontPoint.y, 'face5');
    downFace = this.game.add.sprite(this.downPoint.x, this.downPoint.y, 'face6');
    rightFace = this.game.add.sprite(this.rightPoint.x, this.rightPoint.y, 'face4');
    leftFace = this.game.add.sprite(this.leftPoint.x, this.leftPoint.y, 'face3');
    backFace = this.game.add.sprite(this.frontPoint.x, this.frontPoint.y, 'face2');
    this.game.physics.enable(upFace,Phaser.Physics.ARCADE);
    this.game.physics.enable(frontFace,Phaser.Physics.ARCADE);
    this.game.physics.enable(rightFace,Phaser.Physics.ARCADE);
    this.game.physics.enable(leftFace,Phaser.Physics.ARCADE);
    this.game.physics.enable(downFace,Phaser.Physics.ARCADE);

    upFace.anchor.set(0.5,0.5);
    frontFace.anchor.set(0.5,0.5);
    downFace.anchor.set(0.5,0.5);
    rightFace.anchor.set(0.5,0.5);
    leftFace.anchor.set(0.5,0.5);
    backFace.alpha = 0;
    //this.gridBackground.anchor.set(0.5,0.5);

    this.bullets001 = this.game.add.group();
    this.bullets002 = this.game.add.group();
    this.bullets003 = this.game.add.group();
    this.bullets004 = this.game.add.group();
    this.bullets005 = this.game.add.group();
    this.bullets006 = this.game.add.group();
    this.bullets = [this.bullets001, this.bullets002, this.bullets003, this.bullets004, this.bullets005, this.bullets006];

    for (i = 0; i < this.bullets.length; i++) {
      this.bullets[i].enableBody = true;
      this.bullets[i].physicsBodyType = Phaser.Physics.ARCADE;
      this.bullets[i].createMultiple(50, 'bullet'+(i+1));
      this.bullets[i].callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
      this.bullets[i].setAll('checkWorldBounds', true);
      this.bullets[i].setAll('anchor.x', 0.5);
      this.bullets[i].setAll('anchor.y', 1);
    }



    this.temp = ''; // set placeholder used in texture swapping

    posX = this.game.width/2;
    posY = this.game.height - 64;

    // configure timers
    this.rollTimer = 180; // set rate of dice roll
    this.lastRoll = this.game.time.now; // set initial cooldown time
    this.spinTimer = 180; // set rate of dice roll
    this.lastSpin = this.game.time.now; // set initial cooldown time
    this.TimerFast = 60; // set faster rate of dice roll & dice spin
    this.fireTimer = 100;
    this.lastFire = [];
    for (i = 0; i < 6; i++){
        this.lastFire[i] = this.game.time.now;
    }
  },

  update: function () {
    this.diceController();
    this.bulletType = upFace.texture.baseTexture.source.name.substring(4);
  },

  diceController: function () {

    if (this.game.wKey.isDown) {
      this.moveUp();
      this.updateSpeed(this.game.wKey);
    }


    if (this.game.dKey.isDown) {
      this.moveRight();
      this.updateSpeed(this.game.dKey);
    }

    if (this.game.sKey.isDown) {
      this.moveDown();
      this.updateSpeed(this.game.sKey);
    }

    if (this.game.aKey.isDown){
      this.moveLeft();
      this.updateSpeed(this.game.aKey);
    }

    if (this.game.eKey.isDown) {
      this.spinRight();
    }

    if (this.game.qKey.isDown) {
      this.spinLeft();
    }

    if (this.game.leftKey.isDown) {
      tri.body.velocity.x -= 20;
    } else if (this.game.rightKey.isDown) {
      tri.body.velocity.x += 20;
    } else {
      tri.body.velocity.x = tri.body.velocity.x-(tri.body.velocity.x/20);
    }

    if (this.game.spaceKey.isDown) {
      this.fire();
    }

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
  },

  updateSpeed: function (key) {

    if (!key.downDuration (180 * 2)) {
      this.rollTimer = 60;
    } else {
      this.resetTimers();
    }
  },

  resetTimers: function () {
    this.rollTimer = 180;
  },

  fire: function () {
    if (this.canFire(this.bulletType)) {
      bullet = this.bullets[this.bulletType-1].getFirstExists(false);
      console.log(this.bullet);
      if (bullet) {
        bullet.reset(tri.x, tri.y-32);
        bullet.body.velocity.y -= 1200;
      }
      this.lastFire[this.bulletType-1] = this.game.time.now + (this.fireTimer * this.bulletType * this.bulletType);
    }
  },

  resetBullet: function (bullet) {
    bullet.kill();
  },

  canFire: function (i) {
    if (this.game.time.now > this.lastFire[i-1]) {
      return true;
    } else {
      return false
    };
  }
}
