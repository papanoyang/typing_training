import Phaser from "phaser";
import SceneKeys from "../constants/SceneKeys";
import SceneStatus from "../constants/SceneStatus";
import SoundKeys from "../constants/SoundKeys";
import ImageKeys from "../constants/ImageKeys";
import SceneParameter from "../interfaces/SceneParameter";
import GAME_RESULT from "../constants/GameResult";

export default class TypingHeroScene extends Phaser.Scene {
    // Scene Status
    protected _sceneStatus: SceneStatus = SceneStatus.Loading;
    // metal tile group
    protected _tileTimer!: Phaser.Time.TimerEvent;
    protected _metalTiles!: Phaser.GameObjects.Group;
    protected _tilesIndex!: number;
    protected _tileSound!: Phaser.Sound.BaseSound;
    // Focus Sound
    protected _focusSound!: Phaser.Sound.BaseSound;
    // Scene Parameter
    protected _sceneParameter: SceneParameter = {
        loading: true,
        gameResult: GAME_RESULT.None,
        stage: -1
    };

    constructor(scene: SceneKeys) {
        super({key: scene});
    }

    preCreate() {
        // Tile Sound
        this._tileSound = this.sound.add(SoundKeys.TileSound);
        this._focusSound = this.sound.add(SoundKeys.FocusSound);
        this._metalTiles = this.add.group();
    }

    playLoading() {
        // loading tile
        this.drawLoadingTile();
        this._tilesIndex = 0;
        this._tileTimer = this.time.addEvent({
            delay: 25,
            loop: true,
            callback: this.deleteTile,
            callbackScope: this,
        });
    }

    drawLoadingTile() {
        this._tilesIndex = 0;
        for (let i = 0; i < this.scale.height/100; i++) {
            for (let j = 0; j < this.scale.width/100; j++) {
                const tile = this.add.image(
                    j * 100,
                    i * 100,
                    ImageKeys.METALT_NORM
                ).setOrigin(0, 0);
                tile.setDataEnabled();
                tile.setData('index', this._tilesIndex);
                this._metalTiles.add(tile);
                this._tilesIndex++;
            }
        }
    }

    deleteTile() {
        if (this._tilesIndex >= 108) {
            this._tileTimer.remove();
            this._sceneStatus = SceneStatus.Normal
            return;
        }

        this._metalTiles.children.each(element => {
            const tile = element as Phaser.GameObjects.Image;
            const tileIndex = tile.getData('index') as number;
            if (tileIndex === this._tilesIndex) {
                tile.destroy();
                this._tileSound.play();
                return;
            }
        });
        this._tilesIndex++;
    }

    playTransition(scene: SceneKeys, stopScene: SceneKeys = SceneKeys.None) {
        this._sceneStatus = SceneStatus.Transition;
                this._tilesIndex = 0;
                this._tileTimer = this.time.addEvent({
                    delay: 25,
                loop: true,
                callback: this.drawTransitionTile,
                args: [scene, stopScene],
                callbackScope: this,
                });
    }

    drawTransitionTile(scene: SceneKeys, stopScene: SceneKeys) {
        if (this._tilesIndex === (12 * 9)) {
            this._sceneParameter.loading = true;
            if (stopScene != SceneKeys.None) {
                this.scene.stop(stopScene);
            }
            this.scene.start(scene, {parameter: this._sceneParameter});
            return;
        }
        const x = (this._tilesIndex % 12) * 100;
        const y = Math.floor(this._tilesIndex / 12) * 100;
        this.add.image(x, y, ImageKeys.METALT_NORM).setOrigin(0, 0);
        this._tileSound.play();
        this._tilesIndex++;
    }
}