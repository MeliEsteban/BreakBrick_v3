export class Brick extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color, alpha, isBallCreator, isBombCreator) {
    super(scene, x, y, width, height, color, alpha);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.immovable = true;
    this.body.setCollideWorldBounds(true);
    this.isBallCreator = isBallCreator;
    this.isBombCreator = isBombCreator;

    // Inicializar el contador de toques y un número aleatorio de toques máximos
    this.toches = 0;
    this.maxTouches = Phaser.Math.Between(1, 3);

    this.colors = [0x03C2D6, 0xFF7864, 0xFFC540, 0x00B487];
  }

  hit() {
    this.toches++;

    // color aleatorio en cada toque
    let colorAleatorio = Phaser.Utils.Array.GetRandom(this.colors);
    this.setFillStyle(colorAleatorio);

    // Verifica si los toques han alcanzado el límite aleatorio
    if (this.toches >= this.maxTouches) {
      this.destroy();

      if (this.isBallCreator) {
        if (this.scene && typeof this.scene.createNewBall === 'function') {
          console.log('Ladrillo generador de pelotas activado en', this.x, this.y);
          this.scene.createNewBall(this.x, this.y);
        } else {
          console.error('createNewBall no está definido en la escena');
        }
      }

      if (this.isBombCreator) {
        if (this.scene && typeof this.scene.createNewBomb === 'function') {
          console.log('Ladrillo generador de bombas activado en', this.x, this.y);
          this.scene.createNewBomb(this.x, this.y);
        } else {
          console.error('createNewBomb no está definido en la escena');
        }
      }
    }
  }
}
