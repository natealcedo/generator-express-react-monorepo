import express from "express";
import { sampleController } from "../controllers";

const router = express.Router();

router.get("/up", sampleController.sampleControllerFunction);

router.use((req, res) => {
  res.status(404).json({
    error: "Resource not found",
  });
});

export default router;
