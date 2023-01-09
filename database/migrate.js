const { PostgreSQL } = require('../configs/connection')
const { migrate } = require('postgres-migrations')

try {
  migrate({PostgreSQL}, "path/to/migration/files")
} finally {
  await PostgreSQL.end()
}
