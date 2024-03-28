const whitelist = ["http://localhost:5173"]

export default {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  optionsSuccessStatus: 200,
}
