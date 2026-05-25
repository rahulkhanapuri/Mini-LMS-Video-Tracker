import React, { useRef, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const VideoPlayer = ({ activeModule, isCompleted, onMarkComplete }) => {
  const videoRef = useRef(null);

  // When module changes, reload the video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeModule]);

  if (!activeModule) {
    return (
      <div className="video-area" style={{ justifyContent: 'center' }}>
        <div style={{ color: 'var(--text-secondary)' }}>Select a module to start learning</div>
      </div>
    );
  }

  return (
    <div className="video-area">
      <div className="video-container">
        <video ref={videoRef} controls controlsList="nodownload" poster=''>
          {/* Reverting to dynamic videoUrl from the database instead of hardcoded video1 */}
          <source src={activeModule.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="video-details">
        <h2 className="video-title">{activeModule.title}</h2>
        <p className="video-description">{activeModule.description}</p>

        <div className="action-row">
          <button
            className={`btn-complete ${isCompleted ? 'completed' : ''}`}
            onClick={onMarkComplete}
            disabled={isCompleted}
          >
            {isCompleted ? (
              <>
                <CheckCircle size={20} />
                Completed
              </>
            ) : (
              'Mark as Complete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
