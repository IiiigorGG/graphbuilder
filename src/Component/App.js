import './App.css';
import React from 'react';
import Playground from './Playground/playground'
import Menu from './Menu/menu'

class App extends React.Component{
  state = {
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

  render(){
    return (
      <div className="App">
        <Playground ref="child" managmentData={this.state.managmentData}/>
        <Menu updateManagmentData={this.updateManagmentData} loadGraphFromFile={this.loadGraphFromFile} saveGraphToFile={this.saveGraphToFile}/>
      </div>
    );
  }
}

export default App;
