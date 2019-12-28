import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {getPages} from "../api/pages";
import FlipPage from "react-flip-page"
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

function Pages(props) {

    const classes = useStyles();

    const [pages, setPages] = useState([]);
    const [pageIndex, setPageIndex] = React.useState(1);
    const [flipPage, setFlipPage] = useState({});

    useEffect(() => {
        getPages(props.issue.id)
            .then(result => setPages(result.data));
    }, [props.issue.id]);

    const prevLink = (index) => (index === 0) ? '' : <a>previous</a>;
    const nextLink = (index) => (index === pages.length - 1) ? '' : <a>next</a>;

    const changePageNr = event => {
        setPageIndex(event.target.value);
        flipPage.gotoPage(event.target.value - 1);
    };

    return (
        <React.Fragment>
            <FormControl className={classes.formControl}>
                <InputLabel id="page-nr-label">Go to page</InputLabel>
                <Select
                    labelId="page-nr-label"
                    id="page-nr-select"
                    value={pageIndex}
                    onChange={changePageNr}
                >
                    {pages.map( (page, index) => (
                        <MenuItem key={page.id} value={page.page_nr} selected={page.page_nr===1}>
                            {page.page_nr}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div style={{ width: '100%', maxWidth: '1400px' }}>
                <FlipPage
                    orientation="horizontal"
                    uncutPages={true}
                    height="1000"
                    width="100%"
                    flipOnTouch
                    showTouchHint
                    showHint
                    perspective="100em"
                    animationDuration={400}
                    ref={(component) => { setFlipPage(component); }}
                >
                    {pages.map( (page, index) => (
                        <article key={page.id} display="flex" >
                            <Box display="flex"
                                 flex-direction="row"
                                 justifyContent="space-between"
                            >
                                <Box>{prevLink(index)}</Box>
                                <Box>{page.title}, #{page.page_nr}</Box>
                                <Box>{nextLink(index)}</Box>
                            </Box>
                            <Box>
                                <img src={page.image_url} className="page-image" />
                            </Box>
                        </article>

                    ))}
                </FlipPage>
            </div>
        </React.Fragment>
    )
}

Pages.propTypes = {
    issue: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string
    })
};
export default Pages