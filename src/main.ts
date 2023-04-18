import Phaser from "phaser";
import PrelaodScene from "./scenes/Preload";
import TitleScene from "./scenes/Title";
import AboutScene from "./scenes/About";
import UsageScene from "./scenes/Usage";
import StationScene from "./scenes/Station";
import GamePlayScene from "./scenes/GamePlay";
import PauseScene from "./scenes/Pause";
import GameOverScene from "./scenes/GameOver";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1200,
  height: 900,
  parent: 'app',
  backgroundColor: '#03001C',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 200},
      debug: false,
    },
  },
  scene: [PrelaodScene, TitleScene, AboutScene, UsageScene, StationScene, GamePlayScene, PauseScene, GameOverScene],
};

new Phaser.Game(config);