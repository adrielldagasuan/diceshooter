Weapons = function (game) {
  this.game = game;
}

Weapons.prototype = {
  create: function () {

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
      this.bullets[i].createMultiple(10, 'bullet'+(i+1));
      this.bullets[i].callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
      this.bullets[i].setAll('checkWorldBounds', true);
      this.bullets[i].setAll('anchor.x', 0.5);
      this.bullets[i].setAll('anchor.y', 1);
    }

    // configure bullets
    fireTimer = 50;
    lastFire = [];
    for (i = 0; i < 6; i++){
        lastFire[i] = this.game.time.now;
    }

    bulletSparks = this.game.add.emitter(0, 0, 4);
    bulletSparks.makeParticles('particle');
    bulletSparks.maxParticleScale = 0.1;

  },

  fireWeapon: function (player, bulletType) {
    if (this.canFire(bulletType)) {
      bullet = this.bullets[bulletType-1].getFirstExists(false);
      if (bullet) {
        bullet.damage = bulletType;
        bullet.reset(player.x, player.y-32);
        bullet.body.velocity.y -= 1200;
      }
      lastFire[bulletType-1] = this.game.time.now + (fireTimer * bulletType * bulletType);
    }
  },

  resetBullet: function (bullet) {
    bullet.kill();
  },

  // for bullets section
  canFire: function (i) {
    if (this.game.time.now > lastFire[i-1]) {
      return true;
    } else {
      return false
    };
  },

  hit: function (bullet) {
    bulletSparks.x = bullet.x;
    bulletSparks.y = bullet.y - bullet.height;
    bulletSparks.start(true, 70, null, 10);
    bullet.kill();
  }

}
