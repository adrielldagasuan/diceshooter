Enemy = function (game) {
  this.game = game;
}

Enemy.prototype = {
  create: function () {
    healthPoints = 3000,
    minions001 = this.game.add.group();
    this.minions = [minions001];

    this.minions[0].enableBody = true;
    this.minions[0].physicsBodyType = Phaser.Physics.ARCADE;
    this.minions[0].createMultiple(20, 'enemy1');
    //bullets[i].callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this);
    //bullets[i].setAll('checkWorldBounds', true);
    this.minions[0].setAll('anchor.x', 0.5);
    this.minions[0].setAll('anchor.y', 0.5);
    spawnTime = 3000;
    lastSpawn = this.game.time.now;
    enemyId = 0;
    enemyData = [
        [180,[[100,100],[200,100],[300,100]]],
        [360,[[400,300]]]
    ]
    
    gameDistance = 0;
    this.traveledDistance = 0;
    spawnIndex = 0;
  },

  update: function () {
    gameDistance++;
    this.traveledDistance = gameDistance;
    /*
    if (this.minions[0].countLiving() < 10 && this.canSpawn()) {
      minion = this.minions[0].getFirstExists(false);
      minion.name = 'minion' + enemyId;
      minion.hp = healthPoints;
      minion.reset(this.game.rnd.integerInRange(50, this.game.width-50), 100);

      lastSpawn = this.game.time.now + spawnTime;
      enemyId++;
    }
    */
    if (spawnIndex < enemyData.length) {
      if (gameDistance == enemyData[spawnIndex][0]) {
        console.log(enemyData[spawnIndex][1].length);
        for (i = 0; i < enemyData[spawnIndex][1].length; i++) {
          minion = this.minions[0].getFirstExists(false);
          minion.name = 'minion' + enemyId;
          minion.hp = healthPoints;
          minion.reset(enemyData[spawnIndex][1][i][0], enemyData[spawnIndex][1][i][1]);
          enemyId++;
        }
        spawnIndex++;
      }
    }

  },

  takeDamage: function(minion, dmg) {
    minion.hp = minion.hp-(dmg * 1000);
    if (minion.hp <= 0) {
      minion.kill();
    }
  },

  canSpawn: function () {
      if (this.game.time.now > lastSpawn) {
        return true;
      } else {
        return false;
      }
  }
}
