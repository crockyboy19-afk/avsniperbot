const axios = require("axios");

const cheerio = require("cheerio");

// 🔥 ВСТАВЬ СВОИ ДАННЫЕ

const BOT_TOKEN = "PASTE_TOKEN_HERE";

const CHAT_ID = "5145537472";

// 🔎 что ищем (можешь менять)

const URL =

  "https://cars.av.by/volkswagen/tiguan?price_currency=2";

async function send(msg) {

  await axios.post(

    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,

    {

      chat_id: CHAT_ID,

      text: msg,

    }

  );

}

async function check() {

  try {

    const { data } = await axios.get(URL, {

      headers: {

        "User-Agent":

          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",

      },

    });

    const $ = cheerio.load(data);

    let found = false;

    $("a").each((i, el) => {

      const text = $(el).text().toLowerCase();

      if (text.includes("ниже рынка")) {

        found = true;

      }

    });

    console.log("scan done");

    if (found) {

      await send("🔥 AV.BY SNIPER: найдено объявление ниже рынка!");

    }

  } catch (e) {

    console.log("error:", e.message);

  }

}

// каждые 60 секунд

setInterval(check, 60000);

check();

console.log("bot started");
