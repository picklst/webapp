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
            <meta charSet='utf-8'/>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'/>
            <meta name="description" content={meta && meta.description ? meta.description : seoTags.description} />
            <meta name="twitter:title" content={title} />
            <meta name="og:title" property="og:title" content={title} />
            <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1" />
            <link rel="manifest" href="/manifest.json" />
            <link href='/images/icons/icon-32x32.png' rel='icon' type='image/png' sizes='16x16' />
            <link href='/images/icons/icon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
            <link rel='apple-touch-icon' href='/images/icons/icon-512x512.png'></link>
            <meta name='theme-color' content='#317EFB' />
        </Head>
        <div className="app light dark-mode">{ children }</div>
        <div className="orientation-lock"><h2>Only Portrait Mode Supported. Rotate Device</h2></div>
    </React.Fragment>
};

Base.propTypes  = {
    children: PropTypes.element,
    meta: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string
    })
};

export default Base;