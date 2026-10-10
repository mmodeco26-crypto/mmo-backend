function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} = React;

// =========================================================================
// 🎨 LUCIDE ICONS (Production React SVG Components with Cairo / RTL Polish)
// =========================================================================
const IconBase = ({
  children,
  size = 18,
  className = '',
  ...props
}) => /*#__PURE__*/React.createElement("svg", _extends({
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: `inline-block shrink-0 ${className}`
}, props), children);
const Icons = {
  Bike: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("circle", {
    cx: "18.5",
    cy: "17.5",
    r: "3.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5.5",
    cy: "17.5",
    r: "3.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "5",
    r: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 17.5V14l-3-3 4-3 2 3h2"
  })),
  Package: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "3.29 7 12 12 20.71 7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "22",
    x2: "12",
    y2: "12"
  })),
  Users: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  })),
  ShieldCheck: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  })),
  Wallet: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"
  })),
  TrendingUp: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("polyline", {
    points: "22 7 13.5 15.5 8.5 10.5 2 17"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "16 7 22 7 22 13"
  })),
  Navigation: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("polygon", {
    points: "3 11 22 2 13 21 11 13 3 11"
  })),
  MapPin: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })),
  Clock: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })),
  CheckCircle: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })),
  AlertCircle: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12.01",
    y2: "16"
  })),
  Search: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  RefreshCw: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 3v5h-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 16H3v5"
  })),
  Sliders: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "21",
    x2: "4",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "10",
    x2: "4",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "21",
    x2: "20",
    y2: "16"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "12",
    x2: "20",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "14",
    x2: "7",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "8",
    x2: "15",
    y2: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17",
    y1: "16",
    x2: "23",
    y2: "16"
  })),
  Trash2: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "10",
    y1: "11",
    x2: "10",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "11",
    x2: "14",
    y2: "17"
  })),
  Edit3: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M12 20h9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"
  })),
  Tag: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 7h.01"
  })),
  Phone: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
  })),
  Play: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("polygon", {
    points: "6 3 20 12 6 21 6 3"
  })),
  Sparkles: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
  })),
  Bell: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
  })),
  Volume2: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.54 8.46a5 5 0 0 1 0 7.07"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.07 4.93a10 10 0 0 1 0 14.14"
  })),
  VolumeX: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "22",
    y1: "9",
    x2: "16",
    y2: "15"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "9",
    x2: "22",
    y2: "15"
  })),
  ExternalLink: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "M15 3h6v6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 14 21 3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
  })),
  Layers: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("polygon", {
    points: "12 2 2 7 12 12 22 7 12 2"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "2 17 12 22 22 17"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "2 12 12 17 22 12"
  })),
  Plus: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })),
  ChevronRight: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  })),
  ChevronLeft: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("polyline", {
    points: "15 18 9 12 15 6"
  })),
  ArrowLeftRight: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("path", {
    d: "m8 3 4 8 5-5 5 15H2L8 3z"
  })),
  Zap: props => /*#__PURE__*/React.createElement(IconBase, props, /*#__PURE__*/React.createElement("polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
  }))
};

// =========================================================================
// 🗺️ ALGIERS AUTHENTIC COMMUNES & COORDINATES
// =========================================================================
const ALGIERS_COMMUNES = [{
  name: 'البريد المركزي، الجزائر العاصمة',
  shortName: 'البريد المركزي',
  coords: [36.7725, 3.0586]
}, {
  name: 'باب الزوار، الجزائر',
  shortName: 'باب الزوار',
  coords: [36.7167, 3.1833]
}, {
  name: 'حيدرة، الجزائر العاصمة',
  shortName: 'حيدرة',
  coords: [36.7450, 3.0380]
}, {
  name: 'بن عكنون، الجزائر العاصمة',
  shortName: 'بن عكنون',
  coords: [36.7550, 3.0180]
}, {
  name: 'دالي براهيم، الجزائر العاصمة',
  shortName: 'دالي براهيم',
  coords: [36.7560, 2.9880]
}, {
  name: 'الشراقة، الجزائر العاصمة',
  shortName: 'الشراقة',
  coords: [36.7680, 2.9550]
}, {
  name: 'القبة، الجزائر العاصمة',
  shortName: 'القبة',
  coords: [36.7280, 3.0780]
}, {
  name: 'الرويبة، الجزائر',
  shortName: 'الرويبة',
  coords: [36.7380, 3.2850]
}, {
  name: 'بئر مراد رايس، الجزائر',
  shortName: 'بئر مراد رايس',
  coords: [36.7350, 3.0520]
}, {
  name: 'زرالدة، الجزائر',
  shortName: 'زرالدة',
  coords: [36.7150, 2.8450]
}, {
  name: 'البليدة، مركز الولاية',
  shortName: 'البليدة',
  coords: [36.4700, 2.8300]
}, {
  name: 'حسين داي، الجزائر العاصمة',
  shortName: 'حسين داي',
  coords: [36.7430, 3.0900]
}, {
  name: 'درارية، الجزائر العاصمة',
  shortName: 'درارية',
  coords: [36.7180, 3.0050]
}];

// Haversine distance calculator
function getDistanceKm(c1, c2) {
  const R = 6371;
  const dLat = (c2[0] - c1[0]) * Math.PI / 180;
  const dLon = (c2[1] - c1[1]) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(c1[0] * Math.PI / 180) * Math.cos(c2[0] * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

// Interpolate points for smooth curve path along Algiers bay
function interpolatePath(p1, p2, steps = 50) {
  const points = [];
  const midLat = (p1[0] + p2[0]) / 2 + 0.005; // natural highway curve towards coast
  const midLng = (p1[1] + p2[1]) / 2 - 0.003;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Quadratic bezier
    const lat = (1 - t) * (1 - t) * p1[0] + 2 * (1 - t) * t * midLat + t * t * p2[0];
    const lng = (1 - t) * (1 - t) * p1[1] + 2 * (1 - t) * t * midLng + t * t * p2[1];
    points.push([lat, lng]);
  }
  return points;
}

// =========================================================================
// 🔊 WEB AUDIO API CHIME GENERATOR
// =========================================================================
function playAudioTone(type, soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    if (type === 'order') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2); // A5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'delivered') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    }
  } catch (e) {}
}

// =========================================================================
// 💾 INITIAL MOCK DATA (Algiers Moto Express Platform)
// =========================================================================
const INITIAL_DRIVERS = [{
  id: 'drv-01',
  name: 'azer deco',
  phone: '0794362893',
  vehicle_model: 'SYM Symphony ST 150',
  vehicle_plate: '31-12345-22',
  wallet_balance: 4500.0,
  rating: 4.9,
  is_online: true,
  kyc_status: 'approved',
  lat: 36.7538,
  lng: 3.0588,
  total_deliveries: 158,
  joined_date: '2025-11-12'
}, {
  id: 'drv-02',
  name: 'ياسين بن علي',
  phone: '0551234567',
  vehicle_model: 'Yamaha TMax 530',
  vehicle_plate: '16-98765-21',
  wallet_balance: 1200.0,
  rating: 5.0,
  is_online: true,
  kyc_status: 'approved',
  lat: 36.7450,
  lng: 3.0380,
  total_deliveries: 92,
  joined_date: '2026-01-05'
}, {
  id: 'drv-03',
  name: 'حمزة قادري',
  phone: '0662345678',
  vehicle_model: 'Honda PCX 125',
  vehicle_plate: '09-45678-20',
  wallet_balance: -450.0,
  rating: 4.7,
  is_online: true,
  kyc_status: 'approved',
  lat: 36.7167,
  lng: 3.1833,
  total_deliveries: 64,
  joined_date: '2026-02-18'
}, {
  id: 'drv-04',
  name: 'كريم بلقاسم',
  phone: '0773456789',
  vehicle_model: 'Peugeot Tweet 125',
  vehicle_plate: '16-11223-23',
  wallet_balance: 3100.0,
  rating: 4.8,
  is_online: false,
  kyc_status: 'approved',
  lat: 36.7680,
  lng: 2.9550,
  total_deliveries: 41,
  joined_date: '2026-03-01'
}, {
  id: 'drv-05',
  name: 'رياض منصوري',
  phone: '0544567890',
  vehicle_model: 'SYM Orbit III',
  vehicle_plate: '35-33445-19',
  wallet_balance: 800.0,
  rating: 4.6,
  is_online: false,
  kyc_status: 'suspended',
  lat: 36.7380,
  lng: 3.2850,
  total_deliveries: 19,
  joined_date: '2026-03-15'
}, {
  id: 'drv-06',
  name: 'وليد عثماني',
  phone: '0655678901',
  vehicle_model: 'VMS Driver 150',
  vehicle_plate: '16-55667-24',
  wallet_balance: 0.0,
  rating: 5.0,
  is_online: true,
  kyc_status: 'pending',
  lat: 36.7280,
  lng: 3.0780,
  total_deliveries: 0,
  joined_date: '2026-10-08'
}];
const INITIAL_CLIENTS = [{
  id: 'cl-01',
  name: 'مريم بن عيسى',
  phone: '0555001122',
  total_orders: 24,
  total_spent: 18450.0,
  is_active: true,
  joined_date: '2026-01-10'
}, {
  id: 'cl-02',
  name: 'أمين طاهري',
  phone: '0666112233',
  total_orders: 18,
  total_spent: 14200.0,
  is_active: true,
  joined_date: '2026-02-14'
}, {
  id: 'cl-03',
  name: 'فاطمة زهرة بوجمعة',
  phone: '0777223344',
  total_orders: 31,
  total_spent: 26800.0,
  is_active: true,
  joined_date: '2025-12-20'
}, {
  id: 'cl-04',
  name: 'سفيان حداد',
  phone: '0544334455',
  total_orders: 7,
  total_spent: 5600.0,
  is_active: true,
  joined_date: '2026-03-05'
}, {
  id: 'cl-05',
  name: 'نور الهدى لعماري',
  phone: '0655445566',
  total_orders: 12,
  total_spent: 9350.0,
  is_active: true,
  joined_date: '2026-04-12'
}];
const INITIAL_ORDERS = [{
  id: '9b67af7d',
  client_name: 'مريم بن عيسى',
  client_phone: '0555001122',
  driver_name: 'azer deco',
  driver_phone: '0794362893',
  pickup_address: 'البريد المركزي، الجزائر العاصمة',
  dropoff_address: 'باب الزوار، الجزائر',
  pickup_lat: 36.7725,
  pickup_lng: 3.0586,
  dropoff_lat: 36.7167,
  dropoff_lng: 3.1833,
  distance_km: 14.67,
  total_price: 494.25,
  discount_amount: 500.0,
  promo_code: 'BIENVENUE',
  status: 'delivered',
  created_at: '2026-10-10 10:14'
}, {
  id: '66cf4017',
  client_name: 'أمين طاهري',
  client_phone: '0666112233',
  driver_name: 'ياسين بن علي',
  driver_phone: '0551234567',
  pickup_address: 'حيدرة، الجزائر العاصمة',
  dropoff_address: 'بن عكنون، الجزائر العاصمة',
  pickup_lat: 36.7450,
  pickup_lng: 3.0380,
  dropoff_lat: 36.7550,
  dropoff_lng: 3.0180,
  distance_km: 4.8,
  total_price: 540.0,
  discount_amount: 0.0,
  status: 'in_transit',
  created_at: '2026-10-10 11:45'
}, {
  id: '3a2f1d2e',
  client_name: 'فاطمة زهرة بوجمعة',
  client_phone: '0777223344',
  driver_name: 'azer deco',
  driver_phone: '0794362893',
  pickup_address: 'البريد المركزي، الجزائر العاصمة',
  dropoff_address: 'باب الزوار، الجزائر',
  pickup_lat: 36.7725,
  pickup_lng: 3.0586,
  dropoff_lat: 36.7167,
  dropoff_lng: 3.1833,
  distance_km: 14.67,
  total_price: 1033.5,
  discount_amount: 0.0,
  status: 'accepted',
  created_at: '2026-10-10 12:02'
}, {
  id: '8c12b45a',
  client_name: 'سفيان حداد',
  client_phone: '0544334455',
  driver_name: '',
  driver_phone: '',
  pickup_address: 'دالي براهيم، الجزائر العاصمة',
  dropoff_address: 'الشراقة، الجزائر العاصمة',
  pickup_lat: 36.7560,
  pickup_lng: 2.9880,
  dropoff_lat: 36.7680,
  dropoff_lng: 2.9550,
  distance_km: 3.9,
  total_price: 495.0,
  discount_amount: 0.0,
  status: 'pending',
  created_at: '2026-10-10 12:15'
}, {
  id: 'e4a198c2',
  client_name: 'نور الهدى لعماري',
  client_phone: '0655445566',
  driver_name: 'حمزة قادري',
  driver_phone: '0662345678',
  pickup_address: 'القبة، الجزائر العاصمة',
  dropoff_address: 'بئر مراد رايس، الجزائر',
  pickup_lat: 36.7280,
  pickup_lng: 3.0780,
  dropoff_lat: 36.7350,
  dropoff_lng: 3.0520,
  distance_km: 5.2,
  total_price: 560.0,
  discount_amount: 0.0,
  status: 'delivered',
  created_at: '2026-10-10 09:30'
}, {
  id: '7b8891dc',
  client_name: 'أمين طاهري',
  client_phone: '0666112233',
  driver_name: 'azer deco',
  driver_phone: '0794362893',
  pickup_address: 'حسين داي، الجزائر العاصمة',
  dropoff_address: 'البريد المركزي، الجزائر العاصمة',
  pickup_lat: 36.7430,
  pickup_lng: 3.0900,
  dropoff_lat: 36.7725,
  dropoff_lng: 3.0586,
  distance_km: 6.1,
  total_price: 605.0,
  discount_amount: 0.0,
  status: 'picked_up',
  created_at: '2026-10-10 11:20'
}, {
  id: 'f234bc81',
  client_name: 'مريم بن عيسى',
  client_phone: '0555001122',
  driver_name: 'ياسين بن علي',
  driver_phone: '0551234567',
  pickup_address: 'الرويبة، الجزائر',
  dropoff_address: 'باب الزوار، الجزائر',
  pickup_lat: 36.7380,
  pickup_lng: 3.2850,
  dropoff_lat: 36.7167,
  dropoff_lng: 3.1833,
  distance_km: 11.4,
  total_price: 870.0,
  discount_amount: 0.0,
  status: 'delivered',
  created_at: '2026-10-10 08:45'
}, {
  id: 'a55cd219',
  client_name: 'سفيان حداد',
  client_phone: '0544334455',
  driver_name: 'ملغى',
  driver_phone: '',
  pickup_address: 'زرالدة، الجزائر',
  dropoff_address: 'الشراقة، الجزائر العاصمة',
  pickup_lat: 36.7150,
  pickup_lng: 2.8450,
  dropoff_lat: 36.7680,
  dropoff_lng: 2.9550,
  distance_km: 12.1,
  total_price: 905.0,
  discount_amount: 0.0,
  status: 'cancelled',
  created_at: '2026-10-09 21:10'
}];
const INITIAL_KYC = [{
  id: 'kyc-01',
  driver_id: 'drv-06',
  driver_name: 'وليد عثماني',
  phone: '0655678901',
  vehicle_model: 'VMS Driver 150',
  vehicle_plate: '16-55667-24',
  license_number: 'DZ-16/2022/88412',
  submission_date: '2026-10-08',
  status: 'pending'
}, {
  id: 'kyc-02',
  driver_id: 'drv-07',
  driver_name: 'طارق بوعزيز',
  phone: '0791234560',
  vehicle_model: 'SYM Symphony SR',
  vehicle_plate: '31-88990-23',
  license_number: 'DZ-31/2021/44910',
  submission_date: '2026-10-09',
  status: 'pending'
}, {
  id: 'kyc-03',
  driver_id: 'drv-08',
  driver_name: 'سمير فرحات',
  phone: '0560123456',
  vehicle_model: 'Yamaha Cygnus',
  vehicle_plate: '09-12344-22',
  license_number: 'DZ-09/2023/11094',
  submission_date: '2026-10-07',
  status: 'pending'
}];
const INITIAL_PROMOS = [{
  id: 'pr-01',
  code: 'BIENVENUE',
  discount_type: 'percentage',
  discount_value: 50,
  max_discount: 500,
  used_count: 84,
  is_active: true
}, {
  id: 'pr-02',
  code: 'RAMADAN20',
  discount_type: 'percentage',
  discount_value: 20,
  max_discount: 300,
  used_count: 142,
  is_active: true
}, {
  id: 'pr-03',
  code: 'MOTO100',
  discount_type: 'fixed',
  discount_value: 100,
  max_discount: 100,
  used_count: 59,
  is_active: true
}];
const INITIAL_AGENTS = [{
  id: 'ag-01',
  name: 'المدير العام (Admin)',
  phone: '0550000000',
  email: 'admin@mmo.dz',
  role: 'admin',
  is_active: true,
  created_at: '2025-01-01'
}, {
  id: 'ag-02',
  name: 'يوسف مراقب العمليات',
  phone: '0551112233',
  email: 'youssef@mmo.dz',
  role: 'agent',
  is_active: true,
  created_at: '2026-02-15'
}, {
  id: 'ag-03',
  name: 'سارة خدمة الزبائن',
  phone: '0662223344',
  email: 'sarah@mmo.dz',
  role: 'agent',
  is_active: true,
  created_at: '2026-03-01'
}, {
  id: 'ag-04',
  name: 'بلال دعم السائقين',
  phone: '0773334455',
  email: 'bilel@mmo.dz',
  role: 'agent',
  is_active: true,
  created_at: '2026-05-10'
}];

