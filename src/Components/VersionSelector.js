import React from "react";
import {Grid, Row} from "react-bootstrap";
import Autosuggest from "react-bootstrap-autosuggest"

export class VersionSelector extends React.Component {
  render () {
    return (
      <Grid className="search-bar" fluid>
        <Row>
          <form>
            <Autosuggest
              onChange={this.props.onVersionChange}
              datalist={this.props.versionOptions}
              placeholder={this.props.activeVersion}
            />
          </form>
        </Row>
      </Grid>
    )
  }
}
