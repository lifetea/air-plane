import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, AnimationClip, Animation, v3 } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property({type:Animation})
    animate_dei:Animation = null

    speed:number = 5;

    isDie = false

    global:Global = Global.getInstance()

    start() {
        // 注册单个碰撞体的回调函数
        // let collider = this.getComponent(Collider2D);
        // console.log(collider)
        // if (collider) {
        //     collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        // }
    }

    move() {
        let pos = this.node.position
        this.node.setPosition(v3(pos.x, pos.y - this.speed))
        if(pos.y < -600){
            this.die()
        }
    }


    die(){
        const animationComponent = this.node.getComponent(Animation);
        animationComponent.resume();
        this.isDie = false
        this.global.recycleEnemy(this.node)
        // this.node.setPosition(v3(0,0,0))
        // this.node.destroy()
    }

    hit(){
        if(this.isDie == false){
            const animationComponent = this.node.getComponent(Animation);
            animationComponent.play('enemy-die')
            this.isDie = true
        }

    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // console.log('onBeginContact', selfCollider);
        // this.node.destroy()
    }

    update(deltaTime: number) {
        this.move()
    }
}

