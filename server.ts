import * as express from "express";
import * as compression from "compression";
import * as cors from "cors";
import * as path from "path";

const app = express();

// compress responses
app.use(compression());

// Add CORS
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

const apiRoute = express.Router();

apiRoute.get("/", (req, res) => {
  res.json({
    back: "Yeah One"
  });
});

// API
app.use("/api/", apiRoute);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

const port = process.env.PORT || 4000;
app.listen(port);
