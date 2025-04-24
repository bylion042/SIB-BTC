function getMessageByIndex(value) {
    if (value <= 24) {
      return {
        text: "💀 Not financial advice, but... yikes.",
        gif: "https://media.giphy.com/media/l41YtZOb9EUABnuqA/giphy.gif"
      };
    } else if (value <= 49) {
      return {
        text: "📉 It's Fear. Maybe chill, bro.",
        gif: "https://media.giphy.com/media/xT9Igp5SSgHY3U5eU4/giphy.gif"
      };
    } else if (value <= 74) {
      return {
        text: "🚀 Greed’s on! Don’t miss the moon!",
        gif: "https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif"
      };
    } else {
      return {
        text: "🤑 YOLO, baby!",
        gif: "https://media.giphy.com/media/xT0BKiaM2VGJ411CeE/giphy.gif"
      };
    }
  }
  
  
  async function fetchGreedIndex() {
    try {
      const res = await fetch('https://api.alternative.me/fng/');
      const data = await res.json();
      console.log(data); // Check the response here
      const value = parseInt(data.data[0].value);
      const classification = data.data[0].value_classification;
  
      document.getElementById('greedIndex').innerText = `🧠 Fear & Greed Index: ${value} (${classification})`;
  
      const msg = getMessageByIndex(value);
      document.getElementById('answer').innerText = msg.text;
      document.getElementById('gif').src = msg.gif;
    } catch {
      document.getElementById('greedIndex').innerText = "⚠️ Couldn't load Fear & Greed Index";
    }
  }
  
  
  async function fetchBTC() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
      const data = await res.json();
      document.getElementById('btcRate').innerText = `💸 1 BTC = $${data.bitcoin.usd.toLocaleString()}`;
    } catch {
      document.getElementById('btcRate').innerText = "⚠️ Couldn't load BTC rate";
    }
  }
  
  async function fetchData() {
    const loader = document.getElementById("loader");
    loader.style.display = "flex";  // Ensure the spinner shows at the beginning
  
    const start = Date.now();
    await Promise.all([fetchBTC(), fetchGreedIndex()]);
    const elapsed = Date.now() - start;
  
    const remainingTime = 5000 - elapsed;
    if (remainingTime > 0) {
      setTimeout(() => {
        loader.style.display = "none"; // Hide spinner after 5 seconds (or when data is done)
      }, remainingTime);
    } else {
      loader.style.display = "none"; // Hide immediately if data loads faster than 5 seconds
    }
  }
  
  // Auto-run on page load
  window.onload = fetchData;
  