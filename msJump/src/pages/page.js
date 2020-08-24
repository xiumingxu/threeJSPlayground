
export default class Page{
     constructor(){
     }
     show(){
        console.log("show", this.constructor.name);
     }
     hide(){
        console.log("hide", this.constructor.name);
     }
}