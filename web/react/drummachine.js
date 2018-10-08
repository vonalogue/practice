import React from "react";
import ReactDOM from "react-dom";
import "./styles.sass";


const SOUNDS = {
  Q: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', 'Heater-1'],
  W: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', 'Heater-2'],
  E: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', 'Heater-3'],
  A: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', 'Heater-4_1'],
  S: ['https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', 'Heater-6'],
  D: ['https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', 'Dsc_Oh'],
  Z: ['https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', 'Kick_n_Hat'],
  X: ['https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', 'RP4_KICK_1'],
  C: ['https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', 'Cev_H2.mp3']
};

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pad : '' };
    this.playSound = this.playSound.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  playSound(e) {
    var snd;
    var letter;
    if (e.keyCode) {
      letter = String.fromCharCode(e.keyCode);
    } else {
      letter = e.target.id;
    }
    this.setState({ pad: SOUNDS[letter][1] });
    snd = new Audio(SOUNDS[letter][0]);
    snd.play();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey);
  }
  handleKey(e) {
    if (SOUNDS[String.fromCharCode(e.keyCode)]) {
      this.playSound(e);
    }
  }

  render() {
    return (
      <div id="drum-machine" className="container">
        <div id="display">
          <p><strong>PAD:</strong> {this.state.pad}</p>
        </div>
        <div className="flex-container">
          <button id="Q" className="drum-pad" onClick={this.playSound}>Q</button>
          <button id="W" className="drum-pad" onClick={this.playSound}>W</button>
          <button id="E" className="drum-pad" onClick={this.playSound}>E</button>
        </div>
        <div className="flex-container">
          <button id="A" className="drum-pad" onClick={this.playSound}>A</button>
          <button id="S" className="drum-pad" onClick={this.playSound}>S</button>
          <button id="D" className="drum-pad" onClick={this.playSound}>D</button>
        </div>
        <div className="flex-container">
          <button id="Z" className="drum-pad" onClick={this.playSound}>Z</button>
          <button id="X" className="drum-pad" onClick={this.playSound}>X</button>
          <button id="C" className="drum-pad" onClick={this.playSound}>C</button>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<DrumMachine />, rootElement);
