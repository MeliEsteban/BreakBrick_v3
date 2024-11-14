import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background');

        this.add.text(512, 460, 'JUGAR', {
            fontFamily: 'Air Americana DEMO Bold', fontSize: 30, color: '#FFC540',
            stroke: '#A87B20', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game');
        });
    }
}
