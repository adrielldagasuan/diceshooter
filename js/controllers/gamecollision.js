GameCollision = function(game){
  this.game = game;
}

GameCollision.prototype = {
    weaponEnemies: function(weapon, enemies) {

      bullets = weapon.bullets;

      hitEnemyHandler = function (bullet, enemy) {
        weapon.hit(bullet);
      }

      for (var i = 0; i < enemies.length; i++) {
        for(var j = 0; j < bullets.length; j++){
          for (var k = 0; k < enemies[i].countLiving(); k++) {
              this.game.physics.arcade.overlap(bullets[j], enemies[i], hitEnemyHandler, null,this);
            //console.log(this.game.physics.arcade);
          }
        }
      }
    },
}
