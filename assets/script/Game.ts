import { _decorator, Component, Node, Prefab, v3, UITransform, Label } from 'cc';
import { Global } from './Global';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    @property({type:Node})
    pauseNode:Node
    
    @property({type:Label})
    scoreNode:Label  = null  // 分数节点

    wrp:Node = null

    player:Node = null  

    @property({type: Prefab})
    enemyPre:Prefab

    @property({type: Prefab})
    enemy2Pre:Prefab

    @property({type: Prefab})
    enemy3Pre:Prefab


    global:Global = Global.getInstance()

    // 随机敌人
    randEnemy(){
        let prefab = this.enemyPre
        let x = (640 - 50) * Math.random() -300
        let type = 1
        if(this.global.index % 12 == 0){
            type = 2
            prefab = this.enemy2Pre
        }
        if(this.global.index % 20 == 0){
            type = 3
            prefab = this.enemy3Pre
        }
        // console.log(this.global.score % 2000)
        let enemy = this.global.createEnemy(prefab, this.wrp, x, type)
    }

    init() {
        this.player = this.node.getChildByPath('wrp/player')

        this.wrp = this.node.getChildByName('wrp')
    }

    onLoad() {
        const that = this
        that.init()
        
        this.schedule(function(){
            if(that.global.isPuase == false && that.global.isGameOver == false){
                that.randEnemy()
            }
        }, 0.3)
    }

    // 暂停游戏
    pauseGame() {
        this.global.isPuase = true
        this.node.getChildByPath('popup/resumeBtn').setPosition(v3(0,20))
        this.node.getChildByPath('popup/restartBtn').setPosition(v3(0,-100))
        this.node.getChildByPath('popup/backHome').setPosition(v3(0,-220))
        this.pauseNode.setPosition(v3(-1000,0))
        // this.resumeNode.setPosition(v3(-240,480))
    }

    // 恢复游戏
    resumeGame() {
        this.global.isPuase = false
        this.node.getChildByPath('popup/resumeBtn').setPosition(v3(-1000,20))
        this.node.getChildByPath('popup/restartBtn').setPosition(v3(-1000,-100))
        this.node.getChildByPath('popup/backHome').setPosition(v3(-1000,-220))
        this.pauseNode.setPosition(v3(-240,480))

    }

    gameRestart() {  
        this.global.score = 0
        // 取消暂停
        this.global.isPuase = false
        // 游戏开始
        this.global.isGameOver = false

        this.recycleAll()

        this.node.getChildByPath('popup/resumeBtn').setPosition(v3(-1000,20))
        this.node.getChildByPath('popup/restartBtn').setPosition(v3(-1000,-100))
        this.node.getChildByPath('popup/backHome').setPosition(v3(-1000,-220))
        this.player.getComponent(Player).init()
        // 暂停按钮
        this.pauseNode.setPosition(v3(-240,480))

        // this.resumeNode.setPosition(v3(-1000,0))
    }
    
    gameStart() {  
        this.global.score = 0

        // 隐藏欢迎界面
        this.node.getChildByPath('popup/startGame').setPosition(v3(-1000,0))
        // 显示分数 和 暂停按钮
        this.node.getChildByPath('control/score').setPosition(v3(200,480))
        this.pauseNode.setPosition(v3(-240,480))
        // 初始化和显示飞机
        this.player.getComponent(Player).init()
        this.player.setPosition(v3(0,-320))
    
        // this.resumeNode.setPosition(v3(-1000,0))
        // 游戏继续
        this.global.isPuase = false
        // 游戏开始
        this.global.isGameOver = false
    }
        
    backHome() {  
        this.node.getChildByPath('popup/resumeBtn').setPosition(v3(-1000,20))
        this.node.getChildByPath('popup/restartBtn').setPosition(v3(-1000,-100))
        this.node.getChildByPath('popup/backHome').setPosition(v3(-1000,-220))
        
        // 隐藏 分数 和 暂停按钮
        this.node.getChildByPath('control/score').setPosition(v3(-1000,480))
        this.pauseNode.setPosition(v3(-1000,480))

        // 隐藏欢迎界面
        this.node.getChildByPath('popup/startGame').setPosition(v3(0,0))

        // 回收飞机 子弹
        this.recycleAll()
    }

    gameOver() {

        this.node.getChildByPath('popup/restartBtn').setPosition(v3(0,-100))
        this.node.getChildByPath('popup/backHome').setPosition(v3(0,-220))
        // let player = this.node.getChildByName('player')
        // player.setPosition(v3(0,-1000));
        this.recycleAll()
        this.global.isGameOver = true
        // this.pauseNode.setPosition(v3(-1000,0))
        // this.resumeNode.setPosition(v3(-240,480))
        // this.scoreNode.string = 'Game Over'
    }

    // 回收所有敌击
    public recycleAll(){
        this.wrp.children.forEach(element => {
            if(element.name == 'enemy'){
                // console.log('回收敌机')
                element.setPosition(-1000, 0)
            }
            if(element.name == 'enemy2'){
                element.setPosition(-1000, 0)
            }
            if(element.name == 'enemy3'){
                element.setPosition(-1000, 0)
            }
            if(element.name == 'bullet'){
                element.setPosition(-2000, 0)
            }
            // if(element.name == 'player'){
            //     element.setPosition(1000, 0)
            // }
        // this.enemyPool.put(node)
        })
    }

    start() {

    }

    update(deltaTime: number) {
        this.scoreNode.string = this.global.score.toString()
    }
}

