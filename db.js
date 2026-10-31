// Forbindelse til PostgreSQL.
// pg læser selv PGHOST, PGPORT, PGDATABASE, PGUSER og PGPASSWORD fra miljøet (.env).
import pg from 'pg';

const pool = new pg.Pool();

export default pool;
