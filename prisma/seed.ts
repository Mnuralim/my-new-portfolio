import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

async function createAdmin() {
  console.log("Seeding admin...");

  const email = process.env.SEED_ADMIN_EMAIL || "admin@izzy.dev";
  const password = process.env.SEED_ADMIN_PASSWORD || "admin123";

  const existing = await prisma.admin.findUnique({ where: { email } });

  if (!existing) {
    const hashedPassword = await hash(password, 10);
    await prisma.admin.create({ data: { email, password: hashedPassword } });
    console.log(`Admin seeded: ${email}`);
  } else {
    console.log("Admin already exists. Skipping.");
  }
}

async function createSkills() {
  console.log("Seeding skills...");

  const data = [
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

  const count = await prisma.skill.count();
  if (count > 0) {
    console.log("Skills already exist. Skipping.");
    return;
  }

  await prisma.skill.createMany({
    data: data.map((d, i) => ({ ...d, order: i })),
  });
  console.log("Skills seeded.");
}

async function createExperiences() {
  console.log("Seeding experiences...");

  const data = [
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
  ];

  const count = await prisma.experience.count();
  if (count > 0) {
    console.log("Experiences already exist. Skipping.");
    return;
  }

  for (let i = 0; i < data.length; i++) {
    await prisma.experience.create({ data: { ...data[i], order: i } });
  }
  console.log("Experiences seeded.");
}

async function createProjects() {
  console.log("Seeding projects...");

  const data = [
    {
      num: "01",
      tag: "IT INFRA",
      tagColor: "net",
      title: "Permintaan Pengadaan Apps",
      description:
        "Aplikasi permintaan pengadaan, permintaan BBM, dan pencatatan jurnal kas.",
      stack: ["NEXT.JS", "Bun.JS", "MYSQL", "PRISMA"],
      href: "https://github.com/Mnuralim",
      featured: false,
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
      featured: false,
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
      featured: false,
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
      featured: false,
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
      featured: false,
      filter: "WEB DEV",
    },
  ];

  const count = await prisma.project.count();
  if (count > 0) {
    console.log("Projects already exist. Skipping.");
    return;
  }

  for (let i = 0; i < data.length; i++) {
    await prisma.project.create({ data: { ...data[i], order: i } });
  }
  console.log("Projects seeded.");
}

async function createServices() {
  console.log("Seeding services...");

  const data = [
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

  const count = await prisma.service.count();
  if (count > 0) {
    console.log("Services already exist. Skipping.");
    return;
  }

  for (let i = 0; i < data.length; i++) {
    await prisma.service.create({ data: { ...data[i], order: i } });
  }
  console.log("Services seeded.");
}

async function createContactLinks() {
  console.log("Seeding contact links...");

  const data = [
    { label: "EMAIL", href: "mailto:shadownur345@gmail.com" },
    {
      label: "LINKEDIN",
      href: "https://linkedin.com/in/muhamad-nur-fatahil-alim",
    },
    { label: "GITHUB", href: "https://github.com/Mnuralim" },
    { label: "WHATSAPP", href: "https://wa.me/6285176996948" },
  ];

  const count = await prisma.contactLink.count();
  if (count > 0) {
    console.log("Contact links already exist. Skipping.");
    return;
  }

  for (let i = 0; i < data.length; i++) {
    await prisma.contactLink.create({ data: { ...data[i], order: i } });
  }
  console.log("Contact links seeded.");
}

async function main() {
  await createAdmin();
  await createSkills();
  await createExperiences();
  await createProjects();
  await createServices();
  await createContactLinks();
}

main()
  .catch((e) => {
    console.error("Error seeding data", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
