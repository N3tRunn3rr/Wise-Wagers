import React, { useState }from 'react';


const API_KEY = "FODULB89AWOEJMVQ";

const StockTradingSection = ({ onPlaceTrade }) => {
  const [stockTicker, setStockTicker] = useState("");
  const [stockPrice, setStockPrice] = useState(null);
  const [amount, setAmount] = useState(null);
  const [myTrades, setMyTrades] = useState([]);

  const handleTickerChange = async (e) => {
    const ticker = e.target.value;
    setStockTicker(ticker);
    const price = await getStockPrice(ticker);
    setStockPrice(price);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const getStockPrice = async (ticker) => {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
    );
    const data = await response.json();
    if (data["Global Quote"]) {
      let price = parseFloat(data["Global Quote"]["05. price"]);
      return price;
    } else {
      throw new Error(`Could not fetch stock price for ticker ${ticker}`);
    }
  };

  const calculateTotalValue = () => {
    if (stockPrice && amount) {
      return parseFloat(stockPrice) * parseFloat(amount);
    } else {
      return null;
    }
  };

  const handlePlaceMarketTradeClick = (e) => {
    e.preventDefault();
    const newTrade = {
      ticker: stockTicker,
      amount: amount,
      price: stockPrice,
      totalValue: calculateTotalValue(),
    };
    onPlaceTrade({ type: "stock", ...newTrade });
    setMyTrades([...myTrades, newTrade]);
    setStockTicker("");
    setStockPrice(null);
    setAmount(null);
  };

  return (
    <div className="finance-section">
      <div className="finance-input-group">
        <label htmlFor="stock-ticker">Stock Ticker:</label>
        <input
          type="text"
          id="stock-ticker"
          value={stockTicker}
          onChange={handleTickerChange}
        />
      </div>
      <div className="finance-input-group">
        <label htmlFor="stock-price">Stock Price:</label>
        {stockPrice && <div id="stock-price" className="stock-price-box">{stockPrice.toFixed(2)}</div>}
      </div>
      <div className="finance-input-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div className="finance-input-group">
        <button onClick={handlePlaceMarketTradeClick}>Place Market Trade</button>
      </div>
      {calculateTotalValue() && (
        <div className="finance-input-group">
          <label htmlFor="total-value">Total Value:</label>
          <div id="total-value"  className="total-value-box">{calculateTotalValue().toFixed(2)}</div>
        </div>
      )}
      {myTrades.length > 0 && (
        <div className="my-trades-container">
          <h2>My Trades</h2>
          <table>
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
            {myTrades.map((trade, index) => (
            <tr key={index}>
            <td>{trade.ticker}</td>
            <td>{trade.price.toFixed(2)}</td>
            <td>{trade.amount}</td>
            <td>{trade.totalValue.toFixed(2)}</td>
            </tr>
            ))}
            </tbody>
            </table>
            </div>
            )}
            </div>
            );
            };
            
            const App = () => {
            const handlePlaceTrade = (trade) => {
            console.log(`Placed a ${trade.type} trade:`, trade);
            };
            
            return (
                <div>
                  <StockTradingSection onPlaceTrade={handlePlaceTrade} />
                </div>
            );
            };
            
export default App;