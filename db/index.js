import pg from "pg"
import pgConfig from "../config/pgConfig.js"

const { Pool } = pg

const pool = new Pool(pgConfig)

export default pool
