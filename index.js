const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
// Middleware
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection

const mongoUrl =
  "mongodb+srv://sanketnannaware21:kBxNfh9lf4mmEcES@cluster0.drayt9q.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
 
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

// Routes
const taskRoutes = require("./routes/taskRoutes");
app.use("/", taskRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

///kBxNfh9lf4mmEcES
//mongodb+srv://<username>:<password>@cluster0.ndfrkwi.mongodb.net/?retryWrites=true&w=majority

