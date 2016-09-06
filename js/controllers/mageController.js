export default function() {
  mage.body.velocity.x = 0;
  mage.body.velocity.y = 0;

  if (this.wKey.isDown) {
    mage.animations.play('move');
    mage.body.velocity.y = -350;
  } else {
    if (!this.sKey.isDown) {
        mage.animations.stop('move', true);
    }
  }

  if (this.aKey.isDown) {
    mage.animations.play('strafe');
    mage.body.velocity.x = -350;
  } else {
    mage.animations.stop('strafe', true);
  }

  if (this.sKey.isDown) {
    mage.animations.play('move');
    mage.body.velocity.y = 350;
  } else {
    if (!this.wKey.isDown) {
        mage.animations.stop('move', true);
    }
  }

  if (this.dKey.isDown) {
    mage.animations.play('strafe');
    mage.body.velocity.x = 350;
  } else {
    mage.animations.stop('strafe', true);
  }

  if (this.spaceKey.isDown) {
    //console.log(this.spaceKey.downDuration(1000));
    if (this.spaceKey.downDuration(5*30)){
        mage.animations.play('cast');
    } else {
      mage.animations.stop('cast');
    }
  } else {
    mage.animations.stop('cast',true);
  }
}
