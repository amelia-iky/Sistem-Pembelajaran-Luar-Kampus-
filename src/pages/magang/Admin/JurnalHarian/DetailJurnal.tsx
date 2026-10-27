import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  RefreshCw,
  CalendarDays,
  ClipboardList,
  UserRound,
  Info,
  Check,
  X,
} from 'lucide-react';
import { mahasiswaJurnal } from './DataJurnal';

type Jurnal = {
  id: number;
  tanggal: string;
  nama: string;
  isi: string;
};

const initialJurnal: Jurnal[] = [
  {
    id: 1,
    tanggal: '2026-07-21',
    nama: 'Studi Literatur Model Prediksi Dropout Mahasiswa',
    isi: 'Hari ini saya mengumpulkan dan mempelajari beberapa paper ilmiah yang membahas prediksi dropout mahasiswa menggunakan machine learning. Paper tersebut digunakan sebagai referensi untuk mengidentifikasi algoritma yang sesuai, memahami metode yang digunakan pada penelitian sebelumnya, serta menjadi dasar dalam menentukan pendekatan yang akan digunakan pada pengembangan model prediksi selama kegiatan magang.',
  },
  {
    id: 2,
    tanggal: '2026-07-20',
    nama: 'Koordinasi Awal dan Penentuan Topik Magang',
    isi: 'Melakukan koordinasi awal bersama Bapak Resika selaku Ketua UPA TIK terkait pelaksanaan kegiatan magang. Pada pertemuan tersebut ditentukan topik yang akan dikerjakan, yaitu prediksi persentase mahasiswa Drop Out (DO). Arahan yang diberikan meliputi studi literatur untuk mengidentifikasi metode atau model prediksi yang digunakan pada penelitian terdahulu, menganalisis indikator yang memengaruhi terjadinya Drop Out, serta mengidentifikasi kebutuhan data yang diperlukan sebagai dasar pembangunan model prediksi.',
  },
  {
    id: 3,
    tanggal: '2026-07-22',
    nama: 'Melanjutkan Studi Literatur',
    isi: 'Melanjutkan studi literatur dengan mencari dan mempelajari beberapa paper terkait prediksi dropout mahasiswa menggunakan machine learning. Fokus pembelajaran hari ini adalah memahami algoritma yang sering digunakan, metode evaluasi, serta pendekatan yang dapat diterapkan pada pengembangan model prediksi.',
  },
  {
    id: 4,
    tanggal: '2026-07-23',
    nama: 'Penyusunan Literature Matrix',
    isi: 'Menyusun literature matrix berdasarkan paper yang telah dikumpulkan untuk mempermudah proses studi literatur.',
  },
  {
    id: 5,
    tanggal: '2026-07-24',
    nama: 'Penyempurnaan Literature Matrix',
    isi: 'Melanjutkan penyempurnaan literature matrix dengan melengkapi informasi mengenai performa model pada setiap penelitian. Kegiatan ini bertujuan untuk mempermudah proses perbandingan algoritma yang digunakan serta membantu menentukan model yang paling sesuai untuk dikembangkan pada proyek prediksi dropout mahasiswa.',
  },
  {
    id: 6,
    tanggal: '2026-07-27',
    nama: 'Ikut melaksanakan rapat mingguan UPA TIK',
    isi: 'Ikut bergabung dan mengikuti serangkaian rapat mingguan UPA TIK yang dihadiri staf dan ketua tiap divisi di lingkungan UPA TIK. Diberikan arahan untuk melihat progres rancangan model prediksi mahasiswa Drop Out.',
  },
  {
    id: 7,
    tanggal: '2026-07-28',
    nama: 'Analisa data mahasiswa DO untuk kebutuhan prediksi',
    isi: 'Melihat dan menganalisa data apa saja yang diperlukan untuk model melakukan prediksi DO.',
  },
  {
    id: 8,
    tanggal: '2026-07-29',
    nama: 'Arahan dari Pak Resika untuk Menghubungi Pak Aditya dan Pak Sande',
    isi: 'Melaksanakan pertemuan dengan Pak Resika dan diberikan arahan untuk melihat model lain yang sekiranya ringan dan bisa diimplementasi di EIS. Diberikan arahan untuk menghubungi Pak Aditya untuk bertanya berkaitan dengan model prediksi DO dan Pak Sande untuk mendapatkan data yang dibutuhkan untuk memprediksi.',
  },
  {
    id: 9,
    tanggal: '2026-07-30',
    nama: 'Meninjau Sistem Prediksi DO yang sudah ada',
    isi: 'Melihat isi dan fitur dari sistem DO yang sudah ada di EIS lama di ruang programmer bersama Kak Aditya.',
  },
];

function formatTanggal(tanggal: string) {
  const [tahun, bulan, hari] = tanggal.split('-');
  return `${hari}-${bulan}-${tahun}`;
}

