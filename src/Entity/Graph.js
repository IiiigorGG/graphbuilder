
class Graph {
  constructor(){
    this.vertices = [];
    this.minLength = 70
    return this;
  }

  addVertice(vertice){
    this.vertices.push(vertice)
  }

  linkVertices(key1, key2){
    let vertice1 = this.getVertice(key1)
    let vertice2 = this.getVertice(key2)

    console.log(vertice1.key, vertice2.key);
    vertice1.addAdjacent(vertice2)
  }

  getVertice(key){
    for(let vertice of this.vertices){
      if(vertice.key == key)
        return vertice
    }
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
