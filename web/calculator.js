import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";


const OPS = {
  'x': {
    order: 1,
    func: (j, k) => Number(j) * Number(k)
  },
  '/': {
    order: 1,
    func: (j, k) => Number(j) / Number(k)
  },
  '+': {
    order: 2,
    func: (j, k) => Number(j) + Number(k)
  },
  '-': {
    order: 2,
    func: (j, k) => Number(j) - Number(k)
  }
};


var isNum = (c) => { return /\d/.test(c); };
var isOP = (c) => { return OPS.hasOwnProperty(c); };


class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: [],
      result: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.updateExpression = this.updateExpression.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleClick(e) {
    var val = e.target.value;
    switch (val) {
      case 'AC':
        this.setState({ expression: [], result: 0 });
        break;
      case '=':
        this.calculate(this.state.expression);
        break;
      default:
        this.updateExpression(val);
        break;
    }
  }

  handleKey(event) {
    var char = event.key;
    if (isNum(char) || isOP(char) || char === '.') {
      this.updateExpression(char);
      // backspace
    } else if (event.keyCode === 8) {
      this.setState({ expression: this.state.expression.splice(0, this.state.expression.length - 1) });
      // enter
    } else if (event.keyCode === 13) {
      this.calculate(this.state.expression);
    }
  }

  updateExpression(char) {
    var last = this.state.expression.length - 1;
    var newArr = this.state.expression;

    if (isNum(newArr[last])) {
      if (isNum(char) || char === '.') {
        newArr[last] = newArr[last].concat(char);
      } else { newArr.push(char); }
    } else {
      if (isNum(char)) { newArr.push(char); }
    }
    this.setState({ expression: newArr });
    console.log(this.state.expression);
  }

  calculate(arr) {
    var newArr = arr.slice();
    var len = newArr.length;
    var op = '';
    var char = '';
    var idx = 1;

    if (len >= 3 && len % 2 !== 0) {
      var i = 1;
      char = newArr[i];
      op = char;

      while (i < len) {
        if (OPS[char].order < OPS[op].order) {
          op = char;
          idx = i;
        }
        i += 2;
        char = newArr[i];
      } // end while

      var result = String(OPS[op].func(newArr[idx - 1], newArr[idx + 1]));
      newArr.splice(idx - 1, 3, result);

      console.log('result: ' + result);
      console.log('new arr: ' + newArr);
      return this.calculate(newArr);
    } // end if
    this.setState({ expression: newArr, result: newArr });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }

  render() {
    return (
      <div id="interface" class="container">
        <div id="display" class="container">
          <h1>{this.state.expression}</h1>
        </div>
        <div id="keypad" class="container">
          <div id="nums" class="container">
            <button id="one" value='1' onClick={this.handleClick}>1</button>
            <button id="two" value='2' onClick={this.handleClick}>2</button>
            <button id="three" value='3' onClick={this.handleClick}>3</button>
            <button id="four" value='4' onClick={this.handleClick}>4</button>
            <button id="five" value='5' onClick={this.handleClick}>5</button>
            <button id="six" value='6' onClick={this.handleClick}>6</button>
            <button id="seven" value='7' onClick={this.handleClick}>7</button>
            <button id="eight" value='8' onClick={this.handleClick}>8</button>
            <button id="nine" value='9' onClick={this.handleClick}>9</button>
            <button id="zero" value='0' onClick={this.handleClick}>0</button>
            <button id="clear" value='AC' onClick={this.handleClick}>AC</button>
          </div>
          <div id="ops" class="container">
            <button id="add" value='+' onClick={this.handleClick}>+</button>
            <button id="subtract" value='-' onClick={this.handleClick}>-</button>
            <button id="multiply" value='x' onClick={this.handleClick}>x</button>
            <button id="divide" value='/' onClick={this.handleClick}>/</button>
            <button id="equals" value='=' onClick={this.handleClick}>=</button>
            <button id="dot" value='.' onClick={this.handleClick}>.</button>
          </div>
        </div>
      </div>
    );
  }
} // end Calculator


ReactDOM.render(<Calculator />, document.getElementById("root"));
