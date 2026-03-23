import type {
  Skill,
  Experience,
  Project,
  Service,
  ContactLink,
  BlogPost,
} from "../../types";

export const skills: Skill[] = [
  { category: "FRONTEND", name: "React / Next.js" },
  { category: "FRONTEND", name: "TailwindCSS / Bootstrap" },
  { category: "BACKEND", name: "Bun.js / Express.js" },
  { category: "BACKEND", name: "JWT / Prisma / Sequelize" },
  { category: "DATABASE", name: "MySQL / PostgreSQL" },
  { category: "DATABASE", name: "MongoDB / Firebase" },
  { category: "LANGUAGE", name: "JavaScript / TypeScript" },
  { category: "BLOCKCHAIN", name: "Solidity / Smart Contract" },
  { category: "IT SUPPORT", name: "Windows / Linux" },
  { category: "TESTING", name: "Jest / Unit Testing" },
  { category: "TOOLS", name: "Git / GitHub" },
  { category: "CLOUD", name: "AWS Cloud Basics" },
];

export const experiences: Experience[] = [
  {
    num: "01",
    period: "2025 — NOW",
    company: "PT. Sumber Setia Budi",
    type: "FULL-TIME",
    role: "IT Staff & IT Programmer",
    description:
      "Troubleshoot dan repair laptop hardware/software, instalasi OS Windows & Linux, develop dan maintain aplikasi permintaan pengadaan, permintaan BBM, pencatatan jurnal kas dan incident report untuk departemen HSE. Manage dan maintain application server untuk memastikan uptime sistem.",
    tags: ["IT SUPPORT", "NEXT.JS", "BUN.JS", "SERVER MANAGEMENT"],
  },
  {
    num: "02",
    period: "SEP 2024 — DES 2024",
    company: "PT. Pilihanmu Indonesia Jaya",
    type: "INTERNSHIP",
    role: "Front-End Web Developer Intern",
    description:
      "Kolaborasi dengan PM dan UI/UX team untuk pengembangan produk. Refactor kode untuk meningkatkan maintainability dan performa. Integrasi Firebase sebagai dynamic CMS, unit testing, dan build UI berdasarkan desain Figma dengan presisi tinggi.",
    tags: ["REACT.JS", "FIREBASE", "FIGMA", "UNIT TESTING"],
  },
  // {
  //   num: "03",
  //   period: "2023 — 2024",
  //   company: "Binar Academy",
  //   type: "CONTRACT",
  //   role: "Fullstack Web Development Bootcamp",
  //   description:
  //     "Menyelesaikan program Fullstack Web Development Wave 5 di Binar Academy. Memperdalam skill frontend dan backend development secara intensif melalui project-based learning.",
  //   tags: ["FULLSTACK", "REACT.JS", "Bun.JS", "POSTGRESQL"],
  // },
];

export const projects: Project[] = [
  {
    num: "01",
    tag: "WEB DEV",
    tagColor: "accent",
    title: "Permintaan Pengadaan Apps",
    description:
      "Aplikasi permintaan pengadaan, permintaan BBM, dan pencatatan jurnal kas.",
    stack: ["NEXT.JS", "Bun.JS", "MYSQL", "PRISMA"],
    href: "https://github.com/Mnuralim",
    featured: true,
  },
  {
    num: "02",
    tag: "WEB DEV",
    tagColor: "accent",
    title: "Preducation Platform",
    description:
      "Admin dashboard dan landing page untuk platform kursus video online Preducation, lengkap dengan RESTful API untuk autentikasi, enrollment, dan progress tracking.",
    stack: ["NEXT.JS", "EXPRESS.JS", "POSTGRESQL", "JWT"],
    href: "https://github.com/Mnuralim",
  },
  {
    num: "03",
    tag: "FEATURED",
    tagColor: "accent",
    title: "E-Voting System Based on Blockchain",
    description:
      "Sistem e-voting berbasis blockchain yang aman dan transparan menggunakan Solidity smart contract dan NFT-based voter authentication.",
    stack: ["SOLIDITY", "NEXT.JS", "SMART CONTRACT", "NFT"],
    href: "https://github.com/Mnuralim",
  },
];

