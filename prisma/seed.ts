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

export async function createSkills() {
  console.log("Seeding skills...");

  const data = [
    {
      category: "NETWORKING",
      name: "MikroTik RouterOS / VLAN / WireGuard VPN / TCP-IP / DHCP / DNS / NAT / Firewall",
    },
    {
      category: "CISCO IOS (LAB)",
      name: "Switching / Routing / OSPF",
    },
    {
      category: "SERVER & INFRA",
      name: "Linux / Proxmox VE / TrueNAS / RAID / SMB-CIFS / Backup & Monitoring",
    },
    {
      category: "DEVOPS",
      name: "Git / GitHub / Docker / Nginx",
    },
    {
      category: "LANGUAGE",
      name: "JavaScript / TypeScript / Solidity",
    },
    {
      category: "BACKEND",
      name: "Node.js / Express.js / REST API / JWT Authentication",
    },
    {
      category: "FRONTEND",
      name: "React.js / Next.js / TailwindCSS / Bootstrap / Zustand",
    },
    {
      category: "DATABASE",
      name: "MySQL / PostgreSQL / MongoDB / Firebase / Prisma ORM",
    },
    {
      category: "MOBILE",
      name: "React Native / Expo",
    },
    {
      category: "BLOCKCHAIN",
      name: "Solidity Smart Contracts",
    },
  ];

  await prisma.skill.deleteMany();

  await prisma.skill.createMany({
    data: data.map((d, i) => ({ ...d, order: i })),
  });
  console.log("Skills seeded.");
}

export async function createExperiences() {
  console.log("Seeding experiences...");

  const data = [
    {
      num: "01",
      period: "JUL 2025 — PRESENT",
      company: "PT. Sumber Setia Budi",
      type: "FULL-TIME",
      role: "IT Staff & IT Programmer",
      description:
        "Pegang jaringan MikroTik dua site (office & workshop) yang terhubung WireGuard site-to-site VPN dan dipecah jadi 11 VLAN — DHCP, NAT, firewall per-VLAN, dan troubleshooting buat ~50 user di 8 departemen. Operasikan file server TrueNAS 4 TB (mirrored, ~2 TB usable) dengan SMB/CIFS, permission per departemen, scheduled backup, dan storage monitoring. Administrasi server aplikasi & web Linux di production. Bangun dan maintain aplikasi pengadaan & permintaan BBM yang dipakai ~50 karyawan di 8 departemen — approval berjenjang yang dulu makan waktu berhari-hari sekarang beres secara digital. Develop aplikasi incident report HSE, plus IT support harian (hardware, software, instalasi Windows & Linux).",
      tags: ["MIKROTIK", "WIREGUARD", "VLAN", "TRUENAS", "LINUX", "NEXT.JS"],
    },
    {
      num: "02",
      period: "2025 — PRESENT",
      company: "Self-Employed",
      type: "FREELANCE",
      role: "Freelance Web & Mobile Developer",
      description:
        "Deliver lima produk yang sekarang live di production: portal pers mahasiswa (LPMLT), website profil sekolah dengan custom CMS, aplikasi food ordering (MartabakTa), sistem POS dengan rotasi stok FEFO, dan platform institusional pendukung. Build full-stack app pakai Next.js, TypeScript, Prisma, MySQL/PostgreSQL, dan mobile app cross-platform pakai React Native/Expo. Implementasi FEFO (First-Expired-First-Out) di POS supaya barang yang mendekati kedaluwarsa keluar duluan. Pegang tiap project end to end, dari requirement sampai deploy dan maintenance.",
      tags: ["NEXT.JS", "TYPESCRIPT", "PRISMA", "REACT NATIVE"],
    },
    {
      num: "03",
      period: "SEP 2024 — DEC 2024",
      company: "PT. Pilihanmu Indonesia Jaya",
      type: "INTERNSHIP",
      role: "Front-End Web Developer Intern",
      description:
        "Build UI dari desain Figma dengan presisi tinggi, kerja langsung bareng Product Manager dan tim UI/UX. Integrasi client-side app dengan Firebase sebagai dynamic CMS buat admin. Refactor dan optimasi kode untuk maintainability, performa, dan skalabilitas, plus nulis unit test biar codebase tetap stabil.",
      tags: ["REACT.JS", "FIREBASE", "FIGMA", "UNIT TESTING"],
    },
  ];

  await prisma.experience.deleteMany();

  for (let i = 0; i < data.length; i++) {
    await prisma.experience.create({ data: { ...data[i], order: i } });
  }
  console.log("Experiences seeded.");
}

