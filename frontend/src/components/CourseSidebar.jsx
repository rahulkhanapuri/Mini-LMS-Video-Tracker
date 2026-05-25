import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const CourseSidebar = ({ course, completedModules, activeModule, onSelectModule }) => {
  if (!course) return <div className="sidebar"><div className="course-title-header">Loading...</div></div>;

  return (
    <div className="sidebar">
      <div className="course-title-header">
        {course.title}
      </div>
      <ul className="module-list">
        {course.modules.map((module) => {
          const isCompleted = completedModules.includes(module._id);
          const isActive = activeModule && activeModule._id === module._id;

          return (
            <li 
              key={module._id}
              className={`module-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectModule(module)}
            >
              <div className={`module-icon ${isCompleted ? 'completed' : 'pending'}`}>
                {isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </div>
              <div className="module-info">
                <span className="module-title">{module.title}</span>
                <span className="module-status-text">
                  {isCompleted ? 'Completed' : 'Pending'}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CourseSidebar;
