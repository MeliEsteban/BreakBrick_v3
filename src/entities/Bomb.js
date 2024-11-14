export class Bomb extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, color, alpha) {
      super(scene, x, y, width, height, color, alpha);
      this.setFillStyle(color = 0x160F01, alpha = 1);
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      this.body.setGravityY(300); 
      this.body.setVelocityY(Phaser.Math.Between(50, 100)); 
  
      this.body.setCollideWorldBounds(true);
      this.body.onWorldBounds = true;
  
      
      this.body.world.on('worldbounds', (body, up, down, left, right) => {
        if (down) {
          this.destroy();
        }
      });
    }
  }
  