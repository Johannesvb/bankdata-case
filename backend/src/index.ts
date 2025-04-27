import express from "express";
import cors from "cors";
import accountRoutes from "./routes/accountRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/accounts", accountRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Bank API is running on http://localhost:${PORT}`);
});
