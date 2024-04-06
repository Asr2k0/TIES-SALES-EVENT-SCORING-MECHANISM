// // StudentDetailsPage.js
// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';

// function StudentDetailsPage() {
//   const { studentId } = useParams();
//   const [studentName, setStudentName] = useState('');

//   useEffect(() => {
//     const fetchStudentName = async () => {
//       try {
//         const response = await fetch(`http://localhost:3006/api/student/${studentId}`);
//         if (response.ok) {
//           const data = await response.json();
//           setStudentName(data.name);
//         } else {
//           console.error('Failed to fetch student:', response.status);
//         }
//       } catch (error) {
//         console.error('Error fetching student:', error);
//       }
//     };

//     fetchStudentName();
//   }, [studentId]);

//   return (
//     <div>
//       <h2>Student Details</h2>
//       <form>
//         <label htmlFor="studentName">Name:</label>
//         <input type="text" id="studentName" value={studentName} readOnly />
//         <label htmlFor="attention">Attention:</label>
//         <textarea id="attention" name="attention" rows="4"></textarea>
//         <label htmlFor="discovery">Discovery:</label>
//         <textarea id="discovery" name="discovery" rows="4"></textarea>
//         <label htmlFor="solution">Solution/ Presentation:</label>
//         <textarea id="solution" name="solution" rows="4"></textarea>
//         <label htmlFor="commitment">Gaining Commitment:</label>
//         <textarea id="commitment" name="commitment" rows="4"></textarea>
//         <label htmlFor="objection">Objection handling:</label>
//         <textarea id="objection" name="objection" rows="4"></textarea>
//         <label htmlFor="communication">Overall Communication:</label>
//         <textarea id="communication" name="communication" rows="4"></textarea>
//         <label htmlFor="style">Style:</label>
//         <textarea id="style" name="style" rows="4"></textarea>
//       </form>
//       <Link to={`/rooms/:roomId`}>Back to Students List</Link>
//     </div>
//   );
// }

// export default StudentDetailsPage;
// StudentDetailsPage.js

// import React from 'react';
// import { useParams } from 'react-router-dom';

// function StudentDetailsPage() {
//   const { studentId } = useParams();
//   // Fetch student details using studentId and display the form

//   return (
//     <div>
//       <h2>Student Details</h2>
//       <p>Student ID: {studentId}</p>
//       {/* Display other details and the form */}
//     </div>
//   );
// }

// export default StudentDetailsPage;
// import React from 'react';
// import { useParams, useLocation } from 'react-router-dom';

// function StudentDetailsPage() {
//   const { studentId } = useParams();
//   const location = useLocation();
//   const { student } = location.state;

//   return (
//     <div>
//       <h2>Student Details</h2>
//       <p>Name: {student.name}</p>
//       {/* Add other details as needed */}
//     </div>
//   );
// }

// export default StudentDetailsPage;
// import React, { useState } from 'react';
// import { useParams, useLocation } from 'react-router-dom';

// function StudentDetailsPage() {
//   const { studentId } = useParams();
//   const location = useLocation();
//   const { student } = location.state;

//   // State for slider values
//   const [discovery, setDiscovery] = useState(0);
//   const [solution, setSolution] = useState(0);
//   const [gainingCommitment, setGainingCommitment] = useState(0);
//   const [objectionHandling, setObjectionHandling] = useState(0);
//   const [overallCommunication, setOverallCommunication] = useState(0);
//   const [style, setStyle] = useState(0);

//   // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can do something with the form values here, like sending them to the backend
//   };

