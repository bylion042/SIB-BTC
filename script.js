function getMessageByIndex(value) {
  if (value <= 24) {
    return {
      text: "💀 Extreme Fear: Panic selling is likely. Prices may drop more — but it's where smart money starts watching for entries.",
      gif: "https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif" // Shocked
    };
  } else if (value <= 49) {
    return {
      text: "📉 Fear Zone: Market is uncertain. Dips are possible, but good opportunities could appear. Stay alert.",
      gif: "https://media.giphy.com/media/3oKIPwoeGErMmaI43C/giphy.gif" // Nervous
    };
  } else if (value <= 74) {
    return {
      text: "🚀 Greed Rising: Momentum is strong. Prices may keep climbing — but watch for signs of exhaustion.",
      gif: "https://media.giphy.com/media/duzpaTbCUy9Vu/giphy.gif" // Rocket launch
    };
  } else {
    return {
      text: "⚠️ Extreme Greed: Hype is high. A correction is likely soon. This is where smart money starts to exit.",
      gif: "https://media.giphy.com/media/3og0IPxMM0erATueVW/giphy.gif" // Sell button hover
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
  