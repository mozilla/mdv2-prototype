import React, { Component } from 'react';
import {Nav} from "react-bootstrap";
import {NavItem} from "react-bootstrap";

export class ViewSelector extends React.Component {
  render() {
    return (
      <Nav bsStyle="tabs" activeKey="1">
        <NavItem eventKey="1" title="summary" href="#">
          Summary
        </NavItem>
        <NavItem eventKey="2" title="distribution">
          Distribution
        </NavItem>
        <NavItem eventKey="3" title="comparison">
          Comparison
        </NavItem>
        <NavItem eventKey="4" title="evolution">
          Evolution
        </NavItem>
      </Nav>
    );
  }
}
