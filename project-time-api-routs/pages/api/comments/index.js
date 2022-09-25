import { MongoClient } from "mongodb";
import { connectDatabase, getAllDocuments } from "../../../helpers/db-utils";

async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed!" });
    return;
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", {
        _id: -1,
      });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }
  client.close();
}
export default handler;
