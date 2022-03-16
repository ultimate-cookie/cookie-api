const db = require("../dbConfig/init");
const { use } = require("../routes/user");

class User {
  constructor(data) {
    this.user_id = data.user_id;
    this.username = data.username;
    this.points = data.points;
    this.game_id = data.game_id;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const usersData = await db.query(`SELECT * FROM users;`);
        console.log(usersData)
        const users = usersData.rows.map((user) => new User(user));
        console.log(users)
        resolve(users);
      } catch (err) {
        reject("Error retrieving Users");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await db.query("SELECT * FROM users WHERE user_id = $1;", [
          id,
        ]);
        const user = new User(userData.rows[0]);
        resolve(user);
      } catch (err) {
        reject("Error retrieving Users");
      }
    });
  }

  static createUser(username, points, game_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await db.query(
          "INSERT INTO users (username, points, game_id) VALUES ($1, $2, $3) RETURNING *;",
          [username, points, game_id]
        );
        let newUser = new User(userData.rows[0]);
        resolve(newUser);
      } catch (err) {
        reject(`Error creating User: ${err}`);
      }
    });
  }

  static updatePoints(user_id, points) {
    return new Promise(async (resolve, reject) => {
      try {
        let updateUserPoints = await db.query(
          "UPDATE users SET points = $1 WHERE user_id = $2 RETURNING *;",
          [points, user_id]
        );
        let updatedUser = new User(updateUserPoints.rows[0]);
        resolve(updatedUser);
      } catch (err) {
        reject("Error updating User");
      }
    });
  }


  static findByGame(game_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const usersData = await db.query(
          "SELECT * FROM users WHERE game_id = $1;",
          [game_id]
        );
        const users = usersData.rows.map((user) => new User(user));
        resolve(users);
      } catch (err) {
        reject("Error retrieving users");
      }
    });
  }

  static pointsTable(game_id) {
    return new Promise(async (resolve, reject) => {
      try {
        let tableData = await db.query(
          `SELECT * FROM users WHERE game_id = $1 ORDER BY POINTS DESC;`,
          [game_id]
        );
        console.log("this is the table data", tableData)
        const user = tableData.rows.map((user) => new User(user));
        console.log("this is the user from request", user)
        resolve(user);
      } catch (err) {
        reject("Error retrieving results");
      }
    });
  }


}

module.exports = {User}
