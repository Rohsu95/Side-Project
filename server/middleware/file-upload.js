const multer = require("multer");

const _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
    console.log(req.file);
    console.log(file);
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname; // 원본 파일 이름
    const ext = originalname.split(".").pop(); // 파일 확장자

    console.log(req.file);
    // 파일 이름을 고유하게 생성 (예: timestamp + 확장자)
    const uniqueFilename = Date.now() + "." + ext;

    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage: _storage });

module.exports = upload;
