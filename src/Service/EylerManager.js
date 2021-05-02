import VerticeStatus from '../Enum/VerticeStatus';
import EdjeStatus from '../Enum/EdjeStatus';
import DfsManager from './DfsManager';

class EylerManager{
  constructor(graph){
    this.graph = graph
    this.way = []
  }

  async findWay(startVertice, updateUI){
    await this.doDfs(startVertice, updateUI)
    return this.way
  }

  async doDfs(vertice, updateUI){
    vertice.status = VerticeStatus.IN_WORK
    updateUI()
    await this.sleep(1000)

    for(let adjacent of vertice.getAdjacents()){
      if(adjacent.status === EdjeStatus.IN_WAIT){
        vertice.setEdgeDeleted(adjacent.vertice)
        adjacent.vertice.setEdgeDeleted(vertice)
        await this.doDfs(adjacent.vertice, updateUI)
      }
    }

    this.way.push(vertice)
    vertice.status = VerticeStatus.PROCESSED

    updateUI()
    await this.sleep(1000)
  }

  oddCount(){
    let oddVerticesCount = 0

    if(this.graph.vertices.length == 0){
      return false
    }

    for(let vertice of this.graph.vertices){
      oddVerticesCount += vertice.getAdjacents().length % 2
    }

    return oddVerticesCount
  }

  findOddVertice(){
    for(let vertice of this.graph.vertices){
      if( vertice.getAdjacents().length % 2 == 1 ) return vertice;
    }
  }

  async sleep(ms){
    return new Promise(function(resolve, reject) {
      setTimeout(function () {
        resolve()
      }, ms);
    });
  }
}

export default EylerManager;
