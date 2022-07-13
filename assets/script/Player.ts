import { _decorator, Component, Node, input, Event, Input, EventTouch, v3, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    start() {

    }

    touchMove(event: EventTouch) {
        let pos = this.node.position
        let move = event.getDelta()
        console.log(move, pos)
        this.node.setPosition(v3(move.x+ pos.x, move.y + pos.y, 0))
    }

    onLoad(){
        input.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);
    }

    onDestroy(){
        input.off(Input.EventType.TOUCH_MOVE, this.touchMove, this);
    }

    update(deltaTime: number) {
        
    }
}

