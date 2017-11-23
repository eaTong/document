/**
 * Created by eatong on 17-11-6.
 */
export class ArgMissError {
  constructor(arg) {
    this.name = 'ArgMissError';
    this.message = `argument:'${arg}' is required , but you didn't pass to the body!`;
    this.stack = new Error().stack;
  }
}

export class LogicError {
  constructor(message) {
    this.name = 'LoginError';
    this.message = message;
    this.stack = new Error().stack;
  }
}
