const db = require("../db_config/init");

class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.points = data.points;
    this.game_id = data.game_id;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        const usersData = await db.query(`SELECT * FROM users;`);
        const users = usersData.rows.map((user) => new User(user));
        resolve(users);
      } catch (err) {
        reject("Error retrieving Users");
      }
    });
  }

  static findById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await db.query("SELECT * FROM users WHERE id = $1;", [
          id,
        ]);
        const user = new User(userData.rows[0]);
        resolve(user);
      } catch (err) {
        reject("Error retrieving Users");
      }
    });
  }

  static findByGame(game_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const usersData = await db.query(
          "SELECT * FROM users WHERE lobby_id = $1;",
          [game_id]
        );
        const users = usersData.rows.map((user) => new User(user));
        resolve(users);
      } catch (err) {
        reject("Error retrieving users");
      }
    });
  }


}