// =========================================================================
// 🚀 MAIN APPLICATION ROOT COMPONENT
// =========================================================================
function App() {
  // 1. Core Navigation State ('admin' | 'simulator')
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('mmo_view') || 'admin';
  });

  // 2. Active Tab in Admin View
  const [adminTab, setAdminTab] = useState(() => {
    return localStorage.getItem('mmo_admin_tab') || 'drivers';
  });

  // 3. Audio & UI Preferences
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [mapTheme, setMapTheme] = useState('dark');

  // 4. Data State (Stored in localStorage)
  const [drivers, setDrivers] = useState(() => {
    const saved = localStorage.getItem('mmo_drivers');
    return saved ? JSON.parse(saved) : INITIAL_DRIVERS;
  });
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('mmo_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('mmo_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [kycRequests, setKycRequests] = useState(() => {
    const saved = localStorage.getItem('mmo_kyc');
    return saved ? JSON.parse(saved) : INITIAL_KYC;
  });
  const [promos, setPromos] = useState(() => {
    const saved = localStorage.getItem('mmo_promos');
    return saved ? JSON.parse(saved) : INITIAL_PROMOS;
  });
  const [agents, setAgents] = useState(() => {
    const saved = localStorage.getItem('mmo_agents');
    return saved ? JSON.parse(saved) : INITIAL_AGENTS;
  });
  const [settings, setSettings] = useState({
    base_fee: 300,
    per_km_rate: 50,
    min_order_price: 250,
    commission_rate: 15,
    surge_multiplier: 1.0,
    default_debt_limit: 3000
  });

  // 5. Orders Table Filter (From Donut Chart click or Search input)
  const [orderStatusFilter, setOrderStatusFilter] = useState(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // 6. Simulator Specific State
  const [simPickup, setSimPickup] = useState(ALGIERS_COMMUNES[0]); // Grande Poste
  const [simDropoff, setSimDropoff] = useState(ALGIERS_COMMUNES[1]); // Bab Ezzouar
  const [simPackageType, setSimPackageType] = useState('طرد صغير وعاجل');
  const [simNotes, setSimNotes] = useState('يرجى الاتصال بي فور الوصول عند المدخل الرئيسي');
  const [simDriverId, setSimDriverId] = useState('drv-01'); // azer deco
  const [simProgress, setSimProgress] = useState(30); // 30% progress
  const [simActiveOrder, setSimActiveOrder] = useState({
    id: '3a2f1d2e',
    status: 'accepted',
    pickup_address: 'البريد المركزي، الجزائر العاصمة',
    dropoff_address: 'باب الزوار، الجزائر',
    price: 1033.5,
    distance_km: 14.67
  });
  const [simClientLogs, setSimClientLogs] = useState([{
    time: '12:00:15',
    text: 'تم تحديد نقطة الانطلاق: البريد المركزي والوجهة: باب الزوار',
    type: 'info'
  }, {
    time: '12:01:05',
    text: 'تم احتساب السعر التقديري: 1,033.50 DZD (14.67 كم)',
    type: 'info'
  }, {
    time: '12:02:10',
    text: 'تم تأكيد وإرسال الطلب #3a2f1d2e للسائقين القريبين 📡',
    type: 'info'
  }, {
    time: '12:02:35',
    text: 'السائق azer deco قبل طلبك بنجاح وهو في طريقه إليك 🛵',
    type: 'success'
  }]);
  const [simDriverLogs, setSimDriverLogs] = useState([{
    time: '11:58:00',
    text: 'تسجيل الدخول وبدء حالة التواجد المباشر (En ligne 🟢)',
    type: 'info'
  }, {
    time: '12:02:30',
    text: 'تنبيه طلب جديد: البريد المركزي ➡️ باب الزوار (1,033.50 DZD)',
    type: 'warning'
  }, {
    time: '12:02:35',
    text: 'تم قبول الطلب #3a2f1d2e والتحرك نحو الزبون',
    type: 'success'
  }, {
    time: '12:04:10',
    text: 'المسافة إلى الزبون: 1.2 كم | الوقت المتوقع: 3 دقائق',
    type: 'info'
  }]);
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);

  // 7. Modals State
  const [modalEditPrice, setModalEditPrice] = useState({
    open: false,
    orderId: '',
    currentPrice: 0
  });
  const [modalApplyPromo, setModalApplyPromo] = useState({
    open: false,
    orderId: '',
    currentPrice: 0
  });
  const [modalInspectKYC, setModalInspectKYC] = useState({
    open: false,
    request: null
  });
  const [modalAddDriver, setModalAddDriver] = useState(false);
  const [modalAddClient, setModalAddClient] = useState(false);
  const [modalAddAgent, setModalAddAgent] = useState(false);
  const [modalRechargeWallet, setModalRechargeWallet] = useState({
    open: false,
    driver: null
  });
  const [modalConfirmDelete, setModalConfirmDelete] = useState({
    open: false,
    title: '',
    itemName: '',
    itemType: '',
    itemIcon: '🗑️',
    description: '',
    onConfirm: null
  });

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('mmo_view', currentView);
  }, [currentView]);
  useEffect(() => {
    localStorage.setItem('mmo_admin_tab', adminTab);
  }, [adminTab]);
  useEffect(() => {
    localStorage.setItem('mmo_drivers', JSON.stringify(drivers));
  }, [drivers]);
  useEffect(() => {
    localStorage.setItem('mmo_clients', JSON.stringify(clients));
  }, [clients]);
  useEffect(() => {
    localStorage.setItem('mmo_orders', JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    localStorage.setItem('mmo_kyc', JSON.stringify(kycRequests));
  }, [kycRequests]);
  useEffect(() => {
    localStorage.setItem('mmo_promos', JSON.stringify(promos));
  }, [promos]);
  useEffect(() => {
    localStorage.setItem('mmo_agents', JSON.stringify(agents));
  }, [agents]);

  // Computed KPIs
  const kpis = useMemo(() => {
    const deliveredOrders = orders.filter(o => o.status === 'delivered');
    const gmv = deliveredOrders.reduce((acc, o) => acc + (Number(o.total_price) || 0), 0);
    const commission = gmv * (settings.commission_rate / 100);
    const onlineDriversCount = drivers.filter(d => d.is_online).length;
    const pendingKycCount = kycRequests.filter(k => k.status === 'pending').length;
    return {
      gmv: gmv + 284500,
      // include cumulative GMV
      deliveredCount: deliveredOrders.length + 138,
      commission: commission + 42675,
      totalDrivers: drivers.length,
      onlineDrivers: onlineDriversCount,
      totalClients: clients.length + 59,
      pendingKyc: pendingKycCount,
      totalAgents: agents.length
    };
  }, [orders, drivers, clients, kycRequests, agents, settings]);

  // Order status breakdown for Donut Chart
  const orderStats = useMemo(() => {
    const map = {
      delivered: 0,
      pending: 0,
      in_transit: 0,
      accepted: 0,
      picked_up: 0,
      cancelled: 0
    };
    orders.forEach(o => {
      if (map[o.status] !== undefined) map[o.status]++;else map[o.status] = 1;
    });
    const total = orders.length;
    return {
      total,
      delivered: map.delivered || 0,
      pending: map.pending || 0,
      inTransit: (map.in_transit || 0) + (map.accepted || 0) + (map.picked_up || 0),
      cancelled: map.cancelled || 0
    };
  }, [orders]);

  // Current Selected Simulator Driver
  const currentSimDriver = useMemo(() => {
    return drivers.find(d => d.id === simDriverId) || drivers[0];
  }, [drivers, simDriverId]);

  // Simulator dynamic path
  const simPathPoints = useMemo(() => {
    return interpolatePath(simPickup.coords, simDropoff.coords, 60);
  }, [simPickup, simDropoff]);

  // Current moving motorcycle coordinate based on simProgress (0 to 100)
  const currentSimBikeCoord = useMemo(() => {
    if (!simPathPoints.length) return simPickup.coords;
    const index = Math.min(simPathPoints.length - 1, Math.max(0, Math.floor(simProgress / 100 * (simPathPoints.length - 1))));
    return simPathPoints[index];
  }, [simPathPoints, simProgress]);

  // Dynamic price calculation in simulator
  const simDistanceKm = useMemo(() => {
    return getDistanceKm(simPickup.coords, simDropoff.coords);
  }, [simPickup, simDropoff]);
  const simCalculatedPrice = useMemo(() => {
    const base = settings.base_fee;
    const distanceFare = simDistanceKm * settings.per_km_rate;
    return Number((base + distanceFare).toFixed(2));
  }, [simDistanceKm, settings]);

  // ⚡ 1-Click Complete Scenario Runner (Automated Interactive Simulation)
  const runOneClickScenario = () => {
    if (isAutoSimulating) return;
    setIsAutoSimulating(true);
    playAudioTone('order', soundEnabled);
    const newOrderId = Math.random().toString(16).slice(2, 10);
    const nowTime = new Date().toLocaleTimeString('ar-DZ', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Step 1: Client Places Order
    setSimActiveOrder({
      id: newOrderId,
      status: 'pending',
      pickup_address: simPickup.name,
      dropoff_address: simDropoff.name,
      price: simCalculatedPrice,
      distance_km: simDistanceKm
    });
    setSimProgress(0);
    setSimClientLogs(prev => [{
      time: nowTime,
      text: `⚡ تشغيل السيناريو الكامل 1-Clic: إنشاء طلب جديد #${newOrderId}`,
      type: 'warning'
    }, ...prev]);
    setSimDriverLogs(prev => [{
      time: nowTime,
      text: `تنبيه رادار: طلب توصيل جديد متاح من ${simPickup.shortName} إلى ${simDropoff.shortName}`,
      type: 'warning'
    }, ...prev]);

    // Step 2: Driver Accepts after 1.2s
    setTimeout(() => {
      setSimActiveOrder(curr => ({
        ...curr,
        status: 'accepted'
      }));
      setSimProgress(15);
      playAudioTone('action', soundEnabled);
      setSimDriverLogs(prev => [{
        time: new Date().toLocaleTimeString('ar-DZ'),
        text: `السائق ${currentSimDriver.name} قبل الطلب #${newOrderId} ويتجه لنقطة الاستلام`,
        type: 'success'
      }, ...prev]);
    }, 1200);

    // Step 3: Driver Arrives & Picks Up Parcel after 3s
    setTimeout(() => {
      setSimActiveOrder(curr => ({
        ...curr,
        status: 'picked_up'
      }));
      setSimProgress(35);
      playAudioTone('action', soundEnabled);
      setSimClientLogs(prev => [{
        time: new Date().toLocaleTimeString('ar-DZ'),
        text: `تم استلام الطرد من الزبون بنجاح 📦 والسائق في الطريق نحو الوجهة`,
        type: 'info'
      }, ...prev]);
    }, 3000);

    // Step 4: Progress Animation (35% -> 85%) after 4.8s
    setTimeout(() => {
      setSimActiveOrder(curr => ({
        ...curr,
        status: 'in_transit'
      }));
      setSimProgress(85);
    }, 4800);

    // Step 5: Arrived & Cash Delivered after 6.5s
    setTimeout(() => {
      setSimActiveOrder(curr => ({
        ...curr,
        status: 'delivered'
      }));
      setSimProgress(100);
      playAudioTone('delivered', soundEnabled);

      // Credit driver wallet
      const driverShare = simCalculatedPrice * 0.85;
      setDrivers(curr => curr.map(d => d.id === currentSimDriver.id ? {
        ...d,
        wallet_balance: d.wallet_balance + driverShare,
        total_deliveries: d.total_deliveries + 1
      } : d));

      // Add to orders
      setOrders(curr => [{
        id: newOrderId,
        client_name: 'زبون محاكي (Direct)',
        client_phone: '0550000000',
        driver_name: currentSimDriver.name,
        driver_phone: currentSimDriver.phone,
        pickup_address: simPickup.name,
        dropoff_address: simDropoff.name,
        pickup_lat: simPickup.coords[0],
        pickup_lng: simPickup.coords[1],
        dropoff_lat: simDropoff.coords[0],
        dropoff_lng: simDropoff.coords[1],
        distance_km: simDistanceKm,
        total_price: simCalculatedPrice,
        discount_amount: 0,
        status: 'delivered',
        created_at: new Date().toISOString().slice(0, 16).replace('T', ' ')
      }, ...curr]);
      setSimClientLogs(prev => [{
        time: new Date().toLocaleTimeString('ar-DZ'),
        text: `🎉 تم تسليم الطرد بنجاح ودفع ${simCalculatedPrice.toLocaleString()} DZD كاش! شكراً لاختياركم موتو دليفري`,
        type: 'success'
      }, ...prev]);
      setSimDriverLogs(prev => [{
        time: new Date().toLocaleTimeString('ar-DZ'),
        text: `✅ تم تأكيد التسليم كاش! رصيد المحفظة (+${driverShare.toFixed(2)} DZD)`,
        type: 'success'
      }, ...prev]);

      // Confetti Celebration!
      if (typeof window.confetti === 'function') {
        window.confetti({
          particleCount: 80,
          spread: 70,
          origin: {
            y: 0.6
          }
        });
      }
      setIsAutoSimulating(false);
    }, 6500);
  };

  // Handle order manual status transition
  const handleStepOrderStatus = orderId => {
    setOrders(curr => curr.map(o => {
      if (o.id !== orderId) return o;
      const statusOrder = ['pending', 'accepted', 'picked_up', 'in_transit', 'delivered'];
      const currIdx = statusOrder.indexOf(o.status);
      if (currIdx >= 0 && currIdx < statusOrder.length - 1) {
        const nextStatus = statusOrder[currIdx + 1];
        playAudioTone(nextStatus === 'delivered' ? 'delivered' : 'action', soundEnabled);
        return {
          ...o,
          status: nextStatus
        };
      }
      return o;
    }));
  };

  // Custom High-Quality Confirmation Modal Trigger
  const requestDeleteConfirmation = ({ title, itemName, itemType, itemIcon, description, onConfirm }) => {
    setModalConfirmDelete({
      open: true,
      title: title || 'تأكيد الحذف نهائياً',
      itemName: itemName || '',
      itemType: itemType || '',
      itemIcon: itemIcon || '🗑️',
      description: description || 'هل أنت متأكد من تنفيذ هذا الإجراء؟ لا يمكن التراجع عنه لاحقاً.',
      onConfirm
    });
  };

  // Handle agent deletion
  const handleDeleteAgent = ag => {
    requestDeleteConfirmation({
      title: 'حذف حساب الوكيل',
      itemName: ag.name,
      itemIcon: '🛡️',
      itemType: 'وكيل عمليات',
      description: `هل أنت متأكد من حذف حساب الوكيل "${ag.name}" (${ag.role === 'admin' ? 'مدير عام' : 'وكيل عمليات'})؟ سيتم إلغاء صلاحياته والوصول إلى لوحة التحكم فوراً.`,
      onConfirm: () => {
        setAgents(curr => curr.filter(x => x.id !== ag.id));
      }
    });
  };

  // Handle driver deletion
  const handleDeleteDriver = d => {
    requestDeleteConfirmation({
      title: 'حذف السائق من الأسطول',
      itemName: `${d.name} (${d.vehicle_model})`,
      itemIcon: '🛵',
      itemType: 'سائق دليفري',
      description: `هل أنت متأكد من حذف السائق "${d.name}" ذو اللوحة [${d.vehicle_plate}] نهائياً من المنصة وسجل الأسطول؟`,
      onConfirm: () => {
        setDrivers(curr => curr.filter(x => x.id !== d.id));
      }
    });
  };

  // Handle client deletion
  const handleDeleteClient = c => {
    requestDeleteConfirmation({
      title: 'حذف حساب الزبون',
      itemName: `${c.name} (${c.phone})`,
      itemIcon: '👥',
      itemType: 'زبون / عميل',
      description: `هل أنت متأكد من حذف حساب الزبون "${c.name}" نهائياً من سجل العملاء؟`,
      onConfirm: () => {
        setClients(curr => curr.filter(x => x.id !== c.id));
      }
    });
  };

  // Handle order deletion
  const handleDeleteOrder = orderId => {
    const o = orders.find(x => x.id === orderId);
    const orderCode = orderId.slice(0, 8);
    requestDeleteConfirmation({
      title: 'حذف الطلب نهائياً',
      itemName: `الطلب #${orderCode}${o ? ' — ' + o.customer_name : ''}`,
      itemIcon: '📦',
      itemType: 'طلب توصيل',
      description: 'هل أنت متأكد من حذف هذا الطلب نهائياً من سجل الطلبات والتقارير المالية للمنصة؟',
      onConfirm: () => {
        setOrders(curr => curr.filter(o => o.id !== orderId));
      }
    });
  };

  // Save edited price
  const handleSavePrice = newPrice => {
    if (newPrice <= 0 || isNaN(newPrice)) return;
    setOrders(curr => curr.map(o => o.id === modalEditPrice.orderId ? {
      ...o,
      total_price: newPrice
    } : o));
    setModalEditPrice({
      open: false,
      orderId: '',
      currentPrice: 0
    });
  };

  // Save promo on order
  const handleApplyPromo = (code, directAmount) => {
    setOrders(curr => curr.map(o => {
      if (o.id !== modalApplyPromo.orderId) return o;
      let discount = 0;
      let promoCodeApplied = code.toUpperCase();
      if (promoCodeApplied) {
        const promo = promos.find(p => p.code === promoCodeApplied && p.is_active);
        if (promo) {
          discount = promo.discount_type === 'percentage' ? Math.min(o.total_price * promo.discount_value / 100, promo.max_discount || 9999) : promo.discount_value;
        } else {
          discount = 100;
        }
      } else if (directAmount > 0) {
        discount = directAmount;
        promoCodeApplied = 'REDUCTION';
      }
      const newPrice = Math.max(0, o.total_price - discount);
      return {
        ...o,
        total_price: newPrice,
        discount_amount: (o.discount_amount || 0) + discount,
        promo_code: promoCodeApplied
      };
    }));
    setModalApplyPromo({
      open: false,
      orderId: '',
      currentPrice: 0
    });
  };

  // Filtered orders for table
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesStatus = !orderStatusFilter || o.status === orderStatusFilter;
      const q = orderSearchQuery.toLowerCase().trim();
      const matchesSearch = !q || o.id.toLowerCase().includes(q) || o.client_name.toLowerCase().includes(q) || o.driver_name && o.driver_name.toLowerCase().includes(q) || o.pickup_address.toLowerCase().includes(q) || o.dropoff_address.toLowerCase().includes(q) || o.promo_code && o.promo_code.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, orderStatusFilter, orderSearchQuery]);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans"
  }, /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-40 glass-card border-b border-slate-800/80 px-4 lg:px-6 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-500/20 border border-amber-300/40"
  }, /*#__PURE__*/React.createElement(Icons.Bike, {
    size: 24
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "font-extrabold text-base lg:text-lg text-slate-100 leading-tight"
  }, "\u0644\u0648\u062D\u0629 \u0625\u062F\u0627\u0631\u0629 \u0645\u0646\u0635\u0629 \u0645\u0648\u062A\u0648 \u062F\u0644\u064A\u0641\u0631\u064A"), /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
  }, "\uD83C\uDDE9\uD83C\uDDFF \u0627\u0644\u062C\u0632\u0627\u0626\u0631 DZ")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "\u0646\u0638\u0627\u0645 \u0627\u0644\u0645\u0631\u0627\u0642\u0628\u0629 \u0648\u0627\u0644\u062A\u062D\u0643\u0645 \u0627\u0644\u0644\u062D\u0638\u064A \u0648\u062A\u0648\u062C\u064A\u0647 \u0627\u0644\u0625\u0631\u0633\u0627\u0644\u064A\u0627\u062A (Dispatch & Tracking)"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping"
  }), /*#__PURE__*/React.createElement("span", null, "\u0633\u064A\u0631\u0641\u0631 \u0645\u062A\u0635\u0644 \uD83D\uDFE2")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentView('admin'),
    className: `px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${currentView === 'admin' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black' : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700/60'}`
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC51"), /*#__PURE__*/React.createElement("span", null, "\u0644\u0648\u062D\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0629")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCurrentView('simulator'),
    className: `px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${currentView === 'simulator' ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/25 font-black' : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700/60'}`
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC7E"), /*#__PURE__*/React.createElement("span", null, "\u0645\u062D\u0627\u0643\u064A \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A (Simulateur)"), /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-sky-400 animate-pulse"
  })), /*#__PURE__*/React.createElement("a", {
    href: "/client.html",
    target: "_blank",
    className: "hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700/60 text-xs font-bold transition",
    title: "\u0641\u062A\u062D \u0648\u0627\u062C\u0647\u0629 \u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0632\u0628\u0648\u0646 \u0641\u064A \u0646\u0627\u0641\u0630\u0629 \u0645\u0633\u062A\u0642\u0644\u0629"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCF1"), /*#__PURE__*/React.createElement("span", null, "\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0632\u0628\u0648\u0646 (Client)")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSoundEnabled(!soundEnabled),
    className: `p-2 rounded-xl border text-xs transition ${soundEnabled ? 'bg-slate-850 border-slate-700 text-amber-400 hover:bg-slate-800' : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'}`,
    title: soundEnabled ? 'كتم التنبيهات الصوتية' : 'تفعيل التنبيهات الصوتية'
  }, soundEnabled ? /*#__PURE__*/React.createElement(Icons.Volume2, {
    size: 16
  }) : /*#__PURE__*/React.createElement(Icons.VolumeX, {
    size: 16
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setNotificationDrawerOpen(!notificationDrawerOpen),
    className: "relative p-2 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs transition",
    title: "\u0633\u062C\u0644 \u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u062D\u064A\u0629"
  }, /*#__PURE__*/React.createElement(Icons.Bell, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center"
  }, "4")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playAudioTone('action', soundEnabled);
    },
    className: "p-2 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-400 text-xs transition",
    title: "\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0644\u062D\u0638\u064A\u0627\u064B"
  }, /*#__PURE__*/React.createElement(Icons.RefreshCw, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:flex items-center gap-2.5 pr-2 border-r border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/20 to-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-sm font-black"
  }, "\uD83D\uDC51"), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-bold text-slate-100 leading-tight"
  }, "\u0627\u0644\u0645\u062F\u064A\u0631 \u0627\u0644\u0639\u0627\u0645 (Admin)"), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-amber-400 font-semibold font-mono"
  }, "\u0645\u062F\u064A\u0631 \u0639\u0627\u0645 (Admin)"))))), notificationDrawerOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex justify-start bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-sm bg-slate-900 border-l border-slate-800 shadow-2xl p-5 flex flex-col h-full"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-4 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 font-bold text-sm text-slate-100"
  }, /*#__PURE__*/React.createElement(Icons.Bell, {
    size: 18,
    className: "text-amber-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0648\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u062D\u064A\u0629")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setNotificationDrawerOpen(false),
    className: "text-slate-400 hover:text-white text-lg font-bold"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto py-4 space-y-3"
  }, [{
    time: 'منذ دقيقة',
    title: 'طلب توصيل جديد',
    desc: 'البريد المركزي ➡️ باب الزوار بمبلغ 1,033.50 DZD',
    icon: '🛵',
    color: 'text-amber-400'
  }, {
    time: 'منذ 5 دقائق',
    title: 'السائق azer deco متصل',
    desc: 'تم تحديث التواجد المباشر برادار العاصمة',
    icon: '🟢',
    color: 'text-emerald-400'
  }, {
    time: 'منذ 15 دقيقة',
    title: 'طلب توثيق جديد KYC',
    desc: 'السائق وليد عثماني قدم رخصة سياقة بيومترية',
    icon: '📑',
    color: 'text-sky-400'
  }, {
    time: 'منذ 28 دقيقة',
    title: 'اكتمال توصيل كاش',
    desc: 'تم تسليم الطلب #9b67af7d واقتطاع 15% عمولة المنصة',
    icon: '✅',
    color: 'text-emerald-400'
  }].map((notif, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "p-3 rounded-xl bg-slate-850/80 border border-slate-800 hover:border-slate-700 transition"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-xs mb-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: `font-bold flex items-center gap-1 ${notif.color}`
  }, /*#__PURE__*/React.createElement("span", null, notif.icon), " ", notif.title), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-500 font-mono"
  }, notif.time)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, notif.desc)))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setNotificationDrawerOpen(false),
    className: "w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
  }, "\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u062A\u0646\u0628\u064A\u0647\u0627\u062A"))), currentView === 'admin' ? /*#__PURE__*/React.createElement(AdminDashboardView, {
    kpis: kpis,
    orderStats: orderStats,
    drivers: drivers,
    setDrivers: setDrivers,
    clients: clients,
    setClients: setClients,
    orders: filteredOrders,
    setOrders: setOrders,
    kycRequests: kycRequests,
    setKycRequests: setKycRequests,
    promos: promos,
    setPromos: setPromos,
    agents: agents,
    setAgents: setAgents,
    settings: settings,
    setSettings: setSettings,
    adminTab: adminTab,
    setAdminTab: setAdminTab,
    orderStatusFilter: orderStatusFilter,
    setOrderStatusFilter: setOrderStatusFilter,
    orderSearchQuery: orderSearchQuery,
    setOrderSearchQuery: setOrderSearchQuery,
    mapTheme: mapTheme,
    setMapTheme: setMapTheme,
    handleStepOrderStatus: handleStepOrderStatus,
    handleDeleteOrder: handleDeleteOrder,
    handleDeleteDriver: handleDeleteDriver,
    handleDeleteClient: handleDeleteClient,
    handleDeleteAgent: handleDeleteAgent,
    openEditPriceModal: (orderId, currentPrice) => setModalEditPrice({
      open: true,
      orderId,
      currentPrice
    }),
    openApplyPromoModal: (orderId, currentPrice) => setModalApplyPromo({
      open: true,
      orderId,
      currentPrice
    }),
    openInspectKYCModal: request => setModalInspectKYC({
      open: true,
      request
    }),
    openAddDriverModal: () => setModalAddDriver(true),
    openAddClientModal: () => setModalAddClient(true),
    openAddAgentModal: () => setModalAddAgent(true),
    openRechargeWalletModal: driver => setModalRechargeWallet({
      open: true,
      driver
    }),
    switchToSimulator: () => setCurrentView('simulator')
  }) : /*#__PURE__*/React.createElement(SimulatorView, {
    drivers: drivers,
    simDriverId: simDriverId,
    setSimDriverId: setSimDriverId,
    currentSimDriver: currentSimDriver,
    simPickup: simPickup,
    setSimPickup: setSimPickup,
    simDropoff: simDropoff,
    setSimDropoff: setSimDropoff,
    simPackageType: simPackageType,
    setSimPackageType: setSimPackageType,
    simNotes: simNotes,
    setSimNotes: setSimNotes,
    simDistanceKm: simDistanceKm,
    simCalculatedPrice: simCalculatedPrice,
    simProgress: simProgress,
    setSimProgress: setSimProgress,
    simPathPoints: simPathPoints,
    currentSimBikeCoord: currentSimBikeCoord,
    simActiveOrder: simActiveOrder,
    simClientLogs: simClientLogs,
    simDriverLogs: simDriverLogs,
    runOneClickScenario: runOneClickScenario,
    isAutoSimulating: isAutoSimulating,
    mapTheme: mapTheme,
    setMapTheme: setMapTheme,
    switchToAdmin: () => setCurrentView('admin'),
    onPickupParcel: () => {
      setSimActiveOrder(curr => ({
        ...curr,
        status: 'picked_up'
      }));
      playAudioTone('action', soundEnabled);
      setSimClientLogs(prev => [{
        time: new Date().toLocaleTimeString('ar-DZ'),
        text: 'تم استلام الطرد من الزبون 📦 وهو في الطريق',
        type: 'info'
      }, ...prev]);
    },
    onDeliverCash: () => {
      setSimActiveOrder(curr => ({
        ...curr,
        status: 'delivered'
      }));
      setSimProgress(100);
      playAudioTone('delivered', soundEnabled);
      if (typeof window.confetti === 'function') {
        window.confetti({
          particleCount: 70,
          spread: 60
        });
      }
      setSimClientLogs(prev => [{
        time: new Date().toLocaleTimeString('ar-DZ'),
        text: `تم تسليم الطرد كاش واستلام المبلغ ${simCalculatedPrice.toLocaleString()} DZD ✅`,
        type: 'success'
      }, ...prev]);
    }
  }), modalEditPrice.open && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-black text-base text-slate-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Edit3, {
    size: 18,
    className: "text-amber-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u062A\u0639\u062F\u064A\u0644 \u0633\u0639\u0631 \u0627\u0644\u0637\u0644\u0628 #", modalEditPrice.orderId.slice(0, 8))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalEditPrice({
      open: false,
      orderId: '',
      currentPrice: 0
    }),
    className: "text-slate-400 hover:text-white"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "my-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-xl bg-slate-850 border border-slate-800 text-xs flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062D\u0627\u0644\u064A:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-amber-400"
  }, modalEditPrice.currentPrice.toFixed(2), " DZD")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1.5"
  }, "\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u062C\u062F\u064A\u062F \u0627\u0644\u0645\u0637\u0644\u0648\u0628 (DZD):"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "any",
    min: "0",
    defaultValue: modalEditPrice.currentPrice,
    id: "input-new-order-price",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-4 py-2.5 text-emerald-400 font-mono font-bold text-lg focus:outline-none focus:border-amber-400"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end gap-3 pt-3 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalEditPrice({
      open: false,
      orderId: '',
      currentPrice: 0
    }),
    className: "px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200"
  }, "\u0625\u0644\u063A\u0627\u0621"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const input = document.getElementById('input-new-order-price');
      if (input) handleSavePrice(parseFloat(input.value));
    },
    className: "px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20"
  }, "\u062D\u0641\u0638 \u0648\u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0633\u0639\u0631 \u2705")))), modalApplyPromo.open && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-black text-base text-slate-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Tag, {
    size: 18,
    className: "text-emerald-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u062A\u0637\u0628\u064A\u0642 \u0643\u0648\u062F \u062E\u0635\u0645 \u0623\u0648 \u062A\u062E\u0641\u064A\u0636 \u0639\u0644\u0649 \u0627\u0644\u0637\u0644\u0628")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalApplyPromo({
      open: false,
      orderId: '',
      currentPrice: 0
    }),
    className: "text-slate-400 hover:text-white"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "my-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-xl bg-slate-850 border border-slate-800 text-xs flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u0633\u0639\u0631 \u0627\u0644\u0637\u0644\u0628 \u0627\u0644\u062D\u0627\u0644\u064A:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-slate-200"
  }, modalApplyPromo.currentPrice.toFixed(2), " DZD")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1.5"
  }, "\u0643\u0648\u062F \u0627\u0644\u062E\u0635\u0645 \u0627\u0644\u062A\u0631\u0648\u064A\u062C\u064A (\u0645\u062B\u0627\u0644: BIENVENUE \u0623\u0648 RAMADAN20):"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "BIENVENUE",
    id: "input-promo-code",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-4 py-2.5 text-amber-400 font-mono font-bold text-sm uppercase focus:outline-none focus:border-amber-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-500 font-bold bg-slate-900 px-3"
  }, "\u0623\u0648 \u062A\u062E\u0641\u064A\u0636 \u064A\u062F\u0648\u064A"), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 -z-10 flex items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full border-t border-slate-800"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1.5"
  }, "\u0645\u0628\u0644\u063A \u062A\u062E\u0641\u064A\u0636 \u0645\u0628\u0627\u0634\u0631 (DZD):"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    placeholder: "100",
    id: "input-promo-amount",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-4 py-2.5 text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-amber-400"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end gap-3 pt-3 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalApplyPromo({
      open: false,
      orderId: '',
      currentPrice: 0
    }),
    className: "px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200"
  }, "\u0625\u0644\u063A\u0627\u0621"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const codeInput = document.getElementById('input-promo-code');
      const amtInput = document.getElementById('input-promo-amount');
      handleApplyPromo(codeInput?.value || '', parseFloat(amtInput?.value || '0'));
    },
    className: "px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20"
  }, "\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u062E\u0635\u0645 \uD83C\uDFF7\uFE0F")))), modalInspectKYC.open && modalInspectKYC.request && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-150"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-black text-base text-slate-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.ShieldCheck, {
    size: 20,
    className: "text-sky-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u0641\u062D\u0635 \u0648\u062A\u062F\u0642\u064A\u0642 \u0648\u062B\u0627\u0626\u0642 \u0627\u0644\u0633\u0627\u0626\u0642 (KYC Biom\xE9trique DZ)")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalInspectKYC({
      open: false,
      request: null
    }),
    className: "text-slate-400 hover:text-white"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "my-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-gradient-to-r from-slate-850 to-slate-800 border border-slate-700/80 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-slate-100 text-sm"
  }, modalInspectKYC.request.driver_name), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30"
  }, modalInspectKYC.request.vehicle_plate)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-xs text-slate-400 pt-2 border-t border-slate-700/60 font-mono"
  }, /*#__PURE__*/React.createElement("div", null, "\u0627\u0644\u0647\u0627\u062A\u0641: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-200"
  }, modalInspectKYC.request.phone)), /*#__PURE__*/React.createElement("div", null, "\u0627\u0644\u0645\u0631\u0643\u0628\u0629: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-200"
  }, modalInspectKYC.request.vehicle_model)), /*#__PURE__*/React.createElement("div", null, "\u0631\u0642\u0645 \u0627\u0644\u0631\u062E\u0635\u0629: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-sky-400"
  }, modalInspectKYC.request.license_number)), /*#__PURE__*/React.createElement("div", null, "\u0627\u0644\u062A\u0627\u0631\u064A\u062E: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-300"
  }, modalInspectKYC.request.submission_date)))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-slate-950 border border-sky-500/30 text-xs space-y-2 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-2 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-sky-400 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDDE9\uD83C\uDDFF"), " \u0631\u062E\u0635\u0629 \u0627\u0644\u0633\u064A\u0627\u0642\u0629 \u0627\u0644\u0628\u064A\u0648\u0645\u062A\u0631\u064A\u0629 \u2014 \u0627\u0644\u062C\u0645\u0647\u0648\u0631\u064A\u0629 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u064A\u0629 \u0627\u0644\u062F\u064A\u0645\u0642\u0631\u0627\u0637\u064A\u0629 \u0627\u0644\u0634\u0639\u0628\u064A\u0629"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-emerald-400 font-bold"
  }, "\u0635\u0627\u0644\u062D\u0629 \u0648\u0633\u0627\u0631\u064A\u0629 \u2705")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 py-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-20 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-slate-400 text-2xl"
  }, "\uD83D\uDC64"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-slate-300 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, "\u0627\u0644\u0635\u0646\u0641: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-amber-400"
  }, "A1 / A (\u062F\u0631\u0627\u062C\u0629 \u0646\u0627\u0631\u064A\u0629)")), /*#__PURE__*/React.createElement("div", null, "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-100"
  }, modalInspectKYC.request.driver_name)), /*#__PURE__*/React.createElement("div", null, "\u0648\u0644\u0627\u064A\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-100"
  }, "\u0627\u0644\u062C\u0632\u0627\u0626\u0631 (16)")), /*#__PURE__*/React.createElement("div", null, "\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0631\u0645\u0627\u062F\u064A\u0629 (Carte Grise): ", /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400 font-bold"
  }, "\u0645\u0637\u0627\u0628\u0642\u0629 \u2705")))))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pt-3 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setKycRequests(curr => curr.map(k => k.id === modalInspectKYC.request.id ? {
        ...k,
        status: 'rejected'
      } : k));
      setModalInspectKYC({
        open: false,
        request: null
      });
    },
    className: "px-4 py-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-bold transition"
  }, "\u0631\u0641\u0636 \u0627\u0644\u0637\u0644\u0628 \u274C"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setKycRequests(curr => curr.map(k => k.id === modalInspectKYC.request.id ? {
        ...k,
        status: 'approved'
      } : k));
      setDrivers(curr => curr.map(d => d.id === modalInspectKYC.request.driver_id ? {
        ...d,
        kyc_status: 'approved'
      } : d));
      setModalInspectKYC({
        open: false,
        request: null
      });
      playAudioTone('delivered', soundEnabled);
    },
    className: "px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 transition"
  }, "\u0627\u0639\u062A\u0645\u0627\u062F \u0648\u0642\u0628\u0648\u0644 \u0627\u0644\u0633\u0627\u0626\u0642 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u2705")))), modalRechargeWallet.open && modalRechargeWallet.driver && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-black text-base text-slate-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Wallet, {
    size: 18,
    className: "text-amber-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u0634\u062D\u0646 \u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0633\u0627\u0626\u0642: ", modalRechargeWallet.driver.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalRechargeWallet({
      open: false,
      driver: null
    }),
    className: "text-slate-400 hover:text-white"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "my-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-xl bg-slate-850 border border-slate-800 text-xs flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u0627\u0644\u0631\u0635\u064A\u062F \u0627\u0644\u062D\u0627\u0644\u064A:"), /*#__PURE__*/React.createElement("span", {
    className: `font-mono font-bold ${modalRechargeWallet.driver.wallet_balance < 0 ? 'text-rose-400' : 'text-emerald-400'}`
  }, modalRechargeWallet.driver.wallet_balance.toFixed(2), " DZD")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1.5"
  }, "\u0645\u0628\u0644\u063A \u0627\u0644\u0634\u062D\u0646 \u0627\u0644\u0645\u0627\u0644\u064A (DZD):"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    defaultValue: 1000,
    id: "input-recharge-amount",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-4 py-2.5 text-emerald-400 font-mono font-bold text-lg focus:outline-none focus:border-amber-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, [500, 1000, 2000, 5000].map(amt => /*#__PURE__*/React.createElement("button", {
    key: amt,
    type: "button",
    onClick: () => {
      const input = document.getElementById('input-recharge-amount');
      if (input) input.value = String(amt);
    },
    className: "flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono font-bold text-slate-300"
  }, "+", amt)))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end gap-3 pt-3 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalRechargeWallet({
      open: false,
      driver: null
    }),
    className: "px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200"
  }, "\u0625\u0644\u063A\u0627\u0621"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const input = document.getElementById('input-recharge-amount');
      const amt = parseFloat(input?.value || '0');
      if (amt > 0) {
        setDrivers(curr => curr.map(d => d.id === modalRechargeWallet.driver.id ? {
          ...d,
          wallet_balance: d.wallet_balance + amt
        } : d));
        setModalRechargeWallet({
          open: false,
          driver: null
        });
        playAudioTone('delivered', soundEnabled);
      }
    },
    className: "px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20"
  }, "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0634\u062D\u0646 \u0627\u0644\u0641\u0648\u0631\u064A \uD83D\uDCB3")))), modalAddDriver && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-black text-base text-slate-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Bike, {
    size: 18,
    className: "text-amber-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0627\u062C / \u0633\u0627\u0626\u0642 \u062C\u062F\u064A\u062F \u0644\u0644\u0623\u0633\u0637\u0648\u0644")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalAddDriver(false),
    className: "text-slate-400 hover:text-white"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "my-4 space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644:"), /*#__PURE__*/React.createElement("input", {
    id: "new-driver-name",
    type: "text",
    placeholder: "\u0645\u062B\u0627\u0644: \u064A\u0648\u0646\u0633 \u0628\u0648\u0639\u0644\u0627\u0645",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641:"), /*#__PURE__*/React.createElement("input", {
    id: "new-driver-phone",
    type: "text",
    placeholder: "0550123456",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-amber-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0637\u0631\u0627\u0632 \u0627\u0644\u062F\u0631\u0627\u062C\u0629:"), /*#__PURE__*/React.createElement("input", {
    id: "new-driver-bike",
    type: "text",
    placeholder: "SYM Symphony ST 150",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0631\u0642\u0645 \u0627\u0644\u0644\u0648\u062D\u0629 (Matricule):"), /*#__PURE__*/React.createElement("input", {
    id: "new-driver-plate",
    type: "text",
    placeholder: "16-77889-23",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-amber-400"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end gap-3 pt-3 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalAddDriver(false),
    className: "px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200"
  }, "\u0625\u0644\u063A\u0627\u0621"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const name = document.getElementById('new-driver-name')?.value;
      const phone = document.getElementById('new-driver-phone')?.value;
      const bike = document.getElementById('new-driver-bike')?.value;
      const plate = document.getElementById('new-driver-plate')?.value;
      if (name && phone) {
        setDrivers(curr => [{
          id: `drv-${Date.now()}`,
          name,
          phone,
          vehicle_model: bike || 'SYM Symphony 150',
          vehicle_plate: plate || '16-12345-24',
          wallet_balance: 1000,
          rating: 5.0,
          is_online: true,
          kyc_status: 'approved',
          lat: 36.7538,
          lng: 3.0588,
          total_deliveries: 0,
          joined_date: new Date().toISOString().slice(0, 10)
        }, ...curr]);
        setModalAddDriver(false);
      }
    },
    className: "px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20"
  }, "\u062D\u0641\u0638 \u0648\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0633\u0627\u0626\u0642 \u2705")))), modalAddClient && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-black text-base text-slate-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Users, {
    size: 18,
    className: "text-sky-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u0625\u0636\u0627\u0641\u0629 \u0632\u0628\u0648\u0646 \u062C\u062F\u064A\u062F \u0644\u0644\u0645\u0646\u0635\u0629")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalAddClient(false),
    className: "text-slate-400 hover:text-white"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "my-4 space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0627\u0633\u0645 \u0627\u0644\u0632\u0628\u0648\u0646:"), /*#__PURE__*/React.createElement("input", {
    id: "new-client-name",
    type: "text",
    placeholder: "\u0645\u062B\u0627\u0644: \u062D\u0645\u064A\u062F \u0642\u0627\u0633\u0645\u064A",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-sky-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641:"), /*#__PURE__*/React.createElement("input", {
    id: "new-client-phone",
    type: "text",
    placeholder: "0559998877",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-sky-400"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end gap-3 pt-3 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalAddClient(false),
    className: "px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200"
  }, "\u0625\u0644\u063A\u0627\u0621"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const name = document.getElementById('new-client-name')?.value;
      const phone = document.getElementById('new-client-phone')?.value;
      if (name && phone) {
        setClients(curr => [{
          id: `cl-${Date.now()}`,
          name,
          phone,
          total_orders: 0,
          total_spent: 0,
          is_active: true,
          joined_date: new Date().toISOString().slice(0, 10)
        }, ...curr]);
        setModalAddClient(false);
      }
    },
    className: "px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black shadow-lg shadow-sky-500/20"
  }, "\u062D\u0641\u0638 \u0648\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0632\u0628\u0648\u0646 \u2705")))), modalAddAgent && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-black text-base text-slate-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.ShieldCheck, {
    size: 18,
    className: "text-indigo-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u0625\u0636\u0627\u0641\u0629 \u0645\u0634\u0631\u0641 / \u0648\u0643\u064A\u0644 \u062C\u062F\u064A\u062F \u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0639\u0645\u0644")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalAddAgent(false),
    className: "text-slate-400 hover:text-white"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "my-4 space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0627\u0633\u0645 \u0627\u0644\u0648\u0643\u064A\u0644:"), /*#__PURE__*/React.createElement("input", {
    id: "new-agent-name",
    type: "text",
    placeholder: "\u0645\u062B\u0627\u0644: \u062D\u0633\u0627\u0645 \u062F\u0631\u064A\u062F\u064A",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641:"), /*#__PURE__*/React.createElement("input", {
    id: "new-agent-phone",
    type: "text",
    placeholder: "0551239876",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-indigo-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0627\u0644\u0631\u062A\u0628\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645:"), /*#__PURE__*/React.createElement("select", {
    id: "new-agent-role",
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400"
  }, /*#__PURE__*/React.createElement("option", {
    value: "agent"
  }, "\u0648\u0643\u064A\u0644 \u0648\u0645\u0634\u0631\u0641 \u0639\u0645\u0644\u064A\u0627\u062A (Agent)"), /*#__PURE__*/React.createElement("option", {
    value: "admin"
  }, "\u0645\u062F\u064A\u0631 \u0628\u0635\u0644\u0627\u062D\u064A\u0629 \u0643\u0627\u0645\u0644\u0629 (Admin)")))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end gap-3 pt-3 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalAddAgent(false),
    className: "px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-200"
  }, "\u0625\u0644\u063A\u0627\u0621"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const name = document.getElementById('new-agent-name')?.value;
      const phone = document.getElementById('new-agent-phone')?.value;
      const role = document.getElementById('new-agent-role')?.value;
      if (name && phone) {
        setAgents(curr => [{
          id: `ag-${Date.now()}`,
          name,
          phone,
          email: `${name.replace(/\s+/g, '')}@mmo.dz`,
          role: role || 'agent',
          is_active: true,
          created_at: new Date().toISOString().slice(0, 10)
        }, ...curr]);
        setModalAddAgent(false);
      }
    },
    className: "px-5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-black shadow-lg shadow-indigo-500/20"
  }, "\u062D\u0641\u0638 \u0648\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0648\u0643\u064A\u0644 \u2705")))), modalConfirmDelete.open && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-200",
    onClick: () => setModalConfirmDelete(prev => ({
      ...prev,
      open: false
    }))
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-md glass-card rounded-3xl border border-rose-500/35 bg-slate-900/95 p-6 sm:p-7 text-center shadow-2xl shadow-rose-950/60 overflow-hidden transform transition-all duration-200",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -top-20 -left-20 w-44 h-44 bg-rose-500/15 rounded-full blur-3xl pointer-events-none"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute -bottom-20 -right-20 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalConfirmDelete(prev => ({
      ...prev,
      open: false
    })),
    className: "absolute top-4 left-4 p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition text-sm font-bold leading-none",
    title: "\u0625\u063A\u0644\u0627\u0642"
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
    className: "relative mx-auto mb-4 w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-400 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/25"
  }, /*#__PURE__*/React.createElement("span", null, modalConfirmDelete.itemIcon || "\uD83D\uDDD1\uFE0F")), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-black text-slate-100 mb-1"
  }, modalConfirmDelete.title || "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641 \u0646\u0647\u0627\u0626\u064A\u0627\u064B"), /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-bold mb-3"
  }, /*#__PURE__*/React.createElement("span", null, "\u26A0\uFE0F"), /*#__PURE__*/React.createElement("span", null, "\u0625\u062C\u0631\u0627\u0621 \u062D\u0633\u0627\u0633 \u0644\u0627 \u0631\u062C\u0639\u0629 \u0641\u064A\u0647")), modalConfirmDelete.itemName && /*#__PURE__*/React.createElement("div", {
    className: "my-3 py-2.5 px-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 text-sm font-bold text-amber-300 font-mono shadow-inner flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\u00AB"), /*#__PURE__*/React.createElement("span", {
    className: "truncate max-w-[280px]"
  }, modalConfirmDelete.itemName), /*#__PURE__*/React.createElement("span", null, "\u00BB")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 leading-relaxed mb-6 px-2"
  }, modalConfirmDelete.description), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (modalConfirmDelete.onConfirm) {
        modalConfirmDelete.onConfirm();
      }
      setModalConfirmDelete(prev => ({
        ...prev,
        open: false
      }));
    },
    className: "flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-400 text-white font-black text-xs transition shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 active:scale-95"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDDD1\uFE0F \u0646\u0639\u0645\u060C \u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setModalConfirmDelete(prev => ({
      ...prev,
      open: false
    })),
    className: "flex-1 py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 transition active:scale-95"
  }, "\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0623\u0645\u0631")))));
}

