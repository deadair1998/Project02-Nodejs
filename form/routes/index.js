var express = require('express');
var router = express.Router();
// config multer để upload file
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now() + '-'+ file.originalname)
  } 
});
  //----- check file upload ------ //
function checkFile (req,file,cb) {
  if(!file.originalname.match(/\.(jpg|png|gif|jpeg)$/)){
    cb(new Error('Bạn chỉ được load ảnh thôi'));
  }else{
    cb(null, true);
  }
}
var upload = multer({ storage: storage , fileFilter:checkFile});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/',upload.single('img'), function(req, res, next) {
  let data = req.body.sp;
 res.send("đây là tên của tôi " + data);
});

module.exports = router;
