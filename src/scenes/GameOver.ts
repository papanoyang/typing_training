import TypingHeroScene from "./THScene";
import SceneKeys from "../constants/SceneKeys";
import ImageKeys from "../constants/ImageKeys";
import SceneStatus from "../constants/SceneStatus";
import SceneParameter from "../interfaces/SceneParameter";
import GAME_RESULT from "../constants/GameResult";

export default class GameOverScene extends TypingHeroScene{
    // Back Button
    private _backButton!: Phaser.GameObjects.Sprite;

    constructor() {
        super(SceneKeys.GAMEOVER);
    }

    create(data: {parameter: SceneParameter}) {
        // 親の事前処理を呼び出す
        this.preCreate();

        // draw tile
        this._drawTile();
        let message: string[];
        if (data.parameter.gameResult === GAME_RESULT.Clear) {
            message = ['ステージクリア！', 'おめでとう！'];
        } else if (data.parameter.gameResult === GAME_RESULT.GameOver) {
            message = ['ざんねん', 'がんばろうね！'];
        } else {
            message = ['またあそぼうね！'];
        }

        this.add.text(this.scale.width/2, this.scale.height/2, message, {fontSize:'100px', color:'#000000', align: 'center'}).setOrigin(0.5, 0.5);

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
                this.playTransition(SceneKeys.STATION);
            }
        }, this);

        // ローディングを回す
        this.playLoading();
    }

    private _drawTile () {
        for (let i = 0; i < this.scale.width/100; i++) {
            for (let j = 0; j < this.scale.height/100; j++) {
                this.add.image(
                    i * 100,
                    j * 100,
                    ImageKeys.BLUET
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