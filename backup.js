const {
    exec
} = require('child_process');
const {
    DB_USER,
    DB_NAME,
    DB_PASSWORD
} = require('./.env')
const path = require('path')

const date = new Date();
const current_date = `${date.getDate()}-${date.getMonth() + 
    1}-${date.getFullYear()}.${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

const backup_file = `backup_${current_date}.sql`;

const backup_script = `pg_dump "dbname=${DB_NAME} user=${DB_USER} password=${DB_PASSWORD}" > ${path.resolve(`${__dirname}/backups`, backup_file)}`;

exec(backup_script,
    (error, stdout, stderr) => error !== null ? console.log(`exec error: ${error}`) : console.log('Backup complete!')
)