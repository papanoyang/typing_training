import TypingHeroScene from "./THScene";
import SceneKeys from "../constants/SceneKeys";
import ImageKeys from "../constants/ImageKeys";
import AnimationKeys from "../constants/AnimationKeys";
import SceneStatus from "../constants/SceneStatus";
import SceneParameter from "../interfaces/SceneParameter";

export default class TitleScene extends TypingHeroScene {
    // start button
    private _startButton!: Phaser.GameObjects.Sprite;
    // usage button
    private _usageButton!: Phaser.GameObjects.Sprite;
    // about button
    private _aboutButton!: Phaser.GameObjects.Sprite;

    constructor() {
        super(SceneKeys.TITLE);
    }

    create(data: {parameter: SceneParameter}) {
        // 親の事前処理を呼び出す
        this.preCreate();

        // Background Image
        this.add.image(0, 0, ImageKeys.BACKGROUND).setOrigin(0, 0);
        // Title Animation
        this.add.sprite(
            this.scale.width/2, 
            this.scale.height/2 - 100, 
            ImageKeys.TITLE01
        ).play(AnimationKeys.TITLE_ANI);

        // Start Button
        this._startButton = this.add.sprite(
            this.scale.width/2,
            this.scale.height/2 + 200,
            ImageKeys.START_BTN
        ).setInteractive();
        this._startButton.on('pointerover', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                this._startButton.setFrame(1);
                this._focusSound.play();
            }
        }, this);
        this._startButton.on('pointerout', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                this._startButton.setFrame(0);
            }
        }, this);
        this._startButton.on('pointerup', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                // Start Station Scene
                // 親のシーン遷移を呼び出す
                this.playTransition(SceneKeys.STATION);
            }
        }, this);

        // Usage Button
        this._usageButton = this.add.sprite(
            this.scale.width/2,
            this.scale.height/2 + 300,
            ImageKeys.USAGE_BTN_OFF
        ).setOrigin(0.5, 0.5).setInteractive();
        this._usageButton.on('pointerover', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                this._usageButton.setTexture(ImageKeys.USAGE_BTN_ON);
                this._focusSound.play();
            }
        }, this);
        this._usageButton.on('pointerout', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                this._usageButton.setTexture(ImageKeys.USAGE_BTN_OFF);
            }
        }, this);
        this._usageButton.on('pointerup', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                // 親のシーン遷移を呼び出す
                this.playTransition(SceneKeys.USAGE);
            }
        }, this);

        // About Button
        this._aboutButton = this.add.sprite(
            this.scale.width/2,
            this.scale.height - 50,
            ImageKeys.ABOUT_BTN_OFF
        ).setOrigin(0.5, 0.5).setInteractive();
        this._aboutButton.on('pointerover', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                this._aboutButton.setTexture(ImageKeys.ABOUT_BTN_ON);
                this._focusSound.play();
            }
        }, this);
        this._aboutButton.on('pointerout', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                this._aboutButton.setTexture(ImageKeys.ABOUT_BTN_OFF);
            }
        }, this);
        this._aboutButton.on('pointerup', () => {
            if (this._sceneStatus === SceneStatus.Normal) {
                // 親のシーン遷移を呼び出す
                this.playTransition(SceneKeys.ABOUT);
            }
        }, this);
        // dataのparameterは設定されてなければ"undefined"である
        // undefinedはfalse
        if (data.parameter) {
            // ローディングを回す
            this.playLoading();
        } else {
            this._sceneStatus = SceneStatus.Normal;
        }
    }
}