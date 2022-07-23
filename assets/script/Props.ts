import { _decorator, Component, Node, v3 } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Props')
export class Props extends Component {
    
    private speed:number = 2

    global:Global = Global.getInstance();

    start() {

    }

    move() {
        let pos = this.node.position
        if(this.global.isPuase == false){
            this.node.setPosition(v3(pos.x, pos.y - this.speed))
        }
        if(pos.y < -600){
            this.recycle()
        }
    }

    recycle(){
        this.node.setPosition(v3(0,0,0))
        this.global.recycleProps(this.node)
    }


    update(deltaTime: number) {
        this.move()
    }
}

