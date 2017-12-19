/**
 * Created by eatong on 17-10-28.
 */
import axios from 'axios';
import {notification} from 'antd'
import store from '../stores';

export default async function ajax(config) {
  const {url, data, ctx} = config;
  const method = config.method || 'post';
  let result;
  //if ctx.req is not null or undefined means this request is called from server-side,
  if (ctx && ctx.req) {
    try {
      const host = ctx.req.headers.host;
      // const result = await axios.post('http://' + host + url, data, {headers: ctx.req.headers});
      if (method.toLowerCase() === 'get') {
        result = await axios.get('http://' + host + url, {params: data, headers: ctx.req.headers});
      } else {
        result = await axios.post('http://' + host + url, data, {headers: ctx.req.headers});
      }
      if (!result.data.success) {
        ctx.res.statusCode = 200;
        ctx.res.end(result.data.message);
      }
      return result.data;

    } catch (ex) {
      const statusCode = ex.response.status;
      ctx.res.statusCode = ex.response.status;
      if (statusCode === 401) {
        ctx.res.writeHead(302, {'Location': '/login'});
        res.end();
      }
      ctx.res.end(ex.response.data.message);
    }
  } else {
    store.app.loading();
    try {
      if (method.toLowerCase() === 'get') {
        result = await axios.get(url, {params: data});
      } else {
        result = await axios.post(url, data);
      }
      if (!result.data.success) {
        notification.warning({message: '操作失败', description: result.data.message});
      }
      store.app.cancelLoading();
      return result.data;
    } catch (ex) {
      store.app.cancelLoading();
      notification.error({message: '操作失败', description: ex.message});
      return {success: false, data: {}, message: ex.message}
    }
  }
};
