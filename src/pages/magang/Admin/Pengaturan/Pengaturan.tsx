import { useState } from 'react';
import {
  Mail,
  LockKeyhole,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Unlink,
  ChevronDown,
  Save,
  Check,
  X,
  Eye,
  EyeOff,
  Info,
} from 'lucide-react';

export default function Pengaturan() {
  const [usernameEmail, setUsernameEmail] = useState(
    'noreply.magang@undiksha.ac.id',
  );
  const [passwordEmail, setPasswordEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [batasJurnal, setBatasJurnal] = useState('Harian');
  const [notice, setNotice] = useState<string | null>(null);

  const [isiPesan, setIsiPesan] = useState(
    `Yth. Bapak/Ibu {nama_supervisor},

Berikut kami sampaikan informasi akun akses pembimbing lapangan untuk memonitor pelaksanaan kegiatan magang mahasiswa Universitas Pendidikan Ganesha di {nama_tempat_pkl}.

Detail Akun Akses Portal:
Username : {username}
Password Sementara : {password}

Silakan masuk ke Portal Sistem Pembelajaran Luar Kampus Undiksha dan segera lakukan pembaruan kata sandi saat pertama kali masuk demi menjaga keamanan akun Anda.

Terima kasih atas kerja sama dan bimbingan yang Bapak/Ibu berikan kepada mahasiswa kami.

Hormat kami,
Pengelola Program Magang - UPA TIK Undiksha
Universitas Pendidikan Ganesha`,
  );

  function handleFormat(command: string, value?: string) {
    document.execCommand(command, false, value);
  }

  function handleSave() {
    // Simpan ke backend perlu dihubungkan dengan API pengaturan.
    setNotice('Perubahan pengaturan berhasil disimpan.');
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Pengaturan Sistem
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola informasi dan pengumuman yang ditampilkan kepada pengguna.
          </p>
        </header>

        {/* Pengaturan Email */}
        <section className="mb-4 rounded-[10px] border border-[#E4ECF8] bg-white p-4 sm:p-5">
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="usernameEmail"
                className="mb-2 block text-[10px] font-semibold text-[#34445E]"
              >
                Username Email <span className="text-red-500">*</span>
              </label>

              <div className="flex h-9 items-center gap-2 rounded-md border border-[#DCE5F1] bg-white px-3 focus-within:border-[#3569F6]">
                <Mail size={14} className="shrink-0 text-[#91A4BF]" />
                <input
                  id="usernameEmail"
                  type="email"
                  value={usernameEmail}
                  onChange={(event) => setUsernameEmail(event.target.value)}
                  placeholder="Masukkan username email"
                  className="w-full min-w-0 bg-transparent text-[11px] text-[#34445E] outline-none"
                />
              </div>

              <p className="mt-1.5 text-[9px] leading-4 text-[#91A4BF]">
                Alamat email resmi pengirim notifikasi dan gateway email server
                Undiksha.
              </p>
            </div>

            <div>
              <label
                htmlFor="passwordEmail"
                className="mb-2 block text-[10px] font-semibold text-[#34445E]"
              >
                Password Email <span className="text-red-500">*</span>
              </label>

              <div className="flex h-9 items-center gap-2 rounded-md border border-[#DCE5F1] bg-white px-3 focus-within:border-[#3569F6]">
                <LockKeyhole size={14} className="shrink-0 text-[#91A4BF]" />
                <input
                  id="passwordEmail"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordEmail}
                  onChange={(event) => setPasswordEmail(event.target.value)}
                  placeholder="Masukkan password email"
                  className="w-full min-w-0 bg-transparent text-[11px] text-[#34445E] outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={
                    showPassword ? 'Sembunyikan password' : 'Tampilkan password'
                  }
                  className="shrink-0 text-[#91A4BF] hover:text-[#3569F6]"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              <p className="mt-1.5 text-[9px] leading-4 text-[#91A4BF]">
                Gunakan kata sandi aplikasi (App Password) akun SMTP server
                institusi.
              </p>
            </div>
          </div>

          {/* Editor Isi Pesan */}
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <label className="text-[10px] font-semibold text-[#34445E]">
                Isi Pesan Email <span className="text-red-500">*</span>
              </label>
              <span className="text-[9px] text-[#91A4BF]">
                Mendukung format rich text & variabel template
              </span>
            </div>

            <div className="overflow-hidden rounded-md border border-[#DCE5F1]">
              <div className="flex min-h-8 flex-wrap items-center gap-1 border-b border-[#DCE5F1] bg-[#F8FAFD] px-2 py-1">
                <button
                  type="button"
                  title="Bold"
                  onClick={() => handleFormat('bold')}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <Bold size={12} />
                </button>
                <button
                  type="button"
                  title="Italic"
                  onClick={() => handleFormat('italic')}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <Italic size={12} />
                </button>
                <button
                  type="button"
                  title="Underline"
                  onClick={() => handleFormat('underline')}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <Underline size={12} />
                </button>
                <button
                  type="button"
                  title="Strikethrough"
                  onClick={() => handleFormat('strikeThrough')}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <Strikethrough size={12} />
                </button>

                <span className="mx-1 h-4 border-l border-[#DCE5F1]" />

                <button
                  type="button"
                  title="Rata kiri"
                  onClick={() => handleFormat('justifyLeft')}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <AlignLeft size={12} />
                </button>
                <button
                  type="button"
                  title="Rata tengah"
                  onClick={() => handleFormat('justifyCenter')}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <AlignCenter size={12} />
                </button>
                <button
                  type="button"
                  title="Rata kanan"
                  onClick={() => handleFormat('justifyRight')}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <AlignRight size={12} />
                </button>
                <button
                  type="button"
                  title="Rata kiri dan kanan"
                  onClick={() => handleFormat('justifyFull')}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <AlignJustify size={12} />
                </button>

                <span className="mx-1 h-4 border-l border-[#DCE5F1]" />

                <button
                  type="button"
                  title="Daftar berpoin"
                  onClick={() => handleFormat('insertUnorderedList')}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <List size={12} />
                </button>
                <button
                  type="button"
                  title="Daftar bernomor"
                  onClick={() => handleFormat('insertOrderedList')}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <ListOrdered size={12} />
                </button>
                <button
                  type="button"
                  title="Tambah tautan"
                  onClick={() => {
                    const url = window.prompt('Masukkan URL tautan:');
                    if (url) handleFormat('createLink', url);
                  }}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <Link size={12} />
                </button>
                <button
                  type="button"
                  title="Hapus format tautan"
                  onClick={() => handleFormat('unlink')}
                  className="rounded p-1.5 text-[#52627A] hover:bg-[#E7F0FC]"
                >
                  <Unlink size={12} />
                </button>
              </div>

              <textarea
                value={isiPesan}
                onChange={(event) => setIsiPesan(event.target.value)}
                rows={15}
                className="block w-full resize-y bg-white px-3 py-3 text-[10px] leading-[1.8] text-[#34445E] outline-none focus:bg-white"
                placeholder="Tuliskan isi pesan email..."
              />
            </div>
          </div>
        </section>

        {/* Batas Input Jurnal */}
        <section className="mb-4 rounded-[10px] border border-[#E4ECF8] bg-white p-4 sm:p-5">
          <label
            htmlFor="batasJurnal"
            className="mb-2 block text-[10px] font-semibold text-[#34445E]"
          >
            Batas Input Jurnal <span className="text-red-500">*</span>
          </label>

          <div className="relative w-full max-w-[290px]">
            <select
              id="batasJurnal"
              value={batasJurnal}
              onChange={(event) => setBatasJurnal(event.target.value)}
              className="h-9 w-full appearance-none rounded-md border border-[#DCE5F1] bg-white px-3 pr-9 text-[11px] text-[#34445E] outline-none focus:border-[#3569F6]"
            >
              <option value="Harian">Harian</option>
              <option value="Mingguan">Mingguan</option>
              <option value="Bulanan">Bulanan</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#71819B]"
            />
          </div>

          <p className="mt-2 flex items-start gap-1.5 text-[9px] leading-4 text-[#91A4BF]">
            <Info size={11} className="mt-0.5 shrink-0" />
            Pengaturan ini menentukan batas waktu pengisian jurnal mahasiswa.
            Sistem akan mengunci entri logbook jika melewati batas yang telah
            ditentukan.
          </p>
        </section>

        {/* Tombol Simpan */}
        <div className="flex justify-end border-b border-[#E4ECF8] pb-4">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-[#3569F6] px-4 text-[10px] font-semibold text-white transition hover:bg-[#2454D8]"
          >
            <Save size={12} />
            Simpan Perubahan
          </button>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 py-3">
          <p className="text-[9px] text-[#91A4BF]">
            © 2026 Universitas Pendidikan Ganesha — Sistem Pembelajaran Luar
            Kampus
          </p>
          <p className="text-[9px] text-[#91A4BF]">
            Bantuan Teknis:{' '}
            <a
              href="mailto:helpdesk.mbkm@undiksha.ac.id"
              className="text-[#3569F6] hover:underline"
            >
              helpdesk.mbkm@undiksha.ac.id
            </a>
          </p>
        </footer>
      </div>

      {/* Notifikasi */}
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-5 z-[100] flex w-[326px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
        >
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={19} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-[#172943]">
              Pengaturan Sistem
            </p>
            <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
              {notice}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Tutup notifikasi"
            className="shrink-0 rounded p-0.5 text-slate-400 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
