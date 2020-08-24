export default class Event {
    constructor(sender){
        this._sendder = sender;
        this._listeners = [];
    }

    attach(cb){
        this._listeners.push(cb);
    }
    notify(args){
        for(const cb of this._listeners){
            cb(this._sendder, args)
        }
    }

}