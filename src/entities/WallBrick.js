import Phaser from 'phaser';
import { Brick } from './Brick'; 

export class WallBrick extends Phaser.GameObjects.Group {
  constructor(scene) {
    super(scene);
    this.createWall();
  }

  createWall() {
// Define la posición inicial del muro
const startX = 68; // Cambia este valor para mover el muro en el eje X
const startY = 80; // Cambia este valor para mover el muro en el eje Y


    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 4; j++) {
        //configurar la probabilidad
        let isBallCreator = Phaser.Math.Between(0, 10) > 9;
        let isBombCreator = Phaser.Math.Between(0, 10) > 9;

        let brick = new Brick(
          this.scene,
          startX + i * 100,
          startY + j * 50,
          60,
          20,
          0xBCB7BC,
          1,
          isBallCreator,
          isBombCreator);
        this.add(brick);
      }
    }
  }
}
