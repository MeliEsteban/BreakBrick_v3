
      export class GameOver extends Phaser.Scene {
        constructor() {
          super("GameOver");
        }
      
        preload() {
          // Cargar la imagen del botón de volver
          this.load.image('backButton', 'path_to_your_image/backButton.png');
        }
      
        init(data) {
          // Recupera el puntaje desde los datos pasados por la escena anterior
          this.finalScore = data.finalScore || 0;
        }
      
        create() {
          // Añadir una imagen de fondo para Game Over (opcional)
          this.add.image(512, 384, "gameover").setOrigin(0.5);
      
          // Crear el texto para mostrar el puntaje final
          let scoreText = this.add.text(512, 430, `Score: ${this.finalScore}`, {
            fontFamily: 'Air Americana DEMO Bold',
            fontSize: '30px',
            color: '#FFC540',
            stroke: '#A87B20',
            strokeThickness: 4,
          });
      
          // Centrar el texto
          scoreText.setOrigin(0.5);
      
          // Crear el botón de "Volver"
          let backButton = this.add.image(512, 500, 'backButton').setInteractive(); 
          backButton.setOrigin(0.5); 
          backButton.setScale(0.80); 

          // Agregar evento de clic al botón
          backButton.on('pointerdown', () => {
            this.scene.start('Game');  
          });
        }
      }