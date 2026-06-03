const request = require("supertest");
const app = require("../src/app");
const { getDb } = require("../src/config/database");
const { initDatabase } = require("../src/data/init");

const initialAppliancesState = [
  {
    name: "Washing Machine",
    type: "washer",
    status: "online",
    health: "good"
  },
  {
    name: "Refrigerator",
    type: "fridge",
    status: "online",
    health: "warning"
  },
  {
    name: "Dishwasher",
    type: "dishwasher",
    status: "offline",
    health: "unknown"
  }
];

beforeAll(async () => {
  // Ensure we are in test mode so we use memory DB
  process.env.NODE_ENV = 'test';
  await initDatabase();
});

beforeEach(async () => {
  const db = await getDb();
  await db.exec("DELETE FROM appliances");
  // Reset AUTOINCREMENT
  await db.exec("DELETE FROM sqlite_sequence WHERE name='appliances'"); 
  
  for (const item of initialAppliancesState) {
    await db.run(
      "INSERT INTO appliances (name, type, status, health) VALUES (?, ?, ?, ?)",
      [item.name, item.type, item.status, item.health]
    );
  }
});

describe("Health API", () => {
  it("should return a successful health status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "ok");
  });
});

describe("Appliance API", () => {
  
  describe("GET /api/appliances", () => {
    it("should return all appliances", async () => {
      const res = await request(app).get("/api/appliances");
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(3);
    });
  });

  describe("GET /api/appliances/:id", () => {
    it("should return a single appliance by ID", async () => {
      const res = await request(app).get("/api/appliances/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id", 1);
      expect(res.body).toHaveProperty("name", "Washing Machine");
    });

    it("should return 404 for a non-existing appliance", async () => {
      const res = await request(app).get("/api/appliances/999");
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message", "Appliance not found");
    });
  });

  describe("POST /api/appliances", () => {
    it("should create a new appliance with valid data", async () => {
      const newAppliance = {
        name: "Smart Oven",
        type: "oven",
        status: "online",
        health: "good"
      };

      const res = await request(app)
        .post("/api/appliances")
        .send(newAppliance);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("id", 4);
      expect(res.body).toHaveProperty("name", "Smart Oven");
      
      // Verify it was actually added
      const getRes = await request(app).get("/api/appliances");
      expect(getRes.body.length).toBe(4);
    });

    it("should return 400 when required fields are missing", async () => {
      const res = await request(app)
        .post("/api/appliances")
        .send({ name: "Smart Oven" });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain("required");
    });

    it("should return 400 when status is invalid", async () => {
      const newAppliance = {
        name: "Smart Oven",
        type: "oven",
        status: "invalid_status",
        health: "good"
      };

      const res = await request(app)
        .post("/api/appliances")
        .send(newAppliance);

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toContain("status must be");
    });
  });

  describe("PATCH /api/appliances/:id/status", () => {
    it("should update appliance status with valid status", async () => {
      const res = await request(app)
        .patch("/api/appliances/1/status")
        .send({ status: "offline" });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("status", "offline");
    });

    it("should return 400 for invalid status", async () => {
      const res = await request(app)
        .patch("/api/appliances/1/status")
        .send({ status: "invalid_status" });

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("PATCH /api/appliances/:id/health", () => {
    it("should update appliance health with valid health", async () => {
      const res = await request(app)
        .patch("/api/appliances/1/health")
        .send({ health: "critical" });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("health", "critical");
    });

    it("should return 400 for invalid health", async () => {
      const res = await request(app)
        .patch("/api/appliances/1/health")
        .send({ health: "invalid_health" });

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("DELETE /api/appliances/:id", () => {
    it("should delete an existing appliance", async () => {
      const res = await request(app).delete("/api/appliances/1");
      expect(res.statusCode).toEqual(200);

      // Verify deletion
      const getRes = await request(app).get("/api/appliances/1");
      expect(getRes.statusCode).toEqual(404);
    });

    it("should return 404 for a non-existing appliance", async () => {
      const res = await request(app).delete("/api/appliances/999");
      expect(res.statusCode).toEqual(404);
    });
  });
});
