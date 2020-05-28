import React from 'react';
import PropTypes from 'prop-types';
import Head from "next/head";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import '../../styles/styles.sass';
import '../../styles/bootstrap.min.css';
import '../../styles/gg.css';
import '../../styles/animate.css';


const seoTags = require('../../data/seo.json');

const Base = ({ children, meta }) => {
    const title = `${meta && meta.title ? `${meta.title} |` : '' } ${seoTags.siteName} - ${seoTags.tagLine}`;


    const consoleMsg = `
██████  ██  ██████ ██   ██ ██      ███████ ████████ 
██   ██ ██ ██      ██  ██  ██      ██         ██    
██████  ██ ██      █████   ██      ███████    ██    
██      ██ ██      ██  ██  ██           ██    ██    
██      ██  ██████ ██   ██ ███████ ███████    ██    
                                            
Peeking under the hood?

Picklst is powered by React, GraphQL & Django at its core.
Checkout our blog - engineering.picklst.com, if you're geeky.

* If you find any bug or vulnerabilities in the platform,
please report it at bugs@picklst.com

* We are looking out for developers just like you,
send a mail to build@picklst.com and let's team up!
           
`;

    console.log(consoleMsg);

    return <React.Fragment>
        <Head>
            <title>{title}</title>
            <meta charSet='utf-8'/>
            <meta name='theme-color' content='#317EFB' />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
            <meta name="description" content={meta && meta.description ? meta.description : seoTags.description} />
            <meta name="twitter:title" content={title} />
            <meta property="og:title" content={title} />
            {   meta.image && <meta property="og:image" content={meta.image} /> }
            <meta name="viewport" content="width=device-width, minimum-scale=1, shrink-to-fit=no, initial-scale=1, user-scalable=no" />
            <link rel="manifest" href="/manifest.json" />
            <link href='/images/icons/icon-32x32.png' rel='icon' type='image/png' sizes='16x16' />
            <link href='/images/icons/icon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
            <link rel='apple-touch-icon' href='/images/icons/icon-512x512.png' />
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-167849096-1"></script>
            <script dangerouslySetInnerHTML={{ __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'UA-167849096-1');
            `}} />
        </Head>
        <div className="app light dark-mode animated fadeIn">
            {children}
            <ToastContainer />
        </div>
    </React.Fragment>
};

Base.propTypes  = {
    children: PropTypes.node,
    meta: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string
    })
};

export default Base;