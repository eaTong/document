/**
 * Created by eatong on 17-11-24.
 */
import Document, {Head, Main, NextScript} from 'next/document';
import stylesheet from '../styles/test.scss'


export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
      <Head>
        {process.env.NODE_ENV === 'production'
          ? <link
            rel="stylesheet"
            type="text/css"
            href={`/_next/${this.props.__NEXT_DATA__.buildStats['app.js'].hash}/app.css`}
          />
          : <style
            global
            dangerouslySetInnerHTML={{
              __html: stylesheet
            }}
          />}
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    );
  }
}
