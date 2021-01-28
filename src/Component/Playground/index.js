import './style.css';
import React from 'react';
import Graph from '../../Entity/Graph'
import Vertice from '../../Entity/Vertice'
import { Stage, Layer, Label, Rect, Text, Circle, Line } from 'react-konva';

class Playground extends React.Component {
  constructor(props){
    super(props);

    this.state = {graph: new Graph()};
  }

  verticeChosen = (e) => {
    let key = e.target.attrs.id;

    console.log(key);
  }

  drawVertice = (e) => {
    let pos = e.target.getStage().getPointerPosition()

    if(this.state.graph.canDrawVertice(pos)){
      let newVertice = new Vertice(this.state.graph.vertices.length, pos)
      this.state.graph.addVertice(newVertice)
      this.forceUpdate()
    }
  }

  render(){
    return (
      <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.drawVertice} value='2'>
        <Layer>
          {this.state.graph.vertices.map((vertice) => (
            <Label>
              <Circle
                key={vertice.key}
                id={vertice.key}
                x={vertice.coordinates.x}
                y={vertice.coordinates.y}
                width={50}
                height={50}
                fill="#89b717"
                onClick={this.verticeChosen}
              />
              <Text
                text={vertice.key}
                x={vertice.coordinates.x-3}
                y={vertice.coordinates.y-5}
              />
            </Label>
          ))}
        </Layer>
      </Stage>
    )
  }
}

export default Playground;
