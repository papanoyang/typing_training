import TypingHeroScene from "./THScene";
import SceneKeys from "../constants/SceneKeys";
import ImageKeys from "../constants/ImageKeys";
import SceneStatus from "../constants/SceneStatus";


export default class AboutScene extends TypingHeroScene {
    // Back Button
    private _backButton!: Phaser.GameObjects.Sprite;

    constructor() {
        super(SceneKeys.ABOUT);
    }

    create() {
        // 親の事前処理を呼び出す
        this.preCreate();

        // Background Image
        this.add.image(0, 0, ImageKeys.BACKGROUND2).setOrigin(0, 0);

        // draw tile
        this._drawTile();

        // back button
        this._backButton = this.add.sprite(1100, this.scale.height - 40, ImageKeys.BACK_BTN_OFF);
        this._backButton.setInteractive();
        this._backButton.on('pointerover', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                this._backButton.setTexture(ImageKeys.BACK_BTN_ON);
                this._focusSound.play();
            }
        }, this);
        this._backButton.on('pointerout', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                this._backButton.setTexture(ImageKeys.BACK_BTN_OFF);
            }
        }, this);
        this._backButton.on('pointerup', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                // 親のシーン遷移を呼び出す
                this.playTransition(SceneKeys.TITLE);
            }
        }, this);
        // 親のローディングを呼び出す
        this.playLoading();
    }

    private _drawTile () {
        for (let i = 0; i < this.scale.width/100; i++) {
            for (let j = 0; j < this.scale.height/100; j++) {
                this.add.image(
                    i * 100,
                    j * 100,
                    ImageKeys.GLASST
                ).setOrigin(0, 0);
            }
        }
        this.add.image(0, 0, ImageKeys.METALT_LT).setOrigin(0, 0);
        this.add.image(this.scale.width, 0, ImageKeys.METALT_RT).setOrigin(1, 0);
        this.add.image(0, this.scale.height, ImageKeys.METALT_LB).setOrigin(0, 1);
        this.add.image(this.scale.width, this.scale.height, ImageKeys.METALT_RB).setOrigin(1, 1);
        for (let i = 0; i < 10; i++) {
            let x = 100 + (100 * i);
            this.add.image(x, 0, ImageKeys.METALT_TOP).setOrigin(0, 0);
            this.add.image(x, this.scale.height, ImageKeys.METALT_BOTTOM).setOrigin(0, 1);
        }
        for (let i = 0; i < 7; i++) {
            let y = 100 + (100 * i);
            this.add.image(0, y, ImageKeys.METALT_LEFT).setOrigin(0, 0);
            this.add.image(this.scale.width, y, ImageKeys.METALT_RIGHT).setOrigin(1, 0);
        }
    }

    

    

    
}