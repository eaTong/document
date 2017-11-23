/**
 * Created by eatong on 17-10-28.
 */
import axios from 'axios';
import store from '../stores';

export default async function ajax(config) {
  const {url, data, ctx, headers} = config;
  //if ctx.req is not null or undefined means this request is called from server-side,
  if (ctx && ctx.req) {
    try {
      const host = ctx.req.headers.host;
      const result = await axios.post('http://' + host + url, data, {headers: ctx.req.headers});
      if (!result.data.success) {
        ctx.res.statusCode = 200;
        ctx.res.end(result.data.message);
      }
      return result.data;

    } catch (ex) {
      ctx.res.statusCode = 500;
      ctx.res.end(ex.message);
      return {success: false, data: {}, message: ex.message}
    }
  } else {
    let result;
    store.app.loading();
    try {
      result = await axios.post(url, data);
      if (!result.data.success) {
      }
      store.app.cancelLoading();
      return result.data;
    } catch (ex) {
      store.app.cancelLoading();
      return {success: false, data: {}, message: ex.message}
    }
  }
};
