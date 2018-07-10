import React from "react";
import {Grid, Row} from "react-bootstrap";
import Autosuggest from "react-bootstrap-autosuggest";
import "react-bootstrap-autosuggest/src/Autosuggest.scss";

export class VersionSelector extends React.Component {
  render () {
    return (
      <Grid className="version-search-bar" fluid>
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
    );
  }
}
