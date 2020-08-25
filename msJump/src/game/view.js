import GamePage from '../pages/gamePage.js';
import GameOverPage from '../pages/gameOverPage.js';

export default class GameView {

    constructor(props) {
        this.initPages();
    }

    initPages() {

        const gamePage = this.gamePage = new GamePage();
        const gameoverPage = this.gameoverPage = new GameOverPage();
        
        this.pages = {
            gamePage,
            gameoverPage
        }
        gamePage.init()
    }

    showGamePage(){


    }

    showPage(pageName){
        for(const k in this.pages){
            const page = this.pages[k];
            this.pages[k].hide();
        }

        if(pageName.includes('gameOver'))
            this.gameoverPage.show();
        else 
            this.gamePage.show();
    }

    restart(){

    }

    
}