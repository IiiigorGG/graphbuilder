
class Vertice{
  constructor(key, coordinates){
    this.key = key;
    this.coordinates = coordinates;
    this.adjacents = [];

    return this;
  }

  addAdjacent(vertice){
    for(let adjacent of this.adjacents){
      if(adjacent.key == vertice.key)
        return
    }

    this.adjacents.push(vertice);
  }

  removeLinkIfExist(vertice) {
    var i = 0;
    while (i < this.adjacents.length) {
      if (this.adjacents[i].key === vertice.key) {
        this.adjacents.splice(i, 1);
      } else {
        ++i;
      }
    }
  }
}

export default Vertice;
