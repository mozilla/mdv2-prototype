import React from "react";
import { connect } from 'react-redux';
import { changeChannel } from '../actions/actionCreators.js';

export class ChannelSelector extends React.Component {
  render () {
    let input;
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            dispatch(changeChannel(input.value));
            input.value= '';
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">
            Select channel
          </button>
        </form>
      </div>
    );
  }
}

ChannelSelector = connect()(changeChannel);
