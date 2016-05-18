import React from 'react';
import Animated from 'animated/lib/targets/react-dom';
import HorizontalPan from './HorizontalPan';

// An example of how to use stateless functions effectively
// -- yes, inline styles -- I mostly do React Native so I can't
// comment on the best framework to do this on the web. @vjeux is
// working on something internally at FB that has given them perf
// gains in his experiments on the FB home feed so hopefully we'll
// see something from that
const Spacer = () => <div style={{marginBottom: 30}} />

export default class AnimatedExamples extends React.Component {
  render() {
    return (
      <div>
        <Spacer />
        <AnimatedExample1 />
        <Spacer />
        <AnimatedExample2 />
        <Spacer />
        <AnimatedExample3 />
        <Spacer />
        <AnimatedExample4 />
      </div>
    );
  }
}

// animated vs react-tween-state: performances, declarative
class AnimatedExample1 extends React.Component {
  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.spring(this.state.opacity, {
      toValue: 1,
      bounciness: 30,
      speed: 1,
    }).start();
  }

  render() {
    let { opacity } = this.state;

    let backgroundColor = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(5,0,0,1)', 'rgba(255,0,100,1)']
    });

    // You can add a listener in case you need to track the value to
    // tesdt if it has passed some threshold or save it for future
    backgroundColor.addListener((value) => {
      console.log(value);
    });

    let translateX = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['0px', '150px']
    });

    let rotate = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg']
    });

    let width = opacity.interpolate({
      inputRange: [0, 1], outputRange: [0, 150]
    });

    return (
      <Animated.div style={{
        opacity,
        backgroundColor,
        width,
        transform: [{translateX}, {rotate}],
        height: 150,
      }} />
    );
  }
}
class AnimatedExample2 extends React.Component {

  state = {
    xPosition: new Animated.Value(0),
    rotate: new Animated.Value(0),
    isDragging: new Animated.Value(0),
  }

  _lastRotate = 0;

  _spin = () => {
    let newRotate = this._lastRotate + 90 % 360;
    Animated.spring(this.state.rotate, {
      toValue: newRotate,
    }).start();

    this._lastRotate = newRotate;
  };

  _startDrag = () => {
    Animated.spring(this.state.isDragging, {toValue: 1}).start();
  }

  _endDrag = (velocity) => {
    Animated.spring(this.state.isDragging, {toValue: 0}).start();
  }

  render() {
    let rotate = this.state.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '1deg'],
    });

    let translateX = this.state.xPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['0px', '1px'],
    });

    let backgroundColor = this.state.isDragging.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255,0,0,1)', 'rgba(100,0,0,1)'],
    });

    return (
      <Animated.div
        onClick={this._spin}
        style={{
          transform: [{translateX}, {rotate}],
          backgroundColor,
          width: 100,
          height: 100,
        }}
        {...HorizontalPan(this.state.xPosition, {
          onStart: this._startDrag,
          onEnd: this._endDrag,
        })}
      />
    );
  }
}

class AnimatedExample3 extends React.Component {

  state = {
    xPosition: new Animated.Value(0),
    rotate: new Animated.Value(0),
    isDragging: new Animated.Value(0),
  }

  _lastRotate = 0;

  componentDidMount() {
    Animated.spring(this.state.rotate, {toValue: this.state.xPosition}).start();
  }

  _startDrag = (e) => {
    Animated.spring(this.state.isDragging, {toValue: 1}).start();
  }

  _endDrag = (e) => {
    Animated.spring(this.state.isDragging, {toValue: 0}).start();
  }

  render() {
    let rotate = this.state.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '1deg'],
    });

    let translateX = this.state.xPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['0px', '1px'],
    });

    let backgroundColor = this.state.isDragging.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255,0,0,1)', 'rgba(100,0,0,1)'],
    });

    return (
      <Animated.div
        onClick={this._spin}
        style={{
          transform: [{translateX}, {rotate}],
          backgroundColor,
          width: 100,
          height: 100,
        }}
        {...HorizontalPan(this.state.xPosition, {
          onStart: this._startDrag,
          onEnd: this._endDrag,
        })}
      />
    );
  }
}

class AnimatedExample4 extends React.Component {

  state = {
    xPosition: new Animated.Value(0),
    rotate: new Animated.Value(0),
    isDragging: new Animated.Value(0),
  }

  _lastRotate = 0;

  componentDidMount() {
    Animated.spring(this.state.rotate, {toValue: this.state.xPosition}).start();
  }

  _startDrag = () => {
    Animated.spring(this.state.isDragging, {toValue: 1}).start();
  }

  _endDrag = ({velocity}) => {
    Animated.spring(this.state.isDragging, {toValue: 0}).start();
    Animated.decay(this.state.xPosition, {velocity, deceleration: 0.99}).start((finished) => {
      if (finished) {
        Animated.timing(this.state.xPosition, {toValue: 0, duration: 150}).start();
      }
    });
  }

  render() {
    let rotate = this.state.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '1deg'],
    });

    let translateX = this.state.xPosition.interpolate({
      inputRange: [0, 1],
      outputRange: ['0px', '1px'],
    });

    let backgroundColor = this.state.isDragging.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255,0,0,1)', 'rgba(100,0,0,1)'],
    });

    return (
      <Animated.div
        onClick={this._spin}
        style={{
          transform: [{translateX}, {rotate}],
          backgroundColor,
          width: 100,
          height: 100,
        }}
        {...HorizontalPan(this.state.xPosition, {
          onStart: this._startDrag,
          onEnd: this._endDrag,
        })}
      />
    );
  }
}

// Exercise: Make a modal: tap a link to animate it in, then tap on the
// underlay or some button inside of the modal itself to animate it out.
// or, take the RemoteDataFetcher class, make it show a loading animation
// for at least 1 second when you tap on something, and make the loading
// animation with Animated.
