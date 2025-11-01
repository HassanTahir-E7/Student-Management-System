// Pages/Students.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/Students.css";
import Footer from "../components/Footer";

const API_BASE_URL = "http://localhost:5000";

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
    Name: "",
    RegisterationNo: "",
    Department: "",
    Course: "",
    picUrl: "",
    CGPA: "",
  });

  const [cgpaValue, setCgpaValue] = useState("");

  // ✅ Fetch students
  const fetchStudents = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setStudents(data);
      highlightTopStudent(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to fetch student data from the server.");
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // ✅ Highlight top student
  const highlightTopStudent = (studentList) => {
    if (!studentList || studentList.length === 0) return setTopStudentId(null);

    const valid = studentList.filter((s) => {
      const cgpa = parseFloat(s.CGPA);
      return !isNaN(cgpa) && cgpa >= 0 && cgpa <= 4;
    });

    if (valid.length === 0) return setTopStudentId(null);

    const maxCGPA = Math.max(...valid.map((s) => parseFloat(s.CGPA)));
    const topStudent = valid.find((s) => parseFloat(s.CGPA) === maxCGPA);
    setTopStudentId(String(topStudent.RegisterationNo));
  };

  // ✅ Delete
  const handleDelete = (student) => {
    setSelectedStudent(student);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/students/${encodeURIComponent(selectedStudent.RegisterationNo)}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setStudents(students.filter((s) => s.RegisterationNo !== selectedStudent.RegisterationNo));
      setShowDeleteModal(false);
      alert(`${selectedStudent.Name} deleted successfully.`);
    } catch (e) {
      console.error("Delete Error:", e);
      alert("Error deleting student. Check backend logs for details.");
    }
  };

  // ✅ Edit
  const handleEdit = (student) => {
    setSelectedStudent(student);
    setEditFormData({ ...student });
    setShowEditModal(true);
  };

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
    const updated = { ...editFormData };

    try {
      const response = await fetch(
        `${API_BASE_URL}/students/${encodeURIComponent(updated.RegisterationNo)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const updatedStudent = await response.json();

      setStudents((prev) =>
        prev.map((s) =>
          s.RegisterationNo === updatedStudent.RegisterationNo ? updatedStudent : s
        )
      );

      setShowEditModal(false);
      alert("Student updated successfully.");
    } catch (e) {
      console.error("Update Error:", e);
      alert("Error updating student. Check backend logs for details.");
    }
  };

  // ✅ View
  const handleView = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  // ✅ CGPA Update
  const handleUpdateCGPA = (student) => {
    setSelectedStudent(student);
    setCgpaValue(student.CGPA);
    setShowCGPAModal(true);
  };

  const saveCGPA = async () => {
    const newCGPA = parseFloat(cgpaValue);
    if (isNaN(newCGPA) || newCGPA < 0 || newCGPA > 4.0)
      return alert("Invalid CGPA value.");

    const updated = { ...selectedStudent, CGPA: newCGPA.toFixed(2) };

    try {
      const response = await fetch(
        `${API_BASE_URL}/students/${encodeURIComponent(selectedStudent.RegisterationNo)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const updatedStudent = await response.json();

      setStudents((prev) =>
        prev.map((s) =>
          s.RegisterationNo === updatedStudent.RegisterationNo ? updatedStudent : s
        )
      );

      setShowCGPAModal(false);
      alert("CGPA updated successfully.");
    } catch (e) {
      console.error("CGPA Update Error:", e);
      alert("Error updating CGPA.");
    }
  };

  const filtered = students.filter(
    (s) =>
      s.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.RegisterationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.Department.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="top-student-banner">
            🌟 Top Academic Performer Highlighted!
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="no-students">No students found.</p>
        ) : (
          <div className="student-card-grid">
            {filtered.map((student) => (
              <div
                key={student.RegisterationNo}
                className={`student-card ${
                  String(student.RegisterationNo) === topStudentId
                    ? "top-student-card"
                    : ""
                }`}
              >
                <div className="student-pic-container">
                  {student.picUrl ? (
                    <img
                      src={student.picUrl}
                      alt={student.Name}
                      className="student-card-pic"
                    />
                  ) : (
                    <div className="student-pic-placeholder">No Pic</div>
                  )}
                </div>
                <div className="student-info">
                  <h3>{student.Name}</h3>
                  <p><strong>Roll No:</strong> {student.RegisterationNo}</p>
                  <p><strong>Department:</strong> {student.Department}</p>
                  <p><strong>Course:</strong> {student.Course || "N/A"}</p>
                  <p><strong>CGPA:</strong> {student.CGPA}</p>
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

        {/* ✅ DELETE MODAL */}
        {showDeleteModal && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete {selectedStudent.Name}?</p>
              <div className="modal-actions">
                <button className="btn-action delete-btn" onClick={confirmDelete}>
                  Yes, Delete
                </button>
                <button className="btn-action edit-btn" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ VIEW MODAL */}
        {showViewModal && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Student Details</h3>
              <p><strong>Name:</strong> {selectedStudent.Name}</p>
              <p><strong>Roll No:</strong> {selectedStudent.RegisterationNo}</p>
              <p><strong>Department:</strong> {selectedStudent.Department}</p>
              <p><strong>Course:</strong> {selectedStudent.Course}</p>
              <p><strong>CGPA:</strong> {selectedStudent.CGPA}</p>
              {selectedStudent.picUrl && (
                <img src={selectedStudent.picUrl} alt={selectedStudent.Name} className="pic-preview" />
              )}
              <div className="modal-actions">
                <button className="btn-action view-btn" onClick={() => setShowViewModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ EDIT MODAL */}
        {showEditModal && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Edit Student Information</h3>

              <div className="form-group">
                <label>Name:</label>
                <input
                  className="form-input"
                  value={editFormData.Name}
                  onChange={(e) => setEditFormData({ ...editFormData, Name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Roll No:</label>
                <input
                  className="form-input"
                  value={editFormData.RegisterationNo}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Department:</label>
                <input
                  className="form-input"
                  value={editFormData.Department}
                  onChange={(e) => setEditFormData({ ...editFormData, Department: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Course:</label>
                <input
                  className="form-input"
                  value={editFormData.Course}
                  onChange={(e) => setEditFormData({ ...editFormData, Course: e.target.value })}
                />
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
                  value={editFormData.CGPA}
                  onChange={(e) => setEditFormData({ ...editFormData, CGPA: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button className="btn-action view-btn" onClick={saveEdit}>
                  Save
                </button>
                <button className="btn-action edit-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ CGPA MODAL */}
        {showCGPAModal && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Update CGPA for {selectedStudent.Name}</h3>
              <input
                type="number"
                step="0.01"
                value={cgpaValue}
                onChange={(e) => setCgpaValue(e.target.value)}
                className="form-input"
              />
              <div className="modal-actions">
                <button className="btn-action view-btn" onClick={saveCGPA}>
                  Save
                </button>
                <button className="btn-action edit-btn" onClick={() => setShowCGPAModal(false)}>
                  Cancel
                </button>
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
