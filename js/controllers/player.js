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

    this.tri = this.game.add.sprite(this.game.width/2,this.game.height - 96,'tri');
    this.game.physics.enable(this.tri,Phaser.Physics.ARCADE);
    this.tri.anchor.set(0.5,0.5);

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

    tempPos = ''; // set placeholder used in texture swapping
    posX = this.game.width/2;
    posY = this.game.height - 64;

    // configure timers
    rollTimer = 180; // set rate of dice roll
    lastRoll = this.game.time.now; // set initial cooldown time
    spinTimer = 180; // set rate of dice roll
    lastSpin = this.game.time.now; // set initial cooldown time
    TimerFast = 60; // set faster rate of dice roll & dice spin

    this.weapon = new Weapons(this.game);
    this.weapon.create();

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
      this.tri.body.velocity.x -= 20;
    } else if (this.game.rightKey.isDown) {
      this.tri.body.velocity.x += 20;
    } else {
      this.tri.body.velocity.x = this.tri.body.velocity.x-(this.tri.body.velocity.x/20);
    }

    if (this.game.spaceKey.isDown) {
      this.fire();
    }

  },
  moveUp: function () {

    if (this.game.time.now > lastRoll) {
      lastRoll = this.game.time.now + rollTimer;
      tempPos = upFace.texture;
      upFace.texture = frontFace.texture;
      frontFace.texture = downFace.texture;
      downFace.texture = backFace.texture;
      backFace.texture = tempPos;
      tempPos = null;
    }
  },

  moveRight: function () {
    if (this.game.time.now > lastRoll) {
      lastRoll = this.game.time.now + rollTimer;
      tempPos = rightFace.texture;
      rightFace.texture = frontFace.texture;
      frontFace.texture = leftFace.texture;
      leftFace.texture = backFace.texture;
      backFace.texture = tempPos;
      tempPos = null;
    }

  },

  moveDown: function () {
    if (this.game.time.now > lastRoll) {
        lastRoll = this.game.time.now + rollTimer;
        tempPos = downFace.texture;
        downFace.texture = frontFace.texture;
        frontFace.texture = upFace.texture;
        upFace.texture = backFace.texture;
        backFace.texture = tempPos;
        tempPos = null;
    }
  },

  moveLeft: function () {
    if (this.game.time.now > lastRoll) {
        lastRoll = this.game.time.now + rollTimer;
        tempPos = leftFace.texture;
        leftFace.texture = frontFace.texture;
        frontFace.texture = rightFace.texture;
        rightFace.texture = backFace.texture;
        backFace.texture = tempPos;
        tempPos = null;
    }
  },

  spinRight: function () {
    if (this.game.time.now > lastSpin) {
      lastSpin = this.game.time.now + spinTimer;
      tempPos = upFace.texture;
      upFace.texture = leftFace.texture;
      leftFace.texture = downFace.texture;
      downFace.texture = rightFace.texture;
      rightFace.texture = tempPos;
      tempPos = null;
    }
  },

  spinLeft: function () {
    if (this.game.time.now > lastSpin) {
      lastSpin = this.game.time.now + spinTimer;
      tempPos = upFace.texture;
      upFace.texture = rightFace.texture;
      rightFace.texture = downFace.texture;
      downFace.texture = leftFace.texture;
      leftFace.texture = tempPos;
      tempPos = null;
    }
  },

  updateSpeed: function (key) {

    if (!key.downDuration (180 * 2)) {
      rollTimer = 60;
    } else {
      this.resetTimers();
    }
  },

  resetTimers: function () {
    rollTimer = 180;
  },

  fire: function () {
    this.weapon.fireWeapon(this.tri, this.bulletType);
  }
}