export default function DetailJurnal() {
  const navigate = useNavigate();
  const { nim } = useParams<{ nim: string }>();

  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  const mahasiswa = mahasiswaJurnal.find((item) => item.nim === nim);

  const filteredJurnal = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return initialJurnal
      .filter((item) =>
        `${item.tanggal} ${formatTanggal(item.tanggal)} ${item.nama} ${item.isi}`
          .toLowerCase()
          .includes(keyword),
      )
      .sort((a, b) =>
        sortAsc
          ? a.tanggal.localeCompare(b.tanggal)
          : b.tanggal.localeCompare(a.tanggal),
      );
  }, [search, sortAsc]);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => {
      setNotice(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [notice]);

  function handleReset() {
    setSearch('');
    setSortAsc(true);
    setNotice('Data jurnal harian berhasil dimuat ulang.');
  }

  if (!mahasiswa) {
    return (
      <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-6">
        <div className="rounded-xl border border-[#B8CCFF] bg-white p-8 text-center">
          <p className="text-[14px] font-semibold text-[#172943]">
            Data mahasiswa tidak ditemukan.
          </p>
          <button
            type="button"
            onClick={() => navigate('/admin/magang/jurnal-harian')}
            className="mt-4 rounded-md bg-[#3569F6] px-4 py-2 text-[12px] font-semibold text-white"
          >
            Kembali ke Daftar Jurnal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
              Detail Jurnal Harian Magang
            </h1>
            <p className="mt-2 text-[12px] text-[#71819B]">
              Riwayat kegiatan harian mahasiswa selama mengikuti program magang.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/admin/magang/jurnal-harian')}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-[#B8CCFF] bg-white px-3 text-[11px] font-semibold text-[#52627A] transition hover:bg-[#EEF4FF]"
          >
            <ArrowLeft size={15} />
            Kembali
          </button>
        </div>

        <section className="mb-6 flex items-start gap-3 rounded-[10px] border border-[#B8CCFF] bg-[#EEF4FF] p-4">
          <Info size={19} className="mt-0.5 shrink-0 text-[#3569F6]" />
          <div>
            <h2 className="text-[11px] font-bold text-[#3569F6]">INFORMASI</h2>
            <p className="mt-1 text-[12px] leading-5 text-[#52627A]">
              Halaman ini menampilkan catatan kegiatan harian yang telah dibuat
              oleh mahasiswa selama pelaksanaan magang.
            </p>
          </div>
        </section>

        <section className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-4 flex items-center gap-2">
            <UserRound size={17} className="text-[#3569F6]" />
            <h2 className="text-[13px] font-bold text-[#172943]">
              Informasi Mahasiswa
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {[
              ['Nama Mahasiswa', mahasiswa.nama],
              ['NIM', mahasiswa.nim],
              ['Program Studi', mahasiswa.prodi],
              ['Tempat Magang', mahasiswa.tempatMagang],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[10px] font-medium text-[#91A4BF]">
                  {label}
                </p>
                <p className="mt-1 text-[12px] font-semibold text-[#273750]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <ClipboardList size={17} className="text-[#3569F6]" />
              <h2 className="text-[13px] font-bold text-[#172943]">
                Data Jurnal Harian
              </h2>
            </div>
            <p className="mt-1 text-[11px] text-[#71819B]">
              Daftar aktivitas harian yang dicatat oleh mahasiswa.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex h-10 w-full max-w-[520px] items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={16} className="shrink-0 text-[#8EA3C0]" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari tanggal, nama jurnal, atau isi jurnal..."
                className="w-full bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <button
              type="button"
              onClick={handleReset}
              title="Muat ulang data"
              aria-label="Muat ulang data"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#8295B0] transition hover:bg-blue-50 hover:text-[#3569F6]"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  <th className="w-[60px] px-4 py-4 text-[10px] font-bold uppercase text-[#52627A]">
                    No.
                  </th>
                  <th className="w-[135px] px-4 py-4">
                    <button
                      type="button"
                      onClick={() => setSortAsc((current) => !current)}
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#52627A] hover:text-[#3569F6]"
                    >
                      <CalendarDays size={13} />
                      Tanggal
                      {sortAsc ? <span>↑</span> : <span>↓</span>}
                    </button>
                  </th>
                  <th className="w-[245px] px-4 py-4 text-[10px] font-bold uppercase text-[#52627A]">
                    Nama Jurnal
                  </th>
                  <th className="px-4 py-4 text-[10px] font-bold uppercase text-[#52627A]">
                    Isi Jurnal
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredJurnal.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#EDF1F7] last:border-b-0 transition hover:bg-[#F8FAFF]"
                  >
                    <td className="px-4 py-4 align-top text-[11px] text-[#61718A]">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 align-top text-[11px] text-[#52627A]">
                      {formatTanggal(item.tanggal)}
                    </td>
                    <td className="px-4 py-4 align-top text-[11px] font-semibold leading-5 text-[#273750]">
                      {item.nama}
                    </td>
                    <td className="px-4 py-4 align-top text-[11px] leading-[1.8] text-[#52627A]">
                      {item.isi}
                    </td>
                  </tr>
                ))}

                {filteredJurnal.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada jurnal yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#EDF1F7] px-4 py-3">
            <p className="text-[10px] text-[#8A99B0]">
              Menampilkan {filteredJurnal.length} dari {initialJurnal.length}{' '}
              jurnal
            </p>
          </div>
        </section>
      </div>

      {/* Notifikasi mengikuti desain Data Prodi */}
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
              Sinkronisasi
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
