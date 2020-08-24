import Page from "./page.js";

export default class GameOverPage extends Page{  
    constructor(callbacks){
        super();
        this.callbacks = callbacks;
        this.show = super.show.bind(this);
        this.hide = super.hide.bind(this);
    }
    init(){
        this.initGameOverCanvas();
    }

    initGameOverCanvas(){
        //a lot three js logic
        const ratio = window.innerHeight / window.innerWidth;
    }
}