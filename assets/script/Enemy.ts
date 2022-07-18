import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, AnimationClip, 
    Animation, v3, AudioClip, AudioSource, resources } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property({type:Animation})
    animate_dei:Animation = null

    speed:number = 5;

    isDie = false

    @property
    public type:number = 0

    @property
    public MaxHP:number = 1

    private hp:number = 0

    animation:Animation = null;

    audio:AudioSource = null;

    global:Global = Global.getInstance()

    start() {
        // 注册单个碰撞体的回调函数
        // let collider = this.getComponent(Collider2D);
        // console.log(collider)
        // if (collider) {
        //     collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        // }
    }

    onLoad() {
        const that = this
        this.hp = this.MaxHP
        this.animation = this.node.getComponent(Animation)
        this.audio = this.node.getComponent(AudioSource)
    }

    move() {
        let pos = this.node.position
        if(this.global.isPuase == false){
            this.node.setPosition(v3(pos.x, pos.y - this.speed))
        }
        if(pos.y < -600){
            this.die()
        }
    }


    die(){
        this.animation.resume();

        if(this.isDie){
            this.audio.playOneShot(this.audio.clip, 0.6)
            switch(this.type){
                case 1:
                    this.global.score += 100
                    break
                case 2:
                    this.global.score += 1000
                    break
                case 3:
                    this.global.score += 2000
                    this.global.createProps(this.node.position)
                    break
            }
        }
        this.isDie = false
        this.global.recycleEnemy(this.node)

        // this.node.setPosition(v3(0,0,0))
        // this.node.destroy()
    }

    hit(){
        if(this.isDie == false){
            this.hp -= 1
            if(this.hp <= 0){
                switch(this.type){
                    case 1:
                        this.animation.play('enemy-die')
                        break
                    case 2:
                        this.animation.play('enemy2-die')
                        break
                    case 3:
                        this.animation.play('enemy3-die')
                        break
                }
                this.isDie = true
            } else {
                switch(this.type){
                    case 2:
                        this.animation.play('enemy2-hit')
                        break
                    case 3:
                        this.animation.play('enemy3-hit')
                        break
                }
            }
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

