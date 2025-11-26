import { Sequelize } from 'sequelize';
import config from "../config/config.js"

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(
    config.MYSQL_DB,
    config.MYSQL_USER,
    config.MYSQL_PWD,
    {
        host: config.MYSQL_HOST,
        port: config.MYSQL_PORT,
        dialect: config.DIALECT,
        dialectModule: require('mysql2')
    }
);
