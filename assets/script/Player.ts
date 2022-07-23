import { _decorator, Component, Node, input, Event, Input, EventTouch, v3, UITransform, Prefab, instantiate, director,
     Contact2DType, Collider2D, AnimationClip, NodePool, Pool, IPhysics2DContact, Animation, AudioSource, screen, Vec2,
      Size, Canvas } from 'cc';
import { Bullet } from './Bullet';
import { Global } from './Global';
import { Game } from './Game';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property({type: Prefab})
    bulletPre:Prefab

    global:Global = Global.getInstance();

    isDie: boolean = false;

    @property({type:Node})
    ganmeNode:Node=null;

    maxLevel:number= 3;

    level:number = 1;

    animation: Animation = null;

    audio: AudioSource = null;

    // 设备实际尺寸
    private winSzie:Size = null
    
    // 设备实际尺寸
    private canvasSzie:Size = null
    
    // palyer 尺寸
    private playerSzie:Size = null

    start() {

    }

    init(){
        this.node.setPosition(v3(0,-320,0))
        this.animation.play('plant-normal');
        this.isDie = false;
    }

    touchMove(event: EventTouch) {
        let pos = this.node.position
        let move = event.getDelta()
        let winWidth = this.winSzie.width
        // console.log(pos, move, this.canvasSzie, this.playerSzie)
        // 防止左边溢出
        if(pos.x + move.x > this.canvasSzie.width/2 - this.playerSzie.width/2)
            return
        // 防止右边溢出
        if(pos.x + move.x < -(this.canvasSzie.width/2 - this.playerSzie.width/2))
            return
        // 防止上边溢出
        if(pos.y + move.y > this.canvasSzie.height/2 - this.playerSzie.height/2)
            return
        // 防止下边溢出
        if(pos.y + move.y < -(this.canvasSzie.height/2 - this.playerSzie.height/2))
            return

        // 暂停是不移动        
        if(this.global.isPuase == true)
            return
        this.node.setPosition(v3(move.x+ pos.x, move.y + pos.y, 0))
    }

    // 发射子弹
    shoot(){
        // 游戏暂停时不发射子弹
        if(this.global.isPuase == true || this.global.isGameOver == true)
            return
        
        let bulletList = []
        let bullet1:Node=null, bullet2:Node=null, bullet3:Node=null
        let x1:number=0, x2:number=0, x3:number=0
        let pos = this.node.position
        let parent = this.node.parent
        switch(this.level){
            case 1:
                bullet1 = this.global.createBullet(this.bulletPre)
                bulletList.push({bullet:bullet1, x:pos.x})
                break
            case 2:
                bullet1 = this.global.createBullet(this.bulletPre)
                bulletList.push({bullet:bullet1, x:pos.x - 20})
                bullet2 = this.global.createBullet(this.bulletPre)
                bulletList.push({bullet:bullet2, x:pos.x + 20})
                break   
            case 3:
                bullet1 = this.global.createBullet(this.bulletPre)
                bulletList.push({bullet:bullet1, x:pos.x})
                bullet2 = this.global.createBullet(this.bulletPre)
                bulletList.push({bullet:bullet2, x:pos.x - 20})
                bullet3 = this.global.createBullet(this.bulletPre)
                bulletList.push({bullet:bullet3, x:pos.x + 20})
                break
        }
        bulletList.forEach(function(item){
            parent.insertChild(item.bullet, 0)
            item.bullet.setPosition(item.x, pos.y + 80)

        })
    }

    onLoad(){
        const that = this
        this.audio = this.node.getComponent(AudioSource)
        this.animation = this.node.getComponent(Animation);

        this.winSzie = screen.windowSize
        this.playerSzie = this.node.getComponent(UITransform).contentSize

        let canvas = director.getScene().getChildByName('Canvas')
        this.canvasSzie = new Size( canvas.width, canvas.height)

        // 定时射击
        this.schedule(function(){
            that.shoot()
        }, 0.10)

        //注册Touch事件
        input.on(Input.EventType.TOUCH_MOVE, this.touchMove, this);

        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        // console.log(collider)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // console.log('onBeginContact');
        //与敌机碰撞
        if(otherCollider.tag == 2){
            this.hit()
            this.global.isGameOver = true
            this.ganmeNode.getComponent(Game).gameOver()
        }
        //与敌机碰撞
        if(otherCollider.tag == 3){
            this.global.recycleProps(otherCollider.node)
            if(this.level < this.maxLevel){
                this.level++
            }
            // this.hit()
            // this.global.isGameOver = true
            // this.ganmeNode.getComponent(Game).gameOver()
        }
    }

    hit(){
        if(this.isDie == false){
            this.animation.play('plane-die')
            this.isDie = true
        }
    }

    die(){
        this.animation.resume();
        this.audio.playOneShot(this.audio.clip, 0.6)
        this.node.setPosition(v3(0,1000,0))
        this.isDie = false
    }

    onDestroy(){
        input.off(Input.EventType.TOUCH_MOVE, this.touchMove, this);
    }

    update(deltaTime: number) {
        
    }
}

