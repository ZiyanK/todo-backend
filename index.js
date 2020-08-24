const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const todoRoutes = require("./src/routes/todoRoutes");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.get('/', (req, res) => {
	res.status(200).send({
		payload: {
			msg: "Backend is healthy and running"
		}
	})
})

app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

app.listen(process.env.PORT, () => {
	console.log("Server is up and running");
})