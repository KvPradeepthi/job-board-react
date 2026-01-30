import { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

export const useJobFilters = (jobs) => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    skills: [],
    salaryRange: [0, 300000],
    searchQuery: '',
  });
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const itemsPerPage = 10;

  useEffect(() => {
    const stored = localStorage.getItem('bookmarkedJobs');
    if (stored) {
      try {
        setBookmarkedJobs(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse bookmarked jobs', e);
      }
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const applyFilters = () => {
    let result = [...jobs];

    if (filters.jobType.length > 0) {
      result = result.filter(job => filters.jobType.includes(job.jobType));
    }

    if (filters.experienceLevel.length > 0) {
      result = result.filter(job => filters.experienceLevel.includes(job.experienceLevel));
    }

    if (filters.skills.length > 0) {
      result = result.filter(job => filters.skills.every(skill => job.skills.includes(skill)));
    }

    result = result.filter(job => job.salary >= filters.salaryRange[0] && job.salary <= filters.salaryRange[1]);

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(job => job.title.toLowerCase().includes(query) || job.company.toLowerCase().includes(query));
    }

    setFilteredJobs(result);
    setCurrentPage(1);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      setFilters(prev => ({ ...prev, searchQuery: query }));
    }, 300),
    []
  );

  const updateSearch = (query) => {
    debouncedSearch(query);
  };

  const toggleJobType = (type) => {
    setFilters(prev => ({
      ...prev,
      jobType: prev.jobType.includes(type) ? prev.jobType.filter(t => t !== type) : [...prev.jobType, type]
    }));
  };

  const toggleExperienceLevel = (level) => {
    setFilters(prev => ({
      ...prev,
      experienceLevel: prev.experienceLevel.includes(level) ? prev.experienceLevel.filter(l => l !== level) : [...prev.experienceLevel, level]
    }));
  };

  const updateSkills = (selectedSkills) => {
    setFilters(prev => ({
      ...prev,
      skills: selectedSkills.map(s => s.value)
    }));
  };

  const updateSalaryRange = (range) => {
    setFilters(prev => ({ ...prev, salaryRange: range }));
  };

  const sortJobs = (sortType) => {
    let sorted = [...filteredJobs];
    switch (sortType) {
      case 'salary-desc':
        sorted.sort((a, b) => b.salary - a.salary);
        break;
      case 'date':
        sorted.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      default:
        break;
    }
    setFilteredJobs(sorted);
  };

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

  const clearAllFilters = () => {
    setFilters({
      jobType: [],
      experienceLevel: [],
      skills: [],
      salaryRange: [0, 300000],
      searchQuery: '',
    });
    setCurrentPage(1);
  };

  const getActiveFilterCount = () => {
    return (
      filters.jobType.length +
      filters.experienceLevel.length +
      filters.skills.length +
      (filters.searchQuery ? 1 : 0) +
      (filters.salaryRange[0] !== 0 || filters.salaryRange[1] !== 300000 ? 1 : 0)
    );
  };

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIdx, endIdx);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return {
    filteredJobs: paginatedJobs,
    allFilteredJobs: filteredJobs,
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
  };
};

export default useJobFilters;
