
class Vertice{
  constructor(key, coordinates){
    this.key = key;
    this.coordinates = coordinates;
    this.adjasents = [];

    return this;
  }

  addAdjacent(vertice){
    this.adjasents.push(vertice);
  }
}

export default Vertice;
