import crypto from "crypto";

const UUIDv4Generator = () => {
  const randomBytes = crypto.randomBytes(16);
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Version 4
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Variant 1

  const bytesToHex = (bytes) =>
    bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");

  const uuid = `${bytesToHex(randomBytes.subarray(0, 4))}-${bytesToHex(
    randomBytes.subarray(4, 6)
  )}-4${bytesToHex(randomBytes.subarray(6, 8))}-${bytesToHex(
    randomBytes.subarray(8, 10)
  )}-${bytesToHex(randomBytes.subarray(10, 16))}`;

  return uuid;
};

const handler = (req, res) => {
  const eventId = req.query.eventid;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      id: UUIDv4Generator(),
      email,
      name,
      text,
    };

    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "Max",
        text: "A first comment",
      },
      {
        id: "c2",
        name: "Pasindu",
        text: "A second comment",
      },
    ];

    res.status(201).json({ comments: dummyList });
  }
};

export default handler;
