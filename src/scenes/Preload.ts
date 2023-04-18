import Phaser from "phaser";
import SceneKeys from "../constants/SceneKeys";
import ImageKeys from "../constants/ImageKeys";
import AnimationKeys from "../constants/AnimationKeys";
import SoundKeys from "../constants/SoundKeys";

export default class PrelaodScene extends Phaser.Scene {
    // For loading screen
    progressBar!: Phaser.GameObjects.Graphics;
    progressBox!: Phaser.GameObjects.Graphics;
    progressText!: Phaser.GameObjects.Text;
    loadingText!: Phaser.GameObjects.Text;
    loadingMesseges = [
        'ロケット搭乗中', // 0
        'ロケット発射カウントダウン - 5', // 1
        'ロケット発射カウントダウン - 4', // 2
        'ロケット発射カウントダウン - 3', // 3
        'ロケット発射カウントダウン - 2', // 4
        'ロケット発射カウントダウン - 1', // 5
        'ロケット発射!', // 6
        '大気圏を抜けました', // 7
        '宇宙ステーションにドッキング中', // 8
        '宇宙ステーションに到着しました' // 9
    ];

    constructor() {
        super({key:SceneKeys.PRELOAD});
    }

    preload () {
        // Load Game Data
        this.load.json('gamedata', 'data/game-data.json');

        // Background Image
        this.load.image(ImageKeys.BACKGROUND, 'assets/images/background-image.png');
        this.load.image(ImageKeys.BACKGROUND2, 'assets/images/background-image2.png');
        // Start Button Image
        this.load.spritesheet(ImageKeys.START_BTN, 'assets/sprites/start_btn.png', {frameWidth: 300, frameHeight: 80});
        // usate Button image
        this.load.image(ImageKeys.USAGE_BTN_ON, 'assets/images/usage_btn_on.png');
        this.load.image(ImageKeys.USAGE_BTN_OFF, 'assets/images/usage_btn_off.png');
        // about button image
        this.load.image(ImageKeys.ABOUT_BTN_ON, 'assets/images/about_btn_on.png');
        this.load.image(ImageKeys.ABOUT_BTN_OFF, 'assets/images/about_btn_off.png');
        // Back Button Image
        this.load.image(ImageKeys.BACK_BTN_ON, 'assets/images/back_btn_on.png');
        this.load.image(ImageKeys.BACK_BTN_OFF, 'assets/images/back_btn_off.png');
        // Tiles Image
        this.load.image(ImageKeys.GLASST, 'assets/images/glass_tile.png');
        this.load.image(ImageKeys.METALT_TOP, 'assets/images/metal_tile_top.png');
        this.load.image(ImageKeys.METALT_BOTTOM, 'assets/images/metal_tile_bottom.png');
        this.load.image(ImageKeys.METALT_LEFT, 'assets/images/metal_tile_left.png');
        this.load.image(ImageKeys.METALT_RIGHT, 'assets/images/metal_tile_right.png');
        this.load.image(ImageKeys.METALT_LT, 'assets/images/metal_tile_lt.png');
        this.load.image(ImageKeys.METALT_RT, 'assets/images/metal_tile_rt.png');
        this.load.image(ImageKeys.METALT_LB, 'assets/images/metal_tile_lb.png');
        this.load.image(ImageKeys.METALT_RB, 'assets/images/metal_tile_rb.png');
        this.load.image(ImageKeys.BLUET, 'assets/images/blue_tile.png');
        this.load.image(ImageKeys.METALT_NORM, 'assets/images/metal_tile.png');
        // Station Pannel
        this.load.image(ImageKeys.STATION_TOP, 'assets/images/station_pannel_top.png');
        this.load.image(ImageKeys.STATION_BOTTOM, 'assets/images/station_pannel_bottom.png');
        this.load.spritesheet(ImageKeys.STAGE_PANNEL, 'assets/sprites/stage_pannel.png', {frameWidth: 100, frameHeight: 100});
        // Game pad and glass pannel
        this.load.image(ImageKeys.GLASS_PANNEL, 'assets/images/glass_pannel.png');
        this.load.image(ImageKeys.GAME_PAD, 'assets/images/game_pad.png');

        // Tile Sound
        this.load.audio(SoundKeys.TileSound, 'assets/sounds/tile.mp3');
        this.load.audio(SoundKeys.FocusSound, 'assets/sounds/focus.mp3');
        this.load.audio(SoundKeys.ExplosionSound, 'assets/sounds/explosion.mp3');
        this.load.audio(SoundKeys.GameoverSound, 'assets/sounds/gameover.mp3');
        this.load.audio(SoundKeys.GameClearSound, 'assets/sounds/gameclear.mp3');
        this.load.audio(SoundKeys.fireSound, 'assets/sounds/fire.mp3');

        // Sprite Image for Title
        this.load.image(ImageKeys.TITLE01, 'assets/images/title/title01.png');
        this.load.image(ImageKeys.TITLE02, 'assets/images/title/title02.png');
        this.load.image(ImageKeys.TITLE03, 'assets/images/title/title03.png');
        this.load.image(ImageKeys.TITLE04, 'assets/images/title/title04.png');
        this.load.image(ImageKeys.TITLE05, 'assets/images/title/title05.png');
        this.load.image(ImageKeys.TITLE06, 'assets/images/title/title06.png');
        this.load.image(ImageKeys.TITLE07, 'assets/images/title/title07.png');
        this.load.image(ImageKeys.TITLE08, 'assets/images/title/title08.png');
        this.load.image(ImageKeys.TITLE09, 'assets/images/title/title09.png');
        this.load.image(ImageKeys.TITLE10, 'assets/images/title/title10.png');
        this.load.image(ImageKeys.TITLE11, 'assets/images/title/title11.png');
        this.load.image(ImageKeys.TITLE12, 'assets/images/title/title12.png');
        this.load.image(ImageKeys.TITLE13, 'assets/images/title/title13.png');
        this.load.image(ImageKeys.TITLE14, 'assets/images/title/title14.png');
        this.load.image(ImageKeys.TITLE15, 'assets/images/title/title15.png');
        this.load.image(ImageKeys.TITLE16, 'assets/images/title/title16.png');
        this.load.image(ImageKeys.TITLE17, 'assets/images/title/title17.png');
        this.load.image(ImageKeys.TITLE18, 'assets/images/title/title18.png');
        this.load.image(ImageKeys.TITLE19, 'assets/images/title/title19.png');
        this.load.image(ImageKeys.TITLE20, 'assets/images/title/title20.png');
        this.load.image(ImageKeys.TITLE21, 'assets/images/title/title21.png');
        this.load.image(ImageKeys.TITLE22, 'assets/images/title/title22.png');
        this.load.image(ImageKeys.TITLE23, 'assets/images/title/title23.png');
        this.load.image(ImageKeys.TITLE24, 'assets/images/title/title24.png');
        this.load.image(ImageKeys.TITLE25, 'assets/images/title/title25.png');
        this.load.image(ImageKeys.TITLE26, 'assets/images/title/title26.png');
        // InputEdge
        this.load.image(ImageKeys.INPUT_EDGE1, 'assets/images/input_edge1.png');
        this.load.image(ImageKeys.INPUT_EDGE2, 'assets/images/input_edge2.png');
        // Bar
        this.load.image(ImageKeys.BAR_SHADOW_LEFT, 'assets/images/barHorizontal_shadow_left.png');
        this.load.image(ImageKeys.BAR_SHADOW_MID, 'assets/images/barHorizontal_shadow_mid.png');
        this.load.image(ImageKeys.BAR_SHADOW_RIGHT, 'assets/images/barHorizontal_shadow_right.png');
        this.load.image(ImageKeys.BAR_SCORE_LEFT, 'assets/images/barHorizontal_green_left.png');
        this.load.image(ImageKeys.BAR_SCORE_MID, 'assets/images/barHorizontal_green_mid.png');
        this.load.image(ImageKeys.BAR_SCORE_RIGHT, 'assets/images/barHorizontal_green_right.png');
        this.load.image(ImageKeys.BAR_HEAL_LEFT, 'assets/images/barHorizontal_red_left.png');
        this.load.image(ImageKeys.BAR_HEAL_MID, 'assets/images/barHorizontal_red_mid.png');
        this.load.image(ImageKeys.BAR_HEAL_RIGHT, 'assets/images/barHorizontal_red_right.png');
        // Game Icon
        this.load.image(ImageKeys.ICON_HEART, 'assets/images/heart.png');
        this.load.image(ImageKeys.ICON_SCUL, 'assets/images/dokuro.png');
        // Game Button
        this.load.image(ImageKeys.BUTTON_MUTE_OFF, 'assets/images/mute_btn_off.png');
        this.load.image(ImageKeys.BUTTON_MUTE_ON, 'assets/images/mute_btn_on.png');
        this.load.image(ImageKeys.BUTTON_SOUND_OFF, 'assets/images/sound_btn_off.png');
        this.load.image(ImageKeys.BUTTON_SOUND_ON, 'assets/images/sound_btn_on.png');
        this.load.image(ImageKeys.BUTTON_PUASE_OFF, 'assets/images/pause_btn_off.png');
        this.load.image(ImageKeys.BUTTON_PUASE_ON, 'assets/images/pause_btn_on.png');
        // Explosion Sprite
        this.load.spritesheet(ImageKeys.EXPLOSION, 'assets/sprites/explosion.png', {
            frameWidth: 64,
            frameHeight: 64,
            endFrame: 23
        });
        this.load.spritesheet(ImageKeys.EXPLOSION2, 'assets/sprites/boom32wh12.png', {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 10
        });
        // Pause Menu
        this.load.image(ImageKeys.PAUSE_MENU, 'assets/images/pauseMenu.png');

        // For loading screen
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(this.scale.width/2-160, this.scale.height/2-25, 320, 50);
        this.progressText = this.make.text({
            x: this.scale.width/2,
            y: this.scale.height/2,
            text: '0%',
            style: {
                fontFamily: 'monoscape',
                fontSize: '20px',
                color: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);
        this.loadingText = this.make.text({
            x: this.scale.width/2,
            y: this.scale.height/2 - 40,
            text: '',
            style: {
                fontSize: '20px',
                color: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);
        this.load.on('progress', (e: any) => {
            const percent = e as number;
            this.progressBar.clear();
            this.progressBar.fillStyle(0xffffff, 1);
            this.progressBar.fillRect(this.scale.width/2 -155, this.scale.height/2 - 20, 310 * percent, 40);
            this.progressText.setText(Math.round(100 * percent) + '%');
            this.loadingText.setText(this.loadingMesseges[Math.round(percent * 10)]);
        }, this);
        this.load.on('complete', (_: any) => {
            this.progressBar.destroy();
            this.progressBox.destroy();
            this.progressText.destroy();
            this.loadingText.destroy();
        }, this);
    }

    create() {

        // animation for title
        this.anims.create({
            key: AnimationKeys.TITLE_ANI,
            frames: [
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE02},
                {key: ImageKeys.TITLE03}, {key: ImageKeys.TITLE04}, {key: ImageKeys.TITLE05},
                {key: ImageKeys.TITLE06}, {key: ImageKeys.TITLE07}, {key: ImageKeys.TITLE08},
                {key: ImageKeys.TITLE09}, {key: ImageKeys.TITLE10}, {key: ImageKeys.TITLE11},
                {key: ImageKeys.TITLE12}, {key: ImageKeys.TITLE13}, {key: ImageKeys.TITLE14},
                {key: ImageKeys.TITLE15}, {key: ImageKeys.TITLE16}, {key: ImageKeys.TITLE17},
                {key: ImageKeys.TITLE18}, {key: ImageKeys.TITLE19}, {key: ImageKeys.TITLE20},
                {key: ImageKeys.TITLE21}, {key: ImageKeys.TITLE22}, {key: ImageKeys.TITLE23},
                {key: ImageKeys.TITLE24}, {key: ImageKeys.TITLE25}, {key: ImageKeys.TITLE26},
                
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
                {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01}, {key: ImageKeys.TITLE01},
            ],
            frameRate: 40,
            repeat: -1,
        });

        // Input Edge Animation
        this.anims.create({
            key: AnimationKeys.INPUT_EDGE_ANI,
            frames: [
                {key: ImageKeys.INPUT_EDGE1}, {key: ImageKeys.INPUT_EDGE2},
            ],
            frameRate: 2,
            repeat: -1,
        });

        // Explode Animation
        this.anims.create({
            key: AnimationKeys.EXPLODE_ANI,
            frames: ImageKeys.EXPLOSION,
            frameRate: 25,
            repeat: 0
        });
        this.anims.create({
            key: AnimationKeys.EXPLODE_FIRE_ANI,
            frames: ImageKeys.EXPLOSION2,
            frameRate: 20,
            repeat: 0
        });
        // start title scene
        this.scene.start(SceneKeys.TITLE);
    }
}