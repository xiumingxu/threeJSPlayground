import Event from '../utils/event.js'


class GameModel {
    constructor(props) {
        this.stage = ''
        this.stageChanged = new Event(this);
    }
    getStage(){
        return this.stage;
    }
    setStage(stage){
        this.stage = stage;
        this.stageChanged.notify({
            stage: stage
        })
    }
}

export default GameModel;