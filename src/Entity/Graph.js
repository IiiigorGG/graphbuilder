
class Graph {
  constructor(){
    this.vertices = [];
    this.minLength = 50
    return this;
  }

  addVertice(vertice){
    this.vertices.push(vertice);
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
    let l = Math.sqrt((pos1.x - pos2.x)*(pos1.x - pos2.x) + (pos1.y - pos2.y)*(pos1.y - pos2.y))

    console.log(l);

    return l;
  }
}

export default Graph;
