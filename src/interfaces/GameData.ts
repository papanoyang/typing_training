import EnemyData from "./EnemyData";
import StageData from "./StageData";

interface GameData {
    stage_data: StageData[];
    enemy_data: EnemyData[];
};
export default GameData;