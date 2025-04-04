const express = require("express");
const cookie_parser = require("cookie-parser");
const cors = require("cors");

const serverConfig = require("./config/serverConfig");
const { connectDb } = require("./config/dbConfig");
const { userRoute } = require("./routes/userRoute");
const { authRoute } = require("./routes/authRoute");
const { productRoute } = require("./routes/productRoute");
const { cartRoute } = require("./routes/cartRoute");
const { orderRoute } = require("./routes/orderRoute");

const app = express();

app.use(cookie_parser()); // cookie parser
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));// Extended true means that the express uses query String (qs) library to parse the url.

// Move CORS middleware before routes
app.use(cors({
    origin: serverConfig.frontend_url, // No trailing slash
    credentials: true, // Allow credentials (cookies, sessions, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// User Route middleware
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/orders", orderRoute);

// // test route
// app.get("/", (req, res) => {
//     res.send({
//         message: "Welcome!",
//     })
// })

app.listen(serverConfig.PORT, async () => {
    await connectDb();
})

