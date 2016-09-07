Enemy = function (game) {
  this.game = game;
}

Enemy.prototype = {
  create: function () {

    enemies001 = this.game.add.group();
    enemies = [enemies001];

    enemies[0].enableBody = true;
    enemies[0].physicsBodyType = Phaser.Physics.ARCADE;
    enemies[0].createMultiple(20, 'enemy1');
    //bullets[i].callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
    //bullets[i].setAll('checkWorldBounds', true);
    enemies[0].setAll('anchor.x', 0.5);
    enemies[0].setAll('anchor.y', 0.5);

  }
}
