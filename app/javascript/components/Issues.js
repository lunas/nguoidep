import React from "react"
import PropTypes from "prop-types"
class Issues extends React.Component {
  render () {
    return (
      <React.Fragment>
          <ul>
          {this.props.issues.map(issue => (
              <li key={issue.id}>{issue.title}</li>
          ))}
          </ul>
      </React.Fragment>
    );
  }
}

Issues.propTypes = {
  issues: PropTypes.array
};
export default Issues
