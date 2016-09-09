Enemy = function (game) {
  this.game = game;
}

Enemy.prototype = {
  create: function () {

    minions001 = this.game.add.group();
    this.minions = [minions001];

    this.minions[0].enableBody = true;
    this.minions[0].physicsBodyType = Phaser.Physics.ARCADE;
    this.minions[0].createMultiple(20, 'enemy1');
    //bullets[i].callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
    //bullets[i].setAll('checkWorldBounds', true);
    this.minions[0].setAll('anchor.x', 0.5);
    this.minions[0].setAll('anchor.y', 0.5);
    minion1 = this.minions[0].getFirstExists(false);
    minion1.name = 'MINION1';
    minion1.reset(100,100);
    minion2 = this.minions[0].getFirstExists(false);
    minion2.name = 'MINION2';
    minion2.reset(300,100);
    console.log(this.minions[0].countLiving());

  },

  takeDamage: function(dmg) {

  }
}
