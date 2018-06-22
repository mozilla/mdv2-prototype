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
          title="Summary"
        >
          <SummaryView />
        </Tab>
        <Tab
          eventKey={"dist"}
          title="Distribution"
        >
          <DistributionView />
        </Tab>
        <Tab
          eventKey={"comp"}
          title="Comparison"
        >
          <ComparisonView />
        </Tab>
        <Tab
          eventKey={"evo"}
          title="Evolution"
        >
          <EvolutionView />
        </Tab>
      </Tabs>
    );
  }
}
