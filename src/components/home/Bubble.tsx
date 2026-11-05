import React from 'react';
import Link from 'next/link';

interface BubbleProps {
  href: string;
  label: string;
  /** Text curved around the bubble, centred over the top */
  ringText: string;
  /** Optional second line, centred along the bottom and read left to right */
  ringBottom?: string;
  /** Unique per page: names the SVG circles the ring text follows */
  id: string;
  /** What spins/waves inside on hover (desktop): see .bubble-spin / .bubble-wave */
  iconClassName: string;
  children: React.ReactNode;
}

const RING_RADIUS = 42;
// The bottom line hangs inward from its baseline, so its circle is one cap height wider to share the top line's band
const BOTTOM_RADIUS = 49;

/** Soap-bubble link with its label curved around it, like a console menu bubble. */
export function Bubble({ href, label, ringText, ringBottom, id, iconClassName, children }: BubbleProps) {
  return (
    <Link href={href} aria-label={label} className="bubble-link apple-press">
      <svg viewBox="0 0 100 100" className="bubble-ring" aria-hidden="true">
        {/* Circle starting at the bottom and going up the left, so text centred on it sits over the top */}
        <path id={id} fill="none" d={`M 50,${50 + RING_RADIUS} a ${RING_RADIUS},${RING_RADIUS} 0 1,1 0,-${RING_RADIUS * 2} a ${RING_RADIUS},${RING_RADIUS} 0 1,1 0,${RING_RADIUS * 2}`} />
        <text>
          <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
            {ringText}
          </textPath>
        </text>
        {ringBottom && (
          <>
            {/* Starts at the top going anticlockwise, so its middle is the bottom and the text there stays upright */}
            <path id={`${id}-bottom`} fill="none" d={`M 50,${50 - BOTTOM_RADIUS} a ${BOTTOM_RADIUS},${BOTTOM_RADIUS} 0 1,0 0,${BOTTOM_RADIUS * 2} a ${BOTTOM_RADIUS},${BOTTOM_RADIUS} 0 1,0 0,-${BOTTOM_RADIUS * 2}`} />
            <text className="bubble-ring-bottom">
              <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
                {ringBottom}
              </textPath>
            </text>
          </>
        )}
      </svg>
      <span className="bubble">
        <span className={iconClassName}>{children}</span>
      </span>
    </Link>
  );
}
