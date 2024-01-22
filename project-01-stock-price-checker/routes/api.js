"use strict";
const mongoose = require("mongoose");
const axios = require("axios");
const crypto = require("node:crypto");

module.exports = function (app) {
  /* Connect to MongoDB */
  mongoose
    .connect(process.env["MONGODB_URI"])
    .then(() => console.log("Connected to MongoDB Successfully"))
    .catch((error) => console.log("Connection Failed !!\n", error));
  /* Connect to MongoDB */

  const userSchema = new mongoose.Schema({
    ip: { type: String, required: true },
    stocks: [
      {
        symbol: { type: String, required: true },
        liked: { type: Boolean, default: false },
      },
    ],
  });

  const likedSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    likes: { type: Number, default: 0 },
  });

  const Like = mongoose.model("Likes", likedSchema, "Likes");

  const User = mongoose.model("User", userSchema, "Users");

  async function getStockData(stock_symbol, hashedIp, like) {
    try {
      let stockResponse = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock_symbol}/quote`);
      let stockData = {
        stock: stockResponse.data.symbol,
        price: stockResponse.data.latestPrice,
        likes: await getLikes(stock_symbol, hashedIp, like),
      }

      return stockData;
    }
    catch (error) {
      console.log("Error in getStockData() : ", error);
    }
  }

  async function getLikes(stock_symbol, hashedIp, like) {
    try {

      let record = await Like.findOne({ symbol: stock_symbol });

      if (!record) {
        const newRecord = new Like({ symbol: stock_symbol, likes: 0 });
        await newRecord.save();
        record = newRecord;
      }

      if (like && hashedIp) {
        const userExists = await User.findOne({ ip: hashedIp });

        if (userExists) {
          const stockExists = userExists.stocks.find(stock => stock.symbol === stock_symbol);
          if (!stockExists) {
            await User.updateOne(
              { ip: hashedIp },
              { $push: { stocks: { symbol: stock_symbol, liked: true } } }
            );
            await Like.updateOne(
              { symbol: stock_symbol },
              { $inc: { likes: 1 } }
            );
          }
          record = await Like.findOne({ symbol: stock_symbol });
        }

        else {
          await Like.updateOne(
            { symbol: stock_symbol }, 
            { $inc: { likes: 1 } }
          );
          await User.updateOne(
            { ip: hashedIp }, 
            { $push: { stocks: { symbol: stock_symbol, liked: true } } }, 
            { upsert: true } 
          );
          record = await Like.findOne({ symbol: stock_symbol });
        }
      }

      return record.likes;
      
    } catch (error) {
      console.log("Error in getLikes() : ", error);
    }
  }

  app.get("/api/stock-prices", async (req, res) => {
    try {
      const { stock, like } = req.query;
      const stocks = Array.isArray(stock) ? stock.map(s => s.toUpperCase()) : stock.toUpperCase();
      const hashedIp = like ? crypto.createHash("sha256").update(req.ip).digest("hex") : null;
      
      let stockData;
      if (!Array.isArray(stocks)) {
        stockData = await getStockData(stocks, hashedIp, like);
      } else {
        stockData = await Promise.all(
          stocks.map(async (s) => await getStockData(s, hashedIp, like))
        );
      }

      const responseData =
        stocks.length === 2
          ? {
              stockData: [
                { ...stockData[0], rel_likes: stockData[0].likes - stockData[1].likes },
                { ...stockData[1], rel_likes: stockData[1].likes - stockData[0].likes },
              ],
            }
          : { stockData: stockData };

      res.json(responseData);
      
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ error: "Server Error" });
    }
  });
};
