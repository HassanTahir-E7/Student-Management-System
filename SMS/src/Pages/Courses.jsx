import React from 'react';
import '../Styling/Courses.css'; 

const offeredSubjects = [
    { id: 101, code: 'CS101', name: 'Programming Fundamentals', credits: 3 },
    { id: 102, code: 'CS102', name: 'Discrete Mathematics', credits: 3 },
    { id: 201, code: 'EE201', name: 'Digital Logic Design', credits: 3 },
    { id: 205, code: 'SE301', name: 'Software Engineering', credits: 3 },
    { id: 301, code: 'AI401', name: 'Artificial Intelligence', credits: 3 },
    { id: 305, code: 'MG301', name: 'Business Management', credits: 3 },
];

const Courses = () => {
  return (
    <div className="CoursesBG">  {/* <-- Wrapper with background and navbar offset */}
      <div className="courses-container">
        <h2 className="courses-title">Offered Subjects (Admin View)</h2>
        <p className="courses-subtitle">Current list of courses available for enrollment and CGPA calculation.</p>
        
        <div className="course-grid">
          {offeredSubjects.map(subject => (
            <div key={subject.id} className="course-card">
              <h3 className="course-name">{subject.name}</h3>
              <p className="course-code">Code: {subject.code}</p>
              <p className="course-credits">Credits: {subject.credits}</p>
            </div>
          ))}
        </div>
        
        <p className="total-courses">Total Subjects Offered: {offeredSubjects.length}</p>
      </div>
    </div>
  );
};

export default Courses;
