/**
 * Created by eatong on 17-11-24.
 */
import Document, {Head, Main, NextScript} from 'next/document';
import appStyle from '../styles/app.less';
import flush from 'styled-jsx/server'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">

      {process.env.NODE_ENV === 'production'
        ? (
          <Head>
            <link
              rel="stylesheet"
              type="text/css"
              href={`/app.css?${this.props.__NEXT_DATA__.buildStats['app.js'].hash}`}
            />
          </Head>
        ) : (
          <Head>
            <style global dangerouslySetInnerHTML={{__html: appStyle}}/>
          </Head>
        )}
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    );
  }
}
