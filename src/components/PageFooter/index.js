import React from 'react';
import PropTypes from 'prop-types';

import './PageFooter.css';
import FhirTransform from '../../FhirTransform.js';

let snapshotDate = null;

try {
  // Set snapshotDate if present
  snapshotDate = require('../../SNAPSHOT_DATE.js').snapshotDate; // eslint-disable-line global-require
} catch (err) {} // eslint-disable-line no-empty

//
// Render the page footer of DiscoveryApp page
//
export default class PageFooter extends React.Component {
  static propTypes = {
    resources: PropTypes.instanceOf(FhirTransform),
  }

  state = {
    snapshotDate: null,
  }

  componentDidMount() {
    this.setState({ snapshotDate });
  }

  render() {
    return (
      <div className="page-footer">
        <div className="footer-id">
          { this.props.resources && ` (${this.props.resources.transformed[0].id})` }
        </div>
        <div className="footer-snapshot-date">
          { this.state.snapshotDate ? `Snapshot: ${this.state.snapshotDate}` : null }
        </div>
      </div>
    );
  }
}