//   return (
//     <div>
//       <h2>Student Details</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-row">
//           <label htmlFor="studentName">Student Name:</label>
//           <input id="studentName" type="text" value={student.name} disabled style={{ backgroundColor: '#f0f0f0' }} />
//         </div>
//         <div className="form-row">
//           <label htmlFor="discovery">1. Discovery</label>
//           <input id="discovery" type="range" min="0" max="100" value={discovery} onChange={(e) => setDiscovery(e.target.value)} />
//           <span>{discovery}</span>
//         </div>
//         <div className="form-row">
//           <label htmlFor="solution">2. Solution/ Presentation</label>
//           <input id="solution" type="range" min="0" max="100" value={solution} onChange={(e) => setSolution(e.target.value)} />
//           <span>{solution}</span>
//         </div>
//         <div className="form-row">
//           <label htmlFor="gainingCommitment">3. Gaining Commitment</label>
//           <input id="gainingCommitment" type="range" min="0" max="100" value={gainingCommitment} onChange={(e) => setGainingCommitment(e.target.value)} />
//           <span>{gainingCommitment}</span>
//         </div>
//         <div className="form-row">
//           <label htmlFor="objectionHandling">4. Objection Handling</label>
//           <input id="objectionHandling" type="range" min="0" max="100" value={objectionHandling} onChange={(e) => setObjectionHandling(e.target.value)} />
//           <span>{objectionHandling}</span>
//         </div>
//         <div className="form-row">
//           <label htmlFor="overallCommunication">5. Overall Communication</label>
//           <input id="overallCommunication" type="range" min="0" max="100" value={overallCommunication} onChange={(e) => setOverallCommunication(e.target.value)} />
//           <span>{overallCommunication}</span>
//         </div>
//         <div className="form-row">
//           <label htmlFor="style">6. Style</label>
//           <input id="style" type="range" min="0" max="100" value={style} onChange={(e) => setStyle(e.target.value)} />
//           <span>{style}</span>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default StudentDetailsPage;
// import React, { useState } from 'react';

// function StudentForm({ studentName, onClose }) {
//   const [scores, setScores] = useState({
//     discovery: 0,
//     solution: 0,
//     commitment: 0,
//     objections: 0,
//     communication: 0,
//     style: 0
//   });

//   const handleChange = (component, value) => {
//     setScores({ ...scores, [component]: value });
//   };

//   const handleSubmit = () => {
//     // Handle form submission here
//     console.log('Form submitted with scores:', scores);
//   };

//   return (
//     <div className="student-form">
//       <h3>{studentName}</h3>
//       <div className="form-content">
//         <div className="component-row">
//           <label>Discovery:</label>
//           <input type="range" min="0" max="100" value={scores.discovery} onChange={(e) => handleChange('discovery', e.target.value)} />
//           <span>{scores.discovery}</span>
//         </div>
//         <div className="component-row">
//           <label>Solution/Presentation:</label>
//           <input type="range" min="0" max="100" value={scores.solution} onChange={(e) => handleChange('solution', e.target.value)} />
//           <span>{scores.solution}</span>
//         </div>
//         <div className="component-row">
//           <label>Gaining Commitment:</label>
//           <input type="range" min="0" max="100" value={scores.commitment} onChange={(e) => handleChange('commitment', e.target.value)} />
//           <span>{scores.commitment}</span>
//         </div>
//         <div className="component-row">
//           <label>Objection Handling:</label>
//           <input type="range" min="0" max="100" value={scores.objections} onChange={(e) => handleChange('objections', e.target.value)} />
//           <span>{scores.objections}</span>
//         </div>
//         <div className="component-row">
//           <label>Overall Communication:</label>
//           <input type="range" min="0" max="100" value={scores.communication} onChange={(e) => handleChange('communication', e.target.value)} />
//           <span>{scores.communication}</span>
//         </div>
//         <div className="component-row">
//           <label>Style:</label>
//           <input type="range" min="0" max="100" value={scores.style} onChange={(e) => handleChange('style', e.target.value)} />
//           <span>{scores.style}</span>
//         </div>
//       </div>
//       <button onClick={handleSubmit}>Submit</button>
//       <button onClick={onClose}>Close</button>
//     </div>
//   );
// }

// export default StudentForm;
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function RoomPage() {
  const { roomId } = useParams();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:3006/api/rooms/${roomId}`);
        if (response.ok) {
          const data = await response.json();
          setStudents(data);
        } else {
          console.error('Failed to fetch students:', response.status);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [roomId]);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseForm = () => {
    setSelectedStudent(null);
  };

  const renderForm = () => {
    return (
      <div className="overlay">
        <div className="form-container">
          <h3>Form for {selectedStudent.name}</h3>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input type="text" id="firstName" value={selectedStudent.name} readOnly />
            </div>
            {/* Add other parameters with sliders */}
            <div className="form-group">
              <label htmlFor="discovery">Discovery:</label>
              <input type="range" id="discovery" min="0" max="100" defaultValue="50" />
            </div>
            {/* Add more parameters with sliders */}
            <button type="button" onClick={handleCloseForm}>Close</button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>Room {roomId}</h2>
      <Link to="/">Back to Homepage</Link>
      <div className="student-list">
        {students.map((student, index) => (
          <div key={index} className="student-box">
            <button onClick={() => handleStudentClick(student)}>{student.name}</button>
          </div>
        ))}
      </div>
      {selectedStudent && renderForm()}
    </div>
  );
}

export default RoomPage;
