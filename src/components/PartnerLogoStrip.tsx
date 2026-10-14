import React from "react";
import Image from "next/image";
import styles from "./PartnerLogoStrip.module.css";

interface Partner {
  name: string;
  src: string;
}

const PARTNERS: Partner[] = [
  { name: "AWS", src: "/logos/aws.png" },
  { name: "Avaya", src: "/logos/avaya.png" },
  { name: "Azure", src: "/logos/azure.png" },
  { name: "Cisco", src: "/logos/cisco.png" },
  { name: "Genesys", src: "/logos/genesys.webp" },
  { name: "Lambda", src: "/logos/lambda.svg" },
  { name: "Poly", src: "/logos/poly.png" },
  { name: "Salesforce", src: "/logos/salesforce.svg" },
  { name: "Teams", src: "/logos/teams.png" },
  { name: "Zendesk", src: "/logos/zendesk.webp" },
  { name: "Zoom", src: "/logos/zoom.png" },
];

// Duplicated once so the CSS scroll (translateX -50%) loops seamlessly.
const LOOP = [...PARTNERS, ...PARTNERS];

export default function PartnerLogoStrip() {
  return (
    <div className={styles.strip} role="region" aria-label="Technology partners">
      <div className={styles.track}>
        {LOOP.map((partner, i) => (
          <div className={styles.logo} key={`${partner.name}-${i}`}>
            <Image
              src={partner.src}
              alt={partner.name}
              width={160}
              height={48}
              style={{ width: "auto", height: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
