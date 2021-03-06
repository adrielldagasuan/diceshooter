Player = function(game) {
    this.game = game;
}

Player.prototype = {
    create: function() {
        this.damaged = false;
        upPoint = {
            x: 0 + 64,
            y: this.game.height - 64 - 32
        };
        frontPoint = {
            x: 0 + 64,
            y: this.game.height - 64
        };
        downPoint = {
            x: 0 + 64,
            y: this.game.height - 64 + 32
        };
        rightPoint = {
            x: 0 + 64 + 32,
            y: this.game.height - 64
        };
        leftPoint = {
            x: 0 + 64 - 32,
            y: this.game.height - 64
        };
        backPoint = {
            x: 10,
            y: 10
        };

        this.tri = this.game.add.sprite(this.game.width / 2, this.game.height - 96, 'tri');
        this.game.physics.enable(this.tri, Phaser.Physics.ARCADE);
        this.tri.body.collideWorldBounds = true;
        this.tri.anchor.set(0.5, 0.5);
        this.tri.hp = 3000;

        upFace = this.game.add.sprite(upPoint.x, upPoint.y, 'face1');
        frontFace = this.game.add.sprite(frontPoint.x, frontPoint.y, 'face5');
        downFace = this.game.add.sprite(downPoint.x, downPoint.y, 'face6');
        rightFace = this.game.add.sprite(rightPoint.x, rightPoint.y, 'face4');
        leftFace = this.game.add.sprite(leftPoint.x, leftPoint.y, 'face3');
        backFace = this.game.add.sprite(frontPoint.x, frontPoint.y, 'face2');
        this.game.physics.enable(upFace, Phaser.Physics.ARCADE);
        this.game.physics.enable(frontFace, Phaser.Physics.ARCADE);
        this.game.physics.enable(rightFace, Phaser.Physics.ARCADE);
        this.game.physics.enable(leftFace, Phaser.Physics.ARCADE);
        this.game.physics.enable(downFace, Phaser.Physics.ARCADE);
        lastHit = this.game.time.now;

        upFace.anchor.set(0.5, 0.5);
        frontFace.anchor.set(0.5, 0.5);
        downFace.anchor.set(0.5, 0.5);
        rightFace.anchor.set(0.5, 0.5);
        leftFace.anchor.set(0.5, 0.5);
        backFace.alpha = 0;
        //this.gridBackground.anchor.set(0.5,0.5);

        tempPos = ''; // set placeholder used in texture swapping
        posX = this.game.width / 2;
        posY = this.game.height - 64;
        lastTimeDisabled = this.game.time.now;

        // configure timers
        rollTimer = 180; // set rate of dice roll
        lastRoll = this.game.time.now; // set initial cooldown time
        spinTimer = 180; // set rate of dice roll
        lastSpin = this.game.time.now; // set initial cooldown time
        TimerFast = 60; // set faster rate of dice roll & dice spin

        this.weapon = new Weapons(this.game);
        this.weapon.create();

        this.hitSound = this.game.add.audio('playerHit');

    },

    update: function() {

        if (!this.checkIfDisabled()) {
            if (this.game.gamepad) {
                this.gamepadController();
            } else {
                this.keyboardController();
            }
        }

        this.bulletType = upFace.texture.baseTexture.source.name.substring(4);
        this.checkPlayerCollision();
        this.checkInvinsibility();
    },

    keyboardController: function() {

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

        if (this.game.aKey.isDown) {
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
            this.tri.body.velocity.x = -500;
            this.tri.scale.x = 0.8;
            if (this.game.leftKey.downDuration(100)) {
                this.tri.body.velocity.x = -200;
            }
        } else if (this.game.rightKey.isDown) {
            this.tri.body.velocity.x = 500;
            this.tri.scale.x = 0.8;
            if (this.game.rightKey.downDuration(100)) {
                this.tri.body.velocity.x = 200;
            }
        } else {
            this.tri.scale.x = 1;
            this.tri.body.velocity.x = this.tri.body.velocity.x - (this.tri.body.velocity.x / 10);
        }

        if (this.game.upKey.isDown) {
            this.tri.body.velocity.y = -500;
            if (this.game.upKey.downDuration(100)) {
                this.tri.body.velocity.y = -200;
            }
        } else if (this.game.downKey.isDown) {
            this.tri.body.velocity.y = 500;
            if (this.game.downKey.downDuration(200)) {
                this.tri.body.velocity.y = 200;
            }
        } else {
            this.tri.body.velocity.y = this.tri.body.velocity.y - (this.tri.body.velocity.y / 10);
        }

        if (this.game.spaceKey.isDown && this.tri.alive && this.game.spaceKey.downDuration(200)) {
            this.fire();
        }
    },

    gamepadController: function() {

        if (this.game.gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)) {
            this.moveUp();
            this.updateSpeed(this.game.wKey);
        }


        if (this.game.gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) {
            this.moveRight();
            this.updateSpeed(this.game.dKey);
        }

        if (this.game.gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)) {
            this.moveDown();
            this.updateSpeed(this.game.sKey);
        }

        if (this.game.gamepad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)) {
            this.moveLeft();
            this.updateSpeed(this.game.aKey);
        }

        if (this.game.gamepad.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER)) {
            this.spinRight();
        }

        if (this.game.gamepad.isDown(Phaser.Gamepad.XBOX360_LEFT_BUMPER)) {
            this.spinLeft();
        }


        if (this.game.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
            this.tri.body.velocity.x = -500;
            this.tri.scale.x = 0.8;
            if (this.game.leftKey.downDuration(100)) {
                this.tri.body.velocity.x = -200;
            }
        } else if (this.game.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
            this.tri.body.velocity.x = 500;
            this.tri.scale.x = 0.8;
            if (this.game.rightKey.downDuration(100)) {
                this.tri.body.velocity.x = 200;
            }
        } else {
            this.tri.scale.x = 1;
            this.tri.body.velocity.x = this.tri.body.velocity.x - (this.tri.body.velocity.x / 10);
        }

        if (this.game.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
            this.tri.body.velocity.y = -500;
            if (this.game.upKey.downDuration(100)) {
                this.tri.body.velocity.y = -200;
            }
        } else if (this.game.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
            this.tri.body.velocity.y = 500;
            if (this.game.downKey.downDuration(200)) {
                this.tri.body.velocity.y = 200;
            }
        } else {
            this.tri.body.velocity.y = this.tri.body.velocity.y - (this.tri.body.velocity.y / 10);
        }

        if (this.game.gamepad.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER) && this.tri.alive) {
            this.fire();
        }
    },

    checkPlayerCollision: function() {
        this.checkCollision(this.tri, upFace);
        this.checkCollision(this.tri, downFace);
        this.checkCollision(this.tri, rightFace);
        this.checkCollision(this.tri, leftFace);
        this.checkCollision(this.tri, frontFace);
    },

    moveUp: function() {

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

    moveRight: function() {
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

    moveDown: function() {
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

    moveLeft: function() {
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

    spinRight: function() {
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

    spinLeft: function() {
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

    updateSpeed: function(key) {

        if (!key.downDuration(180 * 2)) {
            rollTimer = 60;
        } else {
            this.resetTimers();
        }
    },

    resetTimers: function() {
        rollTimer = 180;
    },

    fire: function() {
        this.weapon.fireWeapon(this.tri, this.bulletType);
    },

    takeDamage: function(damage) {
        if (lastHit < this.game.time.now) {
            lastHit = this.game.time.now + 2000;
            this.tri.hp = tri.hp - damage;
            this.hitSound.play();
            if (this.tri.hp <= 0) {
                //game over screen
                console.log('YOU ARE DEAD');
                this.tri.kill();
            }
        }
    },

    disableMovement: function() {
        this.tri.body.velocity.x = -(this.tri.body.velocity.x / 10);
        this.tri.body.velocity.y = -(this.tri.body.velocity.y / 10);
        if (!this.checkIfDisabled()) {
            lastTimeDisabled = this.game.time.now + 1000;
        }
    },

    checkIfDisabled: function() {
        if (this.game.time.now > lastTimeDisabled) {
            return false;
        } else {
            return true;
        }
    },

    checkCollision: function(tri, face) {
        if (this.checkOverlap(tri, face)) {
            face.alpha = 0.1;
        } else {
            face.alpha = 1;
        }
    },

    checkOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    checkInvinsibility: function() {

      if (lastHit > this.game.time.now) {
          this.damaged = true;
          this.tri.alpha = 0.3;
      } else {
          this.damaged = false;
          this.tri.alpha = 1;
      }
    }
}
