import { useMemo, useState } from 'react';
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Search,
  UserRound,
  ArrowUpRight,
  MapPin,
} from 'lucide-react';

type BlogItem = {
  id: number;
  kategori: string;
  judul: string;
  ringkasan: string;
  penulis: string;
  tanggal: string;
  lokasi: string;
  tema: string;
};

type BlogProps = {
  periodeId: number;
  desaId: string | number;
  namaDesa: string;
};

const DATA_BLOG: BlogItem[] = [
  {
    id: 1,
    kategori: 'Dokumentasi',
    judul:
      'Menjaga Tradisi, Menguatkan Kebersamaan: Mahasiswa KKN-LIK Desa Sambiran Ikuti Rangkaian Upacara Melabuh Gentuh',
    ringkasan:
      'Suasana penuh kebersamaan dan nuansa adat terasa di Desa Adat Sambiran ketika mahasiswa KKN-LIK turut berpartisipasi dalam rangkaian kegiatan upacara.',
    penulis: 'Mahasiswa Dummy 30346',
    tanggal: '13 Agustus 2026',
    lokasi: 'Tejakula, Kabupaten Buleleng',
    tema: 'from-[#DCEBDD] via-[#B9D4BE] to-[#789B7C]',
  },
  {
    id: 2,
    kategori: 'Kegiatan Edukasi',
    judul:
      'Menabung Jadi Petualangan Seru: KKN-LIK Undiksha Hadirkan Edukasi Keuangan Ceria di TK Kartini Putra Sambiran',
    ringkasan:
      'Kegiatan edukasi keuangan untuk mengenalkan kebiasaan menabung kepada anak-anak melalui aktivitas belajar yang menyenangkan.',
    penulis: 'Mahasiswa Dummy 30346',
    tanggal: '2 Agustus 2026',
    lokasi: 'Tejakula, Kabupaten Buleleng',
    tema: 'from-[#F4E5C8] via-[#D8C49C] to-[#A8B98D]',
  },
  {
    id: 3,
    kategori: 'Kemitraan',
    judul:
      'Literasi Keuangan untuk Remaja: KKN-LIK Undiksha Bersama BPD Bali Edukasi Siswa SMP Negeri 3 Tejakula',
    ringkasan:
      'Kegiatan literasi keuangan bagi siswa untuk meningkatkan pemahaman tentang pengelolaan keuangan sejak dini.',
    penulis: 'Mahasiswa Dummy 30346',
    tanggal: '28 Juli 2026',
    lokasi: 'Tejakula, Kabupaten Buleleng',
    tema: 'from-[#D9E5F3] via-[#AFC4D9] to-[#7F9EB8]',
  },
];

