import React, { Component, PropTypes } from "react";
import { changeVersion } from '../actions/actionCreators.js';
import Autosuggest from "react-bootstrap-autosuggest";
import "react-bootstrap-autosuggest/src/Autosuggest.scss";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class VersionSelector extends React.Component {
  render () {
    return (
      <form>
        <Autosuggest
          onChange={dispatch(changeVersion(input))}
          datalist={this.props.versionOptions}
          placeholder={store.state.version}
        />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    version: changeVersion(state.version)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      changeVersion
    }, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionSelector);
