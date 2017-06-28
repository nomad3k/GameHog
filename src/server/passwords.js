import crypto from 'crypto';

const secret = 'Th!$ mêśšãgę wïłl š€lf dèßtrūçT įń fîvë $êćõñdś!';

export function hash(value) {
  return crypto.createHmac('sha256', secret)
               .update(value)
               .digest('hex');
}
