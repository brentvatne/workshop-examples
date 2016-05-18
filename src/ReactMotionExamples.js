import React from 'react';
import { TransitionMotion, spring } from 'react-motion';
import _ from 'lodash';

export default class ReactMotionExamples extends React.Component {
  render() {
    return (
      <div>
        <ReactMotionExample1 />
      </div>
    );
  }
}

let counter = 0;

class ReactMotionExample1 extends React.Component {
  state = {
    items: [{key: '-3'}, {key: '-2'}, {key: '-1'}],
  };

  render() {
    let styles = this.state.items.map(item => ({
      key: item.key,
      style: {width: spring(100), height: spring(100)},
    }));

    return (
      <div>
        <TransitionMotion
          willEnter={this._willEnter}
          willLeave={this._willLeave}
          styles={styles}>
          {itemConfigs => (
            <div>
              {itemConfigs.map(config => (
                <div
                  onClick={() => { this._removeItem(config.key) }}
                  key={config.key}
                  style={{...config.style, ...BASE_BOX_STYLE}}
                />
              ))}
            </div>
          )}
        </TransitionMotion>

        <div>
          <a href="#" onClick={this._addItem}>Add item</a>
        </div>
      </div>
    );
  }

  _willEnter = () => {
    return {width: 0, height: 0};
  }

  _willLeave = () => {
    return {width: spring(0), height: spring(0)};
  }

  _addItem = () => {
    let items = [
      ...this.state.items,
      {key: (counter + 1).toString(), size: 20},
    ];

    counter = counter + 1;

    this.setState({items});
  }

  _removeItem = (key) => {
    let items = _.filter(this.state.items, item => item.key !== key);
    this.setState({items});
  }
}

const BASE_BOX_STYLE = {
  display: 'inline-block',
  backgroundColor: '#eee',
  border: '1px solid black',
};

// Exercise: No, don't do this :P API is too difficult to learn quickly.
