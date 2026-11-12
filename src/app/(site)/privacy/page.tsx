import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../_components/ui/page-header";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Izzy Dev",
  description: "Data apa yang disimpan izzy.my.id, untuk apa, dan cara menghapusnya.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-8 pt-12 pb-24 sm:pt-16">
      <PageHeader title="Kebijakan Privasi" intro="Terakhir diperbarui 12 November 2026." />

      <div className="prose-blog text-[1.05rem] leading-[1.8]" style={{ color: "var(--c-b5)" }}>
        <p>
          Halaman ini menjelaskan data apa yang disimpan oleh izzy.my.id (dikelola oleh Muhamad Nur Fatahil
          Alim), untuk apa data itu dipakai, dan bagaimana kamu bisa menghapusnya. Situs ini tidak menjual data
          dan tidak memasang iklan.
        </p>

        <h2>Data yang disimpan</h2>
        <h3>Saat kamu login untuk berkomentar atau memberi suka</h3>
        <ul>
          <li>
            <strong>Login dengan Google:</strong> ID akun Google, nama, foto profil, dan alamat email (hanya jika
            sudah diverifikasi Google).
          </li>
          <li>
            <strong>Login dengan GitHub:</strong> ID akun GitHub, nama atau username, dan foto profil. Email tidak
            diminta.
          </li>
          <li>Komentar, balasan, dan suka yang kamu berikan, beserta waktunya.</li>
        </ul>
        <p>
          Situs ini tidak pernah menerima password akunmu, dan tidak meminta akses ke data lain seperti kontak,
          file, atau repository.
        </p>

        <h3>Saat kamu membaca tulisan</h3>
        <p>
          Untuk menghitung berapa kali sebuah tulisan dibaca, situs menyimpan ID acak di cookie dan mencatat
          ID tersebut sekali per tulisan per hari. ID ini tidak terhubung ke nama, email, atau alamat IP.
        </p>

        <h3>Saat kamu berlangganan newsletter</h3>
        <p>Alamat email yang kamu isi, hanya untuk mengirim kabar tulisan baru.</p>

        <h2>Untuk apa data dipakai</h2>
        <ul>
          <li>Nama dan foto profil ditampilkan di samping komentarmu.</li>
          <li>Email tidak pernah ditampilkan publik. Email hanya dipakai jika perlu menghubungimu soal komentar atau akunmu.</li>
          <li>Hitungan pembaca dan suka ditampilkan sebagai angka total di setiap tulisan.</li>
        </ul>

        <h2>Cookie</h2>
        <ul>
          <li>
            <code>user_session</code>: menjaga kamu tetap login, berlaku 30 hari atau sampai kamu keluar.
          </li>
          <li>
            <code>oauth_state</code>: pengaman saat proses login, berlaku 10 menit.
          </li>
          <li>
            <code>vid</code>: ID acak untuk hitungan pembaca, berlaku 1 tahun.
          </li>
          <li>Pilihan tema terang atau gelap disimpan di browsermu (localStorage), tidak dikirim ke server.</li>
        </ul>
        <p>Tidak ada cookie iklan atau pelacak dari pihak ketiga.</p>

        <h2>Layanan pihak ketiga</h2>
        <ul>
          <li>Google dan GitHub, untuk proses login.</li>
          <li>Cloudflare, untuk jaringan dan keamanan situs.</li>
          <li>ImageKit, untuk menyimpan dan menampilkan gambar.</li>
        </ul>

        <h2>Berapa lama data disimpan</h2>
        <p>
          Data akun dan komentar disimpan selama akunmu ada. Kamu bisa menghapus komentarmu sendiri kapan saja
          lewat tombol Hapus. Catatan hitungan pembaca tidak berisi data pribadi.
        </p>

        <h2>Hak kamu</h2>
        <p>
          Sesuai UU Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, kamu bisa meminta salinan datamu,
          meminta perbaikan, atau meminta akun beserta seluruh komentarmu dihapus. Hubungi lewat salah satu
          kontak di <Link href="/#contact">halaman kontak</Link>, dan permintaan akan diproses paling lambat 14
          hari.
        </p>

        <h2>izzy office</h2>
        <p>
          izzy office adalah alat pribadi untuk satu pengguna, yaitu pemilik situs ini, yang berjalan di{" "}
          <code>office.izzy.my.id</code> dan dilindungi login. Alat ini dipakai untuk mengunggah video edukasi
          milik saya sendiri ke akun TikTok, YouTube, dan Instagram saya sendiri, setelah saya setujui. izzy
          office tidak dipakai oleh orang lain dan tidak mengakses akun orang lain.
        </p>

        <h3>Data yang diakses</h3>
        <ul>
          <li>
            <strong>TikTok</strong> (Login Kit dan Content Posting API; scope <code>user.info.basic</code>,{" "}
            <code>video.upload</code>, <code>video.publish</code>): open ID dan nama tampilan akun saya, info
            kreator (opsi privasi) yang dibutuhkan untuk memposting, serta mengunggah video dan caption saya.
          </li>
          <li>
            <strong>YouTube Data API</strong> (scope <code>youtube.upload</code> dan <code>youtube.readonly</code>):
            ID dan nama channel saya, serta mengunggah video beserta judul dan deskripsinya.
          </li>
          <li>
            <strong>Instagram/Meta</strong> (<code>instagram_basic</code>, <code>instagram_content_publish</code>,{" "}
            <code>instagram_manage_comments</code>): ID dan username akun Instagram saya, serta memposting Reels
            dan caption.
          </li>
        </ul>

        <h3>Untuk apa data dipakai</h3>
        <p>
          Hanya untuk memposting konten saya sendiri. Data ini tidak dipakai untuk iklan, analitik pihak ketiga,
          atau profiling, dan tidak dijual atau dibagikan ke siapa pun.
        </p>

        <h3>Penyimpanan dan keamanan</h3>
        <p>
          Token akses disimpan hanya di server pribadi saya dengan akses terbatas. File video sementara dihapus
          setelah diposting. Tidak ada data pengguna lain yang disimpan.
        </p>

        <h3>Retensi dan penghapusan</h3>
        <p>
          Token berlaku sampai saya cabut. Akses bisa dicabut kapan saja lewat pengaturan TikTok (Keamanan →
          Kelola izin aplikasi), Google (
          <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
            myaccount.google.com/permissions
          </a>
          ), dan Meta (Pengaturan Bisnis / Integrasi Bisnis). Setelah dicabut, data terkait di server akan
          dihapus.
        </p>

        <h3>YouTube API Services</h3>
        <ul>
          <li>izzy office menggunakan YouTube API Services.</li>
          <li>
            Dengan memakai izzy office, pengguna terikat pada{" "}
            <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
              Persyaratan Layanan YouTube
            </a>
            .
          </li>
          <li>
            Data yang diakses lewat YouTube API Services juga tunduk pada{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Kebijakan Privasi Google
            </a>
            .
          </li>
          <li>
            Data YouTube yang diakses: ID dan nama channel saya, serta mengunggah video beserta judul, deskripsi,
            dan tag. Data ini hanya dipakai untuk mengunggah video saya sendiri ke channel saya sendiri dan tidak
            dibagikan ke pihak lain.
          </li>
          <li>
            Akses bisa dicabut kapan saja lewat{" "}
            <a
              href="https://security.google.com/settings/security/permissions"
              target="_blank"
              rel="noopener noreferrer"
            >
              halaman izin keamanan Google
            </a>
            .
          </li>
          <li>
            Token dan data terkait dihapus dari server paling lambat 7 hari setelah akses dicabut, atau atas
            permintaan lewat salah satu kontak di <Link href="/#contact">halaman kontak</Link>.
          </li>
        </ul>

        <h3>Kontak</h3>
        <p>
          Pertanyaan soal izzy office bisa disampaikan lewat salah satu kontak di{" "}
          <Link href="/#contact">halaman kontak</Link>.
        </p>

        <h3>izzy office — English</h3>
        <p>
          izzy office is a private, single-user tool used only by the owner of this website. It runs at{" "}
          <code>office.izzy.my.id</code> behind a login and is used to upload my own educational videos to my
          own TikTok, YouTube, and Instagram accounts after I approve them. It is not used by anyone else and
          does not access anyone else&apos;s accounts.
        </p>
        <p>
          <strong>Data accessed:</strong>
        </p>
        <ul>
          <li>
            <strong>TikTok</strong> (Login Kit and Content Posting API; scopes <code>user.info.basic</code>,{" "}
            <code>video.upload</code>, <code>video.publish</code>): my account&apos;s open ID and display name,
            creator info (privacy options) required for posting, and uploading my videos and captions.
          </li>
          <li>
            <strong>YouTube Data API</strong> (scopes <code>youtube.upload</code> and{" "}
            <code>youtube.readonly</code>): my channel ID and name, and uploading videos with their titles and
            descriptions.
          </li>
          <li>
            <strong>Instagram/Meta</strong> (<code>instagram_basic</code>, <code>instagram_content_publish</code>,{" "}
            <code>instagram_manage_comments</code>): my Instagram account ID and username, and publishing Reels
            and captions.
          </li>
        </ul>
        <p>
          <strong>Purpose:</strong> only to publish my own content. The data is not used for advertising,
          third-party analytics, or profiling, and is never sold or shared with anyone.
        </p>
        <p>
          <strong>Storage and security:</strong> access tokens are stored only on my private server with
          restricted access. Temporary video files are deleted after posting. No data from other users is
          stored.
        </p>
        <p>
          <strong>Retention and deletion:</strong> tokens remain valid until I revoke them. Access can be revoked
          at any time via TikTok settings (Security → Manage app permissions), Google (
          <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
            myaccount.google.com/permissions
          </a>
          ), and Meta (Business Settings / Business Integrations). Once revoked, the related data on the server
          is deleted.
        </p>
        <p>
          <strong>YouTube API Services:</strong>
        </p>
        <ul>
          <li>izzy office uses YouTube API Services.</li>
          <li>
            By using izzy office, users agree to be bound by the{" "}
            <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">
              YouTube Terms of Service
            </a>
            .
          </li>
          <li>
            Data accessed through YouTube API Services is also subject to the{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
            .
          </li>
          <li>
            YouTube data accessed: my channel ID and name, and uploading videos with their titles, descriptions,
            and tags. This data is used only to upload my own videos to my own channel and is not shared with
            any third party.
          </li>
          <li>
            Access can be revoked at any time via the{" "}
            <a
              href="https://security.google.com/settings/security/permissions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google security permissions page
            </a>
            .
          </li>
          <li>
            Tokens and related data are deleted from the server within 7 days after access is revoked, or upon
            request through any of the contacts on the <Link href="/#contact">contact page</Link>.
          </li>
        </ul>
        <p>
          <strong>Contact:</strong> questions about izzy office can be sent through any of the contacts on the{" "}
          <Link href="/#contact">contact page</Link>.
        </p>

        <h2>Perubahan kebijakan</h2>
        <p>
          Kalau kebijakan ini berubah, tanggal di atas ikut diperbarui. Perubahan besar akan diumumkan di
          situs ini.
        </p>
      </div>
    </article>
  );
}
