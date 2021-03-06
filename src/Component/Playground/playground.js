import './style.css';
import React from 'react';
import Graph from '../../Entity/Graph'
import Vertice from '../../Entity/Vertice'
import BfsManager from '../../Service/BfsManager'
import VerticeStatus from '../../Enum/VerticeStatus'
import { Stage, Layer, Label, Rect, Text, Circle, Line } from 'react-konva';

import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';

class Playground extends React.Component {
  state = {
    graph: new Graph(),
    matrix: Array(100).fill(Array(100).fill(null)),
    chosen: null,
    bfsStarted: false,
    managmentData: {
      verticesManagment: "creation",
      edjesManagment: "creation"
    }
  };

  constructor(props){
    super(props);

    this.state.setBfsStarted = this.props.setBfsStarted
    this.state.setQueue = this.props.setQueue
  }

  componentWillReceiveProps(nextProps) {
    this.state.bfsStarted = nextProps.bfsStarted
    this.state.managmentData = {
      verticesManagment: nextProps.managmentData.verticesManagment,
      edjesManagment: nextProps.managmentData.edjesManagment
    }
  }

  saveGraphToFile = (pathToSaveTo) => {
    this.stopBfs()
    let data = "data:text/plain;base64," + encodeBase64(JSON.stringify(this.state.graph.toString()))

    saveAs(data, "graphData.txt");
  }

  loadGraphFromFile = (graphData) => {
    this.stopBfs()
    this.state.graph.loadFromJson(graphData)

    this.forceUpdate()
  }

  verticeChosen = (e) => {
    e.cancelBubble = true;

    if(this.state.managmentData.verticesManagment == "creation"){
      this.manageEdje(e);
      this.forceUpdate()
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
      let newVertice = new Vertice(this.state.graph.vertices.length+1, pos)
      this.state.graph.addVertice(newVertice)
    }

    this.state.chosen = null
    this.forceUpdate()
  }

  startBfs = (e) => {
    if(this.state.chosen === null){
      alert('Choose Start Vertice')
      return
    }

    this.state.bfsManager = new BfsManager(this.state.graph, this.state.graph.getVertice(this.state.chosen))

    this.state.setQueue(this.state.bfsManager.queue)
    this.state.setBfsStarted(true)
    this.state.chosen = null
    this.forceUpdate()
  }

  stopBfs = (e) => {
    for(let vertice of this.state.graph.vertices){
      vertice.status = VerticeStatus.IN_WAIT
    }

    this.state.setQueue([])
    this.state.setBfsStarted(false)
    this.forceUpdate()
  }

  doStep = (e) => {
    if(this.state.bfsManager.queue.length > 0){
      this.state.bfsManager.doStep()
      this.state.setQueue(this.state.bfsManager.queue)
      this.forceUpdate()
    }
    else{
      this.stopBfs()
    }
  }

  render(){
    return (
      <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.drawVertice} value='2'>
        <Layer>
        {this.state.graph.vertices.map((vertice) => {
          let lines = []

          for(let adjacent of vertice.adjacents){
            lines.push(<Line
              points={[vertice.coordinates.x, vertice.coordinates.y, adjacent.coordinates.x, adjacent.coordinates.y]}
              stroke="black"
              />)
          }

          return(lines)
        })}
          {this.state.graph.vertices.map((vertice) => {
            let color = 'green'

            if(this.state.bfsStarted){
              switch (vertice.status) {
                case VerticeStatus.PROCESSED:
                  color = 'blue'
                  break
                case VerticeStatus.IN_WORK:
                  color = 'red'
                  break
                default:
                  color = 'green'
              }
            }
            else{
              color = this.state.chosen === vertice.key ? 'red' : 'green'
            }

            return (
              <Label>
                <Circle
                  key={vertice.key}
                  id={vertice.key}
                  x={vertice.coordinates.x}
                  y={vertice.coordinates.y}
                  width={70}
                  height={70}
                  fill={color}
                  onClick={this.verticeChosen}
                />
                <Text
                  text={vertice.key}
                  x={vertice.coordinates.x-3}
                  y={vertice.coordinates.y-5}
                />
              </Label>
            )
          })}
        </Layer>
      </Stage>
    )
  }
}

export default Playground;
