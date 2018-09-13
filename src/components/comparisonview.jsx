import React, {Component} from "react";
import {Grid, Row, Col, DropdownButton, MenuItem} from "react-bootstrap";
import {MetricData} from "../metricdata.js";
import {BarPlot} from "./barplot.jsx";

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

  handleChange = (event) => {
    this.setState({compareVersion: event});
  }

  async loadDataToState(metric, channel, version) {
    await this.dataStore.loadDataFor(metric, channel, version);
    this.setState({compareData: this.dataStore.active});
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
          <BarPlot
            data={[this.state.compareData, this.props.dataStore.active]}
          />
        </Row>
      </Grid>
    );
  }
}
