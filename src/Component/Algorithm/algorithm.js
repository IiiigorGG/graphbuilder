import './style.css';
import React from 'react';

class Algorithm extends React.Component {
  state = {
    bfsStarted: false
  };

  constructor(props){
    super(props);

    this.setBfsStarted = this.props.setBfsStarted
    this.state.bfsStarted = this.props.bfsStarted
    this.state.queue = this.props.queue

    this.state.startBfs = this.props.startBfs
    this.state.stopBfs = this.props.stopBfs
    this.state.doStep = this.props.doStep
  }

  componentWillReceiveProps(nextProps) {
    this.state.bfsStarted = nextProps.bfsStarted
    this.state.queue = nextProps.queue
  }

  startBfs = () => {
    this.state.startBfs()
  }

  stopBfs = () => {
    this.state.stopBfs()
  }

  doStep = () => {
    this.state.doStep()
  }

  render(){
    return (
      <div class="algorithm">
        <div class="algorithm-item title">Algorithms</div>
        <div class="algorithm-item">
          <button onClick={this.startBfs} disabled={this.state.bfsStarted}>Start BFS</button>
          <button onClick={this.stopBfs} disabled={!this.state.bfsStarted}>Stop BFS</button>
          <button onClick={this.doStep} disabled={!this.state.bfsStarted}>Do step</button>
        </div>
        <div class="algorithm-item title">Queue</div>
        <div class="algorithm-item">
          {this.state.queue.map((vertice)=>{
            return(<div class=".queue-object">{vertice.vertice.key}</div>)
          })}
        </div>
      </div>
    )
  }
}

export default Algorithm;
