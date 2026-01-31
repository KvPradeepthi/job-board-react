import React, { useState, useEffect } from 'react';
import { useLink } from 'react-router-dom';
import useJobFilters from '../hooks/useJobFilters';
import mockData from '../data/mock-data.json';
import '../styles/JobListings.css';

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState({});
  const [sorting, setSorting] = useState('relevance');
  const [allSkills, setAllSkills] = useState([]);

  const {
    filteredJobs,
    allFilteredJobs,
    filters,
    viewMode,
    setViewMode,
    updateSearch,
    toggleJobType,
    toggleExperienceLevel,
    updateSkills,
    updateSalaryRange,
    sortJobs,
    toggleBookmark,
    clearAllFilters,
    bookmarkedJobs,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    getActiveFilterCount,
  } = useJobFilters(jobs);

  useEffect(() => {
    const processedJobs = mockData.jobs.map(job => ({
      ...job,
      company: companies[job.companyId]?.name || 'Unknown Company'
    }));
    setJobs(processedJobs);

    const companyMap = {};
    mockData.companies.forEach(company => {
      companyMap[company.id] = company;
    });
    setCompanies(companyMap);

    const skillSet = new Set();
    mockData.jobs.forEach(job => {
      job.skills.forEach(skill => skillSet.add(skill));
    });
    setAllSkills(Array.from(skillSet).sort());
  }, []);

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSorting(newSort);
    sortJobs(newSort === 'salary-desc' ? 'salary-desc' : newSort === 'date' ? 'date' : 'relevance');
  };

  const skillOptions = allSkills.map(skill => ({
    value: skill,
    label: skill
  }));

  return (
    <div className="job-listings-container">
      <header className="header">
        <h1>Job Board</h1>
        <p>Find your dream job</p>
      </header>

      <div className="content-wrapper">
        <aside className="filters-sidebar">
          <div className="filters-header">
            <h2>Filters</h2>
            <span className="filter-count">({getActiveFilterCount()})</span>
          </div>

          <div className="filter-section">
            <label>
              <input
                type="text"
                placeholder="Search jobs..."
                data-testid="search-input"
                onChange={(e) => updateSearch(e.target.value)}
              />
            </label>
          </div>

          <div className="filter-section">
            <h3>Job Type</h3>
            <div className="filter-options">
              <label>
                <input
                  type="radio"
                  name="jobType"
                  value="Remote"
                  data-testid="filter-job-type-remote"
                  onChange={() => toggleJobType('Remote')}
                  checked={filters.jobType.includes('Remote')}
                />
                Remote
              </label>
              <label>
                <input
                  type="radio"
                  name="jobType"
                  value="Hybrid"
                  data-testid="filter-job-type-hybrid"
                  onChange={() => toggleJobType('Hybrid')}
                  checked={filters.jobType.includes('Hybrid')}
                />
                Hybrid
              </label>
              <label>
                <input
                  type="radio"
                  name="jobType"
                  value="Onsite"
                  data-testid="filter-job-type-onsite"
                  onChange={() => toggleJobType('Onsite')}
                  checked={filters.jobType.includes('Onsite')}
                />
                Onsite
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h3>Experience Level</h3>
            <div className="filter-options">
              {['Junior', 'Mid', 'Senior', 'Internship'].map(level => (
                <label key={level}>
                  <input
                    type="checkbox"
                    onChange={() => toggleExperienceLevel(level)}
                    checked={filters.experienceLevel.includes(level)}
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Skills</h3>
            <div data-testid="filter-skills" className="skills-select">
              <select
                multiple
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => ({
                    value: option.value,
                    label: option.label
                  }));
                  updateSkills(selected);
                }}
              >
                {skillOptions.map(skill => (
                  <option key={skill.value} value={skill.value}>
                    {skill.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-section">
            <h3>Salary Range</h3>
            <div data-testid="filter-salary-slider" className="salary-slider">
              <input
                type="range"
                min="0"
                max="300000"
                step="10000"
                value={filters.salaryRange[0]}
                onChange={(e) => updateSalaryRange([parseInt(e.target.value), filters.salaryRange[1]])}
              />
              <input
                type="range"
                min="0"
                max="300000"
                step="10000"
                value={filters.salaryRange[1]}
                onChange={(e) => updateSalaryRange([filters.salaryRange[0], parseInt(e.target.value)])}
              />
              <p>${filters.salaryRange[0].toLocaleString()} - ${filters.salaryRange[1].toLocaleString()}</p>
            </div>
          </div>

          <button className="clear-filters-btn" data-testid="clear-filters-btn" onClick={clearAllFilters}>
            Clear All Filters
          </button>
        </aside>

        <main className="main-content">
          <div className="top-controls">
            <div className="view-toggle">
              <button
                data-testid="grid-view-btn"
                className={viewMode === 'grid' ? 'active' : ''}
                onClick={() => setViewMode('grid')}
              >
                Grid View
              </button>
              <button
                data-testid="list-view-btn"
                className={viewMode === 'list' ? 'active' : ''}
                onClick={() => setViewMode('list')}
              >
                List View
              </button>
            </div>

            <div className="sort-control">
              <label>Sort by:</label>
              <select value={sorting} onChange={handleSortChange}>
                <option value="relevance">Relevance</option>
                <option data-testid="sort-salary-desc" value="salary-desc">Salary (High to Low)</option>
                <option value="date">Posted Date</option>
              </select>
            </div>
          </div>

          <div
            data-testid="job-list-container"
            data-view-mode={viewMode}
            className={`job-list-container ${viewMode}-view`}
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div
                  key={job.id}
                  data-testid={`job-card-${job.id}`}
                  className={`job-card ${viewMode === 'list' ? 'list-item' : 'grid-item'}`}
                >
                  <div className="job-header">
                    <div>
                      <h3>{job.title}</h3>
                      <p className="company">{job.company}</p>
                    </div>
                    <button
                      data-testid={`bookmark-btn-${job.id}`}
                      data-bookmarked={bookmarkedJobs.includes(job.id)}
                      className={`bookmark-btn ${bookmarkedJobs.includes(job.id) ? 'bookmarked' : ''}`}
                      onClick={() => toggleBookmark(job.id)}
                    >
                      {bookmarkedJobs.includes(job.id) ? '★' : '☆'}
                    </button>
                  </div>

                  <div className="job-details">
                    <span className="location">{job.location}</span>
                    <span className="job-type">{job.jobType}</span>
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
                    <span className="experience">{job.experienceLevel}</span>
                    <span className="posted-date">{new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-jobs">No jobs found. Try adjusting your filters.</p>
            )}
          </div>

          <div data-testid="pagination-controls" className="pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>

            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>

            <button
              data-testid="pagination-next"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobListingsPage;