// =========================================================================
// 👑 VIEW 1: EXECUTIVE ADMIN DASHBOARD COMPONENT
// =========================================================================
function AdminDashboardView({
  kpis,
  orderStats,
  drivers,
  setDrivers,
  clients,
  setClients,
  orders,
  setOrders,
  kycRequests,
  setKycRequests,
  promos,
  setPromos,
  agents,
  setAgents,
  settings,
  setSettings,
  adminTab,
  setAdminTab,
  orderStatusFilter,
  setOrderStatusFilter,
  orderSearchQuery,
  setOrderSearchQuery,
  mapTheme,
  setMapTheme,
  handleStepOrderStatus,
  handleDeleteOrder,
  handleDeleteDriver,
  handleDeleteClient,
  handleDeleteAgent,
  openEditPriceModal,
  openApplyPromoModal,
  openInspectKYCModal,
  openAddDriverModal,
  openAddClientModal,
  openAddAgentModal,
  openRechargeWalletModal,
  switchToSimulator
}) {
  return /*#__PURE__*/React.createElement("main", {
    className: "flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 space-y-6"
  }, /*#__PURE__*/React.createElement("section", {
    className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-4 border border-slate-800 hover:border-amber-500/40 transition duration-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-slate-400 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold"
  }, "\u062D\u062C\u0645 \u0627\u0644\u0645\u0639\u0627\u0645\u0644\u0627\u062A (GMV)"), /*#__PURE__*/React.createElement("span", {
    className: "p-1.5 rounded-xl bg-amber-500/15 text-amber-400"
  }, /*#__PURE__*/React.createElement(Icons.TrendingUp, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-lg lg:text-xl font-black font-mono text-amber-400"
  }, kpis.gmv.toLocaleString(), " ", /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-sans text-amber-300"
  }, "\u062F\u062C")), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400 font-bold"
  }, kpis.deliveredCount), " \u0637\u0644\u0628 \u0645\u0643\u062A\u0645\u0644")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-4 border border-slate-800 hover:border-emerald-500/40 transition duration-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-slate-400 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold"
  }, "\u0623\u0631\u0628\u0627\u062D \u0627\u0644\u0639\u0645\u0648\u0644\u0629 (%15)"), /*#__PURE__*/React.createElement("span", {
    className: "p-1.5 rounded-xl bg-emerald-500/15 text-emerald-400"
  }, /*#__PURE__*/React.createElement(Icons.Wallet, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-lg lg:text-xl font-black font-mono text-emerald-400"
  }, kpis.commission.toLocaleString(), " ", /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-sans text-emerald-300"
  }, "\u062F\u062C")), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setAdminTab('settings'),
    className: "text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5"
  }, "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062A\u0633\u0639\u064A\u0631\u0629 \u2699\uFE0F"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-4 border border-slate-800 hover:border-sky-500/40 transition duration-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-slate-400 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold"
  }, "\u0623\u0633\u0637\u0648\u0644 \u0627\u0644\u0633\u0627\u0626\u0642\u064A\u0646 (Chwafra)"), /*#__PURE__*/React.createElement("span", {
    className: "p-1.5 rounded-xl bg-sky-500/15 text-sky-400"
  }, /*#__PURE__*/React.createElement(Icons.Bike, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-lg lg:text-xl font-black font-mono text-sky-400 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, kpis.onlineDrivers), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-500 font-normal"
  }, "/ ", kpis.totalDrivers)), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-emerald-400 mt-1 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full bg-emerald-400"
  }), /*#__PURE__*/React.createElement("span", null, kpis.onlineDrivers, " \u0645\u062A\u0635\u0644 \u062D\u0627\u0644\u064A\u0627\u064B \u0648\u0645\u062A\u0627\u062D"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-4 border border-slate-800 hover:border-indigo-500/40 transition duration-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-slate-400 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold"
  }, "\u0627\u0644\u0632\u0628\u0627\u0626\u0646 \u0648\u0627\u0644\u0639\u0645\u0644\u0627\u0621"), /*#__PURE__*/React.createElement("span", {
    className: "p-1.5 rounded-xl bg-indigo-500/15 text-indigo-400"
  }, /*#__PURE__*/React.createElement(Icons.Users, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-lg lg:text-xl font-black font-mono text-indigo-400"
  }, kpis.totalClients, " ", /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-sans text-slate-400"
  }, "\u0632\u0628\u0648\u0646")), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 mt-1"
  }, "\u0633\u062C\u0644 \u0637\u0644\u0628\u0627\u062A \u0646\u0634\u0637 \u0628\u0627\u0644\u0639\u0627\u0635\u0645\u0629")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-4 border border-slate-800 hover:border-rose-500/40 transition duration-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-slate-400 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold"
  }, "\u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0648\u062B\u064A\u0642 (KYC)"), /*#__PURE__*/React.createElement("span", {
    className: "p-1.5 rounded-xl bg-rose-500/15 text-rose-400"
  }, /*#__PURE__*/React.createElement(Icons.ShieldCheck, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-lg lg:text-xl font-black font-mono text-rose-400"
  }, kpis.pendingKyc, " ", /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-sans text-slate-400"
  }, "\u0645\u0644\u0641\u0627\u062A")), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-amber-400 mt-1 font-bold"
  }, "\u0631\u062E\u0635 \u0633\u064A\u0627\u0642\u0629 \u0628\u064A\u0648\u0645\u062A\u0631\u064A\u0629 \u0645\u0639\u0644\u0642\u0629")), /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-4 border border-slate-800 hover:border-purple-500/40 transition duration-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-slate-400 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold"
  }, "\u0641\u0631\u064A\u0642 \u0627\u0644\u0639\u0645\u0644 (Agents)"), /*#__PURE__*/React.createElement("span", {
    className: "p-1.5 rounded-xl bg-purple-500/15 text-purple-400"
  }, /*#__PURE__*/React.createElement(Icons.ShieldCheck, {
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-lg lg:text-xl font-black font-mono text-purple-400"
  }, kpis.totalAgents, " ", /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-sans text-slate-400"
  }, "\u0645\u0634\u0631\u0641\u064A\u0646")), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: openAddAgentModal,
    className: "text-[10px] text-purple-400 hover:text-purple-300 font-bold"
  }, "+ \u0625\u0636\u0627\u0641\u0629 \u0648\u0643\u064A\u0644")))), /*#__PURE__*/React.createElement("section", {
    className: "grid grid-cols-1 lg:grid-cols-12 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-5 glass-card rounded-3xl p-5 border border-slate-800 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-sm text-slate-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("span", null, "\u062A\u0648\u0632\u064A\u0639 \u062D\u0627\u0644\u0627\u062A \u0627\u0644\u0637\u0644\u0628\u0627\u062A")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400"
  }, "\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0623\u064A \u0634\u0631\u064A\u062D\u0629 \u0644\u062A\u0635\u0641\u064A\u0629 \u062C\u062F\u0648\u0644 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0628\u0627\u0644\u0623\u0633\u0641\u0644")), orderStatusFilter && /*#__PURE__*/React.createElement("button", {
    onClick: () => setOrderStatusFilter(null),
    className: "text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30"
  }, "\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u2715")), /*#__PURE__*/React.createElement("div", {
    className: "py-6 flex flex-col items-center justify-center relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-44 h-44 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "w-full h-full transform -rotate-90",
    viewBox: "0 0 100 100"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "38",
    stroke: "#1e293b",
    strokeWidth: "12",
    fill: "transparent"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "38",
    stroke: "#10b981",
    strokeWidth: "13",
    fill: "transparent",
    strokeDasharray: "238",
    strokeDashoffset: 238 - 238 * (orderStats.delivered / Math.max(1, orderStats.total)),
    className: "cursor-pointer transition-all duration-300 hover:stroke-emerald-300",
    onClick: () => setOrderStatusFilter(orderStatusFilter === 'delivered' ? null : 'delivered')
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "38",
    stroke: "#0ea5e9",
    strokeWidth: "13",
    fill: "transparent",
    strokeDasharray: "238",
    strokeDashoffset: 238 - 238 * (orderStats.inTransit / Math.max(1, orderStats.total)),
    strokeDasharray: `${orderStats.inTransit / Math.max(1, orderStats.total) * 238} 238`,
    className: "cursor-pointer transition-all duration-300 hover:stroke-sky-300",
    onClick: () => setOrderStatusFilter(orderStatusFilter === 'in_transit' ? null : 'in_transit')
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "38",
    stroke: "#f59e0b",
    strokeWidth: "13",
    fill: "transparent",
    strokeDasharray: `${orderStats.pending / Math.max(1, orderStats.total) * 238} 238`,
    strokeDashoffset: -(orderStats.delivered / Math.max(1, orderStats.total) * 238),
    className: "cursor-pointer transition-all duration-300 hover:stroke-amber-300",
    onClick: () => setOrderStatusFilter(orderStatusFilter === 'pending' ? null : 'pending')
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-black font-mono text-slate-100"
  }, orderStats.total), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400 font-bold"
  }, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0637\u0644\u0628\u0627\u062A")))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 pt-3 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOrderStatusFilter(orderStatusFilter === 'delivered' ? null : 'delivered'),
    className: `p-2 rounded-xl text-center border transition ${orderStatusFilter === 'delivered' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-850 border-slate-800 hover:border-slate-700 text-slate-300'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-emerald-400 font-bold"
  }, "\u0645\u0643\u062A\u0645\u0644 \uD83D\uDFE2"), /*#__PURE__*/React.createElement("div", {
    className: "text-base font-black font-mono mt-0.5"
  }, orderStats.delivered)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOrderStatusFilter(orderStatusFilter === 'in_transit' ? null : 'in_transit'),
    className: `p-2 rounded-xl text-center border transition ${orderStatusFilter === 'in_transit' ? 'bg-sky-500/20 border-sky-500 text-sky-300' : 'bg-slate-850 border-slate-800 hover:border-slate-700 text-slate-300'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-sky-400 font-bold"
  }, "\u0642\u064A\u062F \u0627\u0644\u062A\u0648\u0635\u064A\u0644 \uD83D\uDD35"), /*#__PURE__*/React.createElement("div", {
    className: "text-base font-black font-mono mt-0.5"
  }, orderStats.inTransit)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOrderStatusFilter(orderStatusFilter === 'pending' ? null : 'pending'),
    className: `p-2 rounded-xl text-center border transition ${orderStatusFilter === 'pending' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-850 border-slate-800 hover:border-slate-700 text-slate-300'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-amber-400 font-bold"
  }, "\u0645\u0639\u0644\u0642 \uD83D\uDFE1"), /*#__PURE__*/React.createElement("div", {
    className: "text-base font-black font-mono mt-0.5"
  }, orderStats.pending)))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-7 glass-card rounded-3xl p-5 border border-slate-800 flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-3 h-3 rounded-full bg-emerald-400 radar-pulse"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-sm text-slate-100"
  }, "\uD83D\uDDFA\uFE0F \u0631\u0627\u062F\u0627\u0631 \u0627\u0644\u0623\u0633\u0637\u0648\u0644 \u0627\u0644\u062D\u064A (Live Fleet Radar) \u2014 \u0627\u0644\u0639\u0627\u0635\u0645\u0629")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMapTheme('dark'),
    className: `px-2.5 py-1 rounded-lg transition ${mapTheme === 'dark' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'}`
  }, "\uD83C\uDF19 \u0644\u064A\u0644\u064A \u062F\u0627\u0643\u0646"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMapTheme('sat'),
    className: `px-2.5 py-1 rounded-lg transition ${mapTheme === 'sat' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'}`
  }, "\uD83D\uDEF0\uFE0F \u0642\u0645\u0631 \u0635\u0646\u0627\u0639\u064A"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMapTheme('light'),
    className: `px-2.5 py-1 rounded-lg transition ${mapTheme === 'light' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'}`
  }, "\u2600\uFE0F \u0646\u0647\u0627\u0631\u064A"))), /*#__PURE__*/React.createElement("div", {
    className: "relative my-3 rounded-2xl overflow-hidden border border-slate-800/80 h-72 w-full bg-slate-950"
  }, /*#__PURE__*/React.createElement(FleetRadarLeaflet, {
    drivers: drivers,
    theme: mapTheme
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4 text-slate-400"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-emerald-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u0633\u0627\u0626\u0642 \u0645\u062A\u0635\u0644 \u0648\u0645\u062A\u0627\u062D (En ligne)")), /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-slate-600"
  }), /*#__PURE__*/React.createElement("span", null, "\u063A\u064A\u0631 \u0645\u062A\u0635\u0644 (Hors ligne)"))), /*#__PURE__*/React.createElement("button", {
    onClick: switchToSimulator,
    className: "px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 font-bold transition flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC7E \u062A\u062C\u0631\u0628\u0629 \u0627\u0644\u0645\u062D\u0627\u0643\u064A \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A"))))), /*#__PURE__*/React.createElement("section", {
    className: "glass-card rounded-3xl overflow-hidden border border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex border-b border-slate-800 bg-slate-900/60 overflow-x-auto"
  }, [{
    id: 'drivers',
    label: '🏍️ أسطول السائقين (Chwafra)',
    count: drivers.length
  }, {
    id: 'clients',
    label: '👥 قائمة الزبائن (Clients)',
    count: clients.length
  }, {
    id: 'kyc',
    label: '📑 طلبات التوثيق المعلقة KYC',
    count: kycRequests.filter(k => k.status === 'pending').length
  }, {
    id: 'orders',
    label: '📦 أحدث الطلبات المنفذة',
    count: orders.length
  }, {
    id: 'settings',
    label: '⚙️ الأسعار والعروض والعمولة'
  }, {
    id: 'agents',
    label: '🛡️ فريق العمل والوكلاء',
    count: agents.length
  }].map(tab => /*#__PURE__*/React.createElement("button", {
    key: tab.id,
    onClick: () => setAdminTab(tab.id),
    className: `px-5 py-4 font-bold text-xs lg:text-sm border-b-2 transition whitespace-nowrap flex items-center gap-2 ${adminTab === tab.id ? 'border-amber-400 text-amber-400 bg-slate-800/40' : 'border-transparent text-slate-400 hover:text-slate-200'}`
  }, /*#__PURE__*/React.createElement("span", null, tab.label), tab.count !== undefined && /*#__PURE__*/React.createElement("span", {
    className: `px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${adminTab === tab.id ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'}`
  }, tab.count)))), adminTab === 'drivers' && /*#__PURE__*/React.createElement("div", {
    className: "p-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-sm text-slate-100"
  }, "\u0623\u0633\u0637\u0648\u0644 \u062F\u0631\u0627\u062C\u0627\u062A \u0627\u0644\u062A\u0648\u0635\u064A\u0644 (Livreurs DZ)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062A\u0648\u0627\u062C\u062F\u060C \u0627\u0644\u0645\u062D\u0627\u0641\u0638 \u0627\u0644\u0645\u0627\u0644\u064A\u0629\u060C \u0634\u062D\u0646 \u0627\u0644\u0623\u0631\u0635\u062F\u0629\u060C \u0648\u062A\u0633\u0648\u064A\u0629 \u062F\u064A\u0648\u0646 \u0627\u0644\u0645\u0646\u0635\u0629")), /*#__PURE__*/React.createElement("button", {
    onClick: openAddDriverModal,
    className: "px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icons.Plus, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "\u0625\u0636\u0627\u0641\u0629 \u0633\u0627\u0626\u0642 \u062C\u062F\u064A\u062F (Ajouter Livreur)"))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-right text-sm"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "text-xs text-slate-400 bg-slate-850/60 uppercase border-b border-slate-800 font-bold"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0633\u0627\u0626\u0642"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0647\u0627\u062A\u0641"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0645\u0631\u0643\u0628\u0629 \u0648\u0627\u0644\u0644\u0648\u062D\u0629"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u062A\u0642\u064A\u064A\u0645"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062D\u0641\u0638\u0629"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u062D\u0627\u0644\u0629 \u0648\u0627\u0644\u062A\u0648\u062B\u064A\u0642"), /*#__PURE__*/React.createElement("th", {
    className: "p-3 text-center"
  }, "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-800/60 text-xs"
  }, drivers.map(d => /*#__PURE__*/React.createElement("tr", {
    key: d.id,
    className: "hover:bg-slate-800/40 transition"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-slate-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full",
    style: {
      backgroundColor: d.is_online ? '#10b981' : '#64748b'
    }
  }), /*#__PURE__*/React.createElement("span", null, d.name)), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-500 font-mono"
  }, "\u0627\u0646\u0636\u0645: ", d.joined_date)), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono"
  }, /*#__PURE__*/React.createElement("a", {
    href: `tel:${d.phone}`,
    className: "text-slate-300 hover:text-amber-400 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icons.Phone, {
    size: 12
  }), " ", d.phone)), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-slate-200 font-semibold"
  }, d.vehicle_model), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-amber-400"
  }, d.vehicle_plate)), /*#__PURE__*/React.createElement("td", {
    className: "p-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-amber-400"
  }, "\u2B50 ", d.rating), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-500 block"
  }, "(", d.total_deliveries, " \u0631\u062D\u0644\u0629)")), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono font-bold"
  }, /*#__PURE__*/React.createElement("span", {
    className: d.wallet_balance < 0 ? 'text-rose-400' : 'text-emerald-400'
  }, d.wallet_balance.toFixed(2), " DZD")), /*#__PURE__*/React.createElement("td", {
    className: "p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: `px-2 py-0.5 rounded-full text-[10px] font-bold w-fit ${d.is_online ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`
  }, d.is_online ? 'متصل 🟢' : 'غير متصل ⚪'), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, d.kyc_status === 'approved' ? 'موثق ✅' : d.kyc_status === 'suspended' ? 'مجمّد ⏸️' : 'معلق 📑'))), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-1.5 flex-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => openRechargeWalletModal(d),
    className: "px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 font-bold transition flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCB5"), " \u0634\u062D\u0646"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDrivers(curr => curr.map(x => x.id === d.id ? {
        ...x,
        is_online: !x.is_online
      } : x));
    },
    className: "px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold transition"
  }, d.is_online ? 'إيقاف ⏸️' : 'تفعيل 🟢'), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDeleteDriver(d),
    className: "p-1 rounded-lg bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 transition",
    title: "\u062D\u0630\u0641 \u0627\u0644\u0633\u0627\u0626\u0642"
  }, /*#__PURE__*/React.createElement(Icons.Trash2, {
    size: 14
  })))))))))), adminTab === 'clients' && /*#__PURE__*/React.createElement("div", {
    className: "p-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-sm text-slate-100"
  }, "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0632\u0628\u0627\u0626\u0646 \u0648\u0627\u0644\u0639\u0645\u0644\u0627\u0621 (Clients DZ)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "\u0633\u062C\u0644 \u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0632\u0628\u0627\u0626\u0646\u060C \u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641\u060C \u0648\u062D\u0638\u0631 \u0623\u0648 \u062D\u0630\u0641 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A")), /*#__PURE__*/React.createElement("button", {
    onClick: openAddClientModal,
    className: "px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs transition shadow-lg shadow-sky-500/20 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icons.Plus, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "\u0625\u0636\u0627\u0641\u0629 \u0632\u0628\u0648\u0646 (Ajouter Client)"))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-right text-sm"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "text-xs text-slate-400 bg-slate-850/60 uppercase border-b border-slate-800 font-bold"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0633\u0645 \u0627\u0644\u0632\u0628\u0648\u0646"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0639\u062F\u062F \u0627\u0644\u0637\u0644\u0628\u0627\u062A"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0625\u0646\u0641\u0627\u0642"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u062D\u0627\u0644\u0629 \u0627\u0644\u062D\u0633\u0627\u0628"), /*#__PURE__*/React.createElement("th", {
    className: "p-3 text-center"
  }, "\u0627\u0644\u062A\u062D\u0643\u0645"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-800/60 text-xs"
  }, clients.map(c => /*#__PURE__*/React.createElement("tr", {
    key: c.id,
    className: "hover:bg-slate-800/40 transition"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-bold text-slate-100"
  }, c.name), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono text-slate-300"
  }, c.phone), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono font-bold text-amber-400"
  }, c.total_orders, " \u0637\u0644\u0628"), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono font-bold text-emerald-400"
  }, c.total_spent.toLocaleString(), " DZD"), /*#__PURE__*/React.createElement("td", {
    className: "p-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `px-2 py-0.5 rounded-full text-[10px] font-bold ${c.is_active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`
  }, c.is_active ? 'نشط ✅' : 'محظور 🚫')), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-1.5"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setClients(curr => curr.map(x => x.id === c.id ? {
        ...x,
        is_active: !x.is_active
      } : x));
    },
    className: "px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs transition"
  }, c.is_active ? 'حظر 🚫' : 'تنشيط 🔓'), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDeleteClient(c),
    className: "p-1 rounded-lg bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 transition",
    title: "حذف الزبون"
  }, /*#__PURE__*/React.createElement(Icons.Trash2, {
    size: 14
  })))))))))), adminTab === 'kyc' && /*#__PURE__*/React.createElement("div", {
    className: "p-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-sm text-slate-100"
  }, "\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u062A\u0648\u062B\u064A\u0642 \u0648\u0627\u0639\u062A\u0645\u0627\u062F \u0631\u062E\u0635 \u0627\u0644\u0633\u064A\u0627\u0642\u0629 (KYC)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "\u062A\u062F\u0642\u064A\u0642 \u0631\u062E\u0635 \u0627\u0644\u0633\u064A\u0627\u0642\u0629 \u0627\u0644\u0628\u064A\u0648\u0645\u062A\u0631\u064A\u0629 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u064A\u0629 \u0648\u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0631\u0645\u0627\u062F\u064A\u0629 \u0644\u0644\u0645\u0631\u0643\u0628\u0627\u062A")), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-right text-sm"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "text-xs text-slate-400 bg-slate-850/60 uppercase border-b border-slate-800 font-bold"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0633\u0627\u0626\u0642"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0647\u0627\u062A\u0641"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0645\u0631\u0643\u0628\u0629 \u0648\u0627\u0644\u0644\u0648\u062D\u0629"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0631\u0642\u0645 \u0627\u0644\u0631\u062E\u0635\u0629"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u062A\u0642\u062F\u064A\u0645"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u062D\u0627\u0644\u0629"), /*#__PURE__*/React.createElement("th", {
    className: "p-3 text-center"
  }, "\u0642\u0631\u0627\u0631 \u0627\u0644\u0625\u062F\u0627\u0631\u0629"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-800/60 text-xs"
  }, kycRequests.map(k => /*#__PURE__*/React.createElement("tr", {
    key: k.id,
    className: "hover:bg-slate-800/40 transition"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-bold text-slate-100"
  }, k.driver_name), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono text-slate-300"
  }, k.phone), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono"
  }, /*#__PURE__*/React.createElement("div", null, k.vehicle_model), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-amber-400"
  }, k.vehicle_plate)), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono text-sky-400"
  }, k.license_number), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono text-slate-400"
  }, k.submission_date), /*#__PURE__*/React.createElement("td", {
    className: "p-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: `px-2 py-0.5 rounded-full text-[10px] font-bold ${k.status === 'approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : k.status === 'rejected' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`
  }, k.status === 'approved' ? 'معتمد ✅' : k.status === 'rejected' ? 'مرفوض ❌' : 'قيد التدقيق ⏳')), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => openInspectKYCModal(k),
    className: "px-3 py-1 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-bold transition flex items-center gap-1 mx-auto"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD0D \u0641\u062D\u0635 \u0627\u0644\u0648\u062B\u0627\u0626\u0642"))))))))), adminTab === 'orders' && /*#__PURE__*/React.createElement("div", {
    className: "p-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-sm text-slate-100"
  }, "\u0633\u062C\u0644 \u0623\u062D\u062F\u062B \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0645\u0646\u0641\u0630\u0629 \u0648\u0627\u0644\u0625\u0631\u0633\u0627\u0644\u064A\u0627\u062A"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0623\u0633\u0639\u0627\u0631\u060C \u062A\u0637\u0628\u064A\u0642 \u0623\u0643\u0648\u0627\u062F \u0627\u0644\u062E\u0635\u0645\u060C \u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062D\u0627\u0644\u0627\u062A\u060C \u0648\u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628\u0627\u062A")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: orderSearchQuery,
    onChange: e => setOrderSearchQuery(e.target.value),
    placeholder: "\uD83D\uDD0D \u0628\u062D\u062B \u0628\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628\u060C \u0627\u0644\u0632\u0628\u0648\u0646\u060C \u0627\u0644\u0633\u0627\u0626\u0642...",
    className: "bg-slate-850 border border-slate-700/80 rounded-xl pr-3 pl-8 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 w-64"
  }), orderSearchQuery && /*#__PURE__*/React.createElement("button", {
    onClick: () => setOrderSearchQuery(''),
    className: "absolute left-2.5 top-1.5 text-xs text-slate-400"
  }, "\u2715")))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-right text-sm"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "text-xs text-slate-400 bg-slate-850/60 uppercase border-b border-slate-800 font-bold"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0632\u0628\u0648\u0646"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0633\u0627\u0626\u0642"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0645\u0633\u0627\u0631 \u0627\u0644\u062A\u0648\u0635\u064A\u0644 (Trajet)"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0635\u0627\u0641\u064A"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u062E\u0635\u0645 / \u0627\u0644\u0628\u0631\u0648\u0645\u0648"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u062D\u0627\u0644\u0629"), /*#__PURE__*/React.createElement("th", {
    className: "p-3 text-center"
  }, "\u0627\u0644\u062A\u062D\u0643\u0645 \u0648\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-800/60 text-xs"
  }, orders.map(o => {
    const statusColors = {
      delivered: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      accepted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      picked_up: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      in_transit: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      cancelled: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
    };
    const statusLabels = {
      delivered: 'مكتمل ✅',
      pending: 'معلق ⏳',
      accepted: 'مقبول 🏍️',
      picked_up: 'تم الاستلام 📦',
      in_transit: 'في الطريق 🚀',
      cancelled: 'ملغى ❌'
    };
    return /*#__PURE__*/React.createElement("tr", {
      key: o.id,
      className: "hover:bg-slate-800/40 transition"
    }, /*#__PURE__*/React.createElement("td", {
      className: "p-3 font-mono font-bold text-amber-400"
    }, "#", o.id.slice(0, 8)), /*#__PURE__*/React.createElement("td", {
      className: "p-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "font-bold text-slate-100"
    }, o.client_name), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-slate-400 font-mono"
    }, o.client_phone)), /*#__PURE__*/React.createElement("td", {
      className: "p-3"
    }, o.driver_name ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "font-bold text-slate-200"
    }, o.driver_name), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-slate-400 font-mono"
    }, o.driver_phone)) : /*#__PURE__*/React.createElement("span", {
      className: "text-slate-500 italic"
    }, "\u0644\u0645 \u064A\u0642\u0628\u0644 \u0628\u0639\u062F")), /*#__PURE__*/React.createElement("td", {
      className: "p-3 max-w-xs truncate text-slate-300"
    }, /*#__PURE__*/React.createElement("span", null, o.pickup_address), " ", /*#__PURE__*/React.createElement("span", {
      className: "text-amber-400 font-bold"
    }, "\u27A1\uFE0F"), " ", /*#__PURE__*/React.createElement("span", null, o.dropoff_address), /*#__PURE__*/React.createElement("span", {
      className: "block text-[10px] text-slate-500 font-mono"
    }, "(", o.distance_km, " \u0643\u0645)")), /*#__PURE__*/React.createElement("td", {
      className: "p-3 font-mono font-bold text-emerald-400 text-sm"
    }, o.total_price.toFixed(2), " DZD"), /*#__PURE__*/React.createElement("td", {
      className: "p-3 font-mono"
    }, o.promo_code ? /*#__PURE__*/React.createElement("span", {
      className: "px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold"
    }, "\uD83C\uDF9F\uFE0F ", o.promo_code, " (-", o.discount_amount, " DZD)") : /*#__PURE__*/React.createElement("span", {
      className: "text-slate-600"
    }, "-")), /*#__PURE__*/React.createElement("td", {
      className: "p-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: `px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[o.status] || 'bg-slate-800 text-slate-300'}`
    }, statusLabels[o.status] || o.status)), /*#__PURE__*/React.createElement("td", {
      className: "p-3 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center gap-1.5 flex-wrap"
    }, o.status !== 'delivered' && o.status !== 'cancelled' && /*#__PURE__*/React.createElement("button", {
      onClick: () => handleStepOrderStatus(o.id),
      className: "px-2 py-1 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/30 font-bold transition flex items-center gap-1",
      title: "\u062A\u0631\u0642\u064A\u0629 \u062D\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628 \u062E\u0637\u0648\u0629 \u0648\u0627\u062D\u062F\u0629"
    }, /*#__PURE__*/React.createElement("span", null, "\u23ED\uFE0F \u062A\u0631\u0642\u064A\u0629")), /*#__PURE__*/React.createElement("button", {
      onClick: () => openEditPriceModal(o.id, o.total_price),
      className: "px-2 py-1 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 font-bold transition flex items-center gap-1",
      title: "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0633\u0639\u0631"
    }, /*#__PURE__*/React.createElement("span", null, "\u270F\uFE0F"), " \u0633\u0639\u0631"), /*#__PURE__*/React.createElement("button", {
      onClick: () => openApplyPromoModal(o.id, o.total_price),
      className: "px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 font-bold transition flex items-center gap-1",
      title: "\u062A\u0637\u0628\u064A\u0642 \u0628\u0631\u0648\u0645\u0648"
    }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFF7\uFE0F"), " \u0628\u0631\u0648\u0645\u0648"), /*#__PURE__*/React.createElement("button", {
      onClick: () => handleDeleteOrder(o.id),
      className: "p-1 rounded-lg bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 transition",
      title: "\u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628"
    }, /*#__PURE__*/React.createElement(Icons.Trash2, {
      size: 14
    })))));
  }))))), adminTab === 'settings' && /*#__PURE__*/React.createElement("div", {
    className: "p-5 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card-subtle rounded-2xl p-5 border border-slate-700/60 space-y-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-sm text-slate-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Sliders, {
    size: 18,
    className: "text-amber-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062A\u0633\u0639\u064A\u0631\u0629 \u0648\u0639\u0645\u0648\u0644\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642 (Tarification DZ)")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-slate-400 block mb-1"
  }, "\u0641\u062A\u062D \u0627\u0644\u0639\u062F\u0627\u062F (Base Fare):"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: settings.base_fee,
    onChange: e => setSettings({
      ...settings,
      base_fee: parseFloat(e.target.value) || 0
    }),
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 font-mono font-bold text-amber-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-slate-400 block mb-1"
  }, "\u0633\u0639\u0631 \u0627\u0644\u0643\u064A\u0644\u0648\u0645\u062A\u0631 (DZD/km):"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: settings.per_km_rate,
    onChange: e => setSettings({
      ...settings,
      per_km_rate: parseFloat(e.target.value) || 0
    }),
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 font-mono font-bold text-amber-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-slate-400 block mb-1"
  }, "\u0646\u0633\u0628\u0629 \u0639\u0645\u0648\u0644\u0629 \u0627\u0644\u0645\u0646\u0635\u0629 (%):"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: settings.commission_rate,
    onChange: e => setSettings({
      ...settings,
      commission_rate: parseFloat(e.target.value) || 0
    }),
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 font-mono font-bold text-emerald-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "text-slate-400 block mb-1"
  }, "\u0633\u0642\u0641 \u062F\u064A\u0648\u0646 \u0627\u0644\u0633\u0627\u0626\u0642 (DZD):"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: settings.default_debt_limit,
    onChange: e => setSettings({
      ...settings,
      default_debt_limit: parseFloat(e.target.value) || 0
    }),
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 font-mono font-bold text-rose-400"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-3 rounded-xl bg-slate-850 border border-slate-800 text-xs text-slate-300"
  }, "\uD83D\uDCA1 \u0645\u0639\u0627\u062F\u0644\u0629 \u062D\u0633\u0627\u0628 \u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u0629: ", /*#__PURE__*/React.createElement("strong", null, settings.base_fee, " DZD (\u0641\u062A\u062D \u0639\u062F\u0627\u062F) + (\u0627\u0644\u0645\u0633\u0627\u0641\u0629 \u0643\u0645 \xD7 ", settings.per_km_rate, " DZD)"))), /*#__PURE__*/React.createElement("div", {
    className: "glass-card-subtle rounded-2xl p-5 border border-slate-700/60 space-y-4"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-sm text-slate-100 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Tag, {
    size: 18,
    className: "text-emerald-400"
  }), /*#__PURE__*/React.createElement("span", null, "\u0623\u0643\u0648\u0627\u062F \u0627\u0644\u062E\u0635\u0645 \u0648\u0627\u0644\u0639\u0631\u0648\u0636 \u0627\u0644\u062A\u0631\u0648\u064A\u062C\u064A\u0629 \u0627\u0644\u0646\u0634\u0637\u0629")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, promos.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: "p-3 rounded-xl bg-slate-850 border border-slate-800 flex items-center justify-between text-xs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-amber-400 text-sm"
  }, p.code), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 mr-2"
  }, "(", p.discount_type === 'percentage' ? `${p.discount_value}% خصم` : `${p.discount_value} DZD ثابت`, ")")), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-500 font-mono"
  }, "\u0627\u0633\u062A\u062E\u062F\u0645 ", p.used_count, " \u0645\u0631\u0629"))))))), adminTab === 'agents' && /*#__PURE__*/React.createElement("div", {
    className: "p-5 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-sm text-slate-100"
  }, "\u0641\u0631\u064A\u0642 \u0627\u0644\u0639\u0645\u0644 \u0648\u0627\u0644\u0648\u0643\u0644\u0627\u0621 \u0627\u0644\u0645\u0634\u0631\u0641\u064A\u0646 (Staff & Admins)"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400"
  }, "\u0625\u062F\u0627\u0631\u0629 \u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u0645\u0634\u0631\u0641\u064A\u0646\u060C \u0635\u0644\u0627\u062D\u064A\u0627\u062A \u0627\u0644\u0648\u0635\u0648\u0644\u060C \u0648\u0625\u0635\u062F\u0627\u0631 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u062E\u0648\u0644")), /*#__PURE__*/React.createElement("button", {
    onClick: openAddAgentModal,
    className: "px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs transition shadow-lg shadow-indigo-500/20 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icons.Plus, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "\u0625\u0636\u0627\u0641\u0629 \u0648\u0643\u064A\u0644 \u062C\u062F\u064A\u062F (Ajouter Agent)"))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-right text-sm"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "text-xs text-slate-400 bg-slate-850/60 uppercase border-b border-slate-800 font-bold"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0633\u0645 \u0627\u0644\u0648\u0643\u064A\u0644"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0647\u0627\u062A\u0641 (Login)"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0629"), /*#__PURE__*/React.createElement("th", {
    className: "p-3"
  }, "\u0627\u0644\u062D\u0627\u0644\u0629"), /*#__PURE__*/React.createElement("th", {
    className: "p-3 text-center"
  }, "\u0627\u0644\u062A\u062D\u0643\u0645"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-800/60 text-xs"
  }, agents.map(ag => /*#__PURE__*/React.createElement("tr", {
    key: ag.id,
    className: "hover:bg-slate-800/40 transition"
  }, /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-bold text-slate-100"
  }, ag.name), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono text-amber-400 font-bold"
  }, ag.phone), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono text-slate-300"
  }, ag.email), /*#__PURE__*/React.createElement("td", {
    className: "p-3 font-mono"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
  }, ag.role === 'admin' ? '👑 مدير عام (Admin)' : '🎧 وكيل عمليات (Agent)')), /*#__PURE__*/React.createElement("td", {
    className: "p-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400 font-bold text-xs"
  }, "\u0646\u0634\u0637 \u2705")), /*#__PURE__*/React.createElement("td", {
    className: "p-3 text-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDeleteAgent(ag),
    className: "p-1 rounded-lg bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 transition",
    title: "حذف حساب الوكيل"
  }, /*#__PURE__*/React.createElement(Icons.Trash2, {
    size: 14
  })))))))))));
}

