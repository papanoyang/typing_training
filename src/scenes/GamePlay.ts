import InputTextPlugin from "phaser3-rex-plugins//plugins/inputtext"
import ImageKeys from "../constants/ImageKeys";
import SceneKeys from "../constants/SceneKeys";
import TypingHeroScene from "./THScene";
import AnimationKeys from "../constants/AnimationKeys";
import SceneParameter from "../interfaces/SceneParameter";
import GameData from "../interfaces/GameData";
import StageData from "../interfaces/StageData";
import SceneStatus from "../constants/SceneStatus";
import SoundKeys from "../constants/SoundKeys";
import GAME_RESULT from "../constants/GameResult";

export default class GamePlayScene extends TypingHeroScene {
    // Bar
    private _barX1      = 150;
    private _barX2      = 840;
    private _barY       = 800;
    private _barWidth   = 200;
    private _scoreBarMid!: Phaser.GameObjects.Image;
    private _scoreBarRight!: Phaser.GameObjects.Image;
    private _healBarLeft!: Phaser.GameObjects.Image;
    private _healBarMid!: Phaser.GameObjects.Image;
    private _scoreText!: Phaser.GameObjects.Text;
    private _healText!: Phaser.GameObjects.Text;
    private _healPoint = 10;
    // inputtext
    private _inputText!: InputTextPlugin;
    // Stage & Enemy Data
    private _stageInfo!: StageData;
    private _enemyData!: string[];
    // Sound On/Off
    private _isSoundOn = true;
    // 落ちる速度
    private _enemySpeed!: number;
    // 文字グループとゲームパッド
    private _enemies!: Phaser.Physics.Arcade.Group;
    private _pannel!: Phaser.Physics.Arcade.Image;
    // カウントダウン
    private _countDownText!: Phaser.GameObjects.Text;
    private _countDownTime!: number;
    private _countDownTimer!: Phaser.Time.TimerEvent;

    // 諸制御のため、updateメソッドの中で１回のみ処理するように制御するため
    private _isProcessing = false;
    // 爆発音
    private _explodeSound!: Phaser.Sound.BaseSound;
    // ゲームオーバー音
    private _gameoverSound!: Phaser.Sound.BaseSound;
    // ゲームクリア音
    private _gameClearSound!: Phaser.Sound.BaseSound;
    // 命中
    private _fireSound!: Phaser.Sound.BaseSound;

    // 入力（発射）された単語
    private _fireWord!: string;
    // スコア
    private _score: number = 0;

    // 敵数を表示するテキスト
    private _enemyCount!: Phaser.GameObjects.Text;

    constructor() {
        super(SceneKeys.GAMEPLAY);
    }

