import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const dbAddress = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.c9ept.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  console.log(dbAddress);
  const client = await MongoClient.connect(dbAddress);
  console.log(client);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find()
    // .sort({ _id: -1 })
    .sort(sort)
    .toArray();

  return documents;
}
