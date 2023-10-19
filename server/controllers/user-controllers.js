const HttpError = require("../models/error");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const User = require("../models/user");

// 유저 정보 불러오기
const getUser = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("유저 겟 정보 실패", 500);
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// 회원 가입
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  // 정보가 잘못 전달 되었을 떄
  if (!errors.isEmpty()) {
    return next(new HttpError("잠시 후  다시 회원 가입을 해주세요", 422));
  }

  const { username, email, password } = req.body;
  let image = "../images/basic.png";
  if (req.file && req.file.path) {
    image = req.file.path;
  }

  // 이메일로 중복 확인
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("이메일 에러.", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError("이메일이 중복.", 422);
    return next(error);
  }
  // 패스워드 암호화
  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("패스워드 보안 에러", 500);
    return next(error);
  }

  const createdUser = new User({
    username,
    email,
    image: image,
    // image: req.file.path,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "회원 가입 실패 잠시 후 다시 시도 해주세요.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "4h" }
    );
  } catch (err) {
    const error = new HttpError("회원 가입 token 쪽 에러", 500);
    return next(error);
  }

  res.status(201).json({
    user: createdUser.id,
    email: createdUser.email,
    token: token,
    image: createdUser.image,
  });
};

// 로그인
const login = async (req, res, next) => {
  const { email, password, username } = req.body;

  // 이메일 검사
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "로그인에 실패 했습니다. 잠시 후에 시도해 주세요.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError("패스워드 또는 이메일이 일치 하지 않다.", 401);
    return next(error);
  }
  // 패스워드 검사
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError("패스워드 같지 않다????", 500);
    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError("패스워드가 일치 하지 않다.", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: "4h" }
    );
  } catch (err) {
    const error = new HttpError("로그인 token 쪽 에러", 500);
    return next(error);
  }

  // getters 하는 이유는 id에 밑줄(_)을 제거하기 위해 사용한다.
  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    username: existingUser.username,
    image: existingUser.image,
    token: token,
  });
};

// 유저 정보 수정
const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  // 유효성 검사에 벗어나는지 확인한다. 오류가 있다면 errors 객체를 반환한다.
  if (!errors.isEmpty()) {
    next(new HttpError("업데이트 에러를 확인 해주세요.", 422));
  }
  const userId = req.params.id;

  const { username, email, password } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("수정 실패", 500);
    return next(error);
  }

  user.username = username;
  user.email = email;

  if (password) {
    // 새로운 패스워드가 제공된 경우에만 암호화
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError("패스워드 보안 에러", 500);
      return next(error);
    }
    user.password = hashedPassword;
  }

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError("유저 수정 db에 저장 실패", 500);
    return next(error);
  }
  res.status(200).json({ user: user.toObject({ getters: true }) });
};

exports.signup = signup;
exports.login = login;
exports.getUser = getUser;
exports.updateUser = updateUser;
