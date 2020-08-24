// only one in the game logic
import GameView from './view.js'
import GameModel from './model.js'


export default class GameController {

   
    constructor(props) {

        this.gameModel = new GameModel();
        this.gameView = new GameView();

        this.gameModel.stageChanged.attach((sender, args)=>{
            const stageName = args.stage;
            this.gameView.showPage(stageName);
        })
    }

    init() {
         const gamePageCallback = {
            showGameOverPage: this.gameView.showPage('gameOver'),
        }
        
        this.gameModel.setStage('game');
    }
}