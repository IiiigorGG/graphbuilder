import VerticeStatus from '../Enum/VerticeStatus';

class DfsManager{
  constructor(graph, timestamps){
    this.graph = graph
    this.timestamps = timestamps
    this.visited = []
  }

  async doDfs(vertice, updateUI){
    this.setVisited(vertice.key)
    vertice.status = VerticeStatus.IN_WORK
    updateUI()
    await this.sleep(1000)
    this.timestamps[vertice.key] = {enter: new Date()}

    for(let adjacentVertice of vertice.getAdjacents()){
      if(!this.isVisited(adjacentVertice.key)){
          await this.doDfs(adjacentVertice, updateUI)
      }
    }

    vertice.status = VerticeStatus.PROCESSED
    this.timestamps[vertice.key].exit = new Date()
    updateUI()
    await this.sleep(1000)
  }

  isVisited(key){
    if(this.visited[key])
      return true

    return false
  }

  setVisited(key){
    this.visited[key] = true
  }

  async sleep(ms){
    return new Promise(function(resolve, reject) {
      setTimeout(function () {
        resolve()
      }, ms);
    });
  }
}

export default DfsManager;
