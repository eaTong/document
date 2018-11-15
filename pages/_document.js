/**
 * Created by eatong on 17-11-24.
 */
import Document, {Head, Main, NextScript} from 'next/document';
import appStyle from '../styles/app.less';
import quillStyle from 'react-quill/dist/quill.snow.css';

const bdTj = `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?b69c768893587a42c887e5f422ad8ad6";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`;
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
            <meta name="Keywords" content="云智装,家装管理,互联网家装,装修ERP,文档,云智装文档,云智装帮助系统"/>
            <meta name="baidu-site-verification" content="nna0vPhBVD"/>
            <meta name="360-site-verification" content="374f09ee579bd8dfecff46165447f479"/>
            <meta name="sogou_site_verification" content="bhZ35wQtpb"/>
            <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
            <meta name="google-site-verification" content="fCT2qrDVSOhaeGYxHyQgsc1Mp9mPcerayecQ6rW1n0c" />
            <script dangerouslySetInnerHTML={{__html: bdTj}}/>
          </Head>
        ) : (
          <Head>
            <style global dangerouslySetInnerHTML={{__html: appStyle}}/>
            <style global dangerouslySetInnerHTML={{__html: quillStyle}}/>
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
