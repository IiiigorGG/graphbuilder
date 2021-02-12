import './style.css';
import React from 'react';

class Menu extends React.Component {
  state = {
    managmentData: {
      edjesManagment: "creation",
      verticesManagment: "creation"
    }
  };

  constructor(props){
    super(props);

    this.state.updateManagmentData = props.updateManagmentData;
    this.state.loadGraphFromFile = props.loadGraphFromFile;
    this.state.saveGraphToFile = props.saveGraphToFile;
  }

  onEdjesManagmentChange = (e) => {
    this.state.managmentData.edjesManagment = e.currentTarget.value;

    this.state.updateManagmentData(this.state.managmentData)
    this.forceUpdate()
  }

  onVerticesManagmentChange = (e) => {
    this.state.managmentData.verticesManagment = e.currentTarget.value;

    this.state.updateManagmentData(this.state.managmentData)
    this.forceUpdate()
  }

  handleFileSelected = (e) => {
    const files = Array.from(e.target.files)

    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = (e.target.result)
      let graphData = JSON.parse(text);

      this.state.loadGraphFromFile(graphData)
    };
    reader.readAsText(files[0])
  }

  handleSaveFile = (e) => {
    let pathToSaveTo = "/Users/igorroik/Desktop/"
    this.state.saveGraphToFile(pathToSaveTo)
  }

  render(){
    return (
      <div class="menu">
        <div class="menu-item title">Vertices</div>
        <div class="menu-item radiobutton">
          <input
            class="radio-button"
            type="radio"
            value={"creation"}
            checked={this.state.managmentData.verticesManagment === "creation"}
            onChange={this.onVerticesManagmentChange} />
          Creation
        </div>
        <div class="menu-item radiobutton">
          <input
            class="radio-button"
            type="radio"
            value={"deletion"}
            checked={this.state.managmentData.verticesManagment === "deletion"}
            onChange={this.onVerticesManagmentChange} />
          Deletion
        </div>

        <div class="menu-item title">Edjes</div>
        <div class="menu-item radiobutton">
          <input
            class="radio-button"
            type="radio"
            value={"creation"}
            checked={this.state.managmentData.edjesManagment === "creation"}
            onChange={this.onEdjesManagmentChange} />
          Creation
        </div>
        <div class="menu-item radiobutton">
          <input
            class="radio-button"
            type="radio"
            value={"deletion"}
            checked={this.state.managmentData.edjesManagment === "deletion"}
            onChange={this.onEdjesManagmentChange} />
          Deletion
        </div>
        <div class="menu-item upload_menu">
          <input
            onChange={this.handleFileSelected}
            type="file"/>
        </div>
        <div class="menu-item upload_menu">
          <button
            type="button"
            class="save-button"
            onClick={this.handleSaveFile}>save</button>
        </div>
      </div>
    )
  }
}

export default Menu;
