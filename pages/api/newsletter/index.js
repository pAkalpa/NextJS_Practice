import { connectDB, insertDocument } from "@/helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const bodyData = req.body;
    const email = bodyData.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;

    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, "emails", { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
};

export default handler;
