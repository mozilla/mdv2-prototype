import React, {Component} from "react";
import {Tabs, Tab} from "react-bootstrap";
import {SummaryView} from "./summaryview.jsx";
import {DistributionView} from "./distributionview.jsx";
import {ComparisonView} from "./comparisonview.jsx";
import {EvolutionView} from "./evolutionview.jsx";

export class ViewSelector extends Component {
  render() {
    return (
      <div className="view-selector">
        <Tabs
          defaultActiveKey={"summary"}
          id="view-tabs"
        >
          <Tab
            eventKey={"summary"}
            title={<span><i className="fas fa-chart-pie"></i> Summary</span>}
          >
            <SummaryView
              activeVersion = {this.props.activeVersion}
              activeMetric = {this.props.activeMetric}
              activeChannel = {this.props.activeChannel}
              change = {this.props.change}
              median = {this.props.median}
              nfifthPercentile = {this.props.nfifthPercentile}
            />
          </Tab>
          <Tab
            eventKey={"distribution"}
            title={<span><i className="far fa-chart-bar"></i> Distribution</span>}
          >
            <DistributionView
              activeMetric = {this.props.activeMetric}
              currentData = {this.props.currentData}
              mean = {this.props.mean}
            />
          </Tab>
          <Tab
            eventKey={"comparison"}
            title={<span><i className="fas fa-chart-area"></i> Comparison</span>}
          >
            <ComparisonView />
          </Tab>
          <Tab
            eventKey={"evolution"}
            title={<span><i className="fas fa-chart-line"></i> Evolution</span>}
          >
            <EvolutionView
              activeMetric = {this.props.activeMetric}
              currentData = {this.props.currentData}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
