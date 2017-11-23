/**
 * Created by eatong on 17-11-6.
 */
import {ArgMissError} from './errors';

export function checkArgument(args) {
  return function (target, name, descriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function () {
      const [ctx, next] = arguments;
      const bodyKeys = Object.keys(ctx.request.body);
      if (typeof args === 'string') {
        if (bodyKeys.indexOf(args) === -1) {
          throw(new ArgMissError(args));
        }
      } else {
        for (let arg of args) {
          if (bodyKeys.indexOf(arg) === -1) {
            throw(new ArgMissError(arg));
          }
        }
      }
      return oldValue.apply(null, arguments);
    };

    return descriptor;
  }
}
