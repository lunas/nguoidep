import React from "react"
import PropTypes from "prop-types"

function Issues(props) {
    return (
        <React.Fragment>
            <ul className="issues">
            {props.issues.map(issue => (
               <li key={issue.id}
                   className={props.currentIssueId === issue.id ? 'currentIssue' : ''}
               >
                   <a href="#" onClick={() => props.setCurrentIssue(issue)}>
                       {issue.title}
                   </a>
               </li>
           ))}
           </ul>
       </React.Fragment>
    )
};
Issues.propTypes = {
    issues: PropTypes.array,
    currentIssueId: PropTypes.number,
    setCurrentIssue: PropTypes.func
};
export default Issues
