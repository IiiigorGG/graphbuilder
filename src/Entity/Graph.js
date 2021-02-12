import Vertice from './Vertice.js';

class Graph {
  constructor(){
    this.vertices = [];
    this.minLength = 70
    return this;
  }

  addVertice(vertice){
    this.vertices.push(vertice)
  }

  removeVertice(key){
    let verticeToDelete = this.getVertice(key)

    for(var vertice of this.vertices){
      vertice.removeLinkIfExist(verticeToDelete);
    }

    this.removeVerticeIfExist(verticeToDelete)
  }

  linkVertices(key1, key2){
    let vertice1 = this.getVertice(key1)
    let vertice2 = this.getVertice(key2)

    vertice1.addAdjacent(vertice2)
  }

  removeEdje(key1, key2){
    let vertice1 = this.getVertice(key1)
    let vertice2 = this.getVertice(key2)

    vertice1.removeLinkIfExist(vertice2);
    vertice2.removeLinkIfExist(vertice1);
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

  removeVerticeIfExist(verticeToDelete) {
    var i = 0;
    while (i < this.vertices.length) {
      if (this.vertices[i].key === verticeToDelete.key) {
        this.vertices.splice(i, 1);
      } else {
        ++i;
      }
    }
  }

  toString() {
    let result = []

    for(let vertice of this.vertices){
      result.push({
        key: vertice.key,
        coordinates: vertice.coordinates,
        adjacents: []
      })

      for(let adjacent of vertice.adjacents){
        result[vertice.key].adjacents.push(adjacent.key)
      }
    }

    return result;
  }

  loadFromJson(data){
    this.vertices = []

    for(let verticeData of data){
      let vertice =  new Vertice(verticeData.key, verticeData.coordinates)
      this.addVertice(vertice)
    }

    for(let verticeData of data){
      for(let adjacentKey of verticeData.adjacents){
        this.linkVertices(verticeData.key, adjacentKey)
      }
    }
  }
}

export default Graph;
