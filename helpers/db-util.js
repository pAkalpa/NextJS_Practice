import { MongoClient } from "mongodb";
import auth_data from "../data/token.json";

export const connectDB = async () => {
  const client = await MongoClient.connect(auth_data.mongouri);

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocuments = async (client, collection, filter, sortby) => {
  const db = client.db();

  const result = await db
    .collection(collection)
    .find(filter)
    .sort(sortby)
    .toArray();
  return result;
};