export default function Blog({ periodeId, desaId, namaDesa }: BlogProps) {
  const [search, setSearch] = useState('');
  const [halaman, setHalaman] = useState(1);
  const [artikelTerpilih, setArtikelTerpilih] = useState<BlogItem | null>(null);

  const artikel = useMemo(
    () =>
      DATA_BLOG.map((item) => ({
        ...item,
        lokasi: `${namaDesa}, ${item.lokasi}`,
      })),
    [namaDesa, periodeId, desaId],
  );

  const hasil = artikel.filter((item) =>
    `${item.judul} ${item.ringkasan} ${item.kategori} ${item.penulis}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-[#172943]">
            Blog Desa {namaDesa}
          </h2>
          <p className="mt-1 text-xs text-[#71819B]">
            Informasi kegiatan dan publikasi mahasiswa KKN di Desa {namaDesa}.
          </p>
        </div>

        <div className="inline-flex h-10 shrink-0 items-center gap-2.5 rounded-full border border-[#C7D9F5] bg-[#EEF4FF] px-4">
          <span className="h-2 w-2 rounded-full bg-[#2860E8]" />
          <span className="text-[11px] font-semibold text-[#405779]">
            Total Blog Post:
          </span>
          <span className="text-xs font-bold leading-none text-[#245BD6]">
            13
          </span>
        </div>
      </div>

      <div className="flex w-full items-center">
        <div className="flex h-10 min-w-0 w-full max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
          <Search size={16} className="shrink-0 text-[#8EA3C0]" />
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setHalaman(1);
            }}
            placeholder="Cari artikel blog..."
            className="w-full bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
          />
        </div>
      </div>

      <div className="space-y-4">
        {hasil.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-3 rounded-xl border border-[#C7D9F5] bg-white p-3 shadow-sm transition hover:border-[#BFD2F5] hover:shadow-md sm:flex-row sm:gap-4"
          >
            <div
              className={`relative flex h-36 w-full shrink-0 items-end overflow-hidden rounded-lg bg-gradient-to-br ${item.tema} p-3 sm:h-[112px] sm:w-[148px]`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white/80">
                <BookOpen size={38} strokeWidth={1.3} />
              </div>
              <span className="relative z-10 rounded-md bg-[#172943]/75 px-2 py-1 text-[9px] font-semibold text-white">
                {item.kategori}
              </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="mb-1 flex flex-wrap items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-[#245BD6]">
                <span>{namaDesa}</span>
                <span className="text-[#A0AEC0]">·</span>
                <span className="text-[#71819B]">{item.lokasi}</span>
              </div>

              <h3 className="line-clamp-2 text-[13px] font-bold leading-[1.45] text-[#172943]">
                {item.judul}
              </h3>

              <p className="mt-1.5 line-clamp-2 text-[10px] leading-[1.6] text-[#71819B]">
                {item.ringkasan}
              </p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-[#64748B]">
                  <span className="inline-flex items-center gap-1">
                    <UserRound size={11} />
                    {item.penulis}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays size={11} />
                    {item.tanggal}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setArtikelTerpilih(item)}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0755D9] transition hover:text-[#043FAD]"
                >
                  Baca selengkapnya <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </article>
        ))}

        {hasil.length === 0 && (
          <div className="rounded-xl border border-dashed border-[#D5E2F6] bg-[#FBFCFE] px-4 py-12 text-center text-xs text-[#71819B]">
            Artikel tidak ditemukan.
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-[#C7D9F5] pt-4">
        <p className="text-[10px] text-[#71819B]">
          Menampilkan {hasil.length} dari 13 artikel
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setHalaman((p) => Math.max(1, p - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCF0] bg-white text-[#52627A] hover:bg-[#F2F6FC]"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft size={15} />
          </button>

          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setHalaman(page)}
              className={`h-8 min-w-8 rounded-md border px-2 text-[10px] font-semibold ${
                halaman === page
                  ? 'border-[#245BD6] bg-[#245BD6] text-white'
                  : 'border-[#B8CCF0] bg-white text-[#52627A] hover:bg-[#F2F6FC]'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setHalaman((p) => Math.min(5, p + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCF0] bg-white text-[#52627A] hover:bg-[#F2F6FC]"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {artikelTerpilih && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-[#14233B]/45 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#C7D9F5] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#C7D9F5] px-5 py-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#245BD6]">
                  {artikelTerpilih.kategori}
                </span>
                <h3 className="mt-1 text-base font-bold leading-snug text-[#172943]">
                  {artikelTerpilih.judul}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setArtikelTerpilih(null)}
                className="rounded-md px-2 py-1 text-[#71819B] hover:bg-[#F2F6FC]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 p-5">
              <p className="text-xs leading-6 text-[#52627A]">
                {artikelTerpilih.ringkasan}
              </p>

              <div className="flex flex-wrap gap-4 text-[10px] text-[#71819B]">
                <span className="inline-flex items-center gap-1">
                  <UserRound size={12} />
                  {artikelTerpilih.penulis}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays size={12} />
                  {artikelTerpilih.tanggal}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} />
                  {artikelTerpilih.lokasi}
                </span>
              </div>

              <p className="text-[10px] italic text-[#9AAAC0]">
                Konten artikel lengkap akan ditampilkan setelah data publikasi
                dihubungkan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
