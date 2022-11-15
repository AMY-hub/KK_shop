import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang='ru'>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
                <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;800&family=Open+Sans&family=Roboto+Slab&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"></link>
            </Head>
            <body>
                <Main />
                <div id='modal' />
                <NextScript />
            </body>
        </Html>
    );
}