// server.js
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Students",
  password: "1405",
  port: 5432,
});

// ✅ GET all students
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM public."StudentsData" ORDER BY "RegisterationNo" ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET Error:", err.message);
    res.status(500).send("Server Error: Failed to fetch students.");
  }
});

// ✅ POST new student
app.post("/students", async (req, res) => {
  try {
    const { Name, RegisterationNo, Department, Course, picUrl, CGPA } = req.body;

    const newStudent = await pool.query(
      `INSERT INTO public."StudentsData"("Name", "RegisterationNo", "Department", "Course", "picUrl", "CGPA")
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [Name, RegisterationNo, Department, Course, picUrl, CGPA]
    );

    res.status(201).json(newStudent.rows[0]);
  } catch (err) {
    console.error("POST Error:", err.message);
    res.status(500).send("Server Error: Failed to register student.");
  }
});

// ✅ PUT (Update student)
app.put("/students/:registerationNo", async (req, res) => {
  const { registerationNo } = req.params;
  const { Name, Department, Course, picUrl, CGPA } = req.body;

  try {
    const result = await pool.query(
      `UPDATE public."StudentsData"
       SET "Name" = $1, "Department" = $2, "Course" = $3, "picUrl" = $4, "CGPA" = $5
       WHERE "RegisterationNo"::text = $6::text
       RETURNING *`,
      [Name, Department, Course, picUrl, CGPA, registerationNo]
    );

    if (result.rows.length === 0) {
      return res.status(404).json("Student not found.");
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PUT Error:", err.message);
    res.status(500).send("Server Error: Failed to update student.");
  }
});

// ✅ DELETE student
app.delete("/students/:registerationNo", async (req, res) => {
  const { registerationNo } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM public."StudentsData" WHERE "RegisterationNo"::text = $1::text RETURNING *',
      [registerationNo]
    );

    if (result.rowCount === 0) {
      return res.status(404).json("Student not found.");
    }

    res.status(204).send();
  } catch (err) {
    console.error("DELETE Error:", err.message);
    res.status(500).send("Server Error: Failed to delete student.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Express server running on http://localhost:${PORT}`);
});
