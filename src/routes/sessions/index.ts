import { Router } from "express";
import loginController from "../../controllers/sessions/login.controller";

const sessionsRoutes = Router();

sessionsRoutes.post("/login", loginController);

export default sessionsRoutes;
