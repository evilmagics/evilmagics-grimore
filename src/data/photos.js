export const photos = [
  {
    id: 1,
    title: "Misty Forest at Dawn",
    category: "Forest",
    exif: { aperture: "f/2.8", shutter: "1/80s", iso: "ISO 400", focal: "24mm" },
    gradient: "linear-gradient(160deg, #0a1a0d 0%, #1a3020 50%, #0d220f 100%)",
    aspect: "16/9",
    featured: true,
    svg: `<svg viewBox="0 0 320 180" style="width:100%;height:100%;position:absolute;inset:0">
      <path d="M0 180 L50 80 L80 120 L120 40 L170 140 L200 60 L240 110 L270 75 L320 180Z" fill="rgba(0,229,255,.035)"/>
      <path d="M0 180 L65 100 L95 130 L140 55 L185 145 L220 70 L265 120 L320 180Z" fill="rgba(0,229,255,.022)"/>
      <circle cx="250" cy="38" r="22" fill="none" stroke="rgba(201,168,76,.2)" stroke-width=".8"/>
      <circle cx="250" cy="38" r="32" fill="none" stroke="rgba(201,168,76,.1)" stroke-width=".5"/>
    </svg>`,
  },
  {
    id: 2,
    title: "Mountain Lake",
    category: "Nature",
    exif: { aperture: "f/8", shutter: "1/200s", iso: "ISO 100", focal: "35mm" },
    gradient: "linear-gradient(160deg, #0d1520 0%, #1a2535 60%, #0a1218 100%)",
    aspect: "4/3",
    featured: false,
    svg: `<svg viewBox="0 0 160 120" style="width:100%;height:100%;position:absolute;inset:0">
      <ellipse cx="80" cy="90" rx="100" ry="30" fill="rgba(0,80,150,.16)"/>
      <path d="M0 65 Q40 42 80 58 Q120 74 160 50 L160 120 L0 120Z" fill="rgba(0,60,120,.2)"/>
      <circle cx="80" cy="24" r="16" fill="rgba(201,168,76,.12)"/>
    </svg>`,
  },
  {
    id: 3,
    title: "Golden Hour Ridge",
    category: "Nature",
    exif: { aperture: "f/11", shutter: "1/500s", iso: "ISO 200", focal: "70mm" },
    gradient: "linear-gradient(160deg, #1a0d05 0%, #2a1a08 60%, #180e04 100%)",
    aspect: "4/3",
    featured: false,
    svg: `<svg viewBox="0 0 160 120" style="width:100%;height:100%;position:absolute;inset:0">
      <path d="M0 120 L0 75 Q27 53 54 68 Q80 82 107 45 Q133 24 160 58 L160 120Z" fill="rgba(180,80,20,.14)"/>
      <path d="M0 120 L0 88 Q35 70 70 80 Q105 90 140 65 L160 72 L160 120Z" fill="rgba(140,60,10,.1)"/>
      <circle cx="30" cy="35" r="12" fill="rgba(255,180,40,.1)"/>
    </svg>`,
  },
  {
    id: 4,
    title: "Ancient Canopy",
    category: "Forest",
    exif: { aperture: "f/4", shutter: "1/60s", iso: "ISO 800", focal: "16mm" },
    gradient: "linear-gradient(160deg, #0d1a0a 0%, #1a2d15 50%, #0f200c 100%)",
    aspect: "4/3",
    featured: false,
    svg: `<svg viewBox="0 0 160 120" style="width:100%;height:100%;position:absolute;inset:0">
      <path d="M20 0 L20 80 Q40 90 60 75 L60 0" fill="rgba(0,229,255,.02)"/>
      <path d="M100 0 L100 70 Q120 85 140 72 L140 0" fill="rgba(0,229,255,.02)"/>
      <circle cx="80" cy="30" r="25" fill="rgba(201,168,76,.06)"/>
    </svg>`,
  },
  {
    id: 5,
    title: "Starlit Valley",
    category: "Night",
    exif: { aperture: "f/1.4", shutter: "25s", iso: "ISO 3200", focal: "14mm" },
    gradient: "linear-gradient(160deg, #050510 0%, #0a0a20 50%, #050512 100%)",
    aspect: "16/9",
    featured: false,
    svg: `<svg viewBox="0 0 320 180" style="width:100%;height:100%;position:absolute;inset:0">
      <circle cx="50" cy="30" r="1.5" fill="rgba(224,224,224,.3)"/>
      <circle cx="120" cy="20" r="1" fill="rgba(224,224,224,.2)"/>
      <circle cx="200" cy="45" r="1.2" fill="rgba(224,224,224,.25)"/>
      <circle cx="280" cy="25" r="1" fill="rgba(224,224,224,.15)"/>
      <circle cx="160" cy="55" r="1.3" fill="rgba(224,224,224,.2)"/>
      <path d="M0 180 L40 130 L90 145 L160 100 L230 135 L280 115 L320 140 L320 180Z" fill="rgba(0,229,255,.02)"/>
    </svg>`,
  },
  {
    id: 6,
    title: "Enchanted Creek",
    category: "Forest",
    exif: { aperture: "f/5.6", shutter: "1/30s", iso: "ISO 640", focal: "50mm" },
    gradient: "linear-gradient(160deg, #0a150d 0%, #152a1a 50%, #0c1e10 100%)",
    aspect: "4/3",
    featured: false,
    svg: `<svg viewBox="0 0 160 120" style="width:100%;height:100%;position:absolute;inset:0">
      <path d="M0 90 Q30 70 60 85 Q90 100 120 75 Q140 60 160 80 L160 120 L0 120Z" fill="rgba(0,150,200,.08)"/>
      <path d="M0 95 Q40 80 80 90 Q120 100 160 85 L160 120 L0 120Z" fill="rgba(0,100,150,.06)"/>
    </svg>`,
  },
];

export const photoCategories = ["All", "Forest", "Nature", "Night"];