export async function createProjects() {
  console.log("Seeding projects...");

  const data = [
    {
      num: "01",
      tag: "NETWORKING",
      tagColor: "net",
      title: "Enterprise Network Infrastructure",
      description:
        "Desain dan deploy jaringan MikroTik RouterOS di dua site yang terhubung WireGuard site-to-site VPN, dipecah jadi 11 VLAN berdasarkan trust boundary (management, office LAN/WiFi, finance, workshop LAN/WiFi, server, guest per site, CCTV/IoT) — lengkap dengan firewall per-VLAN, guest isolation, dan addressing plan yang terdokumentasi.",
      stack: ["MIKROTIK", "WIREGUARD", "VLAN", "FIREWALL"],
      href: null,
      featured: false,
      filter: "IT SUPPORT",
    },
    {
      num: "02",
      tag: "IT INFRA",
      tagColor: "net",
      title: "Enterprise File Server Deployment",
      description:
        "Desain dan deploy file server TrueNAS 4 TB (mirrored, ~2 TB usable), awalnya untuk Workshop, HSE, dan Warehouse lalu diperluas ke 8 departemen — RAID storage, SMB/CIFS, permission per user, scheduled backup, dan storage monitoring.",
      stack: ["TRUENAS", "RAID", "SMB/CIFS", "BACKUP"],
      href: null,
      featured: false,
      filter: "IT SUPPORT",
    },
    {
      num: "03",
      tag: "IT INFRA",
      tagColor: "net",
      title: "Procurement & Fuel Request App",
      description:
        "Purchase request, permintaan BBM, jurnal kas, dan approval berjenjang untuk operasional 8 departemen — dipakai ~50 karyawan, menggantikan form kertas yang harus diantar ke tiap approver.",
      stack: ["NEXT.JS", "TYPESCRIPT", "PRISMA", "MYSQL"],
      href: null,
      featured: false,
      filter: "IT SUPPORT",
    },
    {
      num: "04",
      tag: "FEATURED",
      tagColor: "accent",
      title: "E-Voting System Based on Blockchain",
      description:
        "Tugas akhir: sistem e-voting berbasis Solidity smart contract dengan autentikasi voter berbasis NFT dan teknik kriptografi — hanya voter whitelisted yang bisa ikut, hasil tetap tamper-proof dan bisa diverifikasi publik. Dipublikasikan di jurnal semanTIK (SINTA 3).",
      stack: ["SOLIDITY", "NEXT.JS", "SMART CONTRACT", "NFT"],
      href: null,
      featured: true,
      filter: "BLOCKCHAIN",
    },
    {
      num: "05",
      tag: "WEB DEV",
      tagColor: "accent",
      title: "Homeschooling Kak Seto",
      description:
        "Website profil dan custom CMS untuk institusi homeschooling terakreditasi A — info program, lokasi cabang, showcase alumni, dan pendaftaran online calon siswa.",
      stack: ["NEXT.JS", "TYPESCRIPT", "PRISMA", "POSTGRESQL"],
      href: null,
      featured: false,
      filter: "WEB DEV",
    },
    {
      num: "06",
      tag: "WEB DEV",
      tagColor: "accent",
      title: "MartabakTa",
      description:
        "Aplikasi food ordering untuk pesanan walk-in dan online — customer ordering, manajemen kasir & admin, owner dashboard, dan integrasi pembayaran Midtrans.",
      stack: ["NEXT.JS", "TYPESCRIPT", "MIDTRANS", "PRISMA"],
      href: null,
      featured: false,
      filter: "WEB DEV",
    },
    {
      num: "07",
      tag: "WEB DEV",
      tagColor: "accent",
      title: "POS with FEFO Stock Rotation",
      description:
        "Sistem point-of-sale yang melacak tanggal kedaluwarsa dan menerapkan picking First-Expired-First-Out, jadi stok yang mendekati expired terjual duluan sebelum harus dibuang.",
      stack: ["NEXT.JS", "TYPESCRIPT", "PRISMA", "MYSQL"],
      href: null,
      featured: false,
      filter: "WEB DEV",
    },
    {
      num: "08",
      tag: "WEB DEV",
      tagColor: "accent",
      title: "LPMLT",
      description:
        "Portal pers mahasiswa yang menyajikan info kampus, update organisasi, dan berita edukasi untuk pembaca universitas.",
      stack: ["NEXT.JS", "TYPESCRIPT", "PRISMA", "POSTGRESQL"],
      href: null,
      featured: false,
      filter: "WEB DEV",
    },
  ];

  await prisma.project.deleteMany();

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
      title: "Web & Mobile Development",
      description:
        "Bikin web app fullstack dan mobile app cross-platform dari nol — landing page, dashboard, platform, sampai sistem manajemen. Responsive, scalable, dan production-ready.",
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
      icon: "☰",
      title: "Network & Infrastructure",
      description:
        "Konfigurasi dan maintain jaringan MikroTik RouterOS, VLAN, firewall, serta deploy file/web server pakai TrueNAS dan Proxmox VE.",
    },
    {
      icon: "↻",
      title: "Server & App Maintenance",
      description:
        "Manage dan maintain application server, backup data, monitoring uptime, dan pastikan sistem berjalan 24/7.",
    },
  ];

  await prisma.service.deleteMany();

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
    { label: "WEBSITE", href: "https://izzy.my.id" },
  ];

  await prisma.contactLink.deleteMany();

  for (let i = 0; i < data.length; i++) {
    await prisma.contactLink.create({ data: { ...data[i], order: i } });
  }
  console.log("Contact links seeded.");
}

