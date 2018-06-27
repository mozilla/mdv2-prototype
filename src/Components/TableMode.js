import React, {Component} from "react";
import {Table} from "react-bootstrap";

export class TableMode extends Component {
  render() {
    return (
      <Table striped bordered condensed responsive>
        <thead>
          <tr>
            <th>Start</th>
            <th>End</th>
            <th>{this.props.activeMetric}</th>
          </tr>
        </thead>
      </Table>
    )
  }
}
