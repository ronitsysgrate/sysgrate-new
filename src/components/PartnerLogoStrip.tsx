import React from "react";
import styles from "./PartnerLogoStrip.module.css";

interface Partner {
  name: string;
  src: string;
}

const PARTNERS: Partner[] = [
  { name: "AWS", src: "/partners/aws.png" },
  { name: "Avaya", src: "/partners/avaya.png" },
  { name: "Azure", src: "/partners/azure.png" },
  { name: "Cisco", src: "/partners/cisco.png" },
  { name: "Genesys", src: "/partners/genesys.webp" },
  { name: "Lambda", src: "/partners/lambda.svg" },
  { name: "Poly", src: "/partners/poly.png" },
  { name: "Salesforce", src: "/partners/salesforce.svg" },
  { name: "Teams", src: "/partners/teams.png" },
  { name: "Zendesk", src: "/partners/zendesk.webp" },
  { name: "Zoom", src: "/partners/zoom.png" },
];

// Duplicated once so the CSS scroll (translateX -50%) loops seamlessly.
const LOOP = [...PARTNERS, ...PARTNERS];

export default function PartnerLogoStrip() {
  return (
    <div className={styles.strip} role="region" aria-label="Technology partners">
      <div className={styles.track}>
        {LOOP.map((partner, i) => (
          <div className={styles.logo} key={`${partner.name}-${i}`}>
            <img src={partner.src} alt={partner.name} loading="lazy" height="30" width="auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
