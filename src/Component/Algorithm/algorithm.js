import './style.css';
import React from 'react';

class Algorithm extends React.Component {
  state = {
    topStarted: false
  };

  constructor(props){
    super(props);

    this.state.startTop = this.props.startTop
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.state.topStarted = nextProps.topStarted
  }

  startTop = () => {
    this.state.startTop()
  }

  render(){
    return (
      <div class="algorithm">
        <div class="algorithm-item title">Algorithms</div>
        <div class="algorithm-item">
          <button onClick={this.startTop} disabled={this.state.topStarted}>Find Eyler's Way</button>
        </div>
      </div>
    )
  }
}

export default Algorithm;
