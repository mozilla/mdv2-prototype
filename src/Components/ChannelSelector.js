import React from "react";
import {Grid, Row} from "react-bootstrap";
import Autosuggest from "react-bootstrap-autosuggest"

export class ChannelSelector extends React.Component {
  render () {
    return (
      <Grid className="search-bar" fluid>
        <Row>
          <form>
            <Autosuggest
              onChange={this.props.onChannelChange}
              datalist={this.props.channelOptions}
              placeholder={this.props.activeChannel}
            />
          </form>
        </Row>
      </Grid>
    )
  }
}
