import React from 'react';
import { Link } from 'react-router-dom';

function StudentDetailsPage() {
  return (
    <div>
      <h2>Student Details</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        {/* Add more form fields as needed */}
        <button type="submit">Submit</button>
      </form>
      <Link to={`/rooms/${roomId}`}>Back to Students List</Link>
    </div>
  );
}

export default StudentDetailsPage;
