const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/place-controller");

const router = express.Router();

//게시글 조회
router.get("/", placesControllers.getPlacesByUserId);

// 게시글 생성
router.post(
  "/editor",
  [
    check("title").not().isEmpty(),
    check("content").not().isEmpty(),
    check("tags").not().isEmpty(),
  ],
  placesControllers.createPlace
);

// 게시글 삭제
router.delete("/:id", placesControllers.deletePlace);

// 게시글 수정
router.patch(
  "/:id",
  [
    check("title").not().isEmpty(),
    check("content").not().isEmpty(),
    check("tags").not().isEmpty(),
  ],
  placesControllers.updatePlace
);

// 댓글 생성
router.post(
  "/comment",
  [check("comment").not().isEmpty()],
  placesControllers.createComment
);

// 댓글 조회
router.get("/comments", placesControllers.getComment);

//댓글 삭제
router.delete("/comment/:id", placesControllers.deleteComment);

module.exports = router;
