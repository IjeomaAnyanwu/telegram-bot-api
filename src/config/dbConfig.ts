import {Sequelize} from "sequelize"
import {config} from 'dotenv'

config()

const {DB_HOST,DB_PORT,DB_NAME,DB_USERNAME, DB_PASSWORD} = process.env

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT), 
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,

})





