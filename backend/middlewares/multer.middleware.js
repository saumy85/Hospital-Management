import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)   // we have to change this later bcz users may upload files as same names again and agian.
    }
  })
  
  export const upload = multer({ 
    storage,
  }) 