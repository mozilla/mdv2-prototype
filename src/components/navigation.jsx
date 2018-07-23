import React from "react";
import {Nav, NavItem, Navbar} from "react-bootstrap";

export class Navigation extends React.Component {
  render() {
    return (
      <Navbar fluid collapseOnSelect>
        <Navbar.Header className="header">
          <Navbar.Brand>
            Measurement Dashboard
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem>
              <i className="fas fa-link"></i> Get Shortlink
            </NavItem>
            <NavItem href="https://github.com/mozilla/telemetry-dashboard/issues">
              <i className="fas fa-bug"></i> Report a Bug
            </NavItem>
            <NavItem href="https://telemetry.mozilla.org/">
              <i className="fas fa-home"></i> Telemetry Portal
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