    create(data: {parameter: SceneParameter}) {
        // ゲームデータ
        const gameData = this.cache.json.get('gamedata') as GameData;
        // 該当ステージ情報を取得
        this._stageInfo = gameData.stage_data.find(el => el.stage === data.parameter.stage)!;
        // 文字情報取得
        const enemyDatas = gameData.enemy_data;
        this._enemyData = [];
        for (let i=0; i< this._stageInfo.leveldata.length; i++) {
            const enemyIndex = this._stageInfo.leveldata[i]
            const enemies = enemyDatas[enemyIndex];
            if (this._enemyData.length != 0) {
                this._enemyData.concat(enemies.data); 
            } else {
                this._enemyData = enemies.data;
            }
        }
        // ピクセルと秒をパラメーターでピクセルを秒かかる速度を求める
        this._enemySpeed = Phaser.Math.GetSpeed(720, this._stageInfo.speed);
        // 敵のグループ
        this._enemies = this.physics.add.group();
        // 爆発音
        this._explodeSound = this.sound.add(SoundKeys.ExplosionSound);
        // ゲームオーバー音
        this._gameoverSound = this.sound.add(SoundKeys.GameoverSound);
        // ゲームクリア音
        this._gameClearSound = this.sound.add(SoundKeys.GameClearSound);
        // 命中音
        this._fireSound = this.sound.add(SoundKeys.fireSound);

        // 点数初期化
        this._score = 0;
        this._healPoint = 10;

        // 親の事前処理を呼び出す
        this.preCreate();

        // Background Image
        this.add.image(0, 0, ImageKeys.BACKGROUND2).setOrigin(0, 0);
        // Draw Game Pad
        this.drawGamePad();

        // 敵数表示用
        this._enemyCount = this.add.text(20, 20,
            '', {fontSize: '25px', color: '#E21818'}
        ).setOrigin(0, 0);
        this._enemyCount.setShadow(2, 2, '#FFDD83', 2, true, true);

        // ローディングを回す
        this.playLoading();

        // ゲームをつづける
        this.events.on('resume', () => {
            this._inputText.visible = true;
            this.physics.resume();
        }, this);
    }
    update(_: number, delta: number): void {
        if (this._sceneStatus === SceneStatus.Normal) {
            // ローディングが終わったらこの状態
            if (!this._isProcessing) {
                this._inputText.visible = true;
                // ゲーム開始のためのカウントダウン
                this._countDownTime = 3;
                this._countDownText = this.add.text(
                    this.scale.width/2, this.scale.height/2 - 200,
                    `${this._countDownTime}`,
                    {
                        fontFamily: 'DotGothic16',
                        fontSize: '100px',
                        color: '#DFF6FF'
                    }
                ).setOrigin(0.5, 0.5);
                this._countDownText.setShadow(2, 2, '#1363DF', 2, true, true);
                this._countDownTimer = this.time.addEvent({
                    delay: 1000,
                    callback: this.countDown,
                    callbackScope: this,
                    loop: true
                });
                this._isProcessing = true;
            }
        } else if (this._sceneStatus === SceneStatus.Ready) {
            if (!this._isProcessing) {
                // 敵生成を始める
                this.time.addEvent({
                    delay: this._stageInfo.spawnSpeed,
                    loop: true,
                    callback: this.spawnEnemy,
                    callbackScope: this
                });
                // 隠し
                if (this._stageInfo.hidden) {
                    this.time.addEvent({
                        delay: 200,
                        loop: true,
                        callback: this.hiddenEnemy,
                        callbackScope: this,
                    });
                }
                this._inputText.setFocus();
                this._sceneStatus = SceneStatus.Playing;
            }
            
        } else if (this._sceneStatus === SceneStatus.Playing) {
            // 敵を動かす
            this._enemies.children.each(child => {
                const enemy = child as Phaser.GameObjects.Text;
                enemy.y += this._enemySpeed * delta;
                // 回転あり？
                if (this._stageInfo.rotation) {
                    enemy.rotation += 0.01;
                }

                // 命中か
                if (enemy.text === this._fireWord) {
                    const explode = this.add.sprite(
                        enemy.x, enemy.y, 
                        ImageKeys.EXPLOSION2
                    ).play(AnimationKeys.EXPLODE_FIRE_ANI);
                    explode.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                        explode.destroy();
                    }, this);
                    this._fireSound.play();
                    this._score++;
                    this.drawScoreBar();
                    enemy.destroy();
                    this._fireWord = '';
                }
            });

