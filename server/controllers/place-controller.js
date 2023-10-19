const { validationResult } = require("express-validator");

const HttpError = require("../models/error");

const Place = require("../models/place");
const Comment = require("../models/comment");

// 게시글 생성
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  // 유효성 검사에 벗어나는지 확인한다. 오류가 있다면 errors 객체를 반환한다.
  if (!errors.isEmpty()) {
    next(new HttpError("Title, Content, Tags를 모두 작성해 주세요.", 422));
  }
  const { title, content, tags, createdAt, username, creator, image } =
    req.body;

  const createdPlace = new Place({
    title,
    content,
    tags,
    createdAt,
    username,
    creator,
    image,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("게시글 생성 실패.", 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace.toObject({ getters: true }) });
};

// 게시글 불러오기
const getPlacesByUserId = async (req, res, next) => {
  let places;
  try {
    places = await Place.find({});
  } catch (err) {
    const error = new HttpError("getPlacesByUserId 에러 입당", 500);
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(new HttpError("places가 없다.", 404));
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

// 게시글 삭제
const deletePlace = async (req, res, next) => {
  const placeId = req.params.id;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("삭제 할 것을 찾지 못했다.", 500);
    return next(error);
  }

  try {
    await place.deleteOne();
  } catch (err) {
    const error = new HttpError("삭제 실패", 500);
    return next(error);
  }

  res.status(200).json({ message: "삭제 성공" });
};

// 게시글 수정
const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  // 유효성 검사에 벗어나는지 확인한다. 오류가 있다면 errors 객체를 반환한다.
  if (!errors.isEmpty()) {
    next(
      new HttpError(
        "수정해야 할 Title, Content, Tags를 모두 작성해 주세요..",
        422
      )
    );
  }
  const placeId = req.params.id;

  const { title, content, tags } = req.body;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("수정 실패", 500);
    return next(error);
  }

  place.title = title;
  place.content = content;
  place.tags = tags;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError("수정 db에 저장 실패", 500);
    return next(error);
  }
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

// 댓글 생성
const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  // 유효성 검사에 벗어나는지 확인한다. 오류가 있다면 errors 객체를 반환한다.
  if (!errors.isEmpty()) {
    next(new HttpError("댓글을 작성 해주세요.", 422));
  }
  const { comment, createdAt, username, creator, image, commentId } = req.body;

  const createdComment = new Comment({
    comment,
    createdAt,
    username,
    creator,
    image,
    commentId,
  });

  try {
    await createdComment.save();
  } catch (err) {
    const error = new HttpError("댓글 생성 실패.", 500);
    return next(error);
  }

  res.status(201).json({ Comment: createdComment.toObject({ getters: true }) });
};

// 댓글 불러오기
const getComment = async (req, res, next) => {
  let comment;
  try {
    comment = await Comment.find({});
  } catch (err) {
    const error = new HttpError("getComment 에러 입당", 500);
    return next(error);
  }

  if (!comment || comment.length === 0) {
    return next(new HttpError("comment가 없다.", 404));
  }

  res.json({
    comment: comment.map((comment) => comment.toObject({ getters: true })),
  });
};

// 댓글 삭제
const deleteComment = async (req, res, next) => {
  const placeId = req.params.id;

  let comment;

  try {
    comment = await Comment.findById(placeId);
  } catch (err) {
    const error = new HttpError("댓글 삭제 할 것을 찾지 못했다.", 500);
    return next(error);
  }

  try {
    await comment.deleteOne();
  } catch (err) {
    const error = new HttpError("댓글 삭제 실패", 500);
    return next(error);
  }

  res.status(200).json({ message: "댓글 삭제 성공" });
};

exports.createPlace = createPlace;
exports.getPlacesByUserId = getPlacesByUserId;
exports.deletePlace = deletePlace;
exports.createComment = createComment;
exports.getComment = getComment;
exports.deleteComment = deleteComment;
exports.updatePlace = updatePlace;
