import React from 'react';

const IconLogo = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 84 96">
    <title>Logo</title>
    <g transform="translate(-8.000000, -2.000000)">
      <g transform="translate(11.000000, 5.000000)">
        <polygon
          id="Shape"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="39 0 0 22 0 67 39 90 78 68 78 23"
        />
        <g id="G" transform="translate(36, 33)" fill="#64FFDA" style={{ opacity: 1 }}> {/* Added the "G" path here */}
          <text
            fontFamily="system-ui,Calibre-Medium, Calibre,sans-serif"
            fontSize="50"
            fontWeight="400"
            letterSpacing="4.16666603"
          >
            <tspan x="-15" y="30">G</tspan>
          </text>
        </g> 
      </g>
    </g>
  </svg>
);

export default IconLogo;