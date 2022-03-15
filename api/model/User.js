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
        const users = usersData.rows.map((u) => new User(u));
        resolve(users);
      } catch (err) {
        reject("Error retrieving Users");
      }
    });
  }
}
