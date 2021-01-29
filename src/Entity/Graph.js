
class Graph {
  constructor(){
    this.vertices = [];
    this.minLength = 70
    return this;
  }

  addVertice(vertice){
    this.vertices[vertice.key] = vertice;
  }

  linkVertices(key1, key2){
    let vertice1 = this.vertices[key1]
    let vertice2 = this.vertices[key2]

    vertice1.addAdjacent(vertice2)
  }

  canDrawVertice(pos){
    for(let vertice of this.vertices){
      if(this.length(pos, vertice.coordinates) <= this.minLength){
        return false
      }
    }

    return true
  }

  length(pos1, pos2){
    return Math.sqrt((pos1.x - pos2.x)*(pos1.x - pos2.x) + (pos1.y - pos2.y)*(pos1.y - pos2.y))
  }
}

export default Graph;
