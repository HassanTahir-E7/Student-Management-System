// Pages/Students.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/Students.css";
import api from "../studentsData";
import Footer from "../components/Footer";

const Students = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [topStudentId, setTopStudentId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCGPAModal, setShowCGPAModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [editFormData, setEditFormData] = useState({
    name: "",
    rollNo: "",
    dept: "",
    course: "",
    picUrl: "",
    cgpa: "",
  });

  const [cgpaValue, setCgpaValue] = useState("");

  const fetchStudents = useCallback(async () => {
    try {
      const response = await api.get("/Students");
      setStudents(response.data);
      highlightTopStudent(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      const fallback = [
        {
          id: 1,
          name: "Husnain Rehman",
          rollNo: "L1S23BSCS0023",
          dept: "Computer Science",
          course: "Web Development",
          cgpa: "3.85",
          picUrl: null,
        },
        {
          id: 2,
          name: "Muhammad Hamid",
          rollNo: "L1S23BSCS0015",
          dept: "Computer Science",
          course: "Data Structures",
          cgpa: "3.92",
          picUrl: null,
        },
        {
          id: 3,
          name: "Ibrahim Nadeem",
          rollNo: "L1S23BSCS0007",
          dept: "Computer Science",
          course: "Database Systems",
          cgpa: "3.70",
          picUrl: null,
        },
      ];
      setStudents(fallback);
      highlightTopStudent(fallback);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const highlightTopStudent = (studentList) => {
    const valid = studentList.filter(
      (s) => s.cgpa !== "N/A" && !isNaN(s.cgpa) && parseFloat(s.cgpa) <= 4.0
    );
    if (!valid.length) return setTopStudentId(null);
    const top = valid.reduce((a, b) =>
      parseFloat(a.cgpa) > parseFloat(b.cgpa) ? a : b
    );
    setTopStudentId(top.id);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/Students/${selectedStudent.id}`);
      setStudents(students.filter((s) => s.id !== selectedStudent.id));
      setShowDeleteModal(false);
      alert(`${selectedStudent.name} deleted successfully.`);
    } catch (e) {
      alert("Error deleting student.");
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditFormData({
      name: student.name,
      rollNo: student.rollNo,
      dept: student.dept,
      course: student.course || "",
      picUrl: student.picUrl || "",
      cgpa: student.cgpa || "",
    });
    setShowEditModal(true);
  };

  // ✨ handle file upload like in RegisterStudent.jsx
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData((prev) => ({ ...prev, picUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveEdit = async () => {
    const { name, rollNo, dept, course, picUrl, cgpa } = editFormData;
    if (!name || !rollNo || !dept) return;
    const updated = { ...selectedStudent, name, rollNo, dept, course, picUrl, cgpa };
    try {
      await api.put(`/Students/${selectedStudent.id}`, updated);
      setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
      setShowEditModal(false);
      alert("Student updated successfully.");
    } catch {
      alert("Error updating student.");
    }
  };

  const handleView = (s) => {
    setSelectedStudent(s);
    setShowViewModal(true);
  };

  const handleUpdateCGPA = (s) => {
    setSelectedStudent(s);
    setCgpaValue(s.cgpa);
    setShowCGPAModal(true);
  };

  const saveCGPA = async () => {
    const newCGPA = parseFloat(cgpaValue);
    if (isNaN(newCGPA) || newCGPA < 0 || newCGPA > 4.0) return;
    const updated = { ...selectedStudent, cgpa: newCGPA.toFixed(2) };
    try {
      await api.put(`/Students/${selectedStudent.id}`, updated);
      setStudents(students.map((s) => (s.id === updated.id ? updated : s)));
      setShowCGPAModal(false);
      alert("CGPA updated successfully.");
    } catch {
      alert("Error updating CGPA.");
    }
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="students-container">
      <div className="students-header">
        <h1 className="students-title">Student Records Management</h1>
        <div className="header-actions">
          <button className="btn add-btn" onClick={() => navigate("/register")}>
            + Register New Student
          </button>
          <input
            type="text"
            placeholder="Search by Name, Roll No, or Dept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {topStudentId && (
        <div className="top-student-banner">🌟 Top Academic Performer Highlighted!</div>
      )}

      {filtered.length === 0 ? (
        <p className="no-students">No students found. Try registering one!</p>
      ) : (
        <div className="student-card-grid">
          {filtered.map((student) => (
            <div
              key={student.id}
              className={`student-card ${student.id === topStudentId ? "top-student-card" : ""}`}
            >
              <div className="student-pic-container">
                {student.picUrl ? (
                  <img src={student.picUrl} alt={student.name} className="student-card-pic" />
                ) : (
                  <div className="student-pic-placeholder">No Pic</div>
                )}
              </div>
              <div className="student-info">
                <h3>{student.name}</h3>
                <p><strong>Roll No:</strong> {student.rollNo}</p>
                <p><strong>Department:</strong> {student.dept}</p>
                <p><strong>Course:</strong> {student.course || "N/A"}</p>
                <p><strong>CGPA:</strong> {student.cgpa}</p>
              </div>
              <div className="student-actions">
                <button className="btn-action view-btn" onClick={() => handleView(student)}>View</button>
                <button className="btn-action edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                <button className="btn-action cgpa-btn" onClick={() => handleUpdateCGPA(student)}>CGPA</button>
                <button className="btn-action delete-btn" onClick={() => handleDelete(student)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✨ Edit Modal with file upload support */}
      {showEditModal && selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Student Information</h3>

            <div className="form-group">
              <label>Name:</label>
              <input className="form-input" value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} />
            </div>

            <div className="form-group">
              <label>Roll No:</label>
              <input className="form-input" value={editFormData.rollNo}
                onChange={(e) => setEditFormData({ ...editFormData, rollNo: e.target.value })} />
            </div>

            <div className="form-group">
              <label>Department:</label>
              <input className="form-input" value={editFormData.dept}
                onChange={(e) => setEditFormData({ ...editFormData, dept: e.target.value })} />
            </div>

            <div className="form-group">
              <label>Course:</label>
              <input className="form-input" value={editFormData.course}
                onChange={(e) => setEditFormData({ ...editFormData, course: e.target.value })} />
            </div>

            <div className="form-group">
              <label>Update Picture:</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {editFormData.picUrl && (
                <img src={editFormData.picUrl} alt="Preview" className="pic-preview" />
              )}
            </div>

            <div className="form-group">
              <label>CGPA (0.00 - 4.00):</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={editFormData.cgpa}
                onChange={(e) => setEditFormData({ ...editFormData, cgpa: e.target.value })}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-action view-btn" onClick={saveEdit}>Save</button>
              <button className="btn-action edit-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
      <Footer />

</>
);
};

export default Students;
