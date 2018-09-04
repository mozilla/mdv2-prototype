import React, {Component} from "react";
import {Table} from "react-bootstrap";

export class TableMode extends Component {
  renderLabel() {
    return (
      <div className="table-mode">
        <h3>{this.props.activeMetric}</h3>
        <Table striped bordered condensed>
          <thead>
            <tr>
              <th>Label</th>
              <th>Count</th>
              <th>Proportion</th>
            </tr>
          </thead>
          <tbody>
            {this.props.currentData.map( (data, index) =>
              <tr key={index}>
                <td>{data.label}</td>
                <td>{data.count}</td>
                <td>{data.proportion}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }

  renderStartEnd() {
    return (
      <div className="table-mode">
        <h3>{this.props.activeMetric}</h3>
        <Table striped bordered condensed>
          <thead>
            <tr>
              <th>Start</th>
              <th>End</th>
              <th>Count</th>
              <th>Proportion</th>
            </tr>
          </thead>
          <tbody>
            {this.props.currentData.map( (data, index) =>
              <tr key={index}>
                <td>{data.start}</td>
                <td>{data.end}</td>
                <td>{data.count}</td>
                <td>{data.proportion}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    if (this.props.currentData[0] && this.props.currentData[0].label) {
      return this.renderLabel();
    } else {
      return this.renderStartEnd();
    }
  }
}
