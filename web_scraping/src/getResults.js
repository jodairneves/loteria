const CronJob = require("cron").CronJob;
const puppeteer = require("puppeteer");
const pool = require("./database/databaseConnection");

const job = new CronJob(
  "0 0 0 * * *",
  () => {
    (async () => {
      try {
        const games = await pool.query(
          "SELECT concurso FROM lotofacil ORDER BY concurso DESC LIMIT 1"
        );

        if (games.rows.length > 0) {
          const lastSavedGame = games.rows[0].concurso;
          console.log(lastSavedGame);

          let currentPage = Number(lastSavedGame);
          let endPage = 9999;
          let searchFor = currentPage + 1;
          let results = [];

          const url = "https://loterias.caixa.gov.br/Paginas/Lotofacil.aspx";
          const browser = await puppeteer.launch({ headless: true });

          // Para Raspberry Pi
          /*const browser = await puppeteer.launch({
          headless: true,
          executablePath: '/usr/bin/chromium-browser'
        })*/
          const page = await browser.newPage();
          await page.goto(url);
          await page.waitForTimeout(3000);

          const ultimoConcurso = await page.evaluate(() => {
            const resConcurso = document.querySelector(
              'span[class="ng-binding"]'
            ).innerText;
            const tempNumConcurso = resConcurso.split(" ")[1];
            const tempDateConcurso = resConcurso
              .split(" ")[2]
              .replace(/[\])}[{(]/g, "");
            return {
              numeroConcurso: tempNumConcurso,
              dataConcurso: tempDateConcurso,
            };
          });

          endPage = Number(ultimoConcurso.numeroConcurso);
          if (currentPage === endPage) {
            browser.close();
          } else {
            //endPage = 3;
            while (currentPage <= endPage) {
              await page.reload({
                waitUntil: ["networkidle0", "domcontentloaded"],
              });
              await page.waitForSelector("#buscaConcurso");

              await page.type("#buscaConcurso", searchFor.toString());
              await page.keyboard.press("Enter");
              await page.waitForTimeout(1000);

              const dados = await page.evaluate(() => {
                const resConcurso = document.querySelector(
                  'span[class="ng-binding"]'
                ).innerText;
                const resResultado = document.querySelector(
                  'ul[class="simple-container lista-dezenas lotofacil"]'
                ).innerText;

                const concurso = resConcurso.split(" ")[1];
                const dataTemp = resConcurso
                  .split(" ")[2]
                  .replace(/[\])}[{(]/g, "");
                const arrData = dataTemp.split("/");
                const dataConcurso =
                  arrData[1] + "-" + arrData[0] + "-" + arrData[2];
                const resultado = resResultado.match(/.{1,2}/g);

                return {
                  concurso,
                  dataConcurso,
                  resultado,
                };
              });

              await pool.query(
                "INSERT INTO lotofacil " +
                  "(concurso, data_concurso, num_01, num_02, num_03, num_04, num_05, num_06, num_07, num_08, num_09, num_10, " +
                  "num_11, num_12, num_13, num_14, num_15) " +
                  "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
                [
                  dados.concurso,
                  dados.dataConcurso,
                  dados.resultado[0],
                  dados.resultado[1],
                  dados.resultado[2],
                  dados.resultado[3],
                  dados.resultado[4],
                  dados.resultado[5],
                  dados.resultado[6],
                  dados.resultado[7],
                  dados.resultado[8],
                  dados.resultado[9],
                  dados.resultado[10],
                  dados.resultado[11],
                  dados.resultado[12],
                  dados.resultado[13],
                  dados.resultado[14],
                ]
              );
              console.log("Concurso: ", dados.concurso);
              results = results.concat(dados);
              currentPage++;
              searchFor++;
            }

            browser.close();
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  },
  null,
  true,
  "America/Sao_Paulo"
);
