import React, { Component } from 'react';
import {Nav} from "react-bootstrap";
import {NavItem} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import {Glyphicon} from "react-bootstrap";

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
              <Glyphicon glyph="link" /> Get Shortlink
            </NavItem>
            <NavItem target="_blank" href="https://github.com/mozilla/telemetry-dashboard/issues">
              <Glyphicon glyph="wrench" /> Report a Bug
            </NavItem>
            <NavItem target="_blank" href="https://telemetry.mozilla.org/">
              <Glyphicon glyph="home" /> Telemetry Portal
            </NavItem>
            <NavItem target="_blank" href="https://telemetry.mozilla.org/new-pipeline/tutorial.html#HistogramDashboard">
              <Glyphicon glyph="book" /> Usage Tutorial
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
