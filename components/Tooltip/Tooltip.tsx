import React, { useState } from 'react';
import styles from './Tooltip.module.css'; // assuming you have a Tooltip.css file

export default function Tooltip({ children, text }: any): JSX.Element {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseOver = () => {
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };
  const { tooltipContainer, tooltipText } = styles;

  return (
    <div
      className={tooltipContainer}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
      {showTooltip && <div className={tooltipText}>{text}</div>}
    </div>
  );
}