async function createMikrotikPlaylist() {
  console.log("Seeding mikrotik playlist...");

  const playlist = await prisma.playlist.findUnique({
    where: { slug: "belajar-mikrotik" },
  });
  if (!playlist) {
    console.log("Mikrotik playlist not found. Skipping post seed.");
    return;
  }

  const posts = [
    {
      slug: "pengenalan-dasar-mikrotik-routeros",
      num: "01",
      tag: "NETWORKING",
      tagColor: "net",
      title: "Pengenalan Dasar Mikrotik & RouterOS",
      description:
        "Kenalan sama Mikrotik RouterOS — apa itu, kenapa banyak dipakai buat networking, dan cara akses pertama kali lewat Winbox.",
      content:
        "# Pengenalan Dasar Mikrotik & RouterOS\n\nMikrotik adalah perangkat jaringan yang menjalankan sistem operasi RouterOS, dipakai luas buat routing, firewall, dan manajemen bandwidth.\n\n## Kenapa Mikrotik?\n\n- Harga terjangkau\n- Fitur lengkap (routing, firewall, VPN, hotspot)\n- Konfigurasi fleksibel lewat Winbox, WebFig, atau CLI\n\n## Akses Pertama Kali\n\n1. Colok kabel LAN ke port Mikrotik\n2. Buka Winbox, cari device via MAC address\n3. Login default `admin` tanpa password\n4. Reset konfigurasi ke default kalau perlu\n\nDi tutorial berikutnya kita bahas konfigurasi dasar routing.",
      date: "2026-01-10",
      readTime: "5 min",
      views: "0",
      featured: false,
      order: 100,
    },
    {
      slug: "konfigurasi-dasar-routing-mikrotik",
      num: "02",
      tag: "NETWORKING",
      tagColor: "net",
      title: "Konfigurasi Dasar Routing di Mikrotik",
      description:
        "Setup IP address, DHCP client/server, dan NAT masquerade biar router Mikrotik bisa langsung dipakai internetan.",
      content:
        "# Konfigurasi Dasar Routing di Mikrotik\n\nSetelah kenal RouterOS, saatnya setup routing dasar biar jaringan bisa connect ke internet.\n\n## Set IP Address\n\n```\n/ip address add address=192.168.88.1/24 interface=ether2\n```\n\n## DHCP Client di WAN\n\n```\n/ip dhcp-client add interface=ether1 disabled=no\n```\n\n## DHCP Server di LAN\n\nGunakan DHCP Setup Wizard buat auto-assign IP ke client.\n\n## NAT Masquerade\n\n```\n/ip firewall nat add chain=srcnat out-interface=ether1 action=masquerade\n```\n\nDengan ini, semua device di LAN udah bisa akses internet lewat router Mikrotik.",
      date: "2026-01-17",
      readTime: "7 min",
      views: "0",
      featured: false,
      order: 101,
    },
    {
      slug: "firewall-dan-bandwidth-management-mikrotik",
      num: "03",
      tag: "NETWORKING",
      tagColor: "net",
      title: "Firewall & Bandwidth Management di Mikrotik",
      description:
        "Amankan jaringan pakai firewall filter rules dan atur pembagian bandwidth per user pakai simple queue.",
      content:
        "# Firewall & Bandwidth Management di Mikrotik\n\nRouter yang aman dan bandwidth yang rapi adalah kunci jaringan yang stabil.\n\n## Firewall Filter Dasar\n\n```\n/ip firewall filter add chain=input action=drop connection-state=invalid\n/ip firewall filter add chain=input action=accept connection-state=established,related\n```\n\n## Blokir Akses dari WAN\n\n```\n/ip firewall filter add chain=input in-interface=ether1 action=drop\n```\n\n## Bandwidth Management dengan Simple Queue\n\n```\n/queue simple add name=user1 target=192.168.88.10/32 max-limit=5M/5M\n```\n\nDengan kombinasi firewall dan queue, jaringan jadi lebih aman dan bandwidth terbagi rata ke semua user.",
      date: "2026-01-24",
      readTime: "8 min",
      views: "0",
      featured: false,
      order: 102,
    },
  ];

  for (const post of posts) {
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
    });
    const blogPost =
      existingPost ?? (await prisma.blogPost.create({ data: post }));

    const existingLink = await prisma.blogPostPlaylist.findUnique({
      where: {
        blogPostId_playlistId: {
          blogPostId: blogPost.id,
          playlistId: playlist.id,
        },
      },
    });
    if (!existingLink) {
      await prisma.blogPostPlaylist.create({
        data: { blogPostId: blogPost.id, playlistId: playlist.id },
      });
    }
  }

  console.log("Mikrotik posts seeded and linked to playlist.");
}

