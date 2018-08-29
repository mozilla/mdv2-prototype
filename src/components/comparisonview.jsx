import React, {Component} from "react";
import {Grid, Row, Col, DropdownButton, MenuItem} from "react-bootstrap";
import MetricsGraphics from "react-metrics-graphics";
import Plot from "react-plotly.js";
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
    let data = [
      this.props.dataStore.active.data,
      GC_MS_nightly_61
    ];
    let x1 = GC_MS_nightly_61.map(e => e.start);
    let y1 = GC_MS_nightly_61.map(e => e.count);
    let y2 = this.props.dataStore.active.data.map(e => e.count);

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
        </Row>
        <Row>
          <Col>
            <div>Comparing against version:
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
            </div>
          </Col>
        </Row>
        <Row>
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
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Plot
              data={[
                {
                  x: x1,
                  y: y1,
                  type: "bar",
                  name: this.props.dataStore.active.channel + " " + this.state.compareVersion,
                  opacity: 0.5,
                  mode: "markers",
                },
                {
                  x: x1,
                  y: y2,
                  type: "bar",
                  name: this.props.dataStore.active.channel + " " + this.props.dataStore.active.version,
                  opacity: 0.6,
                  mode: "markers",
                },
              ]}
              layout={{
                barmode: "overlay",
                title: this.props.dataStore.active.metric,
                xaxis: {
                  type: "category",
                  title: this.props.dataStore.active.metric,
                },
                yaxis: {
                  title: "Number of Users",
                },
              }}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
