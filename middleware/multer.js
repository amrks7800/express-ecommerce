import multer from "multer"

const storage = multer.diskStorage({
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

export default upload
