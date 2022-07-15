import { _decorator, Component, Node, Prefab, v3, UITransform, Label } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    @property({type:Node})
    pauseNode:Node

    @property({type:Node})
    resumeNode:Node

    
    @property({type:Label})
    scoreNode:Label  = null  // 分数节点

    wrp:Node = null

    @property({type: Prefab})
    enemyPre:Prefab

    global:Global = Global.getInstance()

    // 随机敌人
    randEnemy(){
        let x = (640 - 50) * Math.random() -300
        let enemy = this.global.createEnemy(this.enemyPre)
        this.wrp = this.node.getChildByName('wrp')
        // console.log('生成敌机')
        this.wrp.insertChild(enemy, 2)
        enemy.setPosition(x, 860)
    }

    onLoad() {
        const that = this
        this.schedule(function(){
            if(that.global.active == true){
                that.randEnemy()
            }
        }, 0.5)
    }

    // 暂停游戏
    pauseGame() {
        this.global.active = false
        this.pauseNode.setPosition(v3(-1000,0))
        this.resumeNode.setPosition(v3(-240,480))
        this.wrp.active = false
    }

    // 恢复游戏
    resumeGame() {
        this.global.active = true
        this.pauseNode.setPosition(v3(-240,480))
        this.resumeNode.setPosition(v3(-1000,0))
        this.wrp.active = true
    }


    start() {

    }

    update(deltaTime: number) {
        this.scoreNode.string = this.global.score.toString()
    }
}

