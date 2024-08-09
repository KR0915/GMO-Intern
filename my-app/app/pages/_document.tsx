import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
          {/* PNG形式のファビコンを使用する場合は以下の行を使用 */}
          {/* <link rel="icon" href="/favicon.png" type="image/png" sizes="16x16" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;