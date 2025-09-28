// routes/user.route.js
import express from "express";
import { translateAPI } from "../controller/translate.js";
import { createNotification, getAllNotifications } from "../controller/pushNotification.js";
import { getCropRecommendation } from "../controller/getCropRecommendation.js";
import { getEfficientIrrigationCrops } from "../controller/getEfficientIrrigationCrops.js";
import { getAdvice } from "../controller/getAdvice.js";
import { getSoilAdvice } from "../controller/getSoilAdvice.js";

const router = express.Router();

router.post("/api/translate", translateAPI);
router.post("/api/notifications", createNotification);
router.get("/api/getAllNotifications", getAllNotifications);
router.post("/api/getCropRecomendation", getCropRecommendation);
router.post("/api/getFarmingTechniueRecomendation",getEfficientIrrigationCrops);
router.post("/api/getAdvice",getAdvice);
router.post("/api/getSoilAdvice",getSoilAdvice);
export default router;
