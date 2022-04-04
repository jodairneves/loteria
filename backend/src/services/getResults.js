const puppeteer = require('puppeteer');

function run(pagesToScrape) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pagesToScrape) {
                pagesToScrape = 1;
            }
            const url = 'https://loterias.caixa.gov.br/Paginas/Lotofacil.aspx';
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(url);
            await page.waitForTimeout(3000);
            let currentPage = 1;
            let results = [];

            const temp = await page.evaluate(() => {
                const resConcurso = document.querySelector('span[class="ng-binding"]').innerText;
                const tempConcurso = resConcurso.split(' ')[1];
                return tempConcurso;
            });

            let searchFor = Number(temp);

            while (currentPage <= pagesToScrape) {

                await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
                await page.waitForSelector('#buscaConcurso');

                await page.type('#buscaConcurso', searchFor.toString());
                await page.keyboard.press('Enter');
                await page.waitForTimeout(1000);

                const dados = await page.evaluate(() => {
                    const resConcurso = document.querySelector('span[class="ng-binding"]').innerText;
                    const resResultado = document.querySelector('ul[class="simple-container lista-dezenas lotofacil"]').innerText;

                    const concurso = resConcurso.split(' ')[1];
                    const resultado = resResultado.match(/.{1,2}/g);

                    return {
                        concurso,
                        resultado
                    }
                });
                results = results.concat(dados);
                currentPage++;
                searchFor--;
            }
            browser.close();
            return resolve(results)
        } catch (e) {
            return reject(e);
        }
    });
}

module.exports = run;