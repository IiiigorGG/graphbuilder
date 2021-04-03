import VerticeStatus from '../Enum/VerticeStatus';
import DfsManager from './DfsManager';

class TopManager{
  constructor(graph, timestamps){
    this.graph = graph;
    this.timestamps = timestamps
  }

  async sort(updateUI){
    const dfsManager = new DfsManager(this.graph, this.timestamps)

    for(let vertice of this.graph.vertices){
      if(!dfsManager.isVisited(vertice.key)){
        await dfsManager.doDfs(vertice, updateUI)
      }
    }
  }
}

export default TopManager;
