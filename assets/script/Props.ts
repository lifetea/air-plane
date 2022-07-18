import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Props')
export class Props extends Component {
    start() {

    }

    move() {
        // let pos = this.node.position
        // if(this.global.isPuase == false){
        //     this.node.setPosition(v3(pos.x, pos.y - this.speed))
        // }
        // if(pos.y < -600){
        //     this.die()
        // }
    }

    update(deltaTime: number) {
        
    }
}

