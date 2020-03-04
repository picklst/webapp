import React from 'react';
import PropTypes from 'prop-types';
import Head from "next/head";
import '../../styles/styles.sass';
import '../../styles/bootstrap.min.css';

const seoTags = require('../../data/seo.json');

const Base = ({ children, meta }) => {
    const title = `${meta && meta.title ? `${meta.title} |` : '' } ${seoTags.siteName} - ${seoTags.tagLine}`;

    return <React.Fragment>
        <Head>
            <title>{title}</title>
            <meta name="description" content={meta && meta.description ? meta.description : seoTags.description} />
            <meta name="twitter:title" content={title} />
            <meta name="og:title" property="og:title" content={title} />
            <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </Head>
        { children }
    </React.Fragment>
};

Base.prototype = {
    children: PropTypes.element,
    meta: PropTypes.shape({
        title: PropTypes.title,
        description: PropTypes.string
    })
};

export default Base;