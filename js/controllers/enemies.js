Enemy = function (game) {
  this.game = game;
}

Enemy.prototype = {
  create: function () {
    healthPoints = 3000,
    minions001 = this.game.add.group();
    minions002 = this.game.add.group();
    this.minions = [minions001, minions002];
    for (var i = 0; i < this.minions.length; i++){
      this.minions[i].enableBody = true;
      this.minions[i].physicsBodyType = Phaser.Physics.ARCADE;
      this.minions[i].createMultiple(20, 'enemy' + (i+1));
      this.minions[i].setAll('anchor.x', 0.5);
      this.minions[i].setAll('anchor.y', 0.5);
      this.minions[i].setAll('body.immovable', true);
      this.minions[i].callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetEnemy, this);
      this.minions[i].setAll('checkWorldBounds', true);
    }

    spawnTime = 300;
    lastSpawn = [];
    for (var i = 0; i < lastSpawn.length; i++){
      lastSpawn[i] = this.game.time.now;
    }
    enemyId = 0;
    enemyData = [
        [180,[[100,50],[200,50],[300,50]]],
        [360,[[400,50]]],
        [540,[[600,50]]],
        [600,[[300,50]]],
        [720,[[200,50]]],
        [960,[[100,50]]]
    ]

    gameDistance = 0;
    this.traveledDistance = 0;
    spawnIndex = 0;
  },

  update: function () {
    gameDistance++;
    this.traveledDistance = gameDistance;

    this.spawnEnemies();

  },

  takeDamage: function(minion, dmg) {
    minion.hp = minion.hp-(dmg * 1000);
    if (minion.hp <= 0) {
      minion.kill();
      this.game.addScore(this.game, 1);
    }
  },

  spawnEnemies: function (){
    function moveMinions(minion){
      minion.body.velocity.y = 100;
      minion.body.velocity.x = this.game.rnd.integerInRange(-30, 30);
      //minion.x += Math.cos(minion.y/10)*10;
    }

    if (this.minions[0].countLiving() < 10 && this.canSpawn()) {
      minion = this.minions[0].getFirstExists(false);
      minion.name = 'minion' + enemyId;
      minion.hp = healthPoints;
      minion.reset(this.game.rnd.integerInRange(50, this.game.width-50), 0);

      lastSpawn = this.game.time.now + spawnTime;
      enemyId++;
    }

    if (this.minions[1].countLiving() < 10 && this.canSpawn()) {
      minion = this.minions[1].getFirstExists(false);
      minion.name = 'minion' + enemyId;
      minion.hp = 10000;
      minion.reset(this.game.rnd.integerInRange(50, this.game.width-50), 0);

      lastSpawn = this.game.time.now + spawnTime;
      enemyId++;
    }

    for (var i = 0; i < this.minions.length; i++){
        this.minions[i].forEachAlive(moveMinions, this);
    }

    //
    // if (spawnIndex < enemyData.length) {
    //   if (gameDistance == enemyData[spawnIndex][0]) {
    //     console.log(enemyData[spawnIndex][1].length);
    //     for (i = 0; i < enemyData[spawnIndex][1].length; i++) {
    //       minion = this.minions[0].getFirstExists(false);
    //       minion.name = 'minion' + enemyId;
    //       minion.hp = healthPoints;
    //       minion.reset(enemyData[spawnIndex][1][i][0], enemyData[spawnIndex][1][i][1]);
    //       enemyId++;
    //     }
    //     spawnIndex++;
    //   }
    // }
  },

  canSpawn: function () {
      if (this.game.time.now > lastSpawn) {
        return true;
      } else {
        return false;
      }
  },

  resetEnemy: function (enemy){
    console.log('recycley enemy');
    enemy.kill();
  }
}
