Enemy = function (game) {
  this.game = game;
}

Enemy.prototype = {
  create: function () {

    minions001 = this.game.add.group();
    minions = [minions001];

    minions[0].enableBody = true;
    minions[0].physicsBodyType = Phaser.Physics.ARCADE;
    minions[0].createMultiple(20, 'enemy1');
    //bullets[i].callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
    //bullets[i].setAll('checkWorldBounds', true);
    minions[0].setAll('anchor.x', 0.5);
    minions[0].setAll('anchor.y', 0.5);
    minion = minions[0].getFirstExists(false);
    minion.reset(100,100);
    console.log(minions[0].countLiving());

  }
}