export const allProjects: (Project & { filter: string })[] = [
  {
    num: "01",
    tag: "IT INFRA",
    tagColor: "net",
    title: "Permintaan Pengadaan Apps",
    description:
      "Aplikasi permintaan pengadaan, permintaan BBM, dan pencatatan jurnal kas.",
    stack: ["NEXT.JS", "Bun.JS", "MYSQL", "PRISMA"],
    href: "https://github.com/Mnuralim",
    filter: "IT SUPPORT",
  },
  {
    num: "02",
    tag: "WEB DEV",
    tagColor: "accent",
    title: "Preducation Platform",
    description:
      "Admin dashboard dan landing page untuk platform kursus video online Preducation, lengkap dengan RESTful API untuk autentikasi, enrollment, dan progress tracking.",
    stack: ["NEXT.JS", "EXPRESS.JS", "POSTGRESQL", "JWT"],
    href: "https://github.com/Mnuralim",
    filter: "WEB DEV",
  },
  {
    num: "03",
    tag: "FEATURED",
    tagColor: "accent",
    title: "E-Voting System Based on Blockchain",
    description:
      "Sistem e-voting berbasis blockchain yang aman dan transparan menggunakan Solidity smart contract dan NFT-based voter authentication.",
    stack: ["SOLIDITY", "NEXT.JS", "SMART CONTRACT", "NFT"],
    href: "https://github.com/Mnuralim",
    featured: true,
    filter: "BLOCKCHAIN",
  },

  {
    num: "04",
    tag: "WEB DEV",
    tagColor: "accent",
    title: "Instagram & TikTok Clone",
    description:
      "Clone Instagram untuk berbagi foto/video dan clone TikTok untuk multimedia content — fullstack development frontend dan backend.",
    stack: ["NEXT.JS", "Bun.JS", "MONGODB", "SOCKET.IO"],
    href: "https://github.com/Mnuralim",
    filter: "WEB DEV",
  },
  {
    num: "05",
    tag: "BLOCKCHAIN",
    tagColor: "purple",
    title: "Blockchain Transaction Bots",
    description:
      "Bot otomatisasi transaksi di berbagai blockchain network dan interaksi smart contract untuk berbagai kebutuhan.",
    stack: ["SOLIDITY", "WEB3.JS", "Bun.JS", "SMART CONTRACT"],
    href: "https://github.com/Mnuralim",
    filter: "BLOCKCHAIN",
  },
  {
    num: "06",
    tag: "WEB DEV",
    tagColor: "accent",
    title: "WhatsApp Clone",
    description:
      "Redesign WhatsApp Clone dengan fokus pada kemampuan real-time messaging menggunakan WebSocket.",
    stack: ["NEXT.JS", "SOCKET.IO", "Bun.JS", "MONGODB"],
    href: "https://github.com/Mnuralim",
    filter: "WEB DEV",
  },
];

export const services: Service[] = [
  {
    icon: "</>",
    title: "Web Development",
    description:
      "Bikin web app fullstack dari nol — landing page, dashboard, platform, sampai sistem manajemen. Responsive, scalable, dan production-ready.",
  },
  {
    icon: "#",
    title: "IT Support & Helpdesk",
    description:
      "Troubleshoot hardware/software, instalasi OS Windows & Linux, dan pemeliharaan perangkat untuk kelancaran operasional kantor.",
  },
  {
    icon: "⬡",
    title: "Blockchain Development",
    description:
      "Develop smart contract Solidity, NFT, dan sistem berbasis blockchain untuk kebutuhan voting, transaksi, dan otomatisasi.",
  },
  {
    icon: "↻",
    title: "Server & App Maintenance",
    description:
      "Manage dan maintain application server, backup data, monitoring uptime, dan pastikan sistem berjalan 24/7.",
  },
];

export const contactLinks: ContactLink[] = [
  { label: "EMAIL", href: "mailto:shadownur345@gmail.com" },
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/in/muhamad-nur-fatahil-alim",
  },
  { label: "GITHUB", href: "https://github.com/Mnuralim" },
  { label: "WHATSAPP", href: "https://wa.me/6285176996948" },
];

export const latestPosts: BlogPost[] = [
  // {
  //   num: "01",
  //   tag: "FEATURED",
  //   tagColor: "accent",
  //   title: "Cara Bikin Email Server Sendiri di VPS dengan Postfix & Dovecot",
  //   description:
  //     "Step-by-step setup mail server dari nol — konfigurasi DNS, SSL, spam filter, sampai bisa kirim & terima email pakai domain sendiri.",
  //   date: "12 MAR 2026",
  //   readTime: "15 MIN READ",
  //   views: "1.2K VIEWS",
  //   href: "#",
  //   featured: true,
  // },
  // {
  //   num: "02",
  //   tag: "IT SUPPORT",
  //   tagColor: "it",
  //   title: "Cara Install Ulang Windows 11 yang Bersih Tanpa Bloatware",
  //   description:
  //     "Panduan lengkap dari bikin bootable USB sampai aktivasi, bersih tanpa software bawaan yang ga perlu.",
  //   date: "02 MAR 2026",
  //   readTime: "8 MIN READ",
  //   views: "980 VIEWS",
  //   href: "#",
  // },
  // {
  //   num: "03",
  //   tag: "NETWORKING",
  //   tagColor: "net",
  //   title: "Setup MikroTik untuk Jaringan Kantor Kecil dari Nol",
  //   description:
  //     "Konfigurasi dasar MikroTik: DHCP, firewall rules, bandwidth management, dan hotspot sederhana.",
  //   date: "18 FEB 2026",
  //   readTime: "12 MIN READ",
  //   views: "750 VIEWS",
  //   href: "#",
  // },
  // {
  //   num: "04",
  //   tag: "WEB DEV",
  //   tagColor: "accent",
  //   title: "Deploy Next.js ke VPS Sendiri pakai Nginx & PM2",
  //   description:
  //     "Dari build production sampai live di domain sendiri — termasuk SSL gratis dengan Certbot.",
  //   date: "05 FEB 2026",
  //   readTime: "10 MIN READ",
  //   views: "620 VIEWS",
  //   href: "#",
  // },
];

export const stats = [
  { num: "1+", label: "YEARS EXP" },
  { num: "10+", label: "PROJECTS DONE" },
  { num: "100%", label: "PROBLEM SOLVED" },
];
