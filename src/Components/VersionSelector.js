import React from "react";
import {DropdownButton, MenuItem} from "react-bootstrap";

export class VersionSelector extends React.Component {
  render () {
    return (
      <DropdownButton
        id="selector"
        title={this.props.activeVersion}
      >
        {this.props.versionOptions.map( (option, index) => {
          return (
            <MenuItem
              key={index}
              eventKey={option}
              onSelect={this.props.onVersionChange}
            >
              {option}
            </MenuItem>);
          })
        }
      </DropdownButton>
    );
  }
}
