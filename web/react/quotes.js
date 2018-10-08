    import React from "react";
    import ReactDOM from "react-dom";
    import { Provider, connect } from "react-redux";
    import { createStore } from "redux";
    import $ from 'jquery';
    import "./styles.css";


    const QUOTES = [
      "On one hand, you want to tell the truth; but, on the other hand, you won’t get what you want.",

      "On one hand, you want to say something for its own sake; but, on the other hand, people wonder why.",

      "On one hand, you oppose an idea; but, on the other hand, people think you support its opposite.",

      "On one hand, you’re upset about the news; but, on the other hand, it’s not your problem.",

      "On one hand, you’re paranoid about friends and foes; but, on the other hand, no one gives enough of a shit to be either.",

      "On one hand, you need help; but, on the other hand, it’s going to cost you your freedom.",

      "On one hand, you call yourself a victim; but, on the other hand, you don’t blame yourself for doing so.",

      "On one hand, time is money; but, on the other hand, it’s not guaranteed.",

      "On one hand, you excel at your job; but, on the other hand, this rewards you with more toil.",

      "On one hand, you stand up for principle; but, on the other hand, it’s a luxury.",

      "On one hand, you condemn power; but, on the other hand, you do it because you want it.",

      "On one hand, you’re clever; but, on the other hand, you’re far from wise."
    ];

    var boxStyle = {
      alignContent: "center",
      textAlign: "center",
      padding: "30px",
      margin: "15%",

      borderWidth: "5px",
      borderStyle: "double",
      borderColor: "rgb(0, 51, 0)",

      fontSize: "2em",
      fontFamily: "Roboto, sans-serif",
      color: "#001a33",
      background: "linear-gradient(#666600, #e6e600)"
    };

    var rnd = () => {
      return Math.floor(Math.random() * Math.floor(QUOTES.length));
    };

    class QuoteBox extends React.Component {
      constructor(props) {
        super(props);
        this.state = { quote: QUOTES[rnd()] };
        this.showQuote = this.showQuote.bind(this);
      }
      showQuote() {
        this.props.showNextQuote(QUOTES[rnd()]);
        this.setState({ quote: this.props.quote });
      }

      render() {
        return (
          <div id="quote-box" style={boxStyle}>
            <h1>
              <strong>On One Hand...</strong>
            </h1>
            <p id="text">{this.props.quote}</p>
            <p id="author" style={{ textAlign : "right", margin : "10px" }}><em>- DG</em></p>
            <button id="new-quote" style={{ marginRight: '4%' }} onClick={this.showQuote}>Quote</button>
            <a id="tweet-quote" class="button" style={{ textAlign: 'center', float: 'left' }} title="Tweet this quote!" href="twitter.com/intent/tweet">
              <i class="fa fa-twitter" />
            </a>
          </div>
        );
      }
    }

    const SHOW = "SHOW";
    const showAction = (quote) => {
      return {
        type: SHOW,
        quote: quote
      };
    };

    const quoteReducer = (state = QUOTES[rnd()], action) => {
      switch (action.type) {
        case SHOW:
          return action.quote;
        default:
          return state;
      }
    };

    const mapStateToProps = (state) => {
      return { quote: state };
    };
    const mapDispatchToProps = (dispatch) => {
      return {
        showNextQuote: quote => {
          dispatch(showAction(quote));
        }
      };
    };

    const store = createStore(quoteReducer);
    const Container = connect(
      mapStateToProps,
      mapDispatchToProps
    )(QuoteBox);

    ReactDOM.render(
      <Provider store={store}>
        <Container />
      </Provider>,
      document.getElementById("root")
    );
