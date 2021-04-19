import VerticeStatus from '../Enum/VerticeStatus';
import DfsManager from './DfsManager';

class EylerManager{
  constructor(graph){
    this.graph = graph
  }

  async sort(updateUI){
    const dfsManager = new DfsManager(this.graph)

    for(let vertice of this.graph.vertices){
      if(!dfsManager.isVisited(vertice.key)){
        await dfsManager.doDfs(vertice, updateUI)
      }
    }
  }

  waysExist(){
    let oddVerticesCount = 0

    if(this.graph.vertices.length == 0){
      return false
    }

    for(let vertice of this.graph.vertices){
      oddVerticesCount += vertice.getAdjacents().length % 2
    }

    console.log(oddVerticesCount);
    return oddVerticesCount == 0 || oddVerticesCount == 2
  }
}

export default EylerManager;
