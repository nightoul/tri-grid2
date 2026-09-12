function HexIcon({ id, accent, type, lowerOutlineOnly = false, alignBaseline = false }) {
  const clipId = `hexClip-${id}`
  const hexPoints = '25,3 75,3 100,50 75,97 25,97 0,50'
  // Align visible tile bottoms, including stroke widths and the house's 1.08 vertical scale.
  const viewBoxY = alignBaseline
    ? (type === 'roof' ? 17.398148 : type === 'gear' ? -4.852747 : 0)
    : (lowerOutlineOnly ? 19 : 0)

  return (
    <svg viewBox={`0 ${viewBoxY} 100 100`} className={`hex-icon hex-icon--${accent}`} aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <polygon points={hexPoints} />
        </clipPath>
      </defs>

      {lowerOutlineOnly ? (
        <path
          d="M49 36 L91.1 66.73 L75 97 H25 L8.54 66.06 Z"
          className="hex-outline"
          strokeLinejoin="miter"
        />
      ) : (
        <polygon points={hexPoints} className="hex-outline" />
      )}

      <g clipPath={`url(#${clipId})`}>
        {type === 'bolt' && (
          <polygon points="54.5,11.5 33,56.5 45,55 38,88.5 67,43.5 54,45" className="hex-glyph" />
        )}
        {type === 'gear' && (
          <g transform="translate(-106.48 -95.92) scale(.48)" className="hex-gear">
            <path
              d="M318 258.7 L322.8 258.1 L326 236 L344.7 238.6 L341.7 260.8 L346.2 262.7 L352.4 266.3 L356.2 269.3 L374.1 255.9 L385.5 271 L367.7 284.6 L369.5 289 L371.3 296 L371.9 300.8 L394 304 L391.4 322.7 L369.2 319.7 L367.3 324.2 L363.7 330.4 L360.7 334.2 L374.1 352.1 L359 363.5 L345.4 345.7 L341 347.5 L334 349.3 L329.2 349.9 L326 372 L307.3 369.4 L310.3 347.2 L305.8 345.3 L299.6 341.7 L295.8 338.7 L277.9 352.1 L266.5 337 L284.3 323.4 L282.5 319 L280.7 312 L280.1 307.2 L258 304 L260.6 285.3 L282.8 288.3 L284.7 283.8 L288.3 277.6 L291.3 273.8 L277.9 255.9 L293 244.5 L306.6 262.3 L311 260.5 Z"
              className="hex-glyph-ring hex-gear__outline"
              transform="rotate(13 326 304)"
            />
            <circle cx="326" cy="304" r="32" className="hex-glyph-ring hex-gear__hub" />
          </g>
        )}
        {type === 'roof' && (
          <g
            fill="none"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            {!lowerOutlineOnly && <path d="M14 62 L49 36 L86 62" className="hex-glyph-ring hex-roof" />}
            <path d={lowerOutlineOnly ? 'M30 45 V30' : 'M30 49 V30'} className="hex-glyph-ring" />
          </g>
        )}
      </g>
    </svg>
  )
}

export default HexIcon
