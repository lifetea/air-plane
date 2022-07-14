import { _decorator, Component, Node, NodePool, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Global')
export class Global{
    private static instance: Global;
    
    //子弹回收池
    bulletPool:NodePool

    //敌人回收池
    enemyPool:NodePool

    private constructor() {
        this.bulletPool = new NodePool()
        this.enemyPool = new NodePool()
    }

    // private static instance: NodePool;
    public static getInstance(){
        if (!Global.instance) {
            Global.instance = new Global();
          }
      
          return Global.instance;
    }

    // 生成子弹
    public createBullet(pre:Prefab){
        let bullet = null
        console.log(this.bulletPool.size(), this.enemyPool.size())
        if(this.bulletPool.size() > 0){
            bullet = this.bulletPool.get()
        } else {
            bullet = instantiate(pre)
        }
        return bullet
    }
    
    // 回收子弹
    public recycleBullet(node:Node){
        this.bulletPool.put(node)
    }

    // 生成敌机
    public createEnemy(pre:Prefab){
        let enemy = null
        if(this.enemyPool.size() > 0){
            enemy = this.enemyPool.get()
        } else {
            enemy = instantiate(pre)
        }
        return enemy
    }

    // 回收敌击
    public recycleEnemy(node:Node){
        this.enemyPool.put(node)
    }
}

