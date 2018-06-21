import React, {Component} from "react";
import {Tabs, Tab} from "react-bootstrap";
import {SummaryView} from "./SummaryView.js";

export class ViewSelector extends Component {
  render() {
    return (
      <Tabs
        defaultActiveKey={1}
        id="view-tabs"
      >
        <Tab
          eventKey={1}
          title="Summary"
        >
          <SummaryView />
        </Tab>
        <Tab
          eventKey={2}
          title="Distribution"
        >
        </Tab>
        <Tab
          eventKey={3}
          title="Comparison"
        >
        </Tab>
        <Tab
          eventKey={4}
          title="Evolution"
        >
        </Tab>
      </Tabs>
    );
  }
}
