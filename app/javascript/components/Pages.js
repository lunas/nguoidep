import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {getPages} from "../api/pages";
import FlipPage from "react-flip-page"
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

function Pages(props) {

    const [pages, setPages] = useState([]);
    const [flipPage, setFlipPage] = useState({});

    useEffect(() => {
        getPages(props.issue.id)
            .then(result => setPages(result.data));
    }, [props.issue.id]);

    const prevLink = (index) => (index === 0) ? '' : <a>previous</a>;
    const nextLink = (index) => (index === pages.length - 1) ? '' : <a>next</a>;

    return (
        <React.Fragment>
            <h2>Pages for issue {props.issue.title}</h2>
            <div style={{ width: '100%' }}>
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