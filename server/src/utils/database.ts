import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb+srv://NFT:Incorrect007@cluster0.pkotz.mongodb.net/youtube-clone?retryWrites=true&w=majority";

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info(DB_CONNECTION_STRING)
    logger.info("Connect to database");
  } catch (e) {
    logger.error(e, "Failed to connect to database. Goodbye");
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();

  logger.info("Disconnect from database");

  return;
}