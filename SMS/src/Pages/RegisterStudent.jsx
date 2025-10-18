// Pages/RegisterStudent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/RegisterStudent.css'; 

const RegisterStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    rollNo: '',
    department: '',
    picUrl: null, // Base64 string for image
    cgpa: 'N/A', // Initial CGPA
    id: Date.now(), // Unique ID
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevStudent => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent(prevStudent => ({
          ...prevStudent,
          picUrl: reader.result, 
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setStudent(prevStudent => ({ ...prevStudent, picUrl: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student.name || !student.rollNo || !student.department) {
      alert('Please fill out all required fields.');
      return;
    }

    const existingStudentsJSON = localStorage.getItem('students');
    const existingStudents = existingStudentsJSON ? JSON.parse(existingStudentsJSON) : [];

    // Check for duplicate Roll No
    const isDuplicate = existingStudents.some(s => s.rollNo === student.rollNo);
    if (isDuplicate) {
        alert(`Registration Failed: Student with Roll No ${student.rollNo} already exists.`);
        return;
    }

    const updatedStudents = [...existingStudents, student];
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    alert(`Student ${student.name} registered successfully!`);
    
    // Reset form and navigate to the student list
    setStudent({ name: '', rollNo: '', department: '', picUrl: null, cgpa: 'N/A', id: Date.now() });
    navigate('/students'); 
  };

  return (
    <div className="reg-container">
      <h2 className="reg-title">Student Registration Form</h2>
      <form onSubmit={handleSubmit} className="reg-form">
        
        <div className="form-grid">
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
            />
            </div>
            
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
            />
            </div>
            
            <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
                id="department"
                name="department"
                value={student.department}
                onChange={handleChange}
                required
            >
                <option value="">Select Department</option>
                <option value="CS">Computer Science</option>
                <option value="EE">Electrical Engineering</option>
                <option value="BBA">Business Administration</option>
            </select>
            </div>

            <div className="form-group file-upload-group">
                <label htmlFor="picUpload">Picture Upload:</label>
                <input
                    type="file"
                    id="picUpload"
                    name="picUpload"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {student.picUrl && <img src={student.picUrl} alt="Preview" className="pic-preview" />}
            </div>
        </div>
        
        <button type="submit" className="reg-submit-btn">Register Student</button>
      </form>
    </div>
  );
};

export default RegisterStudent;