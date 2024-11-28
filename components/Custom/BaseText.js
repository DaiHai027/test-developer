import React from 'react';

const BaseText = ({
  title,
  className = '',
  textColor = 'text-gray-700',
  textAlign = 'text-left', 
  fontWeight = 'text-regular',
  lineHeight,
  fontSize = '18px',
}) => {
  return (
    <p
      style={{ fontSize, lineHeight }}
      className={`${fontWeight} ${textColor} ${textAlign} ${className}`}
    >
      {title}
    </p>
  );
};

export default BaseText;
