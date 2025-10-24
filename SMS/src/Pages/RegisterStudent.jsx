// Pages/RegisterStudent.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styling/RegisterStudent.css';
import api from '../studentsData';

const RegisterStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultImages = [
    "https://api.dicebear.com/8.x/adventurer/svg?seed=Alex",
    "https://api.dicebear.com/8.x/adventurer/svg?seed=Juno",
    "https://api.dicebear.com/8.x/adventurer/svg?seed=Sky",
    "https://api.dicebear.com/8.x/adventurer/svg?seed=Blaze",
    "https://api.dicebear.com/8.x/adventurer/svg?seed=Luna"
  ];

  const editingStudent = location.state?.student || null;

  const [student, setStudent] = useState(
    editingStudent || { name: '', rollNo: '', dept: '', course: '', picUrl: null, cgpa: 'N/A' }
  );

  const isEditing = !!editingStudent;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setStudent(prev => ({ ...prev, picUrl: reader.result }));
      reader.readAsDataURL(file);
    } else setStudent(prev => ({ ...prev, picUrl: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student.name || !student.rollNo || !student.dept || !student.course) {
      alert('Please fill out all required fields.');
      return;
    }
    if (!student.picUrl) {
      student.picUrl = defaultImages[Math.floor(Math.random() * defaultImages.length)];
    }

    try {
      if (isEditing) {
        await api.put(`/Students/${student.id}`, student);
        alert(`Student ${student.name}'s record updated successfully!`);
      } else {
        await api.post('/Students', student);
        alert(`Student ${student.name} registered successfully!`);
      }
      setStudent({ name: '', rollNo: '', dept: '', course: '', picUrl: null, cgpa: 'N/A' });
      navigate('/students');
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Operation Failed. Check console for details.");
    }
  };

  return (
    <div className="ABG">
      <div className="wrapper">
        <div className="reg-container">
          <h2 className="reg-title">
            {isEditing ? 'Edit Student Details' : 'Student Registration Form'}
          </h2>

          <form onSubmit={handleSubmit} className="reg-form">
            <div className="form-grid">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                  placeholder="Enter student's full name"
                  required
                  disabled={isEditing}
                />
              </div>

              {/* Roll No */}
              <div className="form-group">
                <label htmlFor="rollNo">Roll No:</label>
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  value={student.rollNo}
                  onChange={handleChange}
                  placeholder="e.g., L1S23BSCS0001"
                  required
                  disabled={isEditing}
                />
              </div>

              {/* Department */}
              <div className="form-group">
                <label htmlFor="dept">Department:</label>
                <select
                  id="dept"
                  name="dept"
                  value={student.dept}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Software Engineering">Software Engineering</option>
                </select>
              </div>

              {/* Course */}
              <div className="form-group">
                <label htmlFor="course">Course:</label>
                <select
                  id="course"
                  name="course"
                  value={student.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="Operating Systems">Operating Systems</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Database Systems">Database Systems</option>
                  <option value="Computer Networks">Computer Networks</option>
                </select>
              </div>

              {/* CGPA */}
              <div className="form-group">
                <label htmlFor="cgpa">CGPA:</label>
                <input
                  type="text"
                  id="cgpa"
                  name="cgpa"
                  value={student.cgpa}
                  onChange={handleChange}
                  placeholder="e.g., 3.75"
                />
              </div>

              {/* Picture Upload */}
              <div className="form-group file-upload-group">
                <label htmlFor="picUpload">Profile Picture:</label>
                <input
                  type="file"
                  id="picUpload"
                  name="picUpload"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {student.picUrl && (
                  <img src={student.picUrl} alt="Preview" className="pic-preview" />
                )}
              </div>
            </div>

            <button type="submit" className="reg-submit-btn">
              {isEditing ? 'Save Changes' : 'Register Student'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
