sudo npm install express-generator -g
password: 123456
express api-sequelize --view=ejs
cd api_sequelize
npm install 

sudo npm install -g sequelize-cli
npm install --save sequelize
npm install --save pg pg-hstore
npm init -y  // create package.json file with all info

touch .sequelizerc  // create a folder called sequelizerc
open file & write some code 
const path = require('path');

module.exports = {
  "config": path.resolve('./config', 'config.json'),
  "models-path": path.resolve('./models'),
  "migrations-path": path.resolve('./migrations') 
};
sequelize init


open & change package.json file as per the requirements 
 {
  "development": {
    "username": "postgres",
    "password": "123456",
    "database": "new_to_do",
    "host": "localhost",
    "dialect": "postgres"
  },
  & save file 


npx sequelize-cli model:generate --name User --attributes Name:string,Email:string,Password:string,Phone:integer,Age:integer

create schema with User table 
now open new terminal & create db(new_to_do).
so steps is:
sudo apt update
sudo -u postgres psql
\l oe \list --. show all db 
create database new_to_do;
\l
\c new_to_do  --> connect to db 

sequelize db:migrate  --> after create Db fire this migration command 

npm install nodemon  --> nodemon install 



for JWT install 
npm install jsonwebtoken


sudo -u postgres psql
/list
\c new_to_do 