            if (this._score >= this._stageInfo.clear_score) {
                this._gameClearSound.play();
                this.physics.pause();
                this._inputText.visible = false;
                // 次のシーンへのパラメータ
                this._sceneParameter.gameResult = GAME_RESULT.Clear;
                this._sceneParameter.stage = this._stageInfo.stage;
                this.playTransition(SceneKeys.GAMEOVER);
            }
            this.displayEnemyCount();
        }
    }

    displayEnemyCount() {
        const count = this._enemies.getLength();
        this._enemyCount.setText(`てきすう：${count}`);
    }

    // 敵を生成する
    spawnEnemy() {
        // データの中で任意の一つ
        const enemyIndex = Phaser.Math.Between(0, this._enemyData.length-1);
        const enemyText = this.add.text(
            0, -30, this._enemyData[enemyIndex],
            {
                fontFamily: 'DotGothic16',
                fontSize: '30px',
                color: '#DFF6FF'
            }
        ).setOrigin(0.5, 0.5);
        // 任意のX座標
        const x = Phaser.Math.Between(enemyText.width/2, this.scale.width-(enemyText.width/2));
        enemyText.x = x;
        enemyText.setDataEnabled();
        enemyText.setData('onHidden', false);

        // 下に落ちたら爆発
        this.physics.add.collider(enemyText, this._pannel, (item, _: any) => {
            const e = item as Phaser.GameObjects.Text;
            if (this._isSoundOn) {
                this._explodeSound.play();
            }
            const explode = this.add.sprite(e.x, e.y, ImageKeys.EXPLOSION).play(AnimationKeys.EXPLODE_ANI);
            explode.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                explode.destroy();
            }, this);
            e.destroy();
            this._healPoint--;
            this.drawHealBar();
            if (this._healPoint <= 0) {
                // ゲームオーバー、何か効果をつけたい
                this.physics.pause();
                this._inputText.visible = false;
                this._gameoverSound.play();
                // 次のシーンへのパラメータ
                this._sceneParameter.gameResult = GAME_RESULT.GameOver;
                this._sceneParameter.stage = this._stageInfo.stage;
                this.playTransition(SceneKeys.GAMEOVER);
            }
        }, undefined, this);
        this._enemies.add(enemyText);
    }

    drawHealBar() {
        const percent = this._healPoint / 10;

        this._healBarMid.displayWidth = this._barWidth * percent;
        this._healBarLeft.x = this._healBarMid.x - this._healBarMid.displayWidth;
        this._healText.setText(`${this._healPoint}/10`);
    }

    drawScoreBar() {
        const percent = this._score / this._stageInfo.clear_score;
        this._scoreBarMid.displayWidth = this._barWidth * percent;
        this._scoreBarRight.x = this._scoreBarMid.x + this._scoreBarMid.displayWidth;
        this._scoreText.setText(`${this._score}/${this._stageInfo.clear_score}`)
    }

    hiddenEnemy() {
        this._enemies.children.each(child => {
            const enemy = child as Phaser.GameObjects.Text;
            const hiddenStatus = enemy.getData('onHidden') as boolean;
            if (hiddenStatus) {
                enemy.setBackgroundColor('');
                enemy.setData('onHidden', false);
            } else {
                enemy.setBackgroundColor('#DFF6FF')
                enemy.setData('onHidden', true);
            }
        })
    }

    drawGamePad() {
        this.add.image(0, 700, ImageKeys.GLASS_PANNEL).setOrigin(0, 0);
        this._pannel = this.physics.add.staticImage(0, 720, ImageKeys.GAME_PAD).setOrigin(0, 0);
        this._pannel.setOffset(600, 90);

        // Input Edge Animation
        this.add.sprite(
            this.scale.width/2, 
            this.scale.height - 65, 
            ImageKeys.INPUT_EDGE1
        ).play(AnimationKeys.INPUT_EDGE_ANI);

        const rexInput = new InputTextPlugin(
            this, this.scale.width/2 -3, 
            this.scale.height-67, 
            400, 
            56,
            {
                type: 'text',
                id: 'typingHero-TextInput',
                align: 'center',
                fontSize: '30px',
                color: '#000000',
                border: 1,
                borderColor: '#47B5FF',
                backgroundColor: '#ffffff',
            }
        );
        this._inputText = this.add.existing(rexInput);
        this._inputText.on('keyup', (_: any, e: KeyboardEvent) => {
            if (e.key === 'Enter' && !e.isComposing) {
                this._fireWord = this._inputText.text;
                this._inputText.text = '';
                this._inputText.setFocus();
            }
        }, this);
        this._inputText.visible = false;

        this.drawShadowBar();
        this.drawButton();
    }

    drawButton() {
        const pauseButton = this.add.sprite(
            1100, 830,
            ImageKeys.BUTTON_PUASE_OFF
        ).setOrigin(0.5, 0.5).setInteractive();
        pauseButton.on('pointerover', () => {
            if (this._sceneStatus === SceneStatus.Playing) {
                pauseButton.setTexture(ImageKeys.BUTTON_PUASE_ON);
            }
        }, this);
        pauseButton.on('pointerout', () => {
            if (this._sceneStatus === SceneStatus.Playing) {
                pauseButton.setTexture(ImageKeys.BUTTON_PUASE_OFF);
            }
        }, this);
        pauseButton.on('pointerup', () => {
            if (this._sceneStatus === SceneStatus.Playing) {
                this._inputText.visible = false;
                this.physics.pause();
                this.scene.pause();
                this.scene.launch(SceneKeys.PAUSE);
            }
        }, this);

        const soundButton = this.add.sprite(
            100, 830,
            this._isSoundOn ? ImageKeys.BUTTON_SOUND_OFF : ImageKeys.BUTTON_MUTE_OFF
        ).setOrigin(0.5, 0.5).setInteractive();
        soundButton.on('pointerover', () => {
            if (this._sceneStatus === SceneStatus.Playing) {
                soundButton.setTexture(this._isSoundOn ? ImageKeys.BUTTON_SOUND_ON : ImageKeys.BUTTON_MUTE_ON);
            }
        }, this);
        soundButton.on('pointerout', () => {
            if (this._sceneStatus === SceneStatus.Playing) {
                soundButton.setTexture(this._isSoundOn ? ImageKeys.BUTTON_SOUND_OFF : ImageKeys.BUTTON_MUTE_OFF);
            }
        }, this);
        soundButton.on('pointerup', () => {
            if (this._sceneStatus === SceneStatus.Playing) {
                if (this._isSoundOn) {
                    soundButton.setTexture(ImageKeys.BUTTON_MUTE_OFF);
                    this._isSoundOn = false;
                } else {
                    soundButton.setTexture(ImageKeys.BUTTON_SOUND_OFF);
                    this._isSoundOn = true;
                }
            }
        }, this);
    }

    drawShadowBar() {
        // Score Bar Shadow
        const shadowBar1Left = this.add.image(
            this._barX1, this._barY, 
            ImageKeys.BAR_SHADOW_LEFT
        ).setOrigin(0, 0.5);
        const shadowBar1Mid = this.add.image(
            shadowBar1Left.x + shadowBar1Left.width, this._barY,
            ImageKeys.BAR_SHADOW_MID
        ).setOrigin(0, 0.5);
        shadowBar1Mid.displayWidth = this._barWidth;
        this.add.image(
            shadowBar1Mid.x + shadowBar1Mid.displayWidth, this._barY, 
            ImageKeys.BAR_SHADOW_RIGHT
        ).setOrigin(0, 0.5);
        // Score Bar
        const scoreBarLeft = this.add.image(
            this._barX1+1, this._barY,
            ImageKeys.BAR_SCORE_LEFT
        ).setOrigin(0, 0.5);
        this._scoreBarMid = this.add.image(
            scoreBarLeft.x + scoreBarLeft.width, this._barY,
            ImageKeys.BAR_SCORE_MID
        ).setOrigin(0, 0.5);
        this._scoreBarMid.displayWidth = this._barWidth;
        this._scoreBarRight = this.add.image(
            this._scoreBarMid.x + this._scoreBarMid.displayWidth, this._barY,
            ImageKeys.BAR_SCORE_RIGHT
        );

        // Heal Bar Shadow
        const shadowBar2Left = this.add.image(this._barX2, this._barY, 
            ImageKeys.BAR_SHADOW_LEFT
        ).setOrigin(0, 0.5);
        const shadowBar2Mid = this.add.image(
            shadowBar2Left.x + shadowBar2Left.width, this._barY,
            ImageKeys.BAR_SHADOW_MID
        ).setOrigin(0, 0.5);
        shadowBar2Mid.displayWidth = this._barWidth;
        this.add.image(
            shadowBar2Mid.x + shadowBar2Mid.displayWidth, this._barY, 
            ImageKeys.BAR_SHADOW_RIGHT
        ).setOrigin(0, 0.5);
        // Heal Bar
        const x = this._barX2 + 200 + 11;
        const healBarRight = this.add.image(
            x, this._barY,
            ImageKeys.BAR_HEAL_RIGHT
        ).setOrigin(1, 0.5);
        this._healBarMid = this.add.image(
            healBarRight.x - healBarRight.width, this._barY,
            ImageKeys.BAR_HEAL_MID
        ).setOrigin(1, 0.5);
        this._healBarMid.displayWidth = this._barWidth;
        this._healBarLeft = this.add.image(
            this._healBarMid.x - this._healBarMid.displayWidth, this._barY,
            ImageKeys.BAR_HEAL_LEFT
        ).setOrigin(1, 0.5);

        const iconScul = this.add.image(this._barX1 + 30, this._barY + 50, ImageKeys.ICON_SCUL).setOrigin(0.5, 0.5).setScale(0.8);
        const iconHeart = this.add.image(this._barX2 + 30, this._barY + 50, ImageKeys.ICON_HEART).setOrigin(0.5, 0.5).setScale(0.7);
        this._scoreText = this.add.text(
            iconScul.x + 100, this._barY + 50,
            '000/000',
            {
                fontSize: '30px',
                color: '#06283D'
            }
        ).setOrigin(0.5, 0.5);
        this._healText = this.add.text(
            iconHeart.x + 100, this._barY + 50,
            '00/00',
            {
                fontSize: '30px',
                color: '#06283D'
            }
        ).setOrigin(0.5, 0.5);
        this.drawHealBar();
        this.drawScoreBar();
    }

    countDown() {
        this._countDownTime--;
        this._countDownText.setText(`${this._countDownTime}`);
        if (this._countDownTime <= 0) {
            this._countDownText.destroy();
            this._countDownTimer.remove();
            this._sceneStatus = SceneStatus.Ready;
            this._isProcessing = false;
        }
    }
}