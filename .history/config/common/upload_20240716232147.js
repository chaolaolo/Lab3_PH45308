const multer = require("multer");
const _storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,file.filename + "-" + Date.now() + file.originalname);
    }
})

const upload = multer({storage:_storage});

module.exports = upload;