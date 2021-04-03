import './App.css';
import React from 'react';
import Playground from './Playground/playground'
import Algorithm from './Algorithm/algorithm'
import GraphDisplay from './GraphDisplay/graphDisplay'
import Menu from './Menu/menu'

class App extends React.Component{
  state = {
    topStarted: false,
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

  startTop = async () => {
    await this.refs.child.startTop();
  }

  setTopStarted = (topStarted) => {
    this.setState({
      topStarted: topStarted
    })
  }

  updateDisplayedQueue = (queue) => {
    this.setState({
      queue: queue
    })
  }

  render(){
    return (
      <div className="App">
        <Playground ref="child" managmentData={this.state.managmentData} setTopStarted={this.setTopStarted} updateDisplayedQueue={this.updateDisplayedQueue}/>
        <Menu updateManagmentData={this.updateManagmentData} loadGraphFromFile={this.loadGraphFromFile} saveGraphToFile={this.saveGraphToFile}/>
        <Algorithm startTop={async () => {await this.startTop()} } topStarted={this.state.topStarted}/>
        <GraphDisplay queue={this.state.queue}/>
      </div>
    );
  }
}

export default App;
