import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.image('background', 'assets/background.png');
        this.load.image("gameover", "assets/gameover.png");
        this.load.image("backButton", "assets/back.png");
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
