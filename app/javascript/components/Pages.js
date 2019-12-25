import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {getPages} from "../api/pages";

function Pages(props) {

    const [pages, setPages] = useState([]);

    useEffect(() => {
        getPages(props.issue.id)
            .then(result => setPages(result.data));
    }, [props.issue.id]);

    return (
        <React.Fragment>
            <h2>Pages for issue {props.issue.title}</h2>
            <p>Issue ID = {props.issue.id}</p>
            <ul id="pages">
                {pages.map(page => (
                    <li key={page.id}>
                        {page.title}/{page.page_nr}: {page.url}
                    </li>
                ))}
            </ul>
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