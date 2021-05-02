import './style.css';
import React from 'react';
import Graph from '../../Entity/Graph'
import Vertice from '../../Entity/Vertice'
import EylerManager from '../../Service/EylerManager'
import VerticeStatus from '../../Enum/VerticeStatus'
import EdjeStatus from '../../Enum/EdjeStatus'
import { Stage, Layer, Label, Rect, Text, Circle, Line } from 'react-konva';

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

  updateUI = () => {
    this.forceUpdate()
  }

  startTop = async (e) => {
    this.state.graphAvailable = false
    this.state.updateDisplayedQueue([])
    this.state.graph.vertices.map((el) => {
      el.status = VerticeStatus.IN_WAIT
      el.getAdjacents().map(el2 =>{
        el2.status = EdjeStatus.IN_WAIT
      })
    })

    this.state.eylerManager = new EylerManager(this.state.graph)

    if(this.state.eylerManager.oddCount() !== 0 && this.state.eylerManager.oddCount() !== 2 ){
      alert("No ways exist")
      return
    }

    let startVertice = this.state.graph.vertices[0]

    if(this.state.eylerManager.oddCount() == 2){
      startVertice = this.state.eylerManager.findOddVertice()
    }

    const queue = await this.state.eylerManager.findWay(startVertice, this.updateUI)
    this.state.updateDisplayedQueue(queue)
  }

  getCurrentTime = (dateTime) => {

    let hours = dateTime.getHours()
    let minutes = dateTime.getMinutes()
    let seconds = dateTime.getSeconds();

    return hours + ":" + minutes + ":" + seconds
  }

  render(){
    return (
      <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.drawVertice} value='2'>
        <Layer>
        {this.state.graph.vertices.map((vertice) => {
          let lines = []

          for(let adjacent of vertice.adjacents){
            let secondVertice = adjacent.vertice
            let color = 'green'

            switch (adjacent.status) {
              case EdjeStatus.IN_WAY:
                color = 'blue'
                break
              case EdjeStatus.IN_WAIT:
                color = 'green'
                break
              case EdjeStatus.DELETED:
                color = 'red'
                break
              default:
                color = 'green'
            }

            lines.push(<Line
              points={[vertice.coordinates.x, vertice.coordinates.y, secondVertice.coordinates.x, secondVertice.coordinates.y]}
              stroke={color}
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
                enterTimestamp = 'enter: ' + this.getCurrentTime(this.state.timestamps[vertice.key].enter)
              if(this.state.timestamps[vertice.key].exit !== undefined)
                exitTimestamp = 'exit: ' + this.getCurrentTime(this.state.timestamps[vertice.key].exit)
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
