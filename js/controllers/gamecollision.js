GameCollision = function(game){
  this.game = game;
}

GameCollision.prototype = {
    weaponEnemies: function(weapon, enemies) {

      bullets = weapon.bullets;
      minions = enemies.minions;

      weaponEnemyHandler = function (bullet, enemy) {

        weapon.hit(bullet);
        enemies.takeDamage(enemy, bullet.damage);
      }

      for (var i = 0; i < minions.length; i++) {
        for(var j = 0; j < bullets.length; j++){
          for (var k = 0; k < minions[i].countLiving(); k++) {
              this.game.physics.arcade.overlap(bullets[j], minions[k], weaponEnemyHandler, null,this);
          }
        }
      }
    },

    playerEnemies: function(player, enemies) {
      tri = player.tri;
      minions = enemies.minions;

      playerEnemyHandler = function (enemy) {
        player.takeDamage(200);
        player.disableMovement();
      }

      for (var i = 0; i < minions.length; i++) {
        for (var j = 0; j < minions[i].countLiving(); j++) {
            this.game.physics.arcade.collide(tri, minions[j], playerEnemyHandler, null,this);
        }
      }
    },

    playerEnemyBullets: function(player, enemies) {
      tri = player.tri;
      enemyBullets = enemies.enemyBullets;
      playerEnemyHandler = function (enemy) {
        player.takeDamage(200);

      }

      this.game.physics.arcade.collide(tri, enemyBullets, playerEnemyHandler, null,this);

    }
}
