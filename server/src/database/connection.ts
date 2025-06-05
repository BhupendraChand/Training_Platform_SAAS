import {Sequelize} from 'sequelize-typescript';
const sequelize = new Sequelize({
    database: process.env.DB_NAME ,
    username:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: Number(process.env.DB_PORT),
    models:[__dirname+ '/models']
})

sequelize.authenticate()
    .then(() => {
        console.log('Database is Connected Successfully to MySQL.');
    })
    .catch((error) => {
        console.error( error);
    });



sequelize.sync({alter:false})
    .then(() => {
        console.log('Database Migrate Successfully.');
    })
export default sequelize;