export async function createCredentials() {
  console.log("Seeding credentials...");

  const data = [
    {
      kind: "EDUCATION",
      title: "S1 Computer Science",
      issuer: "Universitas Sembilanbelas November Kolaka",
      period: "2021 — 2025",
      note: "GPA 3.84",
    },
    {
      kind: "EDUCATION",
      title: "Senior High School, Majoring in Science",
      issuer: "SMA Negeri 2 Cilacap",
      period: "2018 — 2020",
      note: null,
    },
    {
      kind: "CERTIFICATION",
      title: "Cloud Practitioner Essentials: Learn AWS Cloud Basics",
      issuer: "Dicoding Indonesia · IDCAMP 2023",
      period: "Feb 2023",
      note: "MRZM8K8J0ZYQ",
      url: "https://www.dicoding.com/certificates/MRZM8K8J0ZYQ",
    },
    {
      kind: "CERTIFICATION",
      title: "Learn to Make Back-End Applications for Beginners",
      issuer: "Dicoding Indonesia · IDCAMP 2023",
      period: "Feb 2023",
      note: "81P28O2N8POY",
      url: "https://www.dicoding.com/certificates/81P28O2N8POY",
    },
    {
      kind: "CERTIFICATION",
      title: "Learn JavaScript Programming Basics",
      issuer: "Dicoding Indonesia · IDCAMP 2022",
      period: "Oct 2022",
      note: "07Z6G50Q2XQR",
      url: "https://www.dicoding.com/certificates/07Z6G50Q2XQR",
    },
    {
      kind: "CERTIFICATION",
      title: "Fullstack Web Development Wave 5",
      issuer: "Binar Academy",
      period: "2023",
      note: "FSW2308KM5043",
    },
    {
      kind: "CERTIFICATION",
      title: "MSIB Batch 7 — Front-End Web Developer Internship",
      issuer: "PT. Pilihanmu Indonesia Jaya",
      period: "Sep — Dec 2024",
      note: "10227416",
    },
    {
      kind: "PUBLICATION",
      title:
        "Perancangan dan Implementasi Sistem E-Voting Menggunakan Teknologi Blockchain dan Smart Contract",
      issuer: "semanTIK, Universitas Halu Oleo",
      period: null,
      note: "SINTA 3 accredited journal",
    },
  ];

  await prisma.credential.deleteMany();

  for (let i = 0; i < data.length; i++) {
    await prisma.credential.create({ data: { ...data[i], order: i } });
  }
  console.log("Credentials seeded.");
}

export async function createCvs() {
  console.log("Seeding CVs...");

  // placeholder pointing at the bundled file; upload the real PDFs via /admin/cv
  await prisma.cv.deleteMany();
  await prisma.cv.create({
    data: { title: "CV", fileUrl: "/cv.pdf", order: 0 },
  });
  console.log("CVs seeded.");
}

async function main() {
  await createAdmin();
  await createSkills();
  await createExperiences();
  await createProjects();
  await createServices();
  await createContactLinks();
  await createCredentials();
  await createCvs();
  await createMikrotikPlaylist();
}

// guard so createCredentials can be run alone without wiping other tables
if (process.argv[1]?.endsWith("seed.ts"))
  main()
    .catch((e) => {
      console.error("Error seeding data", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
