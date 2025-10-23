// Pages/RegisterStudent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/RegisterStudent.css'; 
import api from '../studentsData'; 

const RegisterStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    rollNo: '',
    dept: '',
    picUrl: null, 
    cgpa: 'N/A', 
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student.name || !student.rollNo || !student.dept) { 
      alert('Please fill out all required fields.');
      return;
    }

    try {
        await api.post('/Students', student);

        alert(`Student ${student.name} registered successfully on the server!`);
        
        // Reset form and navigate to the student list
        setStudent({ name: '', rollNo: '', dept: '', picUrl: null, cgpa: 'N/A' }); 
        navigate('/students'); 
    } catch (error) {
        console.error("Error registering student:", error);
        alert("Registration Failed. Check console for details.");
    }
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