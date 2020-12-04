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
    1}-${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

const backup_file_extension = '-Fc'; // -Fc: custom; -Fp: plain; -Fd: directory; -Ft: tar;
const backup_file = `backup_${current_date}`;
const backup_file_directory = path.resolve(`${__dirname}/backups`, backup_file);
const backup_script = `pg_dump ${backup_file_extension} "dbname=${DB_NAME} user=${DB_USER} password=${DB_PASSWORD}" > ${backup_file_directory}`;

exec(backup_script,
    (error, stdout, stderr) => error !== null ? console.log(`exec error: ${error}`) : console.log('Backup complete!')
)