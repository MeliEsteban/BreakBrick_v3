import { Scene } from "phaser";
import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";
import { Brick } from "../entities/Brick";
import { WallBrick } from "../entities/WallBrick";
import { Bomb } from "../entities/Bomb";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.touchedBottomBalls = []; 
  }

  init() {
    this.score = 0;
  }

  
  create() {
    this.cameras.main.setBackgroundColor("#1e1e54");
    this.balls = this.add.group();
    this.balls.add(new Ball(this, 400, 300, 10, 0xF23F3A, 1));

    this.paddle = new Paddle(this, 400, 630, 130, 20, 0xBCB7BC, 1);
    this.wall = new WallBrick(this);
    this.bombs = this.add.group();

    this.scoreTextgame = this.add.text(10, 10, '0', {
      fontFamily: 'Air Americana DEMO Bold',
      fontSize: '28px',
      fill: '#FFC540'
    });

    this.physics.add.collider(this.paddle, this.balls);

    this.physics.add.collider(
      this.balls,
      this.wall,
      (ball, brick) => {
        brick.hit();
        this.puntaje(); 

        if (brick.isBallCreator) {
          this.createNewBall(ball.x, ball.y);
        }

        if (brick.isBombCreator) {
          this.createNewBomb(ball.x, ball.y);
        }

        if (this.wall.getChildren().every(brick => brick.destroyed)) {
          ball.increaseSpeed(1.1);
          this.velocidadX = ball.newVelocityX;
          this.velocidadY = ball.newVelocityY;
          this.scene.restart({ newVelocityX: this.velocidadX, newVelocityY: this.velocidadY });
        }
      },
      null,
      this
    );

    this.physics.add.collider(this.paddle, this.bombs, (paddle, bomb) => {
      this.handleGameOver();
    });

    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (down && body.gameObject instanceof Ball) {
        this.handleBallTouchBottom(body.gameObject);
      }
    });
  }



  puntaje() {
    this.score++;
    this.scoreTextgame.setText(`${this.score}`);
  }

  createNewBall(x, y) {
    const newBall = new Ball(this, x, y, 10, 0xffffff, 1);
    this.balls.add(newBall);
    newBall.increaseSpeed(1.05);
  }

  createNewBomb(x, y) {
    const newBomb = new Bomb(this, x, y, 20, 20, 0xff0000, 1);
    this.bombs.add(newBomb);
  }

  handleBallTouchBottom(ball) {
    ball.destroy(); 
    this.touchedBottomBalls.push(ball);

    //Eliminación de la pelota del grupo de pelotas
    this.balls.remove(ball, true, true);

    if (this.touchedBottomBalls.length === this.balls.getLength() + this.touchedBottomBalls.length) {
      this.scene.start("GameOver", { finalScore: this.score });
    }
  }

  handleGameOver() {
    this.bombs.clear(true, true);
    this.scene.start("GameOver", { finalScore: this.score });
  }

  update() {
    this.paddle.update();
    this.bombs.getChildren().forEach(bomb => {
    });
  }


  GameOver() {
    this.scoreTextgame.setText(`${this.score}`);
  }
}
