const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection setup
const uri = `mongodb+srv://${(process.env.DB_user)}:${(process.env.DB_pass)}@cluster0.khtuk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const campaignsCollection = client.db('crowdfunding').collection('campaign');
        const userCollection = client.db('crowdfunding').collection('users');
        app.post('/users', async (req, res) => {
            try {
                const { firstName, lastName, email, photoURL } = req.body;

                if (!firstName || !lastName || !email) {
                    return res.status(400).json({ message: "First name, last name, and email are required" });
                }

                const alreadyUser = await userCollection.findOne({ email });
                if (alreadyUser) {
                    return res.status(400).json({ message: "This user already exists" });
                }

                const result = await userCollection.insertOne({
                    fullName: `${firstName} ${lastName}`,
                    firstName,
                    lastName,
                    email,
                    photoURL: photoURL || "default-url",
                    userRole: "User",
                    registrationDate: new Date(),
                });

                res.status(201).json({ message: "User successfully registered", userId: result.insertedId });
            } catch (error) {
                res.status(500).json({ message: "Error registering user", error: error.message });
            }
        });


        app.get('/users', async (req, res) => {
            try {
                const users = await userCollection.find().toArray();
                res.status(200).json(users);
            } catch (error) {
                res.status(500).json({ message: "Failed to fetch users", error: error.message });
            }
        });


        app.get('/users/:email', async (req, res) => {
            try {
                const email = req.params.email;
                const user = await userCollection.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(user);
            } catch (error) {
                res.status(500).json({ message: "Failed to fetch user", error: error.message });
            }
        });




        app.get('/running-campaigns', async (req, res) => {
            try {
                const currentDate = new Date();
                const runningCampaigns = await campaignsCollection.find({}).limit(6).toArray();
                const dateFilter = runningCampaigns.filter((item) => {
                    console.log(new Date(item.deadline))
                    return new Date(item.deadline) > currentDate

                })
                console.log(runningCampaigns.length, dateFilter.length)
                res.json(runningCampaigns);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
                res.status(500).send({ message: 'Error fetching campaigns' });
            }
        });
        app.get('/myCampaign', async (req, res) => {
            try {
                const userEmail = req.query.userEmail; // Assume email is passed as a query param.
                if (!userEmail) {
                    return res.status(400).send({ message: 'User email is required' });
                }

                const campaignsCollection = client.db('crowdcube').collection('campaign');
                const userCampaigns = await campaignsCollection.find({ userEmail }).toArray();
                res.json(userCampaigns);
            } catch (error) {
                console.error('Error fetching user campaigns:', error);
                res.status(500).send({ message: 'Error fetching user campaigns' });
            }
        });
        app.delete('/campaigns/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const campaignsCollection = client.db('crowdcube').collection('campaign');
                const result = await campaignsCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: 'Campaign deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Campaign not found' });
                }
            } catch (error) {
                console.error('Error deleting campaign:', error);
                res.status(500).json({ message: 'Error deleting campaign' });
            }
        });
        app.get('/campaign/:id', async (req, res) => {
            try {
                const campaign = await campaignsCollection.findOne({ _id: new ObjectId(req.params.id) });
                if (campaign) {
                    res.json(campaign);
                } else {
                    res.status(404).send({ message: 'Campaign not found' });
                }
            } catch (error) {
                console.error('Error fetching campaign details:', error);
                res.status(500).send({ message: 'Error fetching campaign details' });
            }
        });

        // Test route to check server status
        app.get('/', (req, res) => {
            res.send('Server is running');
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit process if the connection fails
    }
}

connectMongoDB();
