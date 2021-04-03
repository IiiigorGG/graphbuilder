import './style.css';
import React from 'react';

class GraphDisplay extends React.Component {
  state = {
    queue: []
  };

  constructor(props){
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.state.queue = nextProps.queue
  }

  render(){
    console.log(this.state.queue);
    return (
      <div class="graph-display">
      {this.state.queue.map((el) => {
        return (<div class="vertice-display">{el.key}</div>)
      })}
      </div>
    )
  }
}

export default GraphDisplay;
