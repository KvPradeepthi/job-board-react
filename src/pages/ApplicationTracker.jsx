import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import mockData from '../data/mock-data.json';
import '../styles/ApplicationTracker.css';

const ApplicationTracker = () => {
  const navigate = useNavigate();
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState({});

  useEffect(() => {
    // Load bookmarked jobs from localStorage
    const stored = localStorage.getItem('bookmarkedJobs');
    if (stored) {
      try {
        const bookmarkedIds = JSON.parse(stored);
        setBookmarkedJobs(bookmarkedIds);
      } catch (e) {
        console.error('Failed to parse bookmarked jobs', e);
      }
    }

    // Load job data
    const companyMap = {};
    mockData.companies.forEach(company => {
      companyMap[company.id] = company;
    });
    setCompanies(companyMap);

    const processedJobs = mockData.jobs.map(job => ({
      ...job,
      company: companyMap[job.companyId]?.name || 'Unknown Company'
    }));
    setJobs(processedJobs);
  }, []);

  // Filter jobs that are bookmarked
  const trackerJobs = jobs.filter(job => bookmarkedJobs.includes(job.id));

  const toggleBookmark = (jobId) => {
    let updated = [...bookmarkedJobs];
    if (updated.includes(jobId)) {
      updated = updated.filter(id => id !== jobId);
    } else {
      updated.push(jobId);
    }
    setBookmarkedJobs(updated);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updated));
  };

  return (
    <div className="application-tracker-container">
      <header className="tracker-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Job Listings
        </button>
        <h1>Bookmarked Jobs ({trackerJobs.length})</h1>
      </header>

      <main className="tracker-content">
        {trackerJobs.length > 0 ? (
          <div className="jobs-list">
            {trackerJobs.map(job => (
              <div
                key={job.id}
                data-testid={`job-card-${job.id}`}
                className="tracker-job-card"
              >
                <div className="job-header">
                  <div className="job-info">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                    <p className="location">{job.location}</p>
                  </div>
                  <button
                    data-testid={`bookmark-btn-${job.id}`}
                    data-bookmarked={bookmarkedJobs.includes(job.id)}
                    className="bookmark-btn bookmarked"
                    onClick={() => toggleBookmark(job.id)}
                    title="Remove bookmark"
                  >
                    ★
                  </button>
                </div>

                <div className="job-meta">
                  <span className="job-type">{job.jobType}</span>
                  <span className="experience">{job.experienceLevel}</span>
                  <span className="salary" data-testid="job-salary">${job.salary.toLocaleString()}</span>
                </div>

                <div className="skills">
                  {job.skills.map(skill => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="job-footer">
                  <span className="posted-date">{new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No Bookmarked Jobs Yet</h2>
            <p>Start bookmarking jobs to see them here!</p>
            <button className="btn-primary" onClick={() => navigate('/')}>
              Browse Jobs
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ApplicationTracker;
