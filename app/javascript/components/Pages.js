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
import {grey} from "@material-ui/core/colors";


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

Pages.propTypes = {
    issue: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string
    })
};

function Pages({issue}) {

    const issueId = issue.id;
    const classes = useStyles();

    const [pages, setPages] = useState([]);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [flipPage, setFlipPage] = useState({});

    useEffect(() => {
        getPages(issueId)
            .then(result => {
                setPages(result.data);
                setPageIndex(0);
            });
    }, [issueId]);

    const prevClick = () => {
        const newPageIndex = pageIndex - 1;
        setPageIndex(newPageIndex);
        flipPage.gotoPage(newPageIndex);
    };
    const nextClick = () => {
        const newPageIndex = pageIndex + 1;
        setPageIndex(newPageIndex);
        flipPage.gotoPage(newPageIndex);
    };
    const prevLink = () => (pageIndex === 0)
                     ? <a style={{ color: 'grey' }}>previous</a>
                     : <a onClick={prevClick} href="#">previous</a>;

    const nextLink = () => (pageIndex >= pages.length - 1 )
                     ? <a style={{ color: 'grey' }}>next</a>
                     : <a onClick={nextClick} href="#">next</a>;

    const changePageNr = event => {
        setPageIndex(event.target.value - 1);
        flipPage.gotoPage(event.target.value - 1);
    };

    const onFlip = (flipPageIndex, direction) => {
        setPageIndex(flipPageIndex);
    };

    return (
        <React.Fragment>
            <Box display="flex" flexDirection="row" justifyContent="space-between" m={1} p={1}>
                {prevLink()}
                <FormControl className={classes.formControl}>
                    <InputLabel id="page-nr-label">Go to page</InputLabel>
                    <Select
                        labelId="page-nr-label"
                        id="page-nr-select"
                        value={pageIndex + 1}
                        onChange={changePageNr}
                    >
                        {pages.map( (page, index) => (
                            <MenuItem key={page.id} value={page.page_nr} selected={page.page_nr===1}>
                                {page.page_nr}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {nextLink()}
            </Box>
            <div style={{ width: '100%', maxWidth: '1400px' }}>
                <FlipPage
                    orientation="horizontal"
                    uncutPages={true}
                    height="1500"
                    width="100%"
                    flipOnTouch
                    showTouchHint
                    showHint
                    perspective="100em"
                    animationDuration={400}
                    onPageChange={onFlip}
                    ref={(component) => { setFlipPage(component); }}
                >
                    {pages.map( (page, index) => (
                        <article key={page.id}>
                            <p>{page.title} on page {page.page_nr}</p>
                            <img src={page.image_url} className="page-image" />
                        </article>
                    ))}
                </FlipPage>
            </div>
        </React.Fragment>
    )
}

export default Pages