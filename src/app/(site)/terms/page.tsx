import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../_components/ui/page-header";

export const metadata: Metadata = {
  title: "Ketentuan Penggunaan — Izzy Dev",
  description: "Aturan memakai izzy.my.id, termasuk aturan berkomentar.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-8 pt-12 pb-24 sm:pt-16">
      <PageHeader title="Ketentuan Penggunaan" intro="Terakhir diperbarui 8 November 2026." />

      <div className="prose-blog text-[1.05rem] leading-[1.8]" style={{ color: "var(--c-b5)" }}>
        <p>
          Dengan memakai izzy.my.id, kamu setuju dengan ketentuan di bawah ini. Cara data kamu disimpan
          dijelaskan terpisah di <Link href="/privacy">Kebijakan Privasi</Link>.
        </p>

        <h2>Isi tulisan dan tutorial</h2>
        <p>
          Tulisan di blog ini dibagikan untuk belajar, apa adanya. Konfigurasi jaringan, server, atau kode bisa
          berbeda hasilnya di lingkunganmu. Selalu uji dulu di lingkungan yang aman dan buat cadangan sebelum
          menerapkannya di sistem produksi. Pengelola tidak bertanggung jawab atas kerusakan atau kehilangan data
          akibat penerapan isi tulisan.
        </p>

        <h2>Hak cipta</h2>
        <p>
          Tulisan, gambar, dan desain situs ini milik pengelola. Kamu boleh mengutip sebagian tulisan dengan
          menyertakan tautan ke halaman aslinya. Menyalin seluruh tulisan tanpa izin tidak diperbolehkan.
        </p>

        <h2>Akun</h2>
        <p>
          Untuk berkomentar dan memberi suka, kamu login memakai akun Google atau GitHub. Kamu bertanggung jawab
          atas semua komentar yang dikirim dari akunmu.
        </p>

        <h2>Aturan berkomentar</h2>
        <p>Komentar akan dihapus tanpa pemberitahuan jika berisi:</p>
        <ul>
          <li>spam, promosi, atau tautan yang tidak berhubungan dengan tulisan;</li>
          <li>ujaran kebencian, SARA, pelecehan, atau ancaman;</li>
          <li>data pribadi orang lain tanpa izin;</li>
          <li>konten pornografi, perjudian, atau hal lain yang melanggar hukum Indonesia;</li>
          <li>kode berbahaya atau cara menyalahgunakan sistem milik orang lain.</li>
        </ul>
        <p>
          Kamu tetap pemilik komentarmu, tapi dengan mengirimnya kamu mengizinkan komentar itu ditampilkan di
          situs ini. Kamu bisa menghapus komentarmu sendiri kapan saja.
        </p>

        <h2>Tautan ke situs lain</h2>
        <p>
          Beberapa tulisan atau komentar bisa berisi tautan ke situs lain. Pengelola tidak bertanggung jawab atas
          isi atau kebijakan situs tersebut.
        </p>

        <h2>Perubahan dan hukum yang berlaku</h2>
        <p>
          Ketentuan ini bisa diperbarui sewaktu-waktu, dan tanggal di atas ikut berubah. Ketentuan ini tunduk
          pada hukum Republik Indonesia. Pertanyaan bisa disampaikan lewat <Link href="/#contact">halaman kontak</Link>.
        </p>
      </div>
    </article>
  );
}
