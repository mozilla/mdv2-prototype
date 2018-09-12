import React, {Component} from "react";
import {Grid, Row, Col, DropdownButton, MenuItem} from "react-bootstrap";
import Plot from "react-plotly.js";
import {MetricData} from "../metricdata.js";

export class ComparisonView extends Component {
  constructor(props) {
    super(props);
    this.dataStore = new MetricData();
    this.prevProps = {};
    this.state = {
      compareVersion: "61",
      compareData: this.dataStore.active
    };
  }

  onResize = () => {
    this.setState({plotWidth: 0.75 * window.innerWidth});
  };

  handleChange = (event) => {
    this.setState({compareVersion: event});
  }

  async loadDataToState(metric, channel, version) {
    await this.dataStore.loadDataFor(metric, channel, version);
    this.setState({compareData: this.dataStore.active});
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  componentDidUpdate(prevProps, prevState) {
    const {metric, channel, version} = this.props.dataStore.active;
    if (this.prevProps.metric !== metric ||
      this.prevProps.channel !== channel ||
      this.prevProps.version !== version ||
      prevState.compareVersion !== this.state.compareVersion
    ) {
      this.loadDataToState(this.props.dataStore.active.metric, this.props.dataStore.active.channel, this.state.compareVersion);
    }

    this.prevProps = {
      metric: prevProps.dataStore.active.metric,
      channel: prevProps.dataStore.active.channel,
      version: prevProps.dataStore.active.version
    };
  }

  render() {
    const {metric, channel, version} = this.props.dataStore.active;
    const COMPARABLE_MEASURES = [
      "GC_MS",
      "scalars_timestamps_first_paint",
      "scalars_browser_engagement_tab_open_event_count",
    ];
    if (!COMPARABLE_MEASURES.includes(metric) || !this.state.compareData) {
      return (
        <div>Comparison View is currenty not supported for <span className="metric-name">{this.props.dataStore.active.metric}</span></div>
      );
    }

    let x1 = this.state.compareData.data.map(e => e.start);
    let y1 = this.state.compareData.data.map(e => e.count);
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
            <Plot
              data={[
                {
                  x: x1,
                  y: y1,
                  type: "bar",
                  name: channel + " " + this.state.compareVersion,
                  opacity: 0.5,
                  mode: "markers",
                },
                {
                  x: x1,
                  y: y2,
                  type: "bar",
                  name: channel + " " + version,
                  opacity: 0.6,
                  mode: "markers",
                },
              ]}
              layout={{
                barmode: "group",
                title: metric,
                xaxis: {
                  type: "category",
                  title: metric,
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
