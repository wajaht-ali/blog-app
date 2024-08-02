import express from "express";
import multer from "multer";
import path from "path";
import AllPosts from "../controllers/post_controller.js";
import { CreatePostController } from "../controllers/create_post.js";
import {
  GetPostById,
  UpdatePostController,
} from "../controllers/getPostById.js";
import { deletePostById, handleLikeController, handleUnLikeController } from "../controllers/deletePost.js";
import { requireSignIn } from "../middlewares/requireSignIn.js";
// import { isSignedIn } from "../middlewares/requireSignIn.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.get("/latest/:id", GetPostById);
router.put("/update-post/:id", upload.single("file"), UpdatePostController);
router.get("/getAllNews", AllPosts);
router.post("/createPost", upload.single("file"), CreatePostController);
router.delete("/deletePostById/:id", deletePostById);
router.put("/like-post/:id", requireSignIn, handleLikeController);
router.put("/unlike-post/:id", requireSignIn, handleUnLikeController);
export { router as PostRouter };
