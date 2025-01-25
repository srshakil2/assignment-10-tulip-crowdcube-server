const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5500;

// midleware
app.use(cors());
app.use(express.json());

const verifyUser = (req, res, next) => {
  const userEmail = req.query.userEmail;
  if (!userEmail) {
    return res.status(401).send({ error: "Unauthorized access" });
  }
  next();
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mp1yd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const campaignCollection = client
      .db("crowdcube")
      .collection("crowding-calection");

    //    work
    // show
    app.get("/campaign", async (req, res) => {
      const cursor = campaignCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    //

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Tulip server is running");
});

app.listen(port, () => {
  console.log(`Tulip Server is running on port ${port}`);
});
