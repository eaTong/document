/**
 * Created by eatong on 17-12-16.
 */
import {ArgMissError, LogicError} from './errors';
import userServer from "../services/userServer";

export default async function checkAuth(ctx, next) {
  if (!/^\/api\/pub/.test(ctx.originalUrl) && ctx.originalUrl !== '/api/user/login') {
    if (/^\/api\/auth/.test(ctx.originalUrl)) {
      if (ctx.req.headers['auth']) {
        try {
          const authData = JSON.parse(ctx.req.headers['auth']);
          const user = await
            userServer.login(authData.account, authData.password);
          if (!user) {
            ctx.status = 401;
            ctx.body = {success: false, data: {}, message: 'error authorize information'};
            return;
          }
        } catch (ex) {
          ctx.status = 401;
          ctx.body = {success: false, data: {}, message: 'error authorize information'};
          return;
        }
      } else {
        ctx.status = 401;
        ctx.body = {success: false, data: {}, message: 'missing authorize information'};
        return;
      }
    } else {
      if (!ctx.session.loginUser) {
        ctx.status = 401;
        ctx.body = {success: false, data: {}, message: 'this api is not a public api ,please login'};
        return;
      }
    }
  }

  try {
    const data = await
      next();
    ctx.body = {success: true, data, message: ''};
  } catch (ex) {
    if (ex instanceof ArgMissError) {
      ctx.status = 400;
      ctx.body = {success: false, data: {}, message: ex.message};
    } else if (ex instanceof LogicError) {
      ctx.status = 200;
      ctx.body = {success: false, data: {}, message: ex.message};

    } else {
      ctx.status = 500;
      ctx.body = {success: false, data: {}, message: ex.message};
    }
  }
}

