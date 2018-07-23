import React from "react";
import {DropdownButton, MenuItem} from "react-bootstrap";

export class ChannelSelector extends React.Component {
  render () {
    return (
      <div className="channel-selector">
        Viewing Firefox data per user for Firefox
        <DropdownButton
          id="selector"
          title={this.props.activeChannel}
        >
          {this.props.channelOptions.map( (option, index) => {
            return (
              <MenuItem
                key={index}
                eventKey={option}
                onSelect={this.props.onChannelChange}
              >
                {option}
              </MenuItem>);
            })
          }
        </DropdownButton>
        version
      </div>
    );
  }
}
