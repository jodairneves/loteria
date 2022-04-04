const puppeteer = require('puppeteer');

//const url = 'https://loterias.caixa.gov.br/Paginas/Lotofacil.aspx'
const url = 'https://www.mercadolivre.com.br';
const searchFor = 'macbook';
const countGames = 10;

let countPage = 1;
const list = [];

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    console.log('Robô iniciado!');

    await page.goto(url);
    console.log('Abrindo  URL');

    await page.waitForSelector('#cb1-edit');

    await page.type('#cb1-edit', searchFor);

    await Promise.all([
        page.waitForNavigation(),
        page.click('.nav-search-btn')
    ]);

    const links = await page.$$eval('.ui-search-result__image > a', el => el.map(link => link.href));

    for(const link of links){
        if(countPage === countGames)
            continue;
        console.log('Página ', countPage);
        await page.goto(link);
        await page.waitForSelector('.ui-pdp-title');

        const title = await page.$eval('.ui-pdp-title', element => element.innerText);
        const price = await page.$eval('.andes-money-amount__fraction', element => element.innerText);

        const seller = await page.evaluate(() => {
            const el = document.querySelector('.ui-pdp-seller__link-trigger');

            if(!el)
                return null;
            return el.innerText;
        })

        const obj = { };
        obj.title = title;
        obj.price = price;
        (seller ? obj.seller = seller : '');
        obj.link = link;

        list.push(obj);

        countPage++;
    }

    console.log(list);

    await page.waitForTimeout(3000);
    await browser.close();
})();