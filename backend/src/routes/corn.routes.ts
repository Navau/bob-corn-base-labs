import { Router } from "express";
import { CornController } from "../controllers/corn.controller";

const router = Router();
const controller = new CornController();

router.post("/buy", (req, res) => controller.buyCorn(req, res));
router.get("/paginated", (req, res) => controller.getCornsPaginated(req, res));
router.get("/", (req, res) => controller.getAllCorns(req, res));

export default router;
