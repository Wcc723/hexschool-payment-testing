const puppeteer = require('puppeteer-core');

module.exports = async function () {
  // 使用自訂的 Chrome
  const browser = await puppeteer.launch({
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false, // 無外殼的 Chrome，有更佳的效能
  });
  const page = await browser.newPage(); // 開啟新分頁
  await page.goto(
    'https://hexschool-test.herokuapp.com/order/create?coupon_code=TEST_COUPON&order=z_html_rwd'
  ); // 進入指定頁面
  await page.waitFor(1000);

  // 自動化購買流程
  await page.click(
    '#swiper-container > div.swiper-wrapper.pb-4 > label:nth-child(12)'
  );
  await page.waitForSelector('#Email');

  await page.type('#Email', 'casper@hexschool.com');
  await page.type('#Name', '卡斯伯');
  await page.waitFor(1000);

  const summitBtn =
    'body > div.container.mt-3 > div.ng-scope > form > div > div > div.order-card.relative > div.text-right.my-4 > button';
  await page.click(summitBtn);

  await page.waitFor(1000);
  const summitBtn2 =
    'body > div.container.mt-3 > div.row.justify-content-center > div > form > div > button';
  await page.waitForSelector(summitBtn2);
  await page.click(summitBtn2);

  await page.waitFor(500);
  // 進入金流平台
  await page.waitForSelector('#confirm_send_order');
  await page.click('#paytype_webatm'); // Web ATM
  await page.waitForSelector('#confirm_send_order');
  await page.click('#webatm_HNCB'); // 華南銀行

  await page.click(
    '#show_pay_footer_m > div > div:nth-child(1) > label > input[type=checkbox]'
  );
  await page.click('#confirm_send_order');
  // await page.screenshot({ path: 'example.png' }); // 截圖，並且存在...
  await page.waitForSelector(
    'body > div > div.d-flex.justify-content-center.mb-4 > a.fab.fab-line.mp-click.mx-1'
  );
  // await browser.close(); // 關閉瀏覽器
  return '金流頁面測試完成'
};
