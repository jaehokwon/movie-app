import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [index, setIndex] = useState("none");
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      });
  }, []);
  const onSelectChange = (ev) => {
    setIndex(ev.target.value);
  };
  const onInputChange = (ev) => {
    setAmount(ev.target.value);
  };
  return (
    <div>
      {loading ? null : (
        <div>
          <h1>Coin Converter</h1>
          <select onChange={onSelectChange} value={index}>
            <option value="none">Select Dollor to Coin</option>
            {coins.map((coin, index) => (
              <option key={coin.id} value={index}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          {index === "none" ? null : (
            <div>
              <div>
                <label htmlFor="usd">USD</label>
                <input
                  id="usd"
                  type="number"
                  value={amount}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <label htmlFor="coin">{coins[index].name}</label>
                <input
                  id="coin"
                  type="number"
                  value={amount / coins[index].quotes.USD.price}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <hr />
      <h1>The Coins!{loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <ul>
          {coins.map((coin) => (
            <li key={coin.id}>
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
