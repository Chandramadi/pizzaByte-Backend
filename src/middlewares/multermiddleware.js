const multer = require("multer");
const path = require("path"); // To get the extension of the file.
const storage = multer.diskStorage({
    destination:(req, file, next)=>{
        next(null, 'uploads/');
    },
    filename:(req,file,next)=>{
        const f = file.originalname;
        next(null, `${Date.now()}${path.extname(f)}`)
    },
});
const upload = multer({ storage: storage })

module.exports = upload;