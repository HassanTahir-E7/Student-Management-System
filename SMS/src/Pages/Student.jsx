// Pages/Student.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../Styling/Students.css"; 
import api from "../studentsData"; 

const Students = () => {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]); 
    const [searchTerm, setSearchTerm] = useState("");
    const [topStudentId, setTopStudentId] = useState(null);
    
    // Modal states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showCGPAModal, setShowCGPAModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: "", rollNo: "", dept: "" });
    const [cgpaValue, setCgpaValue] = useState("");


    const fetchStudents = useCallback(async () => {
        try {
            const response = await api.get("/Students");
            setStudents(response.data);
            highlightTopStudent(response.data); 
        } catch (error) {
            console.error("Error fetching students from API, falling back to local storage:", error);
            // Fallback for demo: load from local storage if API fails (using initial mock data)
            const initialStudents = [
                { id: 1, name: "Husnain Rehman", rollNo: "L1S23BSCS0023", dept: "Computer Science", cgpa: "3.85", picUrl: null },
                { id: 2, name: "Muhammad Hamid", rollNo: "L1S23BSCS0015", dept: "Computer Science", cgpa: "3.92", picUrl: null },
                { id: 3, name: "Ibrahim Nadeem", rollNo: "L1S23BSCS0007", dept: "Computer Science", cgpa: "3.70", picUrl: null },
            ];
            setStudents(initialStudents);
            highlightTopStudent(initialStudents);
        }
    }, []); 

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);


    const highlightTopStudent = (studentList) => {
        const scoredStudents = studentList.filter(s => s.cgpa !== 'N/A' && !isNaN(s.cgpa) && parseFloat(s.cgpa) <= 4.0);
        
        if (scoredStudents.length === 0) {
            setTopStudentId(null);
            return;
        }

        const top = scoredStudents.reduce((prev, current) => {
            return (parseFloat(prev.cgpa) > parseFloat(current.cgpa)) ? prev : current;
        });

        setTopStudentId(top.id);
    };

    const handleDelete = (student) => {
        setSelectedStudent(student);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/Students/${selectedStudent.id}`);
            
            setStudents(prevStudents => prevStudents.filter(s => s.id !== selectedStudent.id));
            setShowDeleteModal(false);
            setSelectedStudent(null);
            alert(`Student ${selectedStudent.name} deleted successfully from server.`);
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("Error deleting student. Check console for details.");
        }
    };

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setEditFormData({
            name: student.name,
            rollNo: student.rollNo,
            dept: student.dept
        });
        setShowEditModal(true);
    };

    const saveEdit = async () => {
        if (editFormData.name.trim() && editFormData.rollNo.trim() && editFormData.dept.trim()) {
            const updatedData = {
                ...selectedStudent, 
                name: editFormData.name,
                rollNo: editFormData.rollNo,
                dept: editFormData.dept 
            };

            try {
                await api.put(`/Students/${selectedStudent.id}`, updatedData);

                // Update local state after successful edit
                setStudents(prevStudents => prevStudents.map(s =>
                    s.id === selectedStudent.id ? updatedData : s
                ));
                setShowEditModal(false);
                setSelectedStudent(null);
                alert(`Student ${updatedData.name} updated successfully.`);
            } catch (error) {
                console.error("Error saving edit:", error);
                alert("Error updating student. Check console for details.");
            }
        }
    };

    const handleView = (student) => {
        setSelectedStudent(student);
        setShowViewModal(true);
    };

    const handleUpdateCGPA = (student) => {
        setSelectedStudent(student);
        setCgpaValue(student.cgpa === 'N/A' ? "" : student.cgpa); 
        setShowCGPAModal(true);
    };

    const saveCGPA = async () => {
        const newCGPA = parseFloat(cgpaValue);
        if (!isNaN(newCGPA) && newCGPA >= 0 && newCGPA <= 4.0) {
            const updatedData = {
                ...selectedStudent,
                cgpa: newCGPA.toFixed(2)
            };

            try {
                await api.put(`/Students/${selectedStudent.id}`, updatedData);

                setStudents(prevStudents => prevStudents.map(s =>
                    s.id === selectedStudent.id ? updatedData : s
                ));

                setShowCGPAModal(false);
                setSelectedStudent(null);
                setCgpaValue("");
                alert(`CGPA for ${selectedStudent.name} updated to ${newCGPA.toFixed(2)}.`);
            } catch (error) {
                console.error("Error saving CGPA:", error);
                alert("Error updating CGPA. Check console for details.");
            }
        }
    };

    // Filter students based on search term
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.dept.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="students-container">
            
            <div className="students-header">
                <h1>Student Records Management</h1>
                <div className="header-actions">
                    <button 
                        className="btn add-btn"
                        onClick={() => navigate('/register')}
                    >
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
                    Top Academic Performer Highlighted (Based on highest CGPA)!
                </div>
            )}

            {filteredStudents.length === 0 ? (
                <p className="no-students">No students found matching your criteria. Try registering one!</p>
            ) : (
                <div className="table-responsive">
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Pic</th>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Department</th>
                                <th className="cgpa-col">CGPA</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr 
                                    key={student.id} 
                                    className={student.id === topStudentId ? 'top-student-row' : ''}
                                >
                                    <td className="pic-cell">
                                        {student.picUrl ? (
                                            <img src={student.picUrl} alt={student.name} className="student-pic" />
                                        ) : (
                                            <div className="student-pic-placeholder">No Pic</div>
                                        )}
                                    </td>
                                    <td>{student.name}</td>
                                    <td>{student.rollNo}</td>
                                    <td>{student.dept}</td>
                                    <td className="cgpa-col">
                                        <strong>{student.cgpa}</strong>
                                    </td>
                                    <td className="action-cell">
                                        <button className="btn-action view-btn" onClick={() => handleView(student)}>View</button>
                                        <button className="btn-action edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                                        <button className="btn-action cgpa-btn" onClick={() => handleUpdateCGPA(student)}>CGPA</button>
                                        <button className="btn-action delete-btn" onClick={() => handleDelete(student)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showDeleteModal && selectedStudent && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirm Deletion</h3>
                        <p>Are you sure you want to delete <strong>{selectedStudent.name}</strong>'s record? This action is permanent and cannot be undone.</p>
                        <div className="modal-actions">
                            <button className="btn-action delete-btn" onClick={confirmDelete}>Delete</button>
                            <button className="btn-action edit-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && selectedStudent && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Edit Student Information</h3>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={editFormData.name}
                                onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Roll No:</label>
                            <input
                                type="text"
                                value={editFormData.rollNo}
                                onChange={(e) => setEditFormData({...editFormData, rollNo: e.target.value})}
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Department:</label>
                            <input
                                type="text"
                                value={editFormData.dept}
                                onChange={(e) => setEditFormData({...editFormData, dept: e.target.value})}
                                className="form-input"
                            />
                        </div>
                        <div className="modal-actions">
                            <button className="btn-action view-btn" onClick={saveEdit}>Save Changes</button>
                            <button className="btn-action edit-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showViewModal && selectedStudent && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Student Details</h3>
                        <div className="student-details">
                            <div className="detail-row">
                                <strong>Name:</strong> {selectedStudent.name}
                            </div>
                            <div className="detail-row">
                                <strong>Roll No:</strong> {selectedStudent.rollNo}
                            </div>
                            <div className="detail-row">
                                <strong>Department:</strong> {selectedStudent.dept}
                            </div>
                            <div className="detail-row">
                                <strong>CGPA:</strong> {selectedStudent.cgpa}
                            </div>
                            <div className="detail-row">
                                <strong>Profile Picture:</strong> {selectedStudent.picUrl ? 'Available' : 'Not Available'}
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="btn-action view-btn" onClick={() => setShowViewModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {showCGPAModal && selectedStudent && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Update CGPA for {selectedStudent.name}</h3>
                        <div className="form-group">
                            <label>CGPA (0.00 - 4.00):</label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                max="4"
                                value={cgpaValue}
                                onChange={(e) => setCgpaValue(e.target.value)}
                                className="form-input"
                                placeholder="Enter CGPA"
                            />
                        </div>
                        {cgpaValue && (parseFloat(cgpaValue) < 0 || parseFloat(cgpaValue) > 4.0) && (
                            <p className="error-message">Please enter a valid CGPA between 0.00 and 4.00</p>
                        )}
                        <div className="modal-actions">
                            <button 
                                className="btn-action cgpa-btn" 
                                onClick={saveCGPA}
                                disabled={!cgpaValue || parseFloat(cgpaValue) < 0 || parseFloat(cgpaValue) > 4.0}
                            >
                                Update CGPA
                            </button>
                            <button className="btn-action edit-btn" onClick={() => setShowCGPAModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Students;