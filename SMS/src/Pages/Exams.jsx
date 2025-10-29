import React from 'react';
import '../Styling/Exams.css';

const upcomingExams = [
  { id: 1, subject: 'Programming Fundamentals', date: '2025-11-15', time: '10:00 AM', room: 'Lab 2' },
  { id: 2, subject: 'Discrete Mathematics', date: '2025-11-18', time: '9:00 AM', room: 'Room 203' },
  { id: 3, subject: 'Digital Logic Design', date: '2025-11-20', time: '11:00 AM', room: 'Room 109' },
  { id: 4, subject: 'Software Engineering', date: '2025-11-23', time: '1:00 PM', room: 'Lab 4' },
  { id: 5, subject: 'Artificial Intelligence', date: '2025-11-26', time: '10:00 AM', room: 'Room 207' },
  { id: 6, subject: 'Business Management', date: '2025-11-28', time: '12:00 PM', room: 'Room 101' },
];

const Exams = () => {
  return (
    <div className="ExamsBG">
      <div className="exams-container">
        <h2 className="exams-title">Upcoming Exams</h2>
        <p className="exams-subtitle">Here’s the official schedule for the upcoming midterm exams.</p>

        <div className="exam-grid">
          {upcomingExams.map(exam => (
            <div key={exam.id} className="exam-card">
              <h3 className="exam-subject">{exam.subject}</h3>
              <p className="exam-date">📅 Date: <span>{exam.date}</span></p>
              <p className="exam-time">⏰ Time: <span>{exam.time}</span></p>
              <p className="exam-room">🏫 Room: <span>{exam.room}</span></p>
            </div>
          ))}
        </div>

        <p className="total-exams">Total Exams Scheduled: {upcomingExams.length}</p>
      </div>
    </div>
  );
};

export default Exams;
