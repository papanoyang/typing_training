import TypingHeroScene from "./THScene";
import SceneKeys from "../constants/SceneKeys";
import ImageKeys from "../constants/ImageKeys";
import SceneStatus from "../constants/SceneStatus";
import StageData from "../interfaces/StageData";
import GameData from "../interfaces/GameData";

export default class StationScene extends TypingHeroScene{
    // Stage Data
    private _stageDatas!: StageData[];
    // Stage Pannel Group
    private _stageGroup!: Phaser.GameObjects.Group;
    // Stage Info Text
    private _stageInfoText!: Phaser.GameObjects.Text;

    // Back Button
    private _backButton!: Phaser.GameObjects.Sprite;

    constructor() {
        super(SceneKeys.STATION);
    }

    create() {
        // ステージデータをロード
        const gameData = this.cache.json.get('gamedata') as GameData;
        this._stageDatas = gameData.stage_data;
        this._stageGroup = this.add.group();

        // 親の事前処理を呼び出す
        this.preCreate();

        // Background Image
        this.add.image(0, 0, ImageKeys.BACKGROUND2).setOrigin(0, 0);

        // draw tile
        this._drawTile();

        this._drawStage();

        // ローディングを回す
        this.playLoading();
    }

    private _drawStage() {
        this._stageInfoText = this.add.text(
            this.scale.width/2, 80, "", {
                fontSize: '20px',
                color: '#DFF6FF',
                backgroundColor: '#06283D'
        }).setOrigin(0.5, 0);
        for (let index = 0; index < this._stageDatas.length; index++) {
            const x = (index % 10) * 100  + 100;
            const y = Math.floor(index/10) * 100 + 100;
            // Stage Pannel
            const pannel = this.add.sprite(
                x, y, 
                ImageKeys.STAGE_PANNEL
            ).setOrigin(0, 0).setInteractive();
            pannel.setDataEnabled();
            pannel.setData('stage', this._stageDatas[index].stage);
            pannel.setData('comment', this._stageDatas[index].comment);
            pannel.on('pointerover', () => {
                if (this._sceneStatus === SceneStatus.Normal) {
                    pannel.setFrame(1);
                    this._focusSound.play();
                    this._stageInfoText.text = pannel.getData('comment');
                }
            }, this);
            pannel.on('pointerout', () => {
                if (this._sceneStatus === SceneStatus.Normal) {
                    pannel.setFrame(0);
                    this._stageInfoText.text = '';
                }
            }, this);
            pannel.on('pointerup', () => {
                if (this._sceneStatus === SceneStatus.Normal) {
                    // 親のシーン遷移を呼び出す
                    this._sceneParameter.stage = pannel.getData('stage') as number;
                    this.playTransition(SceneKeys.GAMEPLAY);
                }
            }, this);
            this._stageGroup.add(pannel);
            // Stage Number
            const stageNo = this.add.text(x + 50, y + 50, this._stageDatas[index].stage + "", {fontSize: '40px', color: '#DFF6FF'}).setOrigin(0.5, 0.5);
            // stageNo.setStroke('#DFF6FF', 2);
            stageNo.setShadow(2, 2, '#06283D', 1, true, true);
        }
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

        this.add.image(this.scale.width/2, 40, ImageKeys.STATION_TOP).setOrigin(0.5, 0.5);
        this.add.image(this.scale.width/2, this.scale.height - 40, ImageKeys.STATION_BOTTOM).setOrigin(0.5, 0.5);

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
    }
}