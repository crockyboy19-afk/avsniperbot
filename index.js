const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN || "PASTE_TOKEN_HERE";

const CHAT_ID = process.env.CHAT_ID || "5145537472";

async function send(msg) {

  try {

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {

      chat_id: CHAT_ID,

      text: msg,

    });

  } catch (e) {

    console.log("Telegram error:", e.message);

  }

}

async function check() {

  try {

    const url = "https://cars.av.by/volkswagen/tiguan/132115148";

    const { data } = await axios.get(url, {

      headers: {

        "User-Agent":

          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"

      }

    });

    const isBelow = data.includes("ниже рынка");

    console.log("Check result:", isBelow);

    if (isBelow) {

      await send("🔥 SNIPER FOUND! Объявление ниже рынка!");

    }

  } catch (e) {

    console.log("Error:", e.message);

  }

}
setInterval(check, 60000);

check();

console.log("bot running...");
