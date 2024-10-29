import express from "express";

import { attachUser } from "../utils/index.js";

import publicRoutes from "./public.js";
import userSystemRoutes from "./user-system.js";
import userRoutes from "./user.js";
import { addLcpInstrumentationHandler } from "@sentry-internal/tracing";

const router = express.Router({ mergeParams: true });
const generateRandomData = (min = 0, max = 100) => {
	return Math.random() * (max - min) + min;
}

router.get("/data/", (req, res, next) => {
	const localFoodCropProduction = {
		March: Array.from({ length: 100 }, () => generateRandomData(0, 100)),
		April: Array.from({ length: 100 }, () => generateRandomData(0, 100)),
		May: Array.from({ length: 100 }, () => generateRandomData(0, 100)),
	};
	const comparisonOfIrrigationWaterVsNeeds = {
		March: {etc: generateRandomData(0, 100), irrigation: generateRandomData(0, 100), rainfall: generateRandomData(0, 100)},
		April: {etc: generateRandomData(0, 100), irrigation: generateRandomData(0, 100), rainfall: generateRandomData(0, 100)},
		May: {etc: generateRandomData(0, 100), irrigation: generateRandomData(0, 100), rainfall: generateRandomData(0, 100)},
		June: {etc: generateRandomData(0, 100), irrigation: generateRandomData(0, 100), rainfall: generateRandomData(0, 100)},
		July: {etc: generateRandomData(0, 100), irrigation: generateRandomData(0, 100), rainfall: generateRandomData(0, 100)},
		August: {etc: generateRandomData(0, 100), irrigation: generateRandomData(0, 100), rainfall: generateRandomData(0, 100)},
	};
	const timePlot = {
		meteo: Array.from({ length: 20 }, () => generateRandomData(0, 100)),
		inSitu: Array.from({ length: 20 }, () => generateRandomData(0, 100)),
		generated: Array.from({ length: 20 }, () => generateRandomData(0, 100)),
	};
	return res.json({
		success: true,
		localFoodCropProduction,
		comparisonOfIrrigationWaterVsNeeds,
		timePlot,
	});
});

// Handlers for public routes
router.use("/", publicRoutes);

// Handlers for user routes
router.use("/", userSystemRoutes);

// Authorization middleware
router.use(attachUser);

// Handlers for user routes
router.use("/user/", userRoutes);

router.get("/test/", (req, res) => {
	const { user } = res.locals;
	console.log(user);
	return res.json({ success: true });
});



export default router;
