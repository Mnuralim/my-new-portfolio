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
    { category: "LANGUAGE", name: "JavaScript / TypeScript / Solidity" },
    { category: "BACKEND", name: "Node.js / Express.js / REST API" },
    { category: "BACKEND", name: "JWT Authentication" },
    { category: "FRONTEND", name: "React.js / Next.js" },
    { category: "FRONTEND", name: "TailwindCSS / Bootstrap / Zustand" },
    { category: "BLOCKCHAIN", name: "Smart Contract (Solidity)" },
    { category: "DATABASE", name: "MySQL / PostgreSQL" },
    { category: "DATABASE", name: "MongoDB / Firebase" },
    { category: "TOOLS", name: "Git / GitHub" },
    { category: "MOBILE", name: "React Native / Expo" },
    {
      category: "SERVER & INFRA",
      name: "Linux / Docker / Nginx / Proxmox VE / TrueNAS",
    },
    {
      category: "NETWORKING",
      name: "MikroTik RouterOS / TCP-IP / DHCP / DNS / NAT / VLAN / Firewall",
    },
  ];

  await prisma.skill.deleteMany();

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
      period: "2025 — PRESENT",
      company: "Self-Employed",
      type: "FREELANCE",
      role: "Freelance Web & Mobile Developer",
      description:
        "Develop dan deliver berbagai proyek web klien termasuk website profil sekolah, portal berita mahasiswa, sistem manajemen TV kabel, dan platform institusional. Build full-stack web application pakai Next.js, TypeScript, Prisma, MySQL/PostgreSQL. Develop cross-platform mobile app pakai React Native/Expo. Manage end-to-end development dari requirement gathering sampai deployment.",
      tags: ["NEXT.JS", "TYPESCRIPT", "PRISMA", "REACT NATIVE"],
    },
    {
      num: "02",
      period: "JULI 2025 — SEKARANG",
      company: "PT. Sumber Setia Budi",
      type: "FULL-TIME",
      role: "IT Staff & IT Programmer",
      description:
        "Troubleshoot dan repair laptop hardware/software, instalasi OS Windows & Linux, develop dan maintain aplikasi permintaan pengadaan, permintaan BBM, pencatatan jurnal kas dan incident report untuk departemen HSE. Manage web server dan file server pakai TrueNAS, serta konfigurasi router Mikrotik untuk network management.",
      tags: ["IT SUPPORT", "TRUENAS", "MIKROTIK", "SERVER MANAGEMENT"],
    },
    {
      num: "03",
      period: "SEP 2024 — DES 2024",
      company: "PT. Pilihanmu Indonesia Jaya",
      type: "INTERNSHIP",
      role: "Front-End Web Developer Intern",
      description:
        "Kolaborasi dengan PM dan UI/UX team untuk pengembangan produk. Refactor kode untuk meningkatkan maintainability dan performa. Integrasi Firebase sebagai dynamic CMS, unit testing, dan build UI berdasarkan desain Figma dengan presisi tinggi.",
      tags: ["REACT.JS", "FIREBASE", "FIGMA", "UNIT TESTING"],
    },
  ];

  await prisma.experience.deleteMany();

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
      tag: "FEATURED",
      tagColor: "accent",
      title: "E-Voting System Based on Blockchain",
      description:
        "Sistem e-voting berbasis blockchain yang aman dan transparan menggunakan Solidity smart contract dan NFT-based voter authentication. Tamper-proof, hanya voter whitelisted yang bisa berpartisipasi, hasil pemilu tetap transparan.",
      stack: ["SOLIDITY", "NEXT.JS", "SMART CONTRACT", "NFT"],
      href: "https://github.com/Mnuralim",
      featured: true,
      filter: "BLOCKCHAIN",
    },
    {
      num: "02",
      tag: "WEB DEV",
      tagColor: "accent",
      title: "Homeschooling Kak Seto",
      description:
        "Website profil untuk Homeschooling Kak Seto, institusi homeschooling terakreditasi A, dengan info program, lokasi cabang, showcase alumni, dan pendaftaran online calon siswa.",
      stack: ["NEXT.JS", "TYPESCRIPT", "PRISMA"],
      href: "https://github.com/Mnuralim",
      featured: false,
      filter: "WEB DEV",
    },
    {
      num: "03",
      tag: "IT INFRA",
      tagColor: "net",
      title: "Procurement App",
      description:
        "Sistem manajemen pengadaan dengan fitur purchase request, permintaan BBM, jurnal kas, dan multi-level approval workflow.",
      stack: ["NEXT.JS", "TYPESCRIPT", "MYSQL", "PRISMA"],
      href: "https://github.com/Mnuralim",
      featured: false,
      filter: "IT SUPPORT",
    },
    {
      num: "04",
      tag: "WEB DEV",
      tagColor: "accent",
      title: "LPMLT",
      description:
        "Portal berita mahasiswa dengan info kampus, update organisasi, dan berita edukasi — dirancang untuk penyampaian konten cepat dan akurat bagi mahasiswa Indonesia.",
      stack: ["NEXT.JS", "TYPESCRIPT", "POSTGRESQL"],
      href: "https://github.com/Mnuralim",
      featured: false,
      filter: "WEB DEV",
    },
    {
      num: "05",
      tag: "WEB DEV",
      tagColor: "accent",
      title: "MartabakTa",
      description:
        "Aplikasi food ordering yang support walk-in dan online ordering, dengan customer ordering, admin/kasir management, owner dashboard, dan integrasi pembayaran Midtrans.",
      stack: ["NEXT.JS", "TYPESCRIPT", "MIDTRANS", "PRISMA"],
      href: "https://github.com/Mnuralim",
      featured: false,
      filter: "WEB DEV",
    },
    {
      num: "06",
      tag: "IT INFRA",
      tagColor: "net",
      title: "Enterprise File Server Deployment",
      description:
        "Desain, deploy, dan administrasi file server TrueNAS terpusat untuk departemen Workshop, HSE, dan Warehouse — RAID storage, SMB/CIFS, shared folder, user permission, scheduled backup, dan storage monitoring.",
      stack: ["TRUENAS", "RAID", "SMB/CIFS"],
      href: "https://github.com/Mnuralim",
      featured: false,
      filter: "IT SUPPORT",
    },
    {
      num: "07",
      tag: "NETWORKING",
      tagColor: "net",
      title: "Enterprise Network Infrastructure Deployment",
      description:
        "Desain, konfigurasi, dan maintain infrastruktur jaringan berbasis MikroTik RouterOS untuk tiga departemen operasional (Workshop, HSE, Warehouse) — VLAN segmentation, DHCP, IP addressing, NAT, firewall rules dasar.",
      stack: ["MIKROTIK", "VLAN", "DHCP", "NAT"],
      href: "https://github.com/Mnuralim",
      featured: false,
      filter: "IT SUPPORT",
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

async function main() {
  await createAdmin();
  await createSkills();
  await createExperiences();
  await createProjects();
  await createServices();
  await createContactLinks();
  await createMikrotikPlaylist();
}

main()
  .catch((e) => {
    console.error("Error seeding data", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
