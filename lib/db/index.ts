/**
 * Neon Database Client
 * Serverless PostgreSQL connection
 */

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// Allow build without DATABASE_URL (using placeholder)
const connectionString = process.env.DATABASE_URL || 'postgresql://placeholder:placeholder@placeholder.neon.tech/placeholder'

const sql = neon(connectionString)
export const db = drizzle(sql, { schema })

export { schema }

