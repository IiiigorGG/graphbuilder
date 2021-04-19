import './style.css';
import React from 'react';
import Graph from '../../Entity/Graph'
import Vertice from '../../Entity/Vertice'
import TopManager from '../../Service/TopManager'
import VerticeStatus from '../../Enum/VerticeStatus'
import { Arrow, Stage, Layer, Label, Rect, Text, Circle, Line } from 'react-konva';

import { saveAs, encodeBase64 } from '@progress/kendo-file-saver';

class Playground extends React.Component {
  state = {
    graph: new Graph(),
    matrix: Array(100).fill(Array(100).fill(null)),
    chosen: null,
    graphAvailable: true,
    managmentData: {
      verticesManagment: "creation",
      edjesManagment: "creation"
    },
    timestamps: []
  };

  constructor(props){
    super(props);

    this.state.setTopStarted = this.props.setTopStarted
    this.state.updateDisplayedQueue = this.props.updateDisplayedQueue
  }

  componentWillReceiveProps(nextProps) {
    this.state.managmentData = {
      verticesManagment: nextProps.managmentData.verticesManagment,
      edjesManagment: nextProps.managmentData.edjesManagment
    }
  }

  saveGraphToFile = (pathToSaveTo) => {
    if(!this.state.graphAvailable){
      return
    }

    let data = "data:text/plain;base64," + encodeBase64(JSON.stringify(this.state.graph.toString()))

    saveAs(data, "graphData.txt");
  }

  loadGraphFromFile = (graphData) => {
    if(!this.state.graphAvailable){
      return
    }

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
        this.state.graph.linkVertices(key, this.state.chosen)
      }
      else{
        this.state.graph.removeEdje(key, this.state.chosen)
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

  updateUI = () => {
    this.forceUpdate()
  }

  startTop = async (e) => {
    this.state.timestamps = []
    this.state.updateDisplayedQueue([])
    this.state.graph.vertices.map((el) => {
      el.status = VerticeStatus.IN_WAIT
    })

    this.state.topManager = new TopManager(this.state.graph, this.state.timestamps)
    this.state.graphAvailable = false
    this.state.setTopStarted(true)
    this.forceUpdate()

    await this.state.topManager.sort(this.updateUI)
    this.state.setTopStarted(false)
    let queue = this.state.graph.vertices.map((el) => {
      return {
        key: el.key,
        enter: this.state.timestamps[el.key].enter,
        exit: this.state.timestamps[el.key].exit
      }
    })

    queue.sort((a,b)=>{
      return b.exit - a.exit
    })

    this.state.updateDisplayedQueue(queue)
  }

  render(){
    return (
      <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.drawVertice} value='2'>
        <Layer>
          {this.state.graph.vertices.map((vertice) => {
            let lines = []

            for(let adjacent of vertice.adjacents){
              lines.push(<Arrow
                points={[
                  vertice.coordinates.x,
                  vertice.coordinates.y,
                  adjacent.coordinates.x,
                  adjacent.coordinates.y
                ]}
                stroke="black"
                />)
            }

            return(lines)
          })}
          {this.state.graph.vertices.map((vertice) => {
            let color = 'green'

            if(!this.state.graphAvailable){
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

            let enterTimestamp = ''
            let exitTimestamp = ''

            if(this.state.timestamps[vertice.key] !== undefined){
              if(this.state.timestamps[vertice.key].enter !== undefined)
                enterTimestamp = 'enter: ' + this.state.timestamps[vertice.key].enter
              if(this.state.timestamps[vertice.key].exit !== undefined)
                exitTimestamp = 'exit: ' + this.state.timestamps[vertice.key].exit
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
                <Text
                  text={enterTimestamp}
                  x={vertice.coordinates.x+10}
                  y={vertice.coordinates.y-20}
                />
                <Text
                  text={exitTimestamp}
                  x={vertice.coordinates.x+10}
                  y={vertice.coordinates.y-30}
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
