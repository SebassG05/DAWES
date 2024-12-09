import { Router } from "express";
import { paginaPrincipal, ping, fibonacci } from "../controllers/index.js";

const indexRouter = Router();

indexRouter.get("/", paginaPrincipal);
indexRouter.get("/ping", ping);
indexRouter.get("/fibonacci", fibonacci);


export default indexRouter;