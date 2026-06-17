const axios = require("axios");

const BOT_TOKEN = "8942319043";
const CHAT_ID = "5145537472";

async function send(msg) {
  await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: msg
  });
}

async function check() {
  try {
    const id = "132115148";

    const { data } = await axios.get(
      https://web-api.av.by/offer-types/cars/price-statistics/offers/${id}
    );

    const type = data?.medianPriceRange?.priceRangeType;

    if (type === "below_average" || type === "much_below_average") {
      await send(`🔥 SNIPER FOUND
${data.title.brand} ${data.title.model}
💰 ${data.medianPriceRange.advertPriceUsd}$`);
    }
  } catch (e) {
    console.log(e.message);
  }
}

// каждые 60 секунд
setInterval(check, 60000);

// первый запуск сразу
check();

console.log("bot running...");
