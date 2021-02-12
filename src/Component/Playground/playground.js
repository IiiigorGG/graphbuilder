import './style.css';
import React from 'react';
import Graph from '../../Entity/Graph'
import Vertice from '../../Entity/Vertice'
import { Stage, Layer, Label, Rect, Text, Circle, Line } from 'react-konva';

import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';

class Playground extends React.Component {
  state = {
    graph: new Graph(),
    matrix: Array(100).fill(Array(100).fill(null)),
    chosen: null,
    managmentData: {
      verticesManagment: "creation",
      edjesManagment: "creation"
    }
  };

  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.state.managmentData = {
      verticesManagment: nextProps.managmentData.verticesManagment,
      edjesManagment: nextProps.managmentData.edjesManagment
    }
  }

  saveGraphToFile = (pathToSaveTo) => {
    let data = "data:text/plain;base64," + encodeBase64(JSON.stringify(this.state.graph.toString()))

    saveAs(data, "graphData.txt");
  }

  loadGraphFromFile = (graphData) => {
    this.state.graph.loadFromJson(graphData)

    this.forceUpdate()
  }

  verticeChosen = (e) => {
    e.cancelBubble = true;

    if(this.state.managmentData.verticesManagment == "creation"){
      this.manageEdje(e);
    }
    else{
      this.removeVertice(e);
    }
  }

  manageEdje = (e) => {
    let key = e.target.attrs.id;

    if(this.state.chosen !== null && this.state.chosen != key){
      if(this.state.managmentData.edjesManagment === "creation"){
        this.state.graph.linkVertices(this.state.chosen, key)
      }
      else{
        this.state.graph.removeEdje(this.state.chosen, key)
      }

      this.state.chosen = null
      this.forceUpdate()
      return
    }

    this.state.chosen = key;
  }

  removeVertice = (e) => {
    let key = e.target.attrs.id;
    this.state.graph.removeVertice(key);

    this.state.chosen = null
    this.forceUpdate()
  }

  drawVertice = (e) => {
    let pos = e.target.getStage().getPointerPosition()

    if(this.state.graph.canDrawVertice(pos) && this.state.managmentData.verticesManagment == "creation"){
      let newVertice = new Vertice(this.state.graph.vertices.length, pos)
      this.state.graph.addVertice(newVertice)
      this.forceUpdate()
    }

    this.state.chosen = null
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
                width={70}
                height={70}
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
          {this.state.graph.vertices.map((vertice) => {
            let lines = []

            for(let adjacent of vertice.adjacents){
              lines.push(<Line
                points={[vertice.coordinates.x, vertice.coordinates.y, adjacent.coordinates.x, adjacent.coordinates.y]}
                stroke='5px'
                />)
            }

            return(lines)
          })}
        </Layer>
      </Stage>
    )
  }
}

export default Playground;
