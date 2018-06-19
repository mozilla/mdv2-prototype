import React, { Component } from 'react';
import {Nav} from "react-bootstrap";
import {NavItem} from "react-bootstrap";
import {Navbar} from "react-bootstrap";

export class Navigation extends Component {
  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header className="header">
          Measurement Dashboard
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>
              <i className="fas fa-link"></i> Get Shortlink
            </NavItem>
            <NavItem target="_blank" href="https://github.com/mozilla/telemetry-dashboard/issues">
              <i className="fas fa-bug"></i> Report a Bug
            </NavItem>
            <NavItem target="_blank" href="https://telemetry.mozilla.org/">
              <i className="fas fa-home"></i> Telemetry Portal
            </NavItem>
            <NavItem target="_blank" href="https://telemetry.mozilla.org/new-pipeline/tutorial.html#HistogramDashboard">
              <i className="far fa-question-circle"></i> Usage Tutorial
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
