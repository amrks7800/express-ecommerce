import { v2 as cloudinary } from "cloudinary"
import cloudinaryConfig from "../config/cloudinaryConfig.js"

cloudinary.config(cloudinaryConfig)

export default cloudinary
