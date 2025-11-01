// RegisterStudent.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/RegisterStudent.css";

const API_URL = "http://localhost:5000/students";

const RegisterStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    RegisterationNo: "",
    Department: "",
    Course: "",
    CGPA: "",
    picUrl: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  // Department and Course options
  const departmentOptions = [
    "Computer Science",
    "Software Engineering",
    "Information Technology",
    "Artificial Intelligence",
    "Data Science",
    "Cyber Security",
  ];

  const courseOptions = [
    "Programming Fundamentals",
    "Object-Oriented Programming",
    "Database Systems",
    "Operating Systems",
    "Computer Networks",
    "Machine Learning",
    "Web Development",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picUrl" && files && files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
        setFormData({ ...formData, picUrl: fileReader.result });
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.Name ||
      !formData.RegisterationNo ||
      !formData.Department ||
      !formData.Course ||
      !formData.CGPA
    ) {
      setError("⚠️ Please fill out all fields before submitting.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to register student");

      alert("✅ Student registered successfully!");
      navigate("/students");
    } catch (err) {
      console.error("POST Error:", err.message);
      setError("❌ Failed to register student. Try again.");
    }
  };

  return (
    <div className="reg-container" style={{marginTop:'100px'}}>
      <h1 className="reg-title">Register Student</h1>
      <form className="reg-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* 🧍 Name */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="Name"
              placeholder="Enter your full name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>

          {/* 🆔 Registration No */}
          <div className="form-group">
            <label>Registeration No</label>
            <input
              type="text"
              name="RegisterationNo"
              placeholder="Enter registration number"
              value={formData.RegisterationNo}
              onChange={handleChange}
              required
            />
          </div>

          {/* 🏫 Department */}
          <div className="form-group">
            <label>Department</label>
            <select
              name="Department"
              value={formData.Department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departmentOptions.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* 📘 Course */}
          <div className="form-group">
            <label>Course</label>
            <select
              name="Course"
              value={formData.Course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              {courseOptions.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* 🎓 CGPA */}
          <div className="form-group">
            <label>CGPA</label>
            <input
              type="number"
              step="0.01"
              name="CGPA"
              placeholder="Enter CGPA (e.g. 3.75)"
              value={formData.CGPA}
              onChange={handleChange}
              required
            />
          </div>

          {/* 🖼️ Picture */}
          <div className="file-upload-group">
            <label>Profile Picture</label>
            <input
              type="file"
              name="picUrl"
              accept="image/*"
              onChange={handleChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="pic-preview" />
            )}
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="reg-submit-btn">
          Register Student
        </button>
      </form>
    </div>
  );
};

export default RegisterStudent;
