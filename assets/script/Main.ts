import { _decorator, Component, Node, v3, UITransform, director, Director, PhysicsSystem2D, Contact2DType, Prefab } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    bg1:Node;
    
    bg2:Node;

    @property({type: Prefab})
    enemyPre:Prefab

    global:Global = Global.getInstance()

    step:number = 10

    move() {
        let bg1_pos = this.bg1.position
        let bg2_pos = this.bg2.position

        let bg1_size = this.bg1.getComponent(UITransform).getBoundingBox()
        let bg1_h = bg1_size.height
        // console.log(bg1_size, bg1_pos)
        let bg1_y = bg1_pos.y - this.step

        let bg2_y = bg2_pos.y - this.step


        // 判断bg1 位置附加到 bg2 上面
        if(bg1_pos.y < -(bg1_h - 15)){
            // console.log('超出边界')
            this.bg1.setPosition(v3(0, bg2_y + bg1_h, 0))
        } else {
            this.bg1.setPosition(v3(0, bg1_y, 0))
        }

        // 判断bg2 位置附加到 bg1 上面
        if(bg2_pos.y < -(bg1_h - 15)){
            // console.log('超出边界')
            this.bg2.setPosition(v3(0, bg1_y + bg1_h, 0))
        } else {
            this.bg2.setPosition(v3(0, bg2_y, 0))
        }
    }

    // 初始化滚动背景
    init(){
        let children = this.node.children
        let bg1 = children[0]
        let bg2 = children[1]
        // console.log(children, bg1) 
        this.bg1 = bg1
        this.bg2 = bg2
    }

    randEnemy(){
        let x = (640 - 50) * Math.random() -300
        let enemy = this.global.createEnemy(this.enemyPre)
        let parent = this.node.parent
        // console.log('生成敌机')
        parent.addChild(enemy)
        enemy.setPosition(x, 860)

    }

    onLoad(){
        const that = this
        this.init()
        
        this.schedule(function(){
            that.randEnemy()
        }, 0.5)
    }
    start() {

    }

    update(deltaTime: number) {
        this.move()
    }
}

