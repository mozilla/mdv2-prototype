import React, {Component} from "react";
import {Tabs, Tab} from "react-bootstrap";
import {SummaryView} from "./SummaryView.js";
import {DistributionView} from "./DistributionView.js";
import {ComparisonView} from "./ComparisonView.js";
import {EvolutionView} from "./EvolutionView.js";

export class ViewSelector extends Component {
  render() {
    return (
      <Tabs
        defaultActiveKey={"sum"}
        id="view-tabs"
      >
        <Tab
          eventKey={"sum"}
          title={<span><i className="fas fa-chart-pie"></i> Summary</span>}
        >
          <SummaryView
            activeVersion = {this.props.activeVersion}
            activeMetric = {this.props.activeMetric}
            activeChannel = {this.props.activeChannel}
          />
        </Tab>
        <Tab
          eventKey={"dist"}
          title={<span><i className="far fa-chart-bar"></i> Distribution</span>}
        >
          <DistributionView
            activeMetric = {this.props.activeMetric}
          />
        </Tab>
        <Tab
          eventKey={"comp"}
          title={<span><i className="fas fa-chart-area"></i> Comparison</span>}
        >
          <ComparisonView />
        </Tab>
        <Tab
          eventKey={"evo"}
          title={<span><i className="fas fa-chart-line"></i> Evolution</span>}
        >
          <EvolutionView />
        </Tab>
      </Tabs>
    );
  }
}
