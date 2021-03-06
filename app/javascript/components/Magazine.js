import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import Issues from "./Issues";
import Pages from "./Pages";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function Magazine(props) {

    // Note: issues are provided by the Rails view using the react_component helper;
    //       I.e. they're already in the page, not dynamically loaded via Api.
    const { issues } = props
    const [currentIssue, setCurrentIssue] = useState(issues[0]);



    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <div id="magazine" className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Issues
                            issues={props.issues}
                            currentIssueId={currentIssue.id}
                            setCurrentIssue={setCurrentIssue}
                        />
                    </Grid>
                    <Grid item xs={9} className="pages">
                        <Pages issue={currentIssue} />
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    )
}

Issues.propTypes = {
    issues: PropTypes.array
};
export default Magazine