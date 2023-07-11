const handler = (req, res) => {
    if (req.method === "POST") {
        const bodyData = req.body;
        const email = bodyData.email;

        if (!email || !email.includes('@')) {
            res.status(422).json({ message: 'Invalid email address' });
            return;
        }

        console.log("🤬 ~ file: index.js:11 ~ handler ~ email:", email)
        res.status(201).json({ message: 'Signed up!' });
    }
}

export default handler;