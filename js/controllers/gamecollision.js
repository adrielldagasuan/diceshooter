GameCollision = function(game){
  this.game = game;
}

GameCollision.prototype = {
    weaponEnemies: function(weapon, enemies) {

      bullets = weapon.bullets;
      minions = enemies.minions;

      hitEnemyHandler = function (bullet, enemy) {
        weapon.hit(bullet);
        enemies.takeDamage(enemy, bullet.damage);
      }

      for (var i = 0; i < minions.length; i++) {
        for(var j = 0; j < bullets.length; j++){
          for (var k = 0; k < minions[i].countLiving(); k++) {
              this.game.physics.arcade.overlap(bullets[j], minions[i], hitEnemyHandler, null,this);
            //console.log(this.game.physics.arcade);
          }
        }
      }
    },
}
