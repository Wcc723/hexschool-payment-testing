// import { createOrder } from './createOrder';
// require
const createOrder = require('./createOrder');

(async () => {
  console.log('=== 開始前台 金流測試 ===');
  let result = await createOrder();
  console.log(result);

  console.log('=== 完成 ===')
})();
