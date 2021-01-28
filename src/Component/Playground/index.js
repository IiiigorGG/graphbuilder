import './style.css';
import React from 'react';
import Graph from '../../Entity/Graph'
import Vertice from '../../Entity/Vertice'
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

class Playground extends React.Component {
  constructor(props){
    super(props);

    this.state = {graph: new Graph()};
    console.log(this.state.graph);
  }

  handleDragStart = (e) => {
    console.log(e);
  }

  drawVertice = (e) => {
    console.log(this.state.graph);
    let pos = e.target.getStage().getPointerPosition()
    let newVertice = new Vertice(this.state.graph.vertices.length, pos)

    this.state.graph.addVertice(newVertice)
    this.forceUpdate()
  }

  render(){
    return (
      <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.drawVertice} value='2'>
        <Layer>
          {this.state.graph.vertices.map((vertice) => (
            <Circle
              key={vertice.key}
              id={vertice.key}
              x={vertice.coordinates.x}
              y={vertice.coordinates.y}
              width={50}
              height={50}
              fill="#89b717"
              onClick={this.handleDragStart}
            />
          ))}
        </Layer>
      </Stage>
    )
  }
}

export default Playground;
