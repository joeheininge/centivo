import express from "express";
import { MongoClient, ObjectId, type Filter } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/appdb";

let client: MongoClient;

type User = {_id: ObjectId; name: string; email: string; age: number};

app.get("/users", async(req, res) => {
    try {
        const db = client.db("appdb");
        
        const min_age = req.query.min_age as string | undefined;

        const filter: Filter<User> = {};

        if ( min_age !== undefined ){
            const n = Number(min_age);
            if (Number.isFinite(n)){
                filter.age = { $gt: n };
            }
            console.warn(filter);
        }

        const users = await db
            .collection<User>("users")
            .find(filter)
            .toArray();

        console.warn(users);
        res.json(users.map(u => ({ ...u, _id: u._id.toString() })));


    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal error"});
    }
});

app.get("/users/:id", async(req, res) => {
    const { id } = req.params;
    if ( !ObjectId.isValid(id)){
        return res.status(400).json({error: "Invalid ID format"});
    }

    try {

        const db = client.db("appdb");

        const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
        

        if (!user){
            return res.status(404).json({ error: "User not found"});  
        } 

        res.json(user);

    }
    catch (e) {

        console.error(e);

        res.status(500).json({error: "Internal error"});

    }

});

(async() => {

    client = new MongoClient(mongoUri);

    await client.connect();

    app.listen(port, () => console.log(`API on http://localhost:${port}`));

})();