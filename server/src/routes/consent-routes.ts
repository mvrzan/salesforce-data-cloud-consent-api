import { Router } from "express";
import { validateSignature } from "../middleware/validateSignature.ts";
import getProcessing from "../controllers/getProcessing.ts";

const consentRoutes = Router();

consentRoutes.get("/api/v1/processing/:id", getProcessing);
consentRoutes.patch("/api/v1/processing/:id", validateSignature, () => {});
consentRoutes.get("/api/v1/portability/:id", validateSignature, () => {});
consentRoutes.patch("/api/v1/portability/:id", validateSignature, () => {});
consentRoutes.get("/api/v1/shouldForget/:id", validateSignature, () => {});
consentRoutes.patch("/api/v1/shouldForget/:id", validateSignature, () => {});

export default consentRoutes;
