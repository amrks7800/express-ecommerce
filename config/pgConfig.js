let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env

const pgConfig = {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
}

export default pgConfig