// =========================================================================
// 👾 VIEW 2: 3-COLUMN LIVE INTERACTIVE DELIVERY SIMULATOR COMPONENT
// =========================================================================
function SimulatorView({
  drivers,
  simDriverId,
  setSimDriverId,
  currentSimDriver,
  simPickup,
  setSimPickup,
  simDropoff,
  setSimDropoff,
  simPackageType,
  setSimPackageType,
  simNotes,
  setSimNotes,
  simDistanceKm,
  simCalculatedPrice,
  simProgress,
  setSimProgress,
  simPathPoints,
  currentSimBikeCoord,
  simActiveOrder,
  simClientLogs,
  simDriverLogs,
  runOneClickScenario,
  isAutoSimulating,
  mapTheme,
  setMapTheme,
  switchToAdmin,
  onPickupParcel,
  onDeliverCash
}) {
  return /*#__PURE__*/React.createElement("main", {
    className: "flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass-card rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, "\uD83D\uDC7E"), /*#__PURE__*/React.createElement("h2", {
    className: "font-extrabold text-base lg:text-lg text-slate-100"
  }, "\u0645\u062D\u0627\u0643\u064A \u0627\u0644\u062A\u0648\u0635\u064A\u0644 \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u2014 \u062A\u062C\u0631\u0628\u0629 \u0633\u064A\u0646\u0627\u0631\u064A\u0648 \u0627\u0644\u0632\u0628\u0648\u0646 \u0648\u0627\u0644\u0633\u0627\u0626\u0642 \u0648\u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0644\u062D\u0638\u064A\u0627\u064B DZ")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-0.5"
  }, "\u062A\u0641\u0627\u0639\u0644 \u062D\u064A \u0641\u0648\u0631\u064A \u0628\u064A\u0646 \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0639\u0645\u064A\u0644 \u0648\u0646\u0638\u0627\u0645 \u062A\u062A\u0628\u0639 \u0627\u0644\u062F\u0631\u0627\u062C\u0629 \u0628\u0627\u0644\u062E\u0631\u064A\u0637\u0629 \u0648\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0633\u0627\u0626\u0642")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: runOneClickScenario,
    disabled: isAutoSimulating,
    className: `px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 shadow-lg ${isAutoSimulating ? 'bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-amber-500/25 animate-pulse'}`
  }, /*#__PURE__*/React.createElement(Icons.Zap, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "\u26A1 \u062A\u062C\u0631\u0628\u0629 \u0641\u0648\u0631\u064A\u0629: \uD83D\uDE80 \u062A\u0634\u063A\u064A\u0644 \u0633\u064A\u0646\u0627\u0631\u064A\u0648 \u0643\u0627\u0645\u0644 \u0628\u0646\u0642\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 (1-Clic)")), /*#__PURE__*/React.createElement("button", {
    onClick: switchToAdmin,
    className: "px-3.5 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC51 \u0644\u0648\u062D\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0629")))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-2 text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400 font-bold"
  }, "\uD83D\uDEE3\uFE0F \u0645\u0633\u0627\u0631\u0627\u062A \u0634\u0627\u0626\u0639\u0629 \u0628\u0627\u0644\u0639\u0627\u0635\u0645\u0629:"), [{
    label: 'البريد المركزي ➡️ باب الزوار (14.7 كم)',
    from: ALGIERS_COMMUNES[0],
    to: ALGIERS_COMMUNES[1]
  }, {
    label: 'حيدرة ➡️ بن عكنون (5.1 كم)',
    from: ALGIERS_COMMUNES[2],
    to: ALGIERS_COMMUNES[3]
  }, {
    label: 'دالي براهيم ➡️ الشراقة (4.2 كم)',
    from: ALGIERS_COMMUNES[4],
    to: ALGIERS_COMMUNES[5]
  }].map((shortcut, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    onClick: () => {
      setSimPickup(shortcut.from);
      setSimDropoff(shortcut.to);
    },
    className: "px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-mono font-bold transition hover:border-amber-500/40"
  }, shortcut.label))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-3 glass-card rounded-3xl p-4 border border-slate-800 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold"
  }, "\uD83D\uDCF1"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-extrabold text-sm text-slate-100"
  }, "\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0632\u0628\u0648\u0646"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-sky-400 font-bold"
  }, "\u062A\u0637\u0628\u064A\u0642 \u0627\u0644\u0639\u0645\u064A\u0644 Client DZ"))), /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-sky-400 animate-ping"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400"
  }, "\uD83D\uDFE2"), " \u0645\u0643\u0627\u0646 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 (Pickup):"), /*#__PURE__*/React.createElement("select", {
    value: simPickup.name,
    onChange: e => {
      const found = ALGIERS_COMMUNES.find(c => c.name === e.target.value);
      if (found) setSimPickup(found);
    },
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
  }, ALGIERS_COMMUNES.map((c, i) => /*#__PURE__*/React.createElement("option", {
    key: i,
    value: c.name
  }, c.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-rose-400"
  }, "\uD83D\uDD34"), " \u0648\u062C\u0647\u0629 \u0627\u0644\u062A\u0633\u0644\u064A\u0645 (Destination):"), /*#__PURE__*/React.createElement("select", {
    value: simDropoff.name,
    onChange: e => {
      const found = ALGIERS_COMMUNES.find(c => c.name === e.target.value);
      if (found) setSimDropoff(found);
    },
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
  }, ALGIERS_COMMUNES.map((c, i) => /*#__PURE__*/React.createElement("option", {
    key: i,
    value: c.name
  }, c.name)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block mb-1.5 font-bold"
  }, "\u0628\u0644\u062F\u064A\u0627\u062A \u0627\u0644\u0639\u0627\u0635\u0645\u0629 \u0627\u0644\u0633\u0631\u064A\u0639\u0629:"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1"
  }, ALGIERS_COMMUNES.slice(0, 8).map((c, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    onClick: () => setSimDropoff(c),
    className: `px-2 py-1 rounded-lg text-[10px] font-bold transition border ${simDropoff.name === c.name ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-850 text-slate-400 border-slate-800 hover:border-slate-700'}`
  }, c.shortName)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0646\u0648\u0639 \u0627\u0644\u0634\u062D\u0646\u0629 \u0623\u0648 \u0627\u0644\u0637\u0631\u062F:"), /*#__PURE__*/React.createElement("select", {
    value: simPackageType,
    onChange: e => setSimPackageType(e.target.value),
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
  }, /*#__PURE__*/React.createElement("option", {
    value: "\u0637\u0631\u062F \u0635\u063A\u064A\u0631 \u0648\u0639\u0627\u062C\u0644"
  }, "\uD83D\uDCE6 \u0637\u0631\u062F \u0635\u063A\u064A\u0631 \u0648\u0639\u0627\u062C\u0644"), /*#__PURE__*/React.createElement("option", {
    value: "\u0648\u062B\u0627\u0626\u0642 \u0648\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0645\u0647\u0645\u0629"
  }, "\uD83D\uDCD1 \u0648\u062B\u0627\u0626\u0642 \u0648\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0645\u0647\u0645\u0629"), /*#__PURE__*/React.createElement("option", {
    value: "\u0648\u062C\u0628\u0629 \u0637\u0639\u0627\u0645 \u0633\u0631\u064A\u0639\u0629"
  }, "\uD83C\uDF54 \u0648\u062C\u0628\u0629 \u0637\u0639\u0627\u0645 \u0648\u0645\u0623\u0643\u0648\u0644\u0627\u062A"), /*#__PURE__*/React.createElement("option", {
    value: "\u0623\u062F\u0648\u064A\u0629 \u0648\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0635\u064A\u062F\u0644\u0627\u0646\u064A\u0629"
  }, "\uD83D\uDC8A \u0623\u062F\u0648\u064A\u0629 \u0648\u0645\u0633\u062A\u0644\u0632\u0645\u0627\u062A \u0635\u064A\u062F\u0644\u064A\u0629"), /*#__PURE__*/React.createElement("option", {
    value: "\u0647\u0648\u0627\u062A\u0641 \u0648\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u062A"
  }, "\uD83D\uDCF1 \u0647\u0648\u0627\u062A\u0641 \u0648\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0627\u062A"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0644\u0644\u0633\u0627\u0626\u0642:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: simNotes,
    onChange: e => setSimNotes(e.target.value),
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-700/80 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-xs text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "\u0627\u0644\u0645\u0633\u0627\u0641\u0629 \u0627\u0644\u0645\u0642\u0637\u0648\u0639\u0629:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-sky-400"
  }, simDistanceKm, " \u0643\u0645")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-xs text-slate-400"
  }, /*#__PURE__*/React.createElement("span", null, "\u0641\u062A\u062D \u0627\u0644\u0639\u062F\u0627\u062F + \u062A\u0633\u0639\u064A\u0631\u0629 \u0627\u0644\u0643\u064A\u0644\u0648\u0645\u062A\u0631:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-slate-300"
  }, "300 + (", simDistanceKm, " \xD7 50)")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-sm pt-2 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-100"
  }, "\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0627\u0644\u0635\u0627\u0641\u064A:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-black text-emerald-400 text-base"
  }, simCalculatedPrice.toFixed(2), " DZD"))), /*#__PURE__*/React.createElement("button", {
    onClick: runOneClickScenario,
    disabled: isAutoSimulating,
    className: "w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Icons.Bike, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDEF5 \u062A\u0623\u0643\u064A\u062F \u0648\u0625\u0631\u0633\u0627\u0644 \u0637\u0644\u0628 \u0627\u0644\u062A\u0648\u0635\u064A\u0644 (Envoyer)")), simActiveOrder && /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30 text-xs space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-amber-400"
  }, "#", simActiveOrder.id), /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40"
  }, simActiveOrder.status)), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-300"
  }, "\u0627\u0644\u0633\u0627\u0626\u0642: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-100"
  }, currentSimDriver.name), " (", currentSimDriver.vehicle_model, ")")), /*#__PURE__*/React.createElement("div", {
    className: "pt-2 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold text-slate-400 block mb-2"
  }, "\uD83D\uDCDC \u0633\u062C\u0644 \u0623\u062D\u062F\u0627\u062B \u0627\u0644\u0632\u0628\u0648\u0646:"), /*#__PURE__*/React.createElement("div", {
    className: "max-h-36 overflow-y-auto space-y-1.5 text-[10px] font-mono"
  }, simClientLogs.map((log, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sky-400 ml-1"
  }, "[", log.time, "]"), " ", log.text))))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-6 glass-card rounded-3xl p-4 border border-slate-800 flex flex-col justify-between space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-2 border-b border-slate-800 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2.5 h-2.5 rounded-full bg-emerald-400 radar-pulse"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-100"
  }, "\u0645\u0633\u0627\u0631 \u0627\u0644\u062A\u0648\u0635\u064A\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631 \u2014 \u0634\u0628\u0643\u0629 \u0637\u0631\u0642 \u0627\u0644\u0639\u0627\u0635\u0645\u0629 DZ")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMapTheme('dark'),
    className: `px-2 py-0.5 rounded text-[10px] font-bold ${mapTheme === 'dark' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'}`
  }, "\u0644\u064A\u0644\u064A \uD83C\uDF19"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMapTheme('sat'),
    className: `px-2 py-0.5 rounded text-[10px] font-bold ${mapTheme === 'sat' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'}`
  }, "\u0642\u0645\u0631 \uD83D\uDEF0\uFE0F"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMapTheme('light'),
    className: `px-2 py-0.5 rounded text-[10px] font-bold ${mapTheme === 'light' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'}`
  }, "\u2600\uFE0F \u0634\u0648\u0627\u0631\u0639"))), /*#__PURE__*/React.createElement("div", {
    className: "relative rounded-2xl overflow-hidden border border-slate-800 h-[480px] w-full bg-slate-950"
  }, /*#__PURE__*/React.createElement(SimulatorLeafletMap, {
    pickup: simPickup.coords,
    dropoff: simDropoff.coords,
    pathPoints: simPathPoints,
    bikeCoord: currentSimBikeCoord,
    driverName: currentSimDriver.name,
    progress: simProgress,
    theme: mapTheme
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs font-mono"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-slate-400 text-[11px]"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDFE2 \u0627\u0633\u062A\u0644\u0627\u0645: ", simPickup.shortName), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD34 \u062A\u0633\u0644\u064A\u0645: ", simDropoff.shortName), /*#__PURE__*/React.createElement("span", {
    className: "text-amber-400 font-bold"
  }, "\uD83D\uDEF5 \u0627\u0644\u0633\u0627\u0626\u0642: ", currentSimDriver.name)), /*#__PURE__*/React.createElement("div", {
    className: "text-slate-500 text-[10px]"
  }, "\u062A\u0642\u062F\u0645 \u0627\u0644\u0645\u0633\u0627\u0631: ", /*#__PURE__*/React.createElement("strong", {
    className: "text-emerald-400"
  }, simProgress, "%")))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-3 glass-card rounded-3xl p-4 border border-slate-800 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold"
  }, "\uD83D\uDEF5"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "font-extrabold text-sm text-slate-100"
  }, "\u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0633\u0627\u0626\u0642"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-amber-400 font-bold"
  }, "\u062A\u0637\u0628\u064A\u0642 Livreur DZ"))), /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-emerald-400"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-300 mb-1"
  }, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0633\u0627\u0626\u0642 \u0644\u0644\u062A\u062C\u0631\u0628\u0629:"), /*#__PURE__*/React.createElement("select", {
    value: simDriverId,
    onChange: e => setSimDriverId(e.target.value),
    className: "w-full bg-slate-850 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-400"
  }, drivers.map(d => /*#__PURE__*/React.createElement("option", {
    key: d.id,
    value: d.id
  }, d.name, " (", d.vehicle_plate, ")")))), /*#__PURE__*/React.createElement("div", {
    className: "p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-700/80 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-slate-100 text-sm"
  }, currentSimDriver.name), /*#__PURE__*/React.createElement("span", {
    className: "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30"
  }, currentSimDriver.vehicle_plate)), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "\u0627\u0644\u0645\u0631\u0643\u0628\u0629:"), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-200 font-semibold"
  }, currentSimDriver.vehicle_model)), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-400 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", null, "\u0627\u0644\u0647\u0627\u062A\u0641:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-slate-200"
  }, currentSimDriver.phone)), /*#__PURE__*/React.createElement("div", {
    className: "text-xs flex items-center justify-between pt-2 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u0631\u0635\u064A\u062F \u0627\u0644\u0645\u062D\u0641\u0638\u0629 \u0627\u0644\u0641\u0639\u0644\u064A:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-black text-emerald-400 text-sm"
  }, currentSimDriver.wallet_balance.toFixed(2), " DZD"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-slate-200"
  }, "\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0648\u0627\u062C\u062F (En ligne):"), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
  }, "\u0645\u062A\u0635\u0644 \u0648\u0645\u062A\u0627\u062D \uD83D\uDFE2")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1.5 p-3 rounded-2xl bg-slate-900 border border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-300"
  }, "\u0645\u0624\u0634\u0631 \u062D\u0631\u0643\u0629 \u0627\u0644\u0633\u0627\u0626\u0642 \u0628\u0627\u0644\u062E\u0631\u064A\u0637\u0629:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-black text-amber-400"
  }, simProgress, "%")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "0",
    max: "100",
    value: simProgress,
    onChange: e => setSimProgress(parseInt(e.target.value)),
    className: "w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-[10px] text-slate-500 font-mono"
  }, /*#__PURE__*/React.createElement("span", null, "\u0646\u0642\u0637\u0629 \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 (0%)"), /*#__PURE__*/React.createElement("span", null, "\u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0648\u062C\u0647\u0629 (100%)"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onPickupParcel,
    className: "py-2.5 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-bold text-xs transition"
  }, "\uD83D\uDCE6 \u0627\u0633\u062A\u0644\u0645\u062A \u0627\u0644\u0637\u0631\u062F"), /*#__PURE__*/React.createElement("button", {
    onClick: onDeliverCash,
    className: "py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition shadow-lg shadow-emerald-500/20"
  }, "\u2705 \u062A\u0645 \u0627\u0644\u062A\u0633\u0644\u064A\u0645 \u0643\u0627\u0634")), /*#__PURE__*/React.createElement("div", {
    className: "pt-2 border-t border-slate-800"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold text-slate-400 block mb-2"
  }, "\uD83D\uDCDC \u0633\u062C\u0644 \u0623\u062D\u062F\u0627\u062B \u0627\u0644\u0633\u0627\u0626\u0642:"), /*#__PURE__*/React.createElement("div", {
    className: "max-h-36 overflow-y-auto space-y-1.5 text-[10px] font-mono"
  }, simDriverLogs.map((log, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-amber-400 ml-1"
  }, "[", log.time, "]"), " ", log.text)))))));
}

