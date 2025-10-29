import React, { useState } from 'react';
import '../Styling/CgpaCalculator.css'; 

const gradeToPoints = (grade) => {
    const grades = {
        'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0,
        'F': 0.0
    };
    return grades[grade.toUpperCase()] || 0.0;
};

const CgpaCalculator = () => {
    const [courses, setCourses] = useState([
        { id: 1, grade: '', credits: 3 },
        { id: 2, grade: '', credits: 3 },
        { id: 3, grade: '', credits: 3 },
    ]);
    const [calculatedCGPA, setCalculatedCGPA] = useState(null);

    const handleCourseChange = (id, field, value) => {
        setCourses(prevCourses => prevCourses.map(course =>
            course.id === id ? { ...course, [field]: value } : course
        ));
        setCalculatedCGPA(null); 
    };

    const addCourse = () => {
        setCourses(prevCourses => [...prevCourses, { id: Date.now(), grade: '', credits: 3 }]);
    };

    const removeCourse = (id) => {
        setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
        setCalculatedCGPA(null);
    };

    const calculateCGPA = () => {
        let totalQualityPoints = 0;
        let totalCredits = 0;
        let incomplete = false;

        courses.forEach(course => {
            const points = gradeToPoints(course.grade);
            const credits = parseInt(course.credits);

            if (course.grade === '' || isNaN(credits) || credits === 0) {
                incomplete = true;
                return;
            }

            totalQualityPoints += points * credits;
            totalCredits += credits;
        });

        if (incomplete) {
            alert('Please fill in a valid grade and credits for all courses.');
            setCalculatedCGPA(null);
            return;
        }

        if (totalCredits === 0) {
            setCalculatedCGPA(0.00);
            return;
        }

        const cgpa = totalQualityPoints / totalCredits;
        setCalculatedCGPA(cgpa.toFixed(2));
    };

    return (
        <div className="cgpa-container">
            <h2 className="cgpa-title">Interactive CGPA Calculator</h2>
            <p className="cgpa-subtitle">Input grades and credit hours to simulate CGPA calculation.</p>

            <div className="course-list">
                <div className="course-header">
                    <span>Grade</span>
                    <span>Credits</span>
                    <span className="action-col">Remove</span>
                </div>
                {courses.map(course => (
                    <div key={course.id} className="course-row">
                        <select
                            value={course.grade}
                            onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value)}
                        >
                            <option value="">Grade</option>
                            <option value="A">A (4.0)</option>
                            <option value="A-">A- (3.7)</option>
                            <option value="B+">B+ (3.3)</option>
                            <option value="B">B (3.0)</option>
                            <option value="B-">B- (2.7)</option>
                            <option value="C+">C+ (2.3)</option>
                            <option value="C">C (2.0)</option>
                            <option value="D">D (1.0)</option>
                            <option value="F">F (0.0)</option>
                        </select>

                        <input
                            type="number"
                            min="1"
                            max="6"
                            value={course.credits}
                            onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)}
                        />
                        <button className="remove-btn" onClick={() => removeCourse(course.id)}>
                            &times;
                        </button>
                    </div>
                ))}
            </div>

            <button className="add-course-btn" onClick={addCourse}>+ Add Course</button>

            <div className="cgpa-footer">
                <button className="calculate-btn" onClick={calculateCGPA}>
                    Calculate CGPA
                </button>

                {calculatedCGPA !== null && (
                    <div className="cgpa-result">
                        Calculated CGPA: 
                        <span className={`result-value ${parseFloat(calculatedCGPA) >= 3.0 ? 'high-cgpa' : 'low-cgpa'}`}>
                            {calculatedCGPA}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CgpaCalculator;