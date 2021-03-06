import VerticeStatus from '../Enum/VerticeStatus';

class BfsManager{
  constructor(graph, startVertice){
    this.graph = graph;
    this.queue = []
    this.visited = []
    this.round = 0

    startVertice.status = VerticeStatus.IN_WORK

    this.queue.push({
      vertice: startVertice,
      round: this.round
    })
  }

  doStep(){
    while(this.queue.length > 0){
      let activeVertice = this.queue.pop()

      if(activeVertice.round > this.round){
        this.queue.push(activeVertice)
        break
      }

      activeVertice = activeVertice.vertice

      for(let adjacentVertice of activeVertice.getAdjacents()){
        if(!this.isVisited(adjacentVertice.key)){
            adjacentVertice.status = VerticeStatus.IN_WORK
            this.queue.push({vertice: adjacentVertice, round: this.round + 1})
        }
      }

      this.setVisited(activeVertice.key)
      activeVertice.status = VerticeStatus.PROCESSED

      this.queue.sort(function(a, b) {
        return b.round - a.round;
      });
    }

    this.round++
  }

  isVisited(key){
    if(this.visited[key])
      return true

    return false
  }

  setVisited(key){
    this.visited[key] = true
  }

}

export default BfsManager;
