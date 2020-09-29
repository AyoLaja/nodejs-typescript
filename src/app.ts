import express from "express";
import bodyParser from "body-parser";

import todosRoutes from "./routes/todosRoutes";

const app = express();

app.use(bodyParser.json());
app.use(todosRoutes);

app.listen(4000);
