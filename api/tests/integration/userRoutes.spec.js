describe("user endpoints", () => {
  let api;
  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(async () => {
    api = app.listen(5000, () =>
      console.log("Test server running on port 5000")
    );
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    api.close(done);
  });

  it("should return a list of all users in database", async () => {
    const res = await request(api).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(4);
  });

  it("should return a list of all users from specific game lobby with points decending", async () => {
    const res = await request(api).get("/users/game/table/test");

    expect(res.statusCode).toEqual(201);
    expect(res.body[0].username).toEqual("laca");
    expect(res.body.length).toEqual(3);
  });

  it("should create a new user", async () => {
    const res = await request(api).post("/users").send({
      username: "Mane",
      points: 0,
      game_id: "random",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({
      user_id: 5,
      username: "Mane",
      points: 0,
      game_id: "random",
    });
  });

  it("should return a list of all users from specific game lobby", async () => {
    const res = await request(api).get("/users/game/liverpool");

    expect(res.statusCode).toEqual(201);
    expect(res.body[0]).toEqual({
      user_id: 3,
      username: "salah",
      points: 8,
      game_id: "liverpool",
    });
    expect(res.body.length).toEqual(1);
  });

  it("should update the points for the specific user", async () => {
    const res = await request(api).patch("/users/points/3").send({
      points: 40,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.points).toEqual(40);
  });
});
