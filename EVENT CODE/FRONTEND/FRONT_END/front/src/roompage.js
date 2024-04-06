import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function RoomPage() {
  const { roomId } = useParams();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentScores, setStudentScores] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [judgeName, setJudgeName] = useState('');
  const [bestCandidate, setBestCandidate] = useState('');
  const [scoreSaved, setScoreSaved] = useState(false);

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
    const initialScores = studentScores[student.id] || {
      Attention: 50,
      Discovery: 50,
      Solution: 50,
      Commitment: 50,
      Objections: 50,
      Non_Verbals: 50,
    };
    setStudentScores({ ...studentScores, [student.id]: initialScores });
    setScoreSaved(false);
  };

  const handleCloseForm = () => {
    setSelectedStudent(null);
    if (!scoreSaved) {
      setScoreSaved(true);
    }
  };

  const handleSliderChange = (e, param) => {
    const newScores = { ...studentScores };
    newScores[selectedStudent.id][param] = parseInt(e.target.value);
    setStudentScores(newScores);
    setScoreSaved(false);
  };

  const handleSubmitScore = () => {
    setStudentScores({ ...studentScores, [selectedStudent.id]: studentScores[selectedStudent.id] });
    setSelectedStudent(null);
    setScoreSaved(true);
  };

  const calculateWeightedMean = (scores) => {
    const weights = {
      Attention: 0.1,
      Discovery: 0.4,
      Solution: 0.2,
      Commitment: 0.1,
      Objections: 0.1,
      Non_Verbals: 0.1,
    };

    let totalWeightedScore = 0;
    let totalWeight = 0;

    for (const [component, score] of Object.entries(scores)) {
      totalWeightedScore += score * weights[component];
      totalWeight += weights[component];
    }

    return totalWeightedScore / totalWeight;
  };

  const handleSubmitAllScores = () => {
    // Check if any scores are missing
    const missingScores = Object.keys(studentScores).find(studentId => {
      const scoreValues = Object.values(studentScores[studentId]);
      return scoreValues.includes(undefined);
    });

    if (missingScores) {
      // Display a warning message for missing scores
      alert('Please fill all scores for each student before submitting.');
      return;
    }

    // Check if judge name is missing
    if (!judgeName.trim()) {
      // Display a warning message for missing judge name
      alert('Please provide the judge name before submitting.');
      return;
    }

    // Check if best candidate is not chosen
    if (!bestCandidate.trim()) {
      // Display a warning message for missing best candidate
      alert('Please select the best candidate before submitting.');
      return;
    }

    // Proceed with submitting scores
    const scoresData = {
      roomNumber: roomId,
      judgeName: judgeName,
      bestCandidate: bestCandidate,
      scores: []
    };

    Object.keys(studentScores).forEach(studentId => {
      const student = students.find(student => student.id === studentId);
      const componentScores = studentScores[studentId];
      const weightedMean = calculateWeightedMean(componentScores);
      
      scoresData.scores.push({
        studentName: student.name,
        componentScores: componentScores,
        weightedMean: weightedMean.toFixed(2) // Round to 2 decimal places
      });
    });

    fetch('http://localhost:3006/api/submitAllScores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scoresData),
    })
      .then(response => {
        if (response.ok) {
          console.log('All scores submitted successfully');
          setStudentScores({});
          alert('All scores submitted successfully! Thank you.');
        } else {
          console.error('Failed to submit scores:', response.status);
          alert('Failed to submit scores. Please try again later.');
        }
      })
      .catch(error => {
        console.error('Error submitting scores:', error);
        alert('An error occurred while submitting scores. Please try again later.');
      });
  };

  const filteredStudents = students.filter(student => {
    const fullName = student.name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query);
  });

  return (
    <div className='student-container'>
      <h2>ROOM {roomId}</h2>
      <Link to="/">Back to Homepage</Link>
      <input
        type="text"
        placeholder="Search students..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="student-list">
        {filteredStudents.map((student, index) => (
          <div key={index} className="student-box">
            <button className={studentScores[student.id] && scoreSaved ? "saved" : ""} onClick={() => handleStudentClick(student)}>{student.name}</button>
          </div>
        ))}
      </div>
      {selectedStudent && (
        <div className="overlay">
          <div className="form-container">
            <form>
              <div className="form-group">
                <label htmlFor="firstName">Participant Name :</label>
                <input type="text" id="firstName" value={selectedStudent.name} readOnly />
              </div>
              {Object.entries(studentScores[selectedStudent.id] || {}).map(([param, value]) => (
                <div key={param} className="form-group">
                  <label htmlFor={param}>{param[0].toUpperCase() + param.slice(1)}:</label>
                  <input
                    type="range"
                    id={param}
                    className="slider"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => handleSliderChange(e, param)}
                  />
                  <span>{value}</span>
                </div>
              ))}
              <div className="form-group">
                <label>Total Score:</label>
                <span className="total-score">
                  {Object.values(studentScores[selectedStudent.id] || {}).reduce((acc, val) => acc + val, 0)}/600
                </span>
              </div>
              <button type="button" onClick={handleSubmitScore}>Save Score</button>
              <button type="button" onClick={handleCloseForm}>Close</button>
            </form>
          </div>
        </div>
      )}
      {/* Form for judge's name and best candidate */}
      <div className="judge-form">
        <div className="form-group">
          <label htmlFor="judgeName">Judge Name:</label>
          <input type="text" id="judgeName" value={judgeName} onChange={(e) => setJudgeName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="bestCandidate">Best Candidate:</label>
          <select id="bestCandidate" value={bestCandidate} onChange={(e) => setBestCandidate(e.target.value)}>
            <option value="">Select</option>
            {students.map(student => (
              <option key={student.id} value={student.name}>{student.name}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Submit All Scores button */}
      <button className="submit-button" type="button" onClick={handleSubmitAllScores}>
        Submit All Scores
      </button>
    </div>
  );
}

export default RoomPage;
