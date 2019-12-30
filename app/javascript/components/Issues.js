import React, {useState} from "react"
import PropTypes from "prop-types"
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

function Issues(props) {

    const [query, setQuery] = useState('');

    const handleFilterChange = (event) => setQuery(event.target.value);
    const filteredIssues = query === ''
        ? props.issues
        : props.issues.filter((issue) =>
            issue.title.toLowerCase().indexOf(query.toLowerCase()) >= 0);

    const handleKeyUp = (event) => {
        if (event.key === 'Escape') {
            event.target.value = '';
            setQuery('');
        }
    };

    const classes = useStyles();

    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>

                <TextField
                    id="filter"
                    label="Filter issues"
                    type="search"
                    onChange={handleFilterChange}
                    onKeyUp={handleKeyUp}
                />
            </FormControl>
            <ul className="issues">
            {filteredIssues.map(issue => (
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
