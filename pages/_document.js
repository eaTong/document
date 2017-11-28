/**
 * Created by eatong on 17-11-24.
 */
import Document, {Head, Main, NextScript} from 'next/document';
// import less from '../styles/test.less'
// import css from '../styles/test.css'
// import sass from '../styles/test.sass'
// import scss from '../styles/test.scss'


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
            {/*<style global dangerouslySetInnerHTML={{ __html: less  }} />*/}
            {/*<style global dangerouslySetInnerHTML={{ __html: css  }} />*/}
            {/*<style global dangerouslySetInnerHTML={{ __html: sass  }} />*/}
            {/*<style global dangerouslySetInnerHTML={{ __html: scss  }} />*/}
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
