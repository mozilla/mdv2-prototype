import React, {Component} from "react";
import {Grid, Row, Col, Tab, Nav, NavItem} from "react-bootstrap";
import {TableMode} from "./TableMode.js";
import MetricsGraphics from "react-metrics-graphics";
import 'metrics-graphics/dist/metricsgraphics.css';

export class DistributionView extends Component {
  render() {
    return (
      <Grid  className="dist-view" fluid>
        <Row>
          <Col>
            <i className="fas fa-info-circle"></i> The distribution view displays the distribution of user outcomes as a histogram.
          </Col>
          <Col>
            <div>Hover over a point on the graph to view a specific value.</div>
            <div>Or, switch to table mode below to see a list of all absolute values.</div>
          </Col>
        </Row>
        <Row>
          <Tab.Container
            defaultActiveKey="graph"
            id="view-options"
          >
            <Row>
              <Col>
                <Nav bsStyle="pills" className="view-options">
                  <NavItem eventKey="graph">Graph</NavItem>
                  <NavItem eventKey="table">Table</NavItem>
                </Nav>
              </Col>
              <Col>
                <Tab.Content animation>
                  <Tab.Pane eventKey="graph">
                    <MetricsGraphics
                      title={this.props.activeMetric}
                      data={ [{'date':new Date('2014-11-01'),'value':12}, {'date':new Date('2014-11-02'),'value':18}] }
                      width={600}
                      height={250}
                      x_label={this.props.activeMetric}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="table">
                    <TableMode
                      activeMetric = {this.props.activeMetric}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Row>
      </Grid>
    )
  }
}
