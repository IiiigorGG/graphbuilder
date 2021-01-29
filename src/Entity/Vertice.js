
class Vertice{
  constructor(key, coordinates){
    this.key = key;
    this.coordinates = coordinates;
    this.adjasents = [];

    return this;
  }

  addAdjacent(vertice){
    for(let adjasent of this.adjasents){
      if(adjasent.key == vertice.key)
        return
    }

    this.adjasents.push(vertice);
  }
}

export default Vertice;
