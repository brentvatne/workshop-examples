import React from 'react';

// Destructuring & stateless functions
// - Very concise, absolutely minimal API
// - If you don't need state, don't use it!
export const FullName = ({ firstName, lastName }) => {
  return (
    <h2>{lastName.toUpperCase()}, {firstName}</h2>
  );
}

// async/await
// - We use this everywhere on our projects at Exponent
// - Alternatives: promises, callbacks, rx
async function getExampleData(url) {
  let response = await fetch(url);
  return response.json();
}

// Es6 classes:
// - Gets rid of the React-specific class definition
export class RemoteDataFetcher extends React.Component {

  // static class property
  // -- propTypes are likely going away in favour of Flow
  static propTypes = {
    endpoint: React.PropTypes.string.isRequired,
    appendText: React.PropTypes.string.isRequired,
  };

  // instance property, well worth enabling this transform!
  state = {
    result: null,
  };

  // instance property as a bound async function
  // -- this is useful for performance reasons and also the
  // most succinct way to bind callbacks on es6 classes
  _handleClick = async () => {
    try {
      let result = await getExampleData(this.props.endpoint);

      // short-hand object key-value notation
      this.setState({result});
    } catch(e) {
      this.setState({error: e.message});
    }
  }

  // shorthand object functions
  // -- you should use them everywhere
  render() {
    if (this.state.error) {
      return (
        <p>
          Uh oh, could not reach {this.props.endpoint}!
          <br />
          <a href="#" onClick={this._handleClick}>
            Try again
          </a>
        </p>
      );
    } else if (this.state.result) {
      return (
        <p>{JSON.stringify(this.state.result)}</p>
      );
    } else {
      return (
        <a href="#" onClick={this._handleClick}>
          Get data! ({this.props.appendText})
        </a>
      );
    }
  }
}

// Exercise: make something that uses async/await and ES6 classes
