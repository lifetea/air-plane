import { _decorator, Component, Node, v3, Contact2DType, Collider2D, IPhysics2DContact, director } from 'cc';
import { Enemy } from './Enemy';
import { Player } from './Player';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    speed:number = 10;

    global:Global = Global.getInstance()

    start() {
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        // let pos = this.node.getPosition()
        // console.log(pos)
        // this.node.setPosition(v3(10,100, 0))
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // console.log('onBeginContact', otherCollider);
        // if(otherCollider)
        //与敌机碰撞
        if(otherCollider.tag == 2){
            otherCollider.node.getComponent(Enemy).hit()
            this.recycle()
        }

    }

    recycle(){
        let player = this.node.parent.getChildByName('player')
        this.node.setPosition(v3(0,0,0))
        this.global.recycleBullet(this.node)
    }

    move() {
        let pos = this.node.position
        this.node.setPosition(v3(pos.x, pos.y+ this.speed))
        if(pos.y > 600){
            // console.log(pos)
            this.recycle()
        }
    }

    update(deltaTime: number) {
        this.move()
    }
}

