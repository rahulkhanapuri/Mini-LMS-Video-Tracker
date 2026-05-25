import React from 'react';
import { CheckCircle2, Circle, PlayCircle } from 'lucide-react';

const CoursePlaylist = ({ course, completedModules, activeModule, onSelectModule }) => {
  if (!course) return null;

  return (
    <div className="playlist-sidebar">
      <div className="playlist-header">
        <h3 className="playlist-title">Course Content</h3>
        <div className="playlist-subtitle">
          {completedModules.length} / {course.modules.length} completed
        </div>
      </div>
      <ul className="module-list">
        {course.modules.map((module, index) => {
          const isCompleted = completedModules.includes(module._id);
          const isActive = activeModule && activeModule._id === module._id;

          return (
            <li 
              key={module._id}
              className={`module-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectModule(module)}
            >
              <div className="module-thumbnail">
                <PlayCircle size={24} />
                <div className={`module-icon-overlay ${isCompleted ? 'completed' : 'pending'}`}>
                  {isCompleted ? <CheckCircle2 size={16} fill="white" /> : <Circle size={16} fill="rgba(0,0,0,0.5)" />}
                </div>
              </div>
              <div className="module-info">
                <div className="module-title">{index + 1}. {module.title}</div>
                <div className="module-status-text">
                  {isCompleted ? 'Completed' : 'Pending'}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CoursePlaylist;
