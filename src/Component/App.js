import './App.css';
import React from 'react';
import Playground from './Playground/playground'
import Algorithm from './Algorithm/algorithm'
import Menu from './Menu/menu'

class App extends React.Component{
  state = {
    bfsStarted: false,
    queue: [],
    managmentData: {
      verticesManagment: "creation",
      edjesManagment: "creation"
    }
  }

  updateManagmentData = (data) => {
    this.setState({
      managmentData: data
    })
  }

  loadGraphFromFile = (data) => {
    this.refs.child.loadGraphFromFile(data);
  }

  saveGraphToFile = (pathToSaveTo) => {
    this.refs.child.saveGraphToFile(pathToSaveTo);
  }

  startBfs = () => {
    this.refs.child.startBfs();
  }

  stopBfs = () => {
    this.setBfsStarted(false)
    this.refs.child.stopBfs()
  }

  doStep = () => {
    this.refs.child.doStep()
  }

  setBfsStarted = (bfsStarted) => {
    this.setState({
      bfsStarted: bfsStarted
    })
  }

  setQueue = (queue) => {
    this.setState({
      queue: queue
    })
  }

  render(){
    return (
      <div className="App">
        <Playground ref="child" managmentData={this.state.managmentData} bfsStarted={this.state.bfsStarted} setBfsStarted={this.setBfsStarted} setQueue={this.setQueue}/>
        <Menu updateManagmentData={this.updateManagmentData} loadGraphFromFile={this.loadGraphFromFile} saveGraphToFile={this.saveGraphToFile}/>
        <Algorithm startBfs={this.startBfs} stopBfs={this.stopBfs} doStep={this.doStep} setBfsStarted={this.setBfsStarted} bfsStarted={this.state.bfsStarted} queue={this.state.queue}/>
      </div>
    );
  }
}

export default App;
