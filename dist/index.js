import express from "express";
import { MongoClient, ObjectId } from "mongodb";
const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/appdb";
let client;
app.get("/users", async (req, res) => {
    try {
        const db = client.db("appdb");
        const limit = 10;
        const users = await db.collection("users").find({}).limit(limit).toArray();
        console.warn(users);
        res.json(users.map(u => ({ ...u, _id: u._id.toString() })));
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});
app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }
    try {
        const db = client.db("appdb");
        const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error" });
    }
});
(async () => {
    client = new MongoClient(mongoUri);
    await client.connect();
    app.listen(port, () => console.log(`API on http://localhost:${port}`));
})();
