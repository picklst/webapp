import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { ServerStyleSheet } from 'styled-components';

import { extractCritical } from 'emotion-server'

class MyDocument extends Document {
    // static getInitialProps({ renderPage }) {
    //     // Step 1: Create an instance of ServerStyleSheet
    //     const sheet = new ServerStyleSheet();
    //     // Step 2: Retrieve styles from components in the page
    //     const page = renderPage((App) => (props) =>
    //         sheet.collectStyles(<App {...props} />),
    //     );
    //     // Step 3: Extract the styles as <style> tags
    //     const styleTags = sheet.getStyleElement();
    //     // Step 4: Pass styleTags as a prop
    //     return { ...page, styleTags };
    // }

    static getInitialProps({ renderPage }) {
        const page = renderPage();
        const styles = extractCritical(page.html);
        return { ...page, ...styles }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <style
                        data-emotion-css={this.props.ids.join(' ')}
                        dangerouslySetInnerHTML={{ __html: this.props.css }}
                    />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;