// =========================================================================
// 🗺️ LEAFLET MAP IMPLEMENTATIONS
// =========================================================================
// Map 1: Executive Dashboard Fleet Radar
function FleetRadarLeaflet({
  drivers,
  theme
}) {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const tileGroupRef = useRef(null);
  const markersRef = useRef([]);

  // Initialize Map Once
  useEffect(() => {
    if (!mapRef.current) return;
    if (!leafletMap.current) {
      const map = L.map(mapRef.current, {
        center: [36.7538, 3.0588], // Alger Centre
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        fadeAnimation: false
      });
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);
      tileGroupRef.current = L.layerGroup().addTo(map);
      leafletMap.current = map;
    }

    const map = leafletMap.current;

    // Trigger invalidation on layout settle
    const invalidate = () => {
      if (map) map.invalidateSize();
    };
    invalidate();
    const t1 = setTimeout(invalidate, 80);
    const t2 = setTimeout(invalidate, 250);
    const t3 = setTimeout(invalidate, 600);

    const ro = new ResizeObserver(() => {
      invalidate();
    });
    if (mapRef.current) ro.observe(mapRef.current);
    window.addEventListener('resize', invalidate);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      ro.disconnect();
      window.removeEventListener('resize', invalidate);
    };
  }, []);

  // Update Tiles when Theme changes
  useEffect(() => {
    if (!leafletMap.current || !tileGroupRef.current) return;
    tileGroupRef.current.clearLayers();

    if (theme === 'sat') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19
      }).addTo(tileGroupRef.current);
    } else if (theme === 'light') {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
      }).addTo(tileGroupRef.current);
    } else {
      // Dark theme: ArcGIS Dark Canvas Base + Reference labels
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18
      }).addTo(tileGroupRef.current);
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18
      }).addTo(tileGroupRef.current);
    }
  }, [theme]);

  // Update Driver Markers
  useEffect(() => {
    if (!leafletMap.current) return;
    const map = leafletMap.current;

    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    drivers.forEach(d => {
      const isOnline = d.is_online;
      const iconHtml = `
        <div class="relative flex flex-col items-center">
          <div class="w-8 h-8 rounded-full ${isOnline ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50 radar-pulse' : 'bg-slate-700'} border-2 border-white flex items-center justify-center text-xs text-white font-bold">
            🛵
          </div>
          <div class="mt-0.5 px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-slate-200 whitespace-nowrap shadow-md">
            ${d.name} ${isOnline ? '🟢' : ''}
          </div>
        </div>
      `;
      const icon = L.divIcon({
        html: iconHtml,
        className: 'custom-fleet-icon',
        iconSize: [40, 48],
        iconAnchor: [20, 24]
      });
      const marker = L.marker([d.lat, d.lng], {
        icon
      }).addTo(map);
      marker.bindPopup(`
        <div class="p-3 text-right font-sans text-xs space-y-1.5" style="min-width: 190px;">
          <div class="font-bold text-slate-100 text-sm">${d.name} (${d.vehicle_model})</div>
          <div class="text-slate-400 font-mono text-[11px]">${d.vehicle_plate}</div>
          <div class="text-emerald-400 font-mono font-bold">الرصيد: ${d.wallet_balance.toFixed(2)} DZD</div>
          <div class="pt-1.5 border-t border-slate-800">
            <a href="tel:${d.phone}" class="block text-center py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs">
              📞 اتصال مباشر
            </a>
          </div>
        </div>
      `);
      markersRef.current.push(marker);
    });
  }, [drivers]);

  return /*#__PURE__*/React.createElement("div", {
    ref: mapRef,
    style: { width: '100%', height: '100%', minHeight: '288px' },
    className: "w-full h-full"
  });
}

