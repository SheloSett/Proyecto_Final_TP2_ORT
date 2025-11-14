import dotenv from 'dotenv'

dotenv.config()

const {
    MYSQL_DB,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_HOST,
    MYSQL_PORT,
    SERVER_PORT,
    SERVER_HOST,
    DIALECT,
    SUPABASE_URL,
    SUPABASE_API_KEY
} = process.env

const config = {

    MYSQL_DB,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_HOST,
    MYSQL_PORT,
    SERVER_PORT,
    SERVER_HOST,
    DIALECT,
    SUPABASE_URL,
    SUPABASE_API_KEY
}

export default config;