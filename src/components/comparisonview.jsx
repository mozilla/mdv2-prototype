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

  onResize = () => {
    this.setState({plotWidth: 0.75 * window.innerWidth});
  };

  handleChange = (event) => {
    this.setState({compareVersion: event});
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    if (this.props.dataStore.active.metric !== "GC_MS") {
      return (
        <div>Cannot compare {this.props.dataStore.active.metric} to GC_MS</div>
      );
    }

    let data = [
      this.props.dataStore.active.data,
      GC_MS_nightly_61
    ];
    let x1 = GC_MS_nightly_61.map(e => e.start);
    let y1 = GC_MS_nightly_61.map(e => e.count);
    let y2 = this.props.dataStore.active.data.map(e => e.count);

    const metricName = this.props.dataStore.active.metric;
    const activeChannel = this.props.dataStore.active.channel;
    const activeVersion = this.props.dataStore.active.version;

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
              title={metricName}
              data={data}
              chart_type="line"
              x_label={metricName}
              y_label="Proportion of Users"
              y_accessor="proportion"
              x_accessor="start"
              area={[true, true]}
              x_scale_type= "log"
              width= {this.state.plotWidth}
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
                  name: activeChannel + " " + this.state.compareVersion,
                  opacity: 0.5,
                  mode: "markers",
                },
                {
                  x: x1,
                  y: y2,
                  type: "bar",
                  name: activeChannel + " " + activeVersion,
                  opacity: 0.6,
                  mode: "markers",
                },
              ]}
              layout={{
                barmode: "overlay",
                title: metricName,
                xaxis: {
                  type: "category",
                  title: metricName,
                },
                yaxis: {
                  title: "Number of Users",
                },
                width: this.state.plotWidth,
              }}
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
                  name: activeChannel + " " + this.state.compareVersion,
                  opacity: 0.5,
                  mode: "markers",
                },
                {
                  x: x1,
                  y: y2,
                  type: "bar",
                  name: activeChannel + " " + activeVersion,
                  opacity: 0.6,
                  mode: "markers",
                },
              ]}
              layout={{
                barmode: "group",
                title: metricName,
                xaxis: {
                  type: "category",
                  title: metricName,
                },
                yaxis: {
                  title: "Number of Users",
                },
                width: this.state.plotWidth,
              }}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
