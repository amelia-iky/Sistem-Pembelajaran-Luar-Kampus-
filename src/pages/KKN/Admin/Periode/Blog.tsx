import { useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Search,
  UserRound,
  ArrowRight,
  MapPin,
  X,
} from 'lucide-react';

type BlogItem = {
  id: number;
  kategori: string;
  judul: string;
  ringkasan: string;
  penulis: string;
  tanggal: string;
  lokasi: string;
};

type BlogProps = {
  periodeId: number;
  desaId: string | number;
  namaDesa: string;
};

const DATA_BLOG: BlogItem[] = [
  {
    id: 1,
    kategori: 'Kegiatan',
    judul: 'KEGIATAN AWAL KKN UNDIKSHA TAHUN 2026',
    ringkasan:
      'Hari pertama KKN Mahasiswa Undiksha tahun 2026 diawali pada pukul 08.00 hingga 09.30 WITA dengan melaksanakan kegiatan bersih-bersih dan koordinasi awal bersama masyarakat desa.',
    penulis: 'Mahasiswa Dummy 29229',
    tanggal: 'Saturday 18/07/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
  {
    id: 2,
    kategori: 'Kegiatan',
    judul:
      'Pembukaan dan Gladi Penerimaan Mahasiswa KKN Tahun 2026 di Desa Aan Berlangsung Lancar',
    ringkasan:
      'Acara pembukaan dan serah terima mahasiswa KKN Undiksha secara resmi dibuka oleh Bapak Perbekel Desa Aan bertempat di Wantilan Kantor Desa, dihadiri oleh seluruh peserta.',
    penulis: 'Kadek Widya Suwari',
    tanggal: 'Sunday 19/07/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
  {
    id: 3,
    kategori: 'Sosial',
    judul:
      'MAHASISWA KKN UNDIKSHA GELAR AKSI BERSIH-BERSIH DAN BERBAGI KECERIAAN BERSAMA ANAK-ANAK',
    ringkasan:
      'Sebagai wujud kepedulian lingkungan dan sosial, tim mahasiswa KKN melaksanakan pembersihan sampah plastik di area obyek wisata Aan Secret Waterfall dilanjutkan dengan kegiatan bersama anak-anak.',
    penulis: 'I Gede Arya Wiguna',
    tanggal: 'Wednesday 22/07/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
  {
    id: 4,
    kategori: 'Sosial',
    judul:
      'MAHASISWA KKN UNDIKSHA GELAR AKSI BERSIH-BERSIH DAN BERBAGI KECERIAAN BERSAMA ANAK-ANAK',
    ringkasan:
      'Sebagai wujud kepedulian lingkungan dan sosial, tim mahasiswa KKN melaksanakan pembersihan sampah plastik di area obyek wisata Aan Secret Waterfall dilanjutkan dengan kegiatan bersama anak-anak.',
    penulis: 'I Gede Arya Wiguna',
    tanggal: 'Wednesday 22/07/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
  {
    id: 5,
    kategori: 'Kesehatan',
    judul:
      'GerakAan: Gerakan Layanan Kesehatan untuk Meningkatkan Literasi Kesehatan Masyarakat Desa Aan',
    ringkasan:
      'Program kerja GerakAan menyasar lansia dan balita berupa pengecekan tensi gratis, penyuluhan gizi seimbang, serta senam kebugaran lansia yang diikuti secara antusias oleh masyarakat.',
    penulis: 'Ni Putu Desi Rahmawati',
    tanggal: 'Friday 24/07/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
  {
    id: 6,
    kategori: 'Edukasi',
    judul: 'Edukasi Pengelolaan Sampah dan Lingkungan Bersih di Desa Aan',
    ringkasan:
      'Mahasiswa KKN melaksanakan edukasi kepada masyarakat mengenai pentingnya menjaga kebersihan lingkungan dan mengelola sampah rumah tangga.',
    penulis: 'Mahasiswa KKN Undiksha',
    tanggal: 'Monday 27/07/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
  {
    id: 7,
    kategori: 'Pendidikan',
    judul: 'Kegiatan Pendampingan Belajar Bersama Anak-Anak Desa Aan',
    ringkasan:
      'Kegiatan pendampingan belajar dilaksanakan untuk membantu meningkatkan semangat belajar dan kemampuan akademik anak-anak di lingkungan desa.',
    penulis: 'Mahasiswa KKN Undiksha',
    tanggal: 'Wednesday 29/07/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
  {
    id: 8,
    kategori: 'Sosial',
    judul: 'Mahasiswa KKN Ikut Berpartisipasi dalam Kegiatan Masyarakat Desa',
    ringkasan:
      'Mahasiswa KKN berpartisipasi dalam kegiatan masyarakat sebagai bentuk kerja sama dan upaya mempererat hubungan dengan warga desa.',
    penulis: 'Mahasiswa KKN Undiksha',
    tanggal: 'Friday 31/07/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
  {
    id: 9,
    kategori: 'Kegiatan',
    judul: 'Koordinasi Program Kerja Mahasiswa KKN Bersama Perangkat Desa',
    ringkasan:
      'Koordinasi dilakukan untuk membahas pelaksanaan program kerja dan menyesuaikan kegiatan mahasiswa dengan kebutuhan masyarakat desa.',
    penulis: 'Mahasiswa KKN Undiksha',
    tanggal: 'Monday 03/08/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
  {
    id: 10,
    kategori: 'Edukasi',
    judul: 'Sosialisasi Pemanfaatan Teknologi Digital bagi Masyarakat Desa',
    ringkasan:
      'Kegiatan sosialisasi bertujuan memperkenalkan pemanfaatan teknologi digital untuk mendukung aktivitas dan kebutuhan masyarakat.',
    penulis: 'Mahasiswa KKN Undiksha',
    tanggal: 'Wednesday 05/08/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
  {
    id: 11,
    kategori: 'Lingkungan',
    judul: 'Aksi Peduli Lingkungan Bersama Masyarakat Desa Aan',
    ringkasan:
      'Mahasiswa bersama masyarakat melaksanakan kegiatan peduli lingkungan untuk menciptakan lingkungan desa yang bersih dan nyaman.',
    penulis: 'Mahasiswa KKN Undiksha',
    tanggal: 'Friday 07/08/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
  {
    id: 12,
    kategori: 'Kegiatan',
    judul: 'Penutupan Rangkaian Kegiatan Program Kerja Mahasiswa KKN',
    ringkasan:
      'Rangkaian kegiatan program kerja mahasiswa KKN ditutup dengan evaluasi dan penyampaian hasil kegiatan bersama perangkat desa.',
    penulis: 'Mahasiswa KKN Undiksha',
    tanggal: 'Monday 10/08/2026',
    lokasi: 'AAN, BANJARANGKAN, Kabupaten Klungkung',
  },
];

const JUMLAH_PER_HALAMAN = 4;

export default function Blog({ periodeId, desaId, namaDesa }: BlogProps) {
  const [cari, setCari] = useState('');
  const [halaman, setHalaman] = useState(1);
  const [artikelTerpilih, setArtikelTerpilih] = useState<BlogItem | null>(null);

  const artikel = useMemo(
    () =>
      DATA_BLOG.map((item) => ({
        ...item,
        lokasi: `${namaDesa.toUpperCase()}, ${item.lokasi
          .split(', ')
          .slice(1)
          .join(', ')}`,
      })),
    [namaDesa, periodeId, desaId],
  );

  const hasil = useMemo(
    () =>
      artikel.filter((item) =>
        `${item.judul} ${item.ringkasan} ${item.kategori} ${item.penulis} ${item.lokasi}`
          .toLowerCase()
          .includes(cari.toLowerCase().trim()),
      ),
    [artikel, cari],
  );

  const totalHalaman = Math.max(
    1,
    Math.ceil(hasil.length / JUMLAH_PER_HALAMAN),
  );

  const artikelDitampilkan = hasil.slice(
    (halaman - 1) * JUMLAH_PER_HALAMAN,
    halaman * JUMLAH_PER_HALAMAN,
  );

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div>
        <h2 className="text-[13px] font-bold text-[#172943]">
          Blog Desa {namaDesa}
        </h2>
        <p className="mt-1 text-[11px] text-[#71819B]">
          Informasi kegiatan dan publikasi mahasiswa KKN di Desa {namaDesa}.
        </p>
      </div>

      {/* CARD SEARCH */}
      <div className="mb-5 flex flex-col gap-3 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)] sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full min-w-0 sm:max-w-[520px] sm:flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8EA3C0]"
          />
          <input
            type="search"
            value={cari}
            onChange={(event) => {
              setCari(event.target.value);
              setHalaman(1);
            }}
            placeholder="Cari judul artikel, penulis, atau lokasi..."
            aria-label="Cari artikel blog"
            className="h-10 w-full rounded-md border border-[#B8CCFF] bg-[#E7F0FC] pl-9 pr-3 text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF] focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/10"
          />
        </div>
      </div>

      {/* DAFTAR ARTIKEL */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {artikelDitampilkan.map((item) => (
          <article
            key={item.id}
            className="flex min-w-0 flex-col rounded-[10px] border border-[#B8CCFF] bg-[#F7F9FE] p-4 transition hover:border-[#3569F6] hover:shadow-[0_2px_8px_rgba(53,105,246,0.08)]"
          >
            <h3 className="line-clamp-2 min-h-[40px] text-[12px] font-bold leading-[1.5] text-[#172943]">
              {item.judul}
            </h3>

            <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-[#64748B]">
              <MapPin size={12} className="shrink-0 text-[#0755D9]" />
              <span className="truncate">{item.lokasi}</span>
            </div>

            <div className="my-3 border-t border-[#DCE7F8]" />

            <p className="line-clamp-3 min-h-[57px] text-[11px] leading-[1.7] text-[#52645D]">
              {item.ringkasan}
            </p>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-[#DCE7F8] pt-3">
              <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#64748B]">
                <span className="inline-flex items-center gap-1">
                  <UserRound size={11} />
                  <span className="max-w-[125px] truncate">{item.penulis}</span>
                </span>

                <span className="inline-flex items-center gap-1">
                  <CalendarDays size={11} />
                  {item.tanggal}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setArtikelTerpilih(item)}
                className="inline-flex shrink-0 items-center gap-1 text-[10px] font-bold text-[#0755D9] transition hover:text-[#043FAD]"
              >
                Selengkapnya
                <ArrowRight size={13} />
              </button>
            </div>
          </article>
        ))}

        {artikelDitampilkan.length === 0 && (
          <div className="col-span-full rounded-[10px] border border-dashed border-[#B8CCFF] bg-[#F7F9FE] px-4 py-12 text-center">
            <Search size={26} className="mx-auto mb-3 text-[#A5B4C8]" />
            <p className="text-[12px] font-semibold text-[#52627A]">
              Artikel tidak ditemukan
            </p>
            <p className="mt-1 text-[11px] text-[#91A0B5]">
              Coba gunakan kata kunci pencarian lainnya.
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E8EEF7] pt-3">
        <p className="text-[10px] text-[#71819B]">
          Menampilkan{' '}
          <span className="font-semibold text-[#263750]">
            {hasil.length === 0 ? 0 : (halaman - 1) * JUMLAH_PER_HALAMAN + 1}
          </span>{' '}
          sampai{' '}
          <span className="font-semibold text-[#263750]">
            {Math.min(halaman * JUMLAH_PER_HALAMAN, hasil.length)}
          </span>{' '}
          dari{' '}
          <span className="font-semibold text-[#263750]">{hasil.length}</span>{' '}
          artikel blog
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={halaman === 1}
            onClick={() => setHalaman((p) => Math.max(1, p - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2EAF5] bg-[#F0F4FC] text-[#64748B] transition hover:bg-[#E1EAF8] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalHalaman }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => setHalaman(page)}
                className={`h-8 min-w-8 rounded-lg border px-2 text-[11px] font-semibold transition ${
                  halaman === page
                    ? 'border-[#0755D9] bg-[#0755D9] text-white'
                    : 'border-[#E2EAF5] bg-white text-[#64748B] hover:bg-[#F0F4FC]'
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            disabled={halaman === totalHalaman}
            onClick={() => setHalaman((p) => Math.min(totalHalaman, p + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2EAF5] bg-[#F0F4FC] text-[#64748B] transition hover:bg-[#E1EAF8] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* MODAL DETAIL ARTIKEL */}
      {artikelTerpilih && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-[#14233B]/45 p-4"
          onClick={() => setArtikelTerpilih(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#B8CCFF] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#245BD6]">
                  {artikelTerpilih.kategori}
                </span>

                <h3 className="mt-1 text-[14px] font-bold leading-snug text-[#172943]">
                  {artikelTerpilih.judul}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setArtikelTerpilih(null)}
                className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#71819B] transition hover:bg-[#F2F6FC]"
                aria-label="Tutup detail artikel"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex flex-wrap gap-4 text-[10px] text-[#71819B]">
                <span className="inline-flex items-center gap-1.5">
                  <UserRound size={13} />
                  {artikelTerpilih.penulis}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={13} />
                  {artikelTerpilih.tanggal}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} />
                  {artikelTerpilih.lokasi}
                </span>
              </div>

              <div className="border-t border-[#E8EEF7]" />

              <p className="text-[12px] leading-7 text-[#52627A]">
                {artikelTerpilih.ringkasan}
              </p>

              <div className="rounded-lg border border-[#B8CCFF] bg-[#F7F9FE] p-3">
                <p className="text-[10px] leading-5 text-[#71819B]">
                  Konten artikel lengkap akan ditampilkan setelah data publikasi
                  dihubungkan.
                </p>
              </div>
            </div>

            <div className="flex justify-end border-t border-[#E8EEF7] px-5 py-3">
              <button
                type="button"
                onClick={() => setArtikelTerpilih(null)}
                className="rounded-lg bg-[#245BD6] px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-[#1748B5]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
