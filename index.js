const axios = require("axios");

// ⚠️ если ты вставляешь токен прямо в код — впиши сюда
const BOT_TOKEN = process.env.BOT_TOKEN || "8942319043";
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
    const id = "132115148";

    const url = https://web-api.av.by/offer-types/cars/price-statistics/offers/${id};

    const { data } = await axios.get(url);

    const type = data?.medianPriceRange?.priceRangeType;

    console.log("Price type:", type);

    if (type === "below_average" || type === "much_below_average") {
      await send(
        🔥 SNIPER FOUND\n${data.title.brand} ${data.title.model}\n💰 ${data.medianPriceRange.advertPriceUsd}$
      );
    }
  } catch (e) {
    console.log("Error:", e.message);
  }
}

// каждые 60 секунд
setInterval(check, 60000);

// запуск сразу
check();

console.log("bot running...");
