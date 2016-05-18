import React from 'react';
import Immutable from 'immutable';
import AnimatedExamples from './AnimatedExamples';
import ReactMotionExamples from './ReactMotionExamples';
import ImmutableExamples from './ImmutableExamples';
import ContainerExample from './ContainerExample';

import {
  FullName,
  RemoteDataFetcher,
} from './Es6Examples';

const STATELESS_FUNCTION_EXAMPLE = false;
const ASYNC_AWAIT_EXAMPLE = true;
const ANIMATED_EXAMPLES = false;
const REACT_MOTION_EXAMPLES = false;
const IMMUTABLE_EXAMPLES = false;
const CONTAINER_EXAMPLE = false;

export default React.createClass({
  render() {
    return (
      <div>
        {STATELESS_FUNCTION_EXAMPLE &&
          <FullName
            firstName="First Name"
            lastName="Last Name"
          />}

        {ASYNC_AWAIT_EXAMPLE &&
          <div>
            <RemoteDataFetcher
              appendText="working"
              endpoint="example.json" />
            <br />
            <RemoteDataFetcher
              appendText="broken"
              endpoint="lolnothing.json" />
          </div>}

        {ANIMATED_EXAMPLES &&
          <AnimatedExamples />}

        {REACT_MOTION_EXAMPLES &&
          <ReactMotionExamples />}

        {IMMUTABLE_EXAMPLES &&
          <ImmutableExamples />}

        {CONTAINER_EXAMPLE &&
          <ContainerExample />}

        { /* Talk about Codemods */ }
        { /* Talk about Exponent */ }
      </div>
    );
  }
});
