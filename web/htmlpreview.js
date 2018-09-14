import React from "react";
import ReactDOM from "react-dom";
import marked from "marked";


const HTMLEXAMPLE = `<div>
  <h1>HEADER</h1>
  <h2>Here's a sub-heading.</h2>
  <a target="_blank" href="https://youtube.com"><strong>LINK TO YOUTUBE</strong></a>
  <ul>
    <li>Here's a list item.</li>
  </ul>
  <p>Here's an image.</p>
  <img src="https://avatars3.githubusercontent.com/u/5620346?v=4">
</div>`;

class Parser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: HTMLEXAMPLE };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  render() {
    var html = marked(this.state.input);
    return (
      <div>
        <textarea
          id="editor"
          value={this.state.input}
          onChange={this.handleChange}
          placeholder={HTMLEXAMPLE}
        />
        <p id="preview">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Parser />, rootElement);
