import { Router } from "express";
import { validateSignature } from "../middleware/validateSignature.ts";
import getProcessing from "../controllers/getProcessing.ts";
import patchProcessing from "../controllers/patchProcessing.ts";
import getShouldForget from "../controllers/getShouldForget.ts";
import patchShouldForget from "../controllers/patchShouldForget.ts";
import getPortability from "../controllers/getPortability.ts";
import patchPortability from "../controllers/patchPortability.ts";

const consentRoutes = Router();

consentRoutes.get("/api/v1/processing/:id", validateSignature, getProcessing);
consentRoutes.patch("/api/v1/processing/:id", validateSignature, patchProcessing);
consentRoutes.get("/api/v1/portability/:id", validateSignature, getPortability);
consentRoutes.patch("/api/v1/portability/:id", validateSignature, patchPortability);
consentRoutes.get("/api/v1/shouldForget/:id", validateSignature, getShouldForget);
consentRoutes.patch("/api/v1/shouldForget/:id", validateSignature, patchShouldForget);

export default consentRoutes;
