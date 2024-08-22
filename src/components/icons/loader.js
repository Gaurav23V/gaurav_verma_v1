import React from "react";

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <title>Loader Logo</title>
    <g>
      <g
        id="G"
        transform="translate(36, 33)"
        fill="#64FFDA"
        style={{ opacity: 0 }}
      >
        {" "}
        {/* Changed id to "G" */}
        <text
          fontFamily="system-ui,Calibre-Medium, Calibre,sans-serif"
          fontSize="50"
          fontWeight="400"
          letterSpacing="4.16666603"
        >
          <tspan x="-5" y="33">
            G
          </tspan>
        </text>
      </g>
      <path
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 50, 5
                  L 11, 27
                  L 11, 72
                  L 50, 95
                  L 89, 73
                  L 89, 28 z"
      />
    </g>
  </svg>
);

export default IconLoader;
