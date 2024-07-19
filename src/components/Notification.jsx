import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message, show, duration }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  return (
    <div className={`notification ${visible ? 'show' : ''}`}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
};

export default Notification;
