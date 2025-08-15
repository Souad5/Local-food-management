require("dotenv").config();
// -------------------- Import Required Modules --------------------
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Load environment variables from .env file
// -------------------- Express App Setup --------------------
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://assignment-12-ph-b12.web.app",
  "https://assignment-12-ph-b12.firebaseapp.com", // ✅ Add this too for safety
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// -------------------- MongoDB Connection --------------------
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0evfqhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// -------------------- JWT Middleware --------------------
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = decoded;
    next();
  });
};

// -------------------- JWT Generation Endpoint --------------------
app.post("/jwt", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.send({ token });
});

// -------------------- Main Server Function --------------------
async function run() {
  try {
    console.log("✅ MongoDB connected");

    // Collections
    const db = client.db("Assignment-12");
    const donationsCollection = db.collection("donations");
    const featuredCollection = db.collection("featuredDonations");

    const favoritesCollection = db.collection("favorites");
    const requestsCollection = db.collection("requests");
    const reviewsCollection = db.collection("reviews");
    const usersCollection = db.collection("users");
    const charityRequestsCollection = db.collection("charityRoleRequests");
    const transactionsCollection = db.collection("transactions");

    // -------------------- Base Route --------------------
    app.get("/", (req, res) => {
      res.send("🚀 Local food waste management systems project");
    });

    // -------------------- Donations --------------------
    app.post("/donations", async (req, res) => {
      const donation = req.body;
      donation.createdAt = new Date();
      donation.status = donation.status || "Pending";
      const result = await donationsCollection.insertOne(donation);
      res.status(201).send({
        success: true,
        message: "Donation added",
        insertedId: result.insertedId,
      });
    });

    app.get("/donations", async (req, res) => {
      const { location, sortBy } = req.query;
      const query = { status: "Verified" };
      if (location) query.location = { $regex: location, $options: "i" };

      const sortOption = {};
      if (sortBy === "quantity") sortOption.quantity = -1;
      else if (sortBy === "pickupTime") sortOption.pickupTime = 1;

      const donations = await donationsCollection
        .find(query)
        .sort(sortOption)
        .toArray();
      res.send(donations);
    });

    app.get("/donations/all", async (req, res) => {
      const donations = await donationsCollection.find().toArray();
      res.send(donations);
    });

    app.get("/donations/res", async (req, res) => {
      const { email } = req.query;

      if (!email) {
        return res.status(400).send({ message: "Missing email parameter" });
      }

      try {
        const donations = await donationsCollection
          .find({ restaurantEmail: email })
          .toArray();
        res.send(donations);
      } catch (error) {
        console.error("Error fetching donations:", error);
        res.status(500).send({ error: "Failed to fetch donations" });
      }
    });

    app.get("/donations/:id", async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id))
        return res.status(400).send({ error: "Invalid donation ID" });

      const donation = await donationsCollection.findOne({
        _id: new ObjectId(id),
      });
      if (!donation)
        return res.status(404).send({ error: "Donation not found" });
      res.send(donation);
    });

    app.patch("/donations/:id", async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id))
        return res.status(400).send({ error: "Invalid ID" });

      const updateData = req.body;
      delete updateData._id;
      const result = await donationsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      if (result.matchedCount === 0)
        return res.status(404).send({ error: "Donation not found" });
      res.send({ success: true, message: "Donation updated" });
    });

    app.delete("/donations/:id", async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id))
        return res.status(400).send({ error: "Invalid ID" });

      const result = await donationsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      if (result.deletedCount === 0)
        return res.status(404).send({ error: "Donation not found" });
      res.send({ success: true, message: "Donation deleted" });
    });

    app.get("/featured", async (req, res) => {
      const { location, sortBy } = req.query;
      const query = { status: "Verified" };
      if (location) query.location = { $regex: location, $options: "i" };

      const sortOption = {};
      if (sortBy === "quantity") sortOption.quantity = -1;
      else if (sortBy === "pickupTime") sortOption.pickupTime = 1;

      const donations = await donationsCollection
        .find(query)
        .sort(sortOption)
        .limit(4)
        .toArray();
      res.send(donations);
    });

    app.get("/donations/restaurant", async (req, res) => {
      const email = req.query.email;
      if (!email) return res.status(400).send({ error: "Email is required" });
      const donations = await donationsCollection
        .find({ restaurantEmail: email })
        .toArray();
      res.send(donations);
    });

    // -------------------- Featured Donations --------------------
    app.get("/verified-donations", async (req, res) => {
      const donations = await donationsCollection
        .find({ status: "Verified" })
        .toArray();
      res.send(donations);
    });

    app.post("/featured-donations", async (req, res) => {
      const donation = req.body;

      if (!donation._id)
        return res.status(400).send({ error: "Donation ID missing" });

      // Prevent duplicates
      const existing = await featuredCollection.findOne({ _id: donation._id });
      if (existing)
        return res.status(400).send({ message: "Already featured" });

      // Optional: Remove _id or convert to ObjectId
      const featured = {
        ...donation,
        featuredAt: new Date(),
      };

      const result = await featuredCollection.insertOne(featured);
      res.send({ success: true, insertedId: result.insertedId });
    });

    app.get("/featured-donations", async (req, res) => {
      const featured = await featuredCollection
        .find()
        .sort({ featuredAt: -1 })
        .limit(4)
        .toArray();
      res.send(featured);
    });

    // -------------------- Favorites --------------------
    app.post("/api/favorites", verifyToken, async (req, res) => {
      const userEmail = req.user.email;
      const {
        donationId,
        image,
        title,
        restaurantName,
        location,
        status,
        quantity,
      } = req.body;

      if (!donationId || !title || !restaurantName) {
        return res
          .status(400)
          .send({ error: "Missing required donation info" });
      }

      // Prevent duplicate favorites
      const existing = await favoritesCollection.findOne({
        userEmail,
        donationId,
      });
      if (existing) {
        return res.send({ success: true, message: "Already favorited" });
      }

      const favorite = {
        userEmail,
        donationId,
        image,
        title,
        restaurantName,
        location,
        status,
        quantity,
        addedAt: new Date(),
      };

      const result = await favoritesCollection.insertOne(favorite);

      res.send({
        success: true,
        message: "Added to favorites",
        insertedId: result.insertedId,
      });
    });

    app.get("/api/favorites", async (req, res) => {
      try {
        const { userEmail } = req.query;
        if (!userEmail)
          return res.status(400).send({ error: "Missing userEmail" });

        const favorites = await favoritesCollection
          .find({ userEmail })
          .sort({ _id: -1 })
          .toArray();

        res.send(favorites);
      } catch (err) {
        res.status(500).send({ error: "Failed to fetch favorites" });
      }
    });

    app.delete("/api/favorites/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await favoritesCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 1) {
          res.send({ success: true, message: "Removed from favorites" });
        } else {
          res.status(404).send({ error: "Favorite not found" });
        }
      } catch (err) {
        res.status(500).send({ error: "Failed to delete favorite" });
      }
    });
    // -------------------- Requests --------------------
    // PATCH /api/requests/:id
    app.patch("/api/requests/:id", async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      try {
        const result = await requestsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status } }
        );
        res.json({ modified: result.modifiedCount > 0 });
      } catch (err) {
        res.status(500).json({ error: "Failed to update status" });
      }
    });

    app.get("/api/charity/received-donations", async (req, res) => {
      const email = req.query.email;
      try {
        const donations = await requestsCollection
          .find({ charityEmail: email, status: "Picked Up" })
          .toArray();
        res.json(Array.isArray(donations) ? donations : []); // ✅ Enforced array
      } catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({ message: "Failed to fetch donations" });
      }
    });

    app.post("/api/requests", async (req, res) => {
      try {
        const {
          donationId,
          donationTitle,
          restaurantName,
          charityName,
          charityEmail,
          description,
          pickupTime,
          status = "Pending",
        } = req.body;

        if (!donationId || !charityEmail || !description || !pickupTime) {
          return res
            .status(400)
            .json({ success: false, message: "Missing required fields" });
        }

        // Correct collection used here:
        const donation = await donationsCollection.findOne({
          _id: new ObjectId(donationId),
        });

        if (!donation) {
          return res
            .status(404)
            .json({ success: false, message: "Donation not found" });
        }

        const requestData = {
          donationId: new ObjectId(donationId),
          donationTitle,
          restaurantName,
          charityName,
          charityEmail,
          description,
          pickupTime,
          status,
          requestedAt: new Date(),
        };

        const result = await requestsCollection.insertOne(requestData);

        res.status(201).json({
          success: true,
          message: "Donation request submitted successfully",
          insertedId: result.insertedId,
        });
      } catch (error) {
        console.error("Error in POST /api/requests:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
    });

    // -------------------- Get Requests --------------------
    app.get("/api/requests", async (req, res) => {
      try {
        const charityEmail = req.query.charityEmail;
        if (!charityEmail) {
          return res
            .status(400)
            .json({ error: "charityEmail query param required" });
        }

        // Find all requests made by this charity, sorted by newest first
        const requests = await requestsCollection
          .find({ charityEmail })
          .sort({ requestedAt: -1 })
          .toArray();

        res.json(requests);
      } catch (error) {
        console.error("Error fetching charity requests:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // -------------------- delete Request by ID --------------------
    app.delete("/api/requests/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const request = await requestsCollection.findOne({
          _id: new ObjectId(id),
        });

        const result = await requestsCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 1) {
          return res.json({ success: true, message: "Request canceled" });
        } else {
          return res.status(500).json({ error: "Failed to cancel request" });
        }
      } catch (error) {
        console.error("Error deleting request:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // -------------------- Reviews --------------------
    app.post("/api/reviews", async (req, res) => {
      const review = req.body;
      review.time = new Date();
      const result = await reviewsCollection.insertOne(review);
      res.status(201).send({
        success: true,
        message: "Review submitted",
        insertedId: result.insertedId,
      });
    });

    app.get("/api/reviews", async (req, res) => {
      try {
        const { userEmail } = req.query;

        if (!userEmail) {
          return res.status(400).send({ error: "userEmail is required" });
        }

        const reviews = await reviewsCollection
          .find({ userEmail })
          .sort({ time: -1 })
          .toArray();

        res.send(reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).send({ error: "Failed to fetch reviews" });
      }
    });

    app.get("/api/reviews/:donationId", async (req, res) => {
      const { donationId } = req.params;
      const reviews = await reviewsCollection
        .find({ donationId })
        .sort({ time: -1 })
        .toArray();
      res.send(reviews);
    });

    app.delete("/api/reviews/:id", async (req, res) => {
      const { id } = req.params;
      const result = await reviewsCollection.deleteOne({
        _id: new ObjectId(id),
      });
      if (result.deletedCount === 0)
        return res.status(404).send({ error: "Review not found" });
      res.send({ success: true, message: "Review deleted" });
    });

    // -------------------- Requests --------------------

    app.get("/requests/latest", async (req, res) => {
      try {
        const latest = await requestsCollection
          .aggregate([
            { $sort: { createdAt: -1 } },
            { $limit: 6 },
            {
              $lookup: {
                from: "users",
                localField: "charityEmail",
                foreignField: "email",
                as: "charityInfo",
              },
            },
            {
              $lookup: {
                from: "donations",
                localField: "donationId",
                foreignField: "_id",
                as: "donationInfo",
              },
            },
            { $unwind: "$charityInfo" },
            { $unwind: "$donationInfo" },
            {
              $project: {
                _id: 1,
                description: 1,
                charityName: "$charityInfo.name",
                charityImage: "$charityInfo.image",
                donationTitle: "$donationInfo.title",
              },
            },
          ])
          .toArray();

        res.send(latest);
      } catch (err) {
        console.error("Error fetching latest charity requests:", err);
        res.status(500).send({ error: "Failed to load latest requests" });
      }
    });

    // -------------------- Users -------------------

    // save or update a users info in db
    app.post("/user", async (req, res) => {
      const userData = req.body;
      userData.role = "User";
      userData.created_at = new Date().toISOString();
      userData.last_loggedIn = new Date().toISOString();
      const query = {
        email: userData?.email,
      };
      const alreadyExists = await usersCollection.findOne(query);
      console.log("User already exists: ", !!alreadyExists);
      if (!!alreadyExists) {
        console.log("Updating user data......");
        const result = await usersCollection.updateOne(query, {
          $set: { last_loggedIn: new Date().toISOString() },
        });
        return res.send(result);
      }

      console.log("Creating user data......");
      // return console.log(userData)
      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const users = await usersCollection.find().toArray();
      res.send(users);
    });

    // get a user's role
    app.get("/user/role/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      if (!result) return res.status(404).send({ message: "User Not Found." });
      res.send({ role: result?.role });
    });

    app.patch("/users/:id", async (req, res) => {
      const { id } = req.params;
      const { role } = req.body;
      if (!role) return res.status(400).send({ error: "Role is required" });

      const result = await usersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { role } }
      );
      if (result.matchedCount === 0)
        return res.status(404).send({ error: "User not found" });
      res.send({ success: true, message: "User role updated" });
    });

    app.delete("/users/:id", async (req, res) => {
      const { id } = req.params;
      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0)
        return res.status(404).send({ error: "User not found" });
      res.send({ success: true, message: "User deleted" });
    });

    // -------------------- Charity Role Requests --------------------

    // POST /api/charity-role/request
    app.post("/api/charity-role/request", async (req, res) => {
      const { email, name, orgName, mission, transactionId, status } = req.body;
      try {
        await charityRequestsCollection.insertOne({
          email,
          name,
          orgName,
          mission,
          transactionId,
          status,
          createdAt: new Date(),
        });
        res.send({ success: true });
      } catch (err) {
        console.error("Failed to save charity role request:", err);
        res.status(500).json({ message: "Server error" });
      }
    });

    // GET /api/charity-role/status?email=...

    // Removed duplicate /api/charity-role/status endpoint for clarity

    // ----------------------- Requests for accept , delete, and update --------------------
    app.get("/api/restaurant/requests", async (req, res) => {
      const { restaurantEmail } = req.query;

      try {
        if (!restaurantEmail) {
          return res.status(400).send({ message: "Missing restaurantEmail" });
        }

        const donations = await donationsCollection
          .find({ restaurantEmail })
          .toArray();
        const donationIds = donations.map((d) => d._id);

        const requests = await requestsCollection
          .find({ donationId: { $in: donationIds } })
          .toArray();

        res.send(requests);
      } catch (err) {
        console.error("Error fetching requests:", err);
        res.status(500).send({ error: "Failed to fetch requests" });
      }
    });

    // -------------------- Accept Charity Request --------------------
    app.patch("/api/requests/accept/:id", async (req, res) => {
      const requestId = req.params.id;

      try {
        const acceptedRequest = await requestsCollection.updateOne(
          { _id: new ObjectId(requestId) },
          { $set: { status: "Accepted" } }
        );
        res.send({ message: "Request accepted" });
      } catch (err) {
        console.error("Accept error:", err);
        res.status(500).send({ message: "Error updating request status" });
      }
    });

    // --------------------- Reject Charity Request --------------------
    app.patch("/api/requests/reject/:id", async (req, res) => {
      const requestId = req.params.id;

      try {
        await requestsCollection.updateOne(
          { _id: new ObjectId(requestId) },
          { $set: { status: "Rejected" } }
        );
        res.send({ message: "Request rejected" });
      } catch (err) {
        res.status(500).send({ message: "Error rejecting request" });
      }
    });

    // Get all pickups assigned to a charity (Accepted or Assigned)
    app.get("/api/charity/my-pickups", async (req, res) => {
      const charityEmail = req.query.email;
      try {
        const result = await requestsCollection
          .find({
            charityEmail,
            status: { $in: ["Accepted", "Assigned"] },
          })
          .sort({ requestedAt: -1 })
          .toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch pickups" });
      }
    });

    // Confirm pickup (update status to "Picked Up")
    app.patch("/api/charity/confirm-pickup/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const result = await requestsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status: "Picked Up" } }
        );
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: "Failed to confirm pickup" });
      }
    });

    // --------------------- Transactions --------------------

    app.post("/api/payment", async (req, res) => {
      const { amount, email, mission, orgName } = req.body;

      if (!amount || !email || !mission || !orgName) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 2500,
          currency: "usd",
          payment_method_types: ["card"],
          metadata: {
            email,
            orgName,
            mission,
          },
        });

        res.send({ clientSecret: paymentIntent.client_secret });
      } catch (err) {
        console.error("Stripe error:", err);
        res.status(500).json({ message: "Stripe payment failed" });
      }
    });

    app.post("/api/charity-role/submit", async (req, res) => {
      const { amount, email, name, orgName, mission, transactionId } = req.body;

      if (!email || !orgName || !mission || !transactionId || !amount) {
        return res.status(400).send({ message: "Missing fields" });
      }

      try {
        // Optional: prevent duplicate request
        const existing = await charityRequestsCollection.findOne({
          email,
          $or: [{ status: "Pending" }, { status: "Approved" }],
        });

        if (existing) {
          return res.status(409).json({ message: "Request already exists" });
        }

        const result = await charityRequestsCollection.insertOne({
          email,

          name,
          orgName,
          mission,
          amount,
          transactionId,
          status: "Pending",
          createdAt: new Date(),
        });

        await transactionsCollection.insertOne({
          email,
          transactionId,
          amount: 2500,
          purpose: "Charity Role Request",
          date: new Date(),
        });

        res.send(result);
      } catch (error) {
        console.error("Failed to submit role request:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    });

    // -------------------- Get Charity Role Requests --------------------
    app.get("/api/charity-role/status", async (req, res) => {
      const email = req.query.email;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      try {
        const request = await charityRequestsCollection.findOne({
          email,
          $or: [{ status: "Pending" }, { status: "Approved" }],
        });

        if (request) {
          return res.json({ status: request.status });
        } else {
          return res.json({ status: "None" });
        }
      } catch (err) {
        console.error("Status check error:", err);
        res.status(500).json({ message: "Server error" });
      }
    });

    // -------------------- User Charity Role Requests Transactions--------------------
    // GET /api/charity/transactions?email=user@example.com
    app.get("/api/charity/transactions", async (req, res) => {
      const email = req.query.email;

      try {
        const transactions = await charityRequestsCollection
          .find({ email })
          .project({
            transactionId: 1,
            amount: 1,
            status: 1,
            createdAt: 1,
            _id: 0,
          })
          .toArray();

        res.send(transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // Require authentication middleware before this
    app.get("/api/charity/transaction", async (req, res) => {
      const email = req.query.email;
      if (!email) return res.status(400).send({ error: "Email required" });

      try {
        const transactions = await charityRequestsCollection
          .find({ email })
          .project({
            transactionId: 1,
            amount: 1,
            status: 1,
            createdAt: 1,
            _id: 0,
          })
          .toArray();

        console.log("Transactions found:", transactions.length);
        res.send(transactions);
      } catch (err) {
        console.error("Transaction fetch error", err);
        res.status(500).send({ error: "Server error" });
      }
    });

    // -------------------- Get All Charity Role Requests --------------------
    app.get("/api/charity-role/all", async (req, res) => {
      try {
        const requests = await charityRequestsCollection.find().toArray();
        res.send(requests);
      } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    app.patch("/api/charity-role/update/:id", async (req, res) => {
      const { id } = req.params;
      const { status, email } = req.body;

      if (!["Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      try {
        // Update status
        await charityRequestsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { status } }
        );

        // If approved, assign charity role
        if (status === "Approved") {
          await usersCollection.updateOne(
            { email },
            { $set: { role: "Charity" } }
          );
        }

        res.send({ message: "Status updated" });
      } catch (err) {
        console.error("Failed to update status:", err);
        res.status(500).json({ message: "Server error" });
      }
    });

 // -------------------- Dashboard Stats --------------------
// /api/dashboard/stats?userEmail=<email>
app.get("/api/dashboard/stats", async (req, res) => {
  try {
    const userEmail = req.query.userEmail;
    if (!userEmail) return res.status(400).json({ success: false, message: "User email required" });

    // Count favorites of this user
    const userFavoritesCount = await favoritesCollection.countDocuments({ userEmail });

    // Count reviews by this user
    const userReviewsCount = await reviewsCollection.countDocuments({ userEmail });

    // Check if user has any charity role request
    const userCharityRequests = await requestsCollection.find({ userEmail }).toArray();
    const hasCharityRequest = userCharityRequests.length > 0;

    const stats = {
      totalFavorites: userFavoritesCount,
      totalReviews: userReviewsCount,
      hasCharityRequest,
    };

    res.status(200).json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching user dashboard stats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
});


// /api/admin/dashboard/stats
// Admin Dashboard Stats
app.get("/api/admin/dashboard/stats", async (req, res) => {
  try {
    const db = client.db("Assignment-12");
    const donationsCollection = db.collection("donations");
    const featuredCollection = db.collection("featuredDonations");
    const usersCollection = db.collection("users");
    const requestsCollection = db.collection("requests");
    const charityRequestsCollection = db.collection("charityRoleRequests");

    // Count total donations
    const totalDonations = await donationsCollection.countDocuments();
    // Count total users
    const totalUsers = await usersCollection.countDocuments();

    // Count total role requests (general requests + charity role requests if needed)
    const totalRequests = await requestsCollection.countDocuments();
    const totalCharityRequests = await charityRequestsCollection.countDocuments();
    const totalRoleRequests = totalRequests + totalCharityRequests;

    // Count featured donations
    const totalFeaturedDonations = await featuredCollection.countDocuments();

    // Prepare stats object
    const stats = {
      totalDonations,
      totalUsers,
      totalRoleRequests,
      totalFeaturedDonations,
    };

    res.status(200).json({ success: true, stats });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
});


    // -------------------- Start Server --------------------
    const port = process.env.PORT || 5000;
    app.listen(port, () =>
      console.log(`🚀 Server running on http://localhost:${port}`)
    );
  } catch (err) {
    console.error("❌ Server startup error:", err);
  }
}

run();
