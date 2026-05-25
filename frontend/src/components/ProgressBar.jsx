import React from 'react';

const ProgressBar = ({ totalModules, completedModulesCount }) => {
  const percentage = totalModules === 0 
    ? 0 
    : Math.round((completedModulesCount / totalModules) * 100);

  return (
    <>
      <div className="progress-info">
        <span>Course Progress</span>
        <span>{completedModulesCount} of {totalModules} modules completed ({percentage}%)</span>
      </div>
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
