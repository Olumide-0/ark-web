/*
 * ARK mark, traced from the Figma screens. Replace the path with the
 * SVG exported from Figma for a 1:1 match.
 */
export function ArkMark({ className = "", style }) {
  return (
    <svg viewBox="0 0 800 853" className={className} style={style} aria-hidden>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d={[
          // Outer silhouette: A legs, crossbar + wings, chevron base
          "M346.5 0H453.5L550.3 368H800V628L400 853L0 628V368H249.7Z",
          // Upper triangle opening
          "M400 196L446 368H354Z",
          // Lower opening (pointed)
          "M327 467H473L528 673L400 745L272 673Z",
          // Right notch between leg and wing
          "M576 467H700V576L617 621Z",
          // Left notch between leg and wing
          "M224 467H100V576L183 621Z",
        ].join("")}
      />
    </svg>
  );
}
