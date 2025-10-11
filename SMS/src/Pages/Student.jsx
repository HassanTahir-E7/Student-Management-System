import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../Students.css";

const Students = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([
        {
            id: 1,
            name: "Husnain Rehman",
            rollNo: "L1S23BSCS0023",
            course: "Artificial Intelligence",
            dept: "Computer Science",
            age: 21,
            grade: "A+"
        },
        {
            id: 2,
            name: "Muhammad Hamid",
            rollNo: "L1S23BSCS0015",
            course: "Discrete Structures",
            dept: "Computer Science",
            age: 22,
            grade: "A"
        },
        {
            id: 3,
            name: "Ibrahim Nadeem",
            rollNo: "L1S23BSCS0007",
            course: "Cloud Computing",
            dept: "Computer Science",
            age: 20,
            grade: "A-"
        },
        {
            id: 4,
            name: "Murtaza Babar",
            rollNo: "L1S23BSCS0060",
            course: "Data Science",
            dept: "Computer Science",
            age: 23,
            grade: "B+"
        },
        {
            id: 5,
            name: "Muhammad Alishan",
            rollNo: "L1S23BSCS0050",
            course: "UI/UX Design",
            dept: "Computer Science",
            age: 21,
            grade: "A"
        }
    ]);

    const deleteStudent = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    const viewStudent = (student) => {
        navigate(`/students/${student.id}`, { state: { student } });
    };

    return (
        <div className="container">
            <div className="SBG">
            <Navbar />
            
            <main className="content">
                <div className="students-header">
                    <h1>Students Page</h1>
                </div>

                {/* Students Table */}
                <div className="students-table-container">
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Course</th>
                                <th>Department</th>
                                <th>Age</th>
                                <th>Grade</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.rollNo}</td>
                                    <td>{student.course}</td>
                                    <td>{student.dept}</td>
                                    <td>{student.age}</td>
                                    <td>{student.grade}</td>
                                    <td className="actions">
                                        <button 
                                            className="btn view-btn"
                                            onClick={() => viewStudent(student)}
                                        >
                                            View
                                        </button>
                                        <button 
                                            className="btn delete-btn"
                                            onClick={() => deleteStudent(student.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {students.length === 0 && (
                    <div className="no-students">
                        <p>No students found.</p>
                    </div>
                )}
            </main>

            
            </div>
        <Footer />
        </div>
    );
};

export default Students;