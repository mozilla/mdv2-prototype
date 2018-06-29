import React, {Component} from "react";
import {Table} from "react-bootstrap";

export class TableMode extends Component {
  render() {
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
            {this.props.currentData.map( data =>
              <tr>
                <td>{data.start}</td>
                <td>{data.end}</td>
                <td>{data.count}</td>
                <td>{data.proportion}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}
