import TypingHeroScene from "./THScene";
import SceneKeys from "../constants/SceneKeys";
import SceneParameter from "../interfaces/SceneParameter";
import ImageKeys from "../constants/ImageKeys";

export default class PauseScene extends TypingHeroScene {
    constructor() {
        super(SceneKeys.PAUSE);
    }

    create(_: {parameter: SceneParameter}) {

        // 親の事前処理を呼び出す
        this.preCreate();

        this.add.image(this.scale.width/2, this.scale.height/2, ImageKeys.PAUSE_MENU).setOrigin(0.5, 0.5);
        const playButton = this.add.text(this.scale.width/2, 420, 'ゲームをつづける', 
            {fontSize: '40px', color: '#47B5FF'}).setOrigin(0.5, 0.5);
        playButton.setShadow(2, 2, '#06283D', 1, true, true);
        const stopButton = this.add.text(this.scale.width/2, 480, 'ゲームをやめる', 
            {fontSize: '40px', color: '#47B5FF'}).setOrigin(0.5, 0.5);
        stopButton.setShadow(2, 2, '#06283D', 1, true, true);
        
        playButton.setInteractive();
        playButton.on('pointerover', () => {
            playButton.setColor('#DFF6FF');
            playButton.setShadow(2, 2, '#1363DF', 1, true, true);
            this._focusSound.play();
        }, this);
        playButton.on('pointerout', () => {
            playButton.setColor('#47B5FF');
            playButton.setShadow(2, 2, '#06283D', 1, true, true);
        }, this);
        playButton.on('pointerup', () => {
            this.scene.stop();
            this.scene.resume(SceneKeys.GAMEPLAY);
        }, this);

        stopButton.setInteractive();
        stopButton.on('pointerover', () => {
            stopButton.setColor('#DFF6FF');
            stopButton.setShadow(2, 2, '#1363DF', 1, true, true);
            this._focusSound.play();
        }, this);
        stopButton.on('pointerout', () => {
            stopButton.setColor('#47B5FF');
            stopButton.setShadow(2, 2, '#06283D', 1, true, true);
        }, this);
        stopButton.on('pointerup', () => {
            this.playTransition(SceneKeys.GAMEOVER, SceneKeys.GAMEPLAY);
        }, this);
    }
}