// Map 2: Simulator 3-Column Interactive Map
function SimulatorLeafletMap({
  pickup,
  dropoff,
  pathPoints,
  bikeCoord,
  driverName,
  progress,
  theme
}) {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const tileGroupRef = useRef(null);
  const polylineRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const dropoffMarkerRef = useRef(null);
  const bikeMarkerRef = useRef(null);

  // Initialize Map Once
  useEffect(() => {
    if (!mapRef.current) return;
    if (!leafletMap.current) {
      const map = L.map(mapRef.current, {
        center: [36.7538, 3.0588],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        fadeAnimation: false
      });
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map);
      tileGroupRef.current = L.layerGroup().addTo(map);
      leafletMap.current = map;
    }

    const map = leafletMap.current;
    const invalidate = () => {
      if (map) map.invalidateSize();
    };

    invalidate();
    const t1 = setTimeout(invalidate, 80);
    const t2 = setTimeout(invalidate, 250);
    const t3 = setTimeout(invalidate, 600);

    const ro = new ResizeObserver(() => {
      invalidate();
    });
    if (mapRef.current) ro.observe(mapRef.current);
    window.addEventListener('resize', invalidate);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      ro.disconnect();
      window.removeEventListener('resize', invalidate);
    };
  }, []);

  // Update Tiles when Theme changes
  useEffect(() => {
    if (!leafletMap.current || !tileGroupRef.current) return;
    tileGroupRef.current.clearLayers();

    if (theme === 'sat') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19
      }).addTo(tileGroupRef.current);
    } else if (theme === 'light') {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
      }).addTo(tileGroupRef.current);
    } else {
      // Dark theme: Base + Reference
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18
      }).addTo(tileGroupRef.current);
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18
      }).addTo(tileGroupRef.current);
    }
  }, [theme]);

  // Update Route Polyline & Pickup/Dropoff Markers (ONLY on route changes, NOT on progress changes!)
  useEffect(() => {
    if (!leafletMap.current || !pickup || !dropoff) return;
    const map = leafletMap.current;

    // Draw / Replace Polyline
    if (polylineRef.current) map.removeLayer(polylineRef.current);
    polylineRef.current = L.polyline(pathPoints, {
      color: '#0284c7',
      weight: 5,
      opacity: 0.9,
      dashArray: '8, 8',
      className: 'route-glow'
    }).addTo(map);

    // Pickup Marker (Green)
    if (pickupMarkerRef.current) map.removeLayer(pickupMarkerRef.current);
    const pickupIcon = L.divIcon({
      html: '<div class="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-sm shadow-xl radar-pulse">🟢</div>',
      className: 'custom-pin',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    pickupMarkerRef.current = L.marker(pickup, {
      icon: pickupIcon
    }).addTo(map);
    pickupMarkerRef.current.bindPopup('<div class="p-2 text-xs font-bold text-right text-emerald-400">نقطة الاستلام (Pickup)</div>');

    // Dropoff Marker (Red)
    if (dropoffMarkerRef.current) map.removeLayer(dropoffMarkerRef.current);
    const dropoffIcon = L.divIcon({
      html: '<div class="w-8 h-8 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center text-sm shadow-xl">🔴</div>',
      className: 'custom-pin',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    dropoffMarkerRef.current = L.marker(dropoff, {
      icon: dropoffIcon
    }).addTo(map);
    dropoffMarkerRef.current.bindPopup('<div class="p-2 text-xs font-bold text-right text-rose-400">وجهة التسليم (Dropoff)</div>');

    // Safe fitBounds after container size is guaranteed
    const applyBounds = () => {
      if (!map) return;
      map.invalidateSize();
      try {
        const bounds = L.latLngBounds([pickup, dropoff]);
        if (bounds.isValid()) {
          map.fitBounds(bounds, {
            padding: [50, 50],
            maxZoom: 15
          });
        }
      } catch (e) {
        console.warn('fitBounds error:', e);
      }
    };
    applyBounds();
    const tBounds = setTimeout(applyBounds, 120);
    return () => clearTimeout(tBounds);
  }, [pickup, dropoff, pathPoints]);

  // Update Moving Motorcycle Marker (smooth position update without remounting layers!)
  useEffect(() => {
    if (!leafletMap.current || !bikeCoord) return;
    const map = leafletMap.current;

    const bikeHtml = `
      <div class="relative flex flex-col items-center">
        <div class="w-9 h-9 rounded-full bg-amber-500 text-slate-950 border-2 border-white shadow-xl flex items-center justify-center text-sm font-black">
          🛵
        </div>
        <div class="mt-1 px-2 py-0.5 rounded-md bg-slate-900 border border-amber-500/40 text-[10px] font-bold text-amber-300 whitespace-nowrap shadow-md">
          السائق: ${driverName} (${progress}%)
        </div>
      </div>
    `;
    const bikeIcon = L.divIcon({
      html: bikeHtml,
      className: 'custom-bike-marker',
      iconSize: [42, 54],
      iconAnchor: [21, 27]
    });

    if (bikeMarkerRef.current) {
      bikeMarkerRef.current.setLatLng(bikeCoord);
      bikeMarkerRef.current.setIcon(bikeIcon);
    } else {
      bikeMarkerRef.current = L.marker(bikeCoord, {
        icon: bikeIcon
      }).addTo(map);
    }
  }, [bikeCoord, driverName, progress]);

  return /*#__PURE__*/React.createElement("div", {
    ref: mapRef,
    style: { width: '100%', height: '100%', minHeight: '480px' },
    className: "w-full h-full min-h-[480px]"
  });
}

// =========================================================================
// 🚀 MOUNT REACT ROOT
// =========================================================================
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render( /*#__PURE__*/React.createElement(App, null));
}