import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faPause, faPlay, faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      currBreak: 300,
      currSession: 1500,
      sessionLength: 25,
      min: 25,
      sec: 0,
      sessionID: '',
      breakID: '',
      state: 'session'
    };

    this.incrementBreak = this.incrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.refresh = this.refresh.bind(this);
  }



  secondPass() {
    if (this.state.currSession === 0 && this.state.state !== 'break') {
          this.setState({
            breakID: setInterval(() => {
              this.secondPass();
            }, 1000)
          });
      this.setState({ state: 'break' });
    }
    if (this.state.currBreak === 0 && this.state.state !== 'alarm') {
      this.setState({ state: 'alarm' });
    }



    if (this.state.state === 'session')
    {
        this.setState({ min: Math.floor(this.state.currSession / 60) });  // To Determine The Minutes 
        this.setState({ sec: this.state.currSession % 60 });   // To Determine The Seconds
        this.setState({ currSession: this.state.currSession - 1 });

        
      } else if (this.state.state === 'break') {
        this.setState({ min: Math.floor(this.state.currBreak / 60) });  // To Determine The Minutes 
        this.setState({ sec: this.state.currBreak % 60 });   // To Determine The Seconds
        this.setState({ currBreak: this.state.currBreak - 1 });
      } else if(this.state.state === 'alarm'){
        let audio = new Audio('https://goo.gl/65cBl1');
        audio.play();
        alert('alarm!');
      }

  }

  incrementBreak() { this.setState({ breakLength: this.state.breakLength + 1 }) }
  decrementBreak() { this.setState({ breakLength: this.state.breakLength - 1 }) }
  incrementSession() { this.setState({ sessionLength: this.state.sessionLength + 1 }) }
  decrementSession() { this.setState({ sessionLength: this.state.sessionLength - 1 }) }

  start() {
    if(this.state.state === 'session')
    this.setState({
      sessionID: setInterval(() => {
        this.secondPass();
      }, 1000)
    });

    if(this.state.state === 'break')
    this.setState({
      breakID: setInterval(() => {
        this.secondPass();
      }, 1000)
    });

  }
  pause() { 
    if(this.state.state === 'session')
    clearInterval(this.state.sessionID);
    if(this.state.state === 'break')
    clearInterval(this.state.breakID);

   }
  refresh() { 
    clearInterval(this.state.sessionID);
    clearInterval(this.state.breakID);
    this.setState({ state: 'session' });
    this.setState({ currBreak: this.state.breakLength*60});
    this.setState({ currSession: this.state.sessionLength*60});
    this.setState({ min: Math.floor(this.state.currSession / 60) });  // To Determine The Minutes 
    this.setState({ sec: this.state.currSession % 60 });  
}

  render() {
    return (
      <div className="App">
        <div>
          <h2>Pomodoro Clock</h2>
        </div>
        <div id="break-label">
          <h3>Break length</h3>
          <button id="break-increment" onClick={this.incrementBreak}><FontAwesomeIcon icon={ faArrowAltCircleUp }/></button><label>{this.state.breakLength}</label> <button id="break-decrement" onClick={this.decrementBreak}><FontAwesomeIcon icon={ faArrowAltCircleDown }/></button>
        </div>
        <div id="session-label"></div>
        <h3>Session length</h3>
        <button id="session-increment" onClick={this.incrementSession}><FontAwesomeIcon icon={ faArrowAltCircleUp }/></button><label>{this.state.sessionLength}</label> <button id="session-decrement" onClick={this.decrementSession}><FontAwesomeIcon icon={ faArrowAltCircleDown }/></button>
        <div id="indicator">
          <h3 id="ds">Session</h3>
          <label id="time-left">{this.state.min}:</label><label id="time-left">{this.state.sec}</label>
        </div>
        <div>
          <button id="start-stop" onClick={this.start}><FontAwesomeIcon icon={ faPlay }/></button><button onClick={this.pause}><FontAwesomeIcon icon={ faPause }/></button><button id="reset" onClick={this.refresh}><FontAwesomeIcon icon={ faSync }/>
</button>
        </div>
      </div>
    );
  }
}

export default App;
