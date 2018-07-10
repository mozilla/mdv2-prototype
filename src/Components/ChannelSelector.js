import React from "react";
import {Grid, Row} from "react-bootstrap";
import Autosuggest from "react-bootstrap-autosuggest";
import 'react-bootstrap-autosuggest/src/Autosuggest.scss';

export class ChannelSelector extends React.Component {
  render () {
    return (
      <Grid className="channel-search-bar" fluid>
        <Row>
          <Autosuggest
            onChange={this.props.onChannelChange}
            datalist={this.props.channelOptions}
            placeholder={this.props.activeChannel}
          />
        </Row>
      </Grid>
    );
  }
}
