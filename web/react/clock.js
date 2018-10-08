import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            break: 5,
            session: 25,
            duration: 1500,
            running: false,
            breakTime: false,
            intervalId: null,
        };
        this.setBreak = this.setBreak.bind(this);
        this.setSession = this.setSession.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.changePhase = this.changePhase.bind(this);
        this.displayTimer = this.displayTimer.bind(this);
        this.reset = this.reset.bind(this);
    }

    setBreak(e) {
        if (!this.state.running) {
            this.setState({ break: e.currentTarget.value === '+' ?
                            this.state.break + 1 :
                            this.state.break > 0 ? this.state.break - 1 : 0,

                            duration: this.state.breakTime ?
                                (e.currentTarget.value === '+' ?
                                    this.state.duration + 60 :
                                    this.state.duration > 60 ? this.state.duration - 60 : 0) :
                                    this.state.duration,
            });
        }
    }

    setSession(e) {
        if (!this.state.running) {
            this.setState({ session: e.currentTarget.value === '+' ?
                            this.state.session + 1 :
                            this.state.session > 0 ? this.state.session - 1 : 0,

                            duration: !this.state.breakTime ?
                                (e.currentTarget.value === '+' ?
                                    this.state.duration + 60 :
                                    this.state.duration > 60 ? this.state.duration - 60 : 0) :
                                    this.state.duration,
            });
        }
    }

    toggleTimer() {
        if (!this.state.running) {
            this.startTimer();
        } else {
          this.state.intervalId && this.setState({ intervalId: clearInterval(this.state.intervalId) });
          this.setState({ running: false });
        }
    }

    startTimer() {
        this.setState({
            intervalId: setInterval(() => {
                if (this.state.duration > 0) {
                    this.setState({ duration: this.state.duration - 1 });
                } else {
                    clearInterval(this.state.intervalId);
                    this.changePhase();
                }
            }, 1000)
        });
        this.setState({ running: true });
    }

    changePhase() {
        if (!this.state.breakTime) {
            this.setState({ duration: this.state.break * 60,
                            breakTime: true, });
            this.startTimer();
        } else {
            this.setState({ duration: this.state.session * 60,
                            breakTime: false, });
            this.startTimer();
        }
    }

    displayPhase() {
        if (this.state.breakTime) {
            return "Break time, baby!";
        }
        return "Session";
    }

    displayTimer() {
        let minutes = String(Math.floor(this.state.duration / 60));
        let seconds = String(this.state.duration % 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return `${minutes} : ${seconds}`;
    }

    reset() {
        this.setState({
            break: 5,
            session: 25,
            duration: 1500,
            running: false,
            breakTime: false,
            intervalId: this.state.intervalId && clearInterval(this.state.intervalId),
        });
    }

    render() {
        return(
        <div>
            <fieldset>
                <legend><strong><em>Pomodoro Clock</em></strong></legend>

                <div id="break">
                  <p id="break-label">Break</p>
                  <p id="break-length">{this.state.break}</p>
                  <button id="break-increment" value="+" onClick={this.setBreak}>
                    <i class="fa fa-plus-square"/>
                  </button>
                <button id="break-decrement" value="-" onClick={this.setBreak}>
                    <i class="fa fa-minus-square" />
                  </button>
                </div>

              <div id="session">
                <p id="session-label">Session</p>
                <p id="session-length">{this.state.session}</p>
                <button id="session-increment" value="+" onClick={this.setSession}>
                  <i class="fa fa-plus-square" />
                </button>
                <button id="session-decrement" value="-" onClick={this.setSession}>
                  <i class="fa fa-minus-square" />
                </button>
              </div>
            </fieldset>

            <div id="time-left">
                <p id="time-label">{this.displayPhase()}</p>
                <p>{this.displayTimer()}</p>
            </div>
                <button id="start-stop" onClick={this.toggleTimer}>Start/Stop</button>
                <button id="reset" onClick={this.reset}>Reset</button>


        </div>);
    }
} // end Clock


function App() {
  return (
    <div className="App">
      <Clock />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
