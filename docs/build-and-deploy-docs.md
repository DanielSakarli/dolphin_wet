# Build and deploy documentation

## First thing first

Our application is delpoyed on the remote service that we rent ([server specs]([Sign in · GitLab](https://mad-srv.informatik.uni-erlangen.de/InnoLab/ss23/tiergarten-nuernberg/-/wikis/Documentation/Tiergarten/Dolphin_Wet#web-hoster))).

You can follow this video to deploy the application from the scratch.

[Deploy a Node.js app to Ubuntu Server](https://www.youtube.com/watch?v=SPeQJ-fINoU). This tutorial includes how to set up Nginx and PM2.

[Deploy a Node.js app to Ubuntu Server - Blog for this video tutorial](https://dev.to/hayleycodes/deploying-a-node-js-site-to-vultr-j8d)

## General steps

1. set up the database
   
   - Log in MySQL database .
     
     mysql password: dolphin_wet
     
     ```bash
     mysql -u root -p
     # -u for user, in this case we specify root user
     # -p for password, we use password to login mysql
     ```
     ```
   
   - Delete dolphin_wet database if exists.
     
     ```bash
     drop database dolphin_wet;
     ```
   
   - Create a new dolphin_wet database.
     
     ```bash
     create database dolphin_wet;
     ```
   
   - Check if the database has been created successfully.
     
     If you can see dolphin_wet in the output list, it's successful.
     
     ```bash
     show database;
     ```

2. After exiting mysql, clone or pull the latest code from gitlab or somewhere else. Go to the carecentive folder inside the project. Run:
   
   ```bash
   npm ci
   # ci for clean install
   # It is equal to npm install but can avoid some unecessary update that
   # might crash our code
   ```

3. Run database migrations and load seeds data:
   
   ```bash
   npm run migrate-all
   ```
   
   ```bash
   npm run seed-dev
   ```

4. Restart the code using pm2:
   
   ```bash
   pm2 restart 0
   # here 0 is the id of our code in pm2
   # you can use `pm2 ls` to view all running process in pm2
   ```
