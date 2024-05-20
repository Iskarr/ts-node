import { Router } from "express";
import {
  getNews,
  addNews,
  getNewsById,
  updateNews,
  deleteNews,
} from "../controllers/newsController";

const router = Router();

router.get("/news", getNews);
router.post("/news", addNews);
router.get("/news/:id", getNewsById);
router.patch("/news/:id", updateNews);
router.delete("/news/:id", deleteNews);

export default router;
