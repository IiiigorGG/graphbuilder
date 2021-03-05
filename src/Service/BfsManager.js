
class BfsManager{
  query = [];
  visited = [];

  constructor(graph, startVertice){
    this.graph = graph;
    this.query.push_back(startVertice);

    return this;
  }

  doStep(){
    let activeVertice = this.query.pop()

    for(let adjacentVertice of activeVertice){
      if(!this.isVisited(adjacent.key)){
          adjacentVertice.status = 'inWork'
          
      }
    }

    activeVertice.status = 'processed'
  }

  isVisited(key){
    if(this.visited[key])
      return true

    return false
  }

}

export default BfsManager;
