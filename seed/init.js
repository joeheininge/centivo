db = db.getSiblingDB("appdb");
db.users.insertOne({
    _id: ObjectId("651111111111111111111111"),
    name: "Viceroy Fizzlebottom",
    email: "viceroy@fizzlebottom.com",
    age: 77
});

db.users.insertOne({
    _id: ObjectId("651111111111111111111111"),
    name: "Suzie Minor",
    email: "suzie@minor.com",
    age: 17
});

db.users.insertOne({
    _id: ObjectId("651111111111111111111111"),
    name: "Another Adult",
    email: "another@adult.com",
    age: 27
});


