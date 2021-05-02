import EdjeStatus from '../Enum/EdjeStatus'
class Vertice{
  constructor(key, coordinates){
    this.key = key;
    this.coordinates = coordinates;
    this.adjacents = [];
    this.status = 'inWait'

    return this;
  }

  addAdjacent(newAdjacent){
    for(let adjacent of this.adjacents){
      if(adjacent.vertice.key == newAdjacent.vertice.key)
        return
    }

    this.adjacents.push(newAdjacent);
  }

  removeLinkIfExist(vertice) {
    var i = 0;
    while (i < this.adjacents.length) {
      if (this.adjacents[i].vertice.key === vertice.key) {
        this.adjacents.splice(i, 1);
      } else {
        ++i;
      }
    }
  }

  setEdgeDeleted(vertice) {
    var i = 0;
    while (i < this.adjacents.length) {
      if (this.adjacents[i].vertice.key === vertice.key) {
        this.adjacents[i].status = EdjeStatus.DELETED
      }
      i++
    }
  }

  getAdjacents(){
    return this.adjacents
  }
}

export default Vertice;
