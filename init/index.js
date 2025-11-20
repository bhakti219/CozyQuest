
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/Listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Wanderlust";

main()
  .then(() => console.log("connected to DB"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  console.log("Old listings removed");

  await Listing.insertMany(
    initData.data.map(l => ({
      ...l,
      owner: "69185bf717cda81842ca0e1a"
    }))
  );

  console.log("Data was initialized successfully");
};

initDB();
