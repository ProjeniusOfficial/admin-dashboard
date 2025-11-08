import React, { useState, useEffect } from 'react';
import './AdminPage.css'; // Use the new CSS file name

function AdminPage() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the API URL from the environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // This function fetches the data from our backend
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${API_URL}/api/applications`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // We reverse the data to show the newest submissions first
        setApplications(data.reverse()); 
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false); // Stop loading, whether success or error
      }
    };

    fetchApplications();
  }, [API_URL]); // Effect runs once when component mounts

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>PSNA Foundation Technology</h1>
        <h2>Application Form Details</h2>
      </header>

      <main className="admin-content">
        {isLoading && <p className="loading-message">Loading details...</p>}
        
        {error && <p className="error-message">Error: {error}</p>}
        
        {!isLoading && !error && (
          <table className="details-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Company</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app, index) => (
                  <tr key={app._id}>
                    <td>{index + 1}</td>
                    <td>{app.fullName}</td>
                    <td>{app.businessName}</td>
                    <td>
                      {/* This is the Download button. It's just a link
                          to our backend's PDF download endpoint.
                      */}
                      <a 
                        href={`${API_URL}/api/download-pdf/${app._id}`}
                        className="download-button"
                        target="_blank" // Opens in a new tab
                        rel="noopener noreferrer"
                        download
                      >
                        Download PDF
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No applications have been submitted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default AdminPage;