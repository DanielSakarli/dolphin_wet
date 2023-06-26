# Dolphin Wet APIs

> Dolphin Wet is about dolphin welfare research. This is the backend part of this project. The framework used in this project is [carecentive](https://carecentive.net).

## Installation

1. Clone the repository:
   please make sure that you have connected FAU vpn and setup the license.
   
   ```shell
   git clone https://mad-srv.informatik.uni-erlangen.de/InnoLab/ss23/tiergarten-nuernberg.git
   ```

2. Navigate to the project directory:
   
   ```shell
   cd carecentive-framework
   ```

3. Install the dependencies:
   
   use npm ci to avoid dependencies update
   
   you can go to [continuous integration - What is the difference between &quot;npm install&quot; and &quot;npm ci&quot;? - Stack Overflow](https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci) to learn more.
   
   ```shell
   npm ci 
   ```

4. Create a .env file
   
   ```shell
   # In the carecentive-framework directory
   # Use the command based on your shell to create this file
   touch .env
   ```

5. use your favorite text editor open .env file, copy and paste the following to your .env file.
   
   You have to have a mysql installed on your machine and fill out the information about mysql.
   
   You can set the http_port here and then the application will run on the given port.
   
   ```textile
   CLIENT_ID=
   CONSUMER_SECRET=
   WITHINGS_REDIRECT_URI=
   MYSQL_HOST=
   MYSQL_DATABASE=
   MYSQL_USER=
   MYSQL_PASSWORD=
   JWT_TOKEN_SECRET=
   HTTP_PORT=
   API_KEY=
   ```

6. Migrate all database tables
   
   After this, all needed tables in mysql should be created automatically by [knex](https://knexjs.org).
   
   ```shell
   npm run migrate-all
   ```

## Usage

### Start the dev server

The appliction will run on the given port number in localhost:[port_number].

When you use the dev server, under the hood [nodemon](https://www.npmjs.com/package/nodemon) will restart the application automatically when fil changes in the directory.

```shell
npm run dev
```

### Start the application

```shell
npm run start
```

### Script

seed-dev: Runs database seed script for development.

```shell
npm run seed-dev
```

insmysql: Installs the mysql package.

```shell
npm run insmysql
```

core-migrate-all: Runs database migrations from the carecentive-core package.

```shell
npm run core-migrate-all
```

migrate-all: Runs all database migrations.

```shell
npm run migrate-all
```

rollback-all: Rolls back all database migrations.

```shell
npm run rollback-all
```

poll-data: Runs the pollData.js script.

```shell
npm run poll-date
```

test-push: Runs the WebPush.js script.

```shell
npm run test-push
```

test: Runs tests using Jest.

```shell
npm run test
```