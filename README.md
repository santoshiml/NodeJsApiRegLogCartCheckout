npm init -y  // create package.json file with all info



sudo npm install express-generator -g
password: 123456
express api-sequelize --view=ejs
express Social Network --view=ejs
cd api_sequelize
npm install 

sudo npm install -g sequelize-cli
npm install --save sequelize
npm install --save pg pg-hstore


touch .sequelizerc  // create a folder called sequelizerc
open file & write some code 
const path = require('path');

module.exports = {
  "config": path.resolve('./config', 'config.json'),
  "models-path": path.resolve('./models'),
  "migrations-path": path.resolve('./migrations') 
};
sequelize init


open & change config.json file as per the requirements 
 {
  "development": {
    "username": "postgres",
    "password": "123456",
    "database": "new_to_do",
    "host": "localhost",
    "dialect": "postgres"
  },
  & save file 


npx sequelize-cli model:generate --name User --attributes Name:string,Email:string,Password:string

npx sequelize-cli model:generate --name Event --attributes user_id:string,event_name:string,action:string



npx sequelize-cli model:generate --name Post --attributes title:string,description:string

npx sequelize-cli model:generate --name Wall --attributes user_id:integer,title:string,description:string

npx sequelize-cli model:generate --name Comment --attributes user_id:integer,wall_id:integer,comment:string

npx sequelize-cli model:generate --name Product_Category --attributes product_id:integer,category_id:integer



create schema with User table 
now open new terminal & create db(new_to_do).
so steps is:
sudo apt update
sudo -u postgres psql
\l oe \list --. show all db 
create database social-network;
\l
\c new_to_do  --> connect to db 

sequelize db:migrate  --> after create Db fire this migration command 

npm install nodemon  --> nodemon install 



for JWT install 
npm install jsonwebtoken


sudo -u postgres psql
/list
\c new_to_do 

git 
git init
sudo apt install git
git add .
git status

touch .gitignore
git init
git branch -M main
git commit -m "initial commit"
git config --local user.email "santoshiyuvasoft342@gmail.com"
git config --local user.name "Santoshi Patidar"
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/santoshi342/reg_login.git
git push -u origin main
ssh-keygen
git push origin main 
git remote -v
git remote remove origin
git remote -v
git remote add origin git@github.com:santoshi342/reg_login.git
git push origin main 
git push origin main 
git fetch -a
ls ~/.ssh/
ls -la
cd ~/.ssh/
ls -la
sudo -R 777 id_rsa id_rsa.pub 
sudo chmod -R 777 id_rsa


Team.belongsToMany(Game, { through: GameTeam });
Game.belongsToMany(Team, { through: GameTeam });
GameTeam.belongsTo(Game);
GameTeam.belongsTo(Team);
Game.hasMany(GameTeam);
Team.hasMany(GameTeam);


How to Install ngrok 
 npm install -g ngrok 


 Add new column in existing table using sequelize 

 npx sequelize-cli migration:create --name link_token (any db name can use)

 npx sequelize-cli migration:create --name delete    --> create new migrations 

 opne this migration file & write some code including up & down 
 
 return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'reset_password_token', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
      ])


      down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.removeColumn('Users', 'reset_password_token'),
    ]);

  }
};
 
 npx sequelize-cli db:migrate  --->Again run command 


Undo migrations go to previous migration & can delete the latest migration 
npx sequelize-cli db:migrate:undo

npx sequelize-cli db:migrate:undo:all --to 20220105110953-delete.js  to means where to last all migrations are deleted.

npx sequelize-cli db:migrate:undo --name 20220105115425-delete.js  --> delete perticular migration. 

































