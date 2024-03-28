import cloudinary from "../utils/cloudinary.js"

const uploadImage = async (req, res) => {
  cloudinary.uploader.upload(
    req.file.path,
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: err.message })

      res.status(200).json({ url: result.secure_url })
    }
  )
}

export { uploadImage }
