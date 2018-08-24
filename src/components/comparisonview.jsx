import React, {Component} from "react";
import {Grid, Row, Col, DropdownButton, MenuItem} from "react-bootstrap";
import MetricsGraphics from "react-metrics-graphics";
import GC_MS_nightly_61 from "./../data/GC_MS_nightly_61";

export class ComparisonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compareVersion: "61",
    };
  }

  handleChange = (event) => {
    this.setState({compareVersion: event});
  }

  render() {
    let data = [this.props.dataStore.active.data, GC_MS_nightly_61];
    return (
      <Grid  className="comparison view" fluid>
        <Row>
          <Col>
            <i className="fas fa-info-circle"></i> The comparison view displays the distribution of a measure across two versions.
          </Col>
          <Col>
            <div>Select a version below to compare against.</div>
            <div>Hover over a point on the graph to view a specific set of values.</div>
          </Col>
          <Col>
            <DropdownButton
              id="selector"
              title={this.state.compareVersion}
            >
              {this.props.dataStore.versionOptions.map( (option, index) => {
                return (
                  <MenuItem
                    key={index}
                    eventKey={option}
                    onSelect={this.handleChange}
                  >
                    {option}
                  </MenuItem>);
                })
              }
            </DropdownButton>
          </Col>
          <Col>
            <MetricsGraphics
              title={this.props.dataStore.active.metric}
              data={data}
              chart_type="line"
              x_label={this.props.dataStore.active.metric}
              y_label="Proportion of Users"
              y_accessor="proportion"
              x_accessor="start"
              area={[true, true]}
              full_width={true}
              full_height={true}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
