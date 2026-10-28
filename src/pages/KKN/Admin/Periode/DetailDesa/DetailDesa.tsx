import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MapPin,
  Users,
  FileText,
  ChevronLeft,
  BookOpen,
  GraduationCap,
  PencilLine,
  Trash2,
  UserCheck,
  LayoutGrid,
  ClipboardList,
  CalendarDays,
} from 'lucide-react';
import { STORAGE_KEY, type PeriodeKKNData } from '../Periode';

type DesaKKN = {
  id: string | number;
  nama?: string;
  namaDesa?: string;
  kecamatan?: string;
  kabupaten?: string;
  pembimbing?: string;
  dosenPembimbing?: string;
  penguji?: string;
  penguji1?: string;
  penguji2?: string;
  koordinator?: string;
  koordinatorDesa?: string;
  status?: string;
  alamat?: string;
  kepalaDesa?: string;
  telepon?: string;
  klaster?: string;
  nipPembimbing?: string;
  fakultasPembimbing?: string;
  peserta?: number | string;
  jumlahPeserta?: number | string;
  jumlahBlog?: number | string;
};

function nilai(value: unknown) {
  if (value === undefined || value === null || value === '') return '-';
  return String(value);
}

function bacaPeriode(id: number): PeriodeKKNData | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const data: unknown = saved ? JSON.parse(saved) : [];
    if (!Array.isArray(data)) return null;
    return (data as PeriodeKKNData[]).find((item) => item.id === id) ?? null;
  } catch {
    return null;
  }
}

export default function DetailDesa() {
  const navigate = useNavigate();
  const { id, desaId } = useParams();
  const periodeId = Number(id);
  const [periode] = useState<PeriodeKKNData | null>(() =>
    Number.isFinite(periodeId) ? bacaPeriode(periodeId) : null,
  );
  const desaTerpilih = (() => {
    if (!periode) return null;
    const rows = periode.detail?.daftarDesa;
    if (Array.isArray(rows)) {
      const row = (rows as Array<Record<string, unknown>>).find(
        (item, index) => String(item.id ?? index + 1) === String(desaId),
      );
      if (row) {
        return {
          id: (row.id as string | number | undefined) ?? desaId ?? '',
          nama: String(row.nama ?? row.namaDesa ?? row.desa ?? 'Desa'),
          kecamatan: row.kecamatan ? String(row.kecamatan) : undefined,
          kabupaten: row.kabupaten ? String(row.kabupaten) : undefined,
          pembimbing: row.pembimbing
            ? String(row.pembimbing)
            : row.dosenPembimbing
              ? String(row.dosenPembimbing)
              : undefined,
          dosenPembimbing: row.dosenPembimbing
            ? String(row.dosenPembimbing)
            : undefined,
          penguji: row.penguji ? String(row.penguji) : undefined,
          penguji1: row.penguji1 ? String(row.penguji1) : undefined,
          penguji2: row.penguji2 ? String(row.penguji2) : undefined,
          koordinator: row.koordinator ? String(row.koordinator) : undefined,
          koordinatorDesa: row.koordinatorDesa
            ? String(row.koordinatorDesa)
            : undefined,
          status: row.status ? String(row.status) : 'Aktif Ditugaskan',
          alamat: row.alamat ? String(row.alamat) : undefined,
          kepalaDesa: row.kepalaDesa ? String(row.kepalaDesa) : undefined,
          telepon: row.telepon ? String(row.telepon) : undefined,
          klaster: row.klaster ? String(row.klaster) : undefined,
          nipPembimbing: row.nipPembimbing
            ? String(row.nipPembimbing)
            : undefined,
          fakultasPembimbing: row.fakultasPembimbing
            ? String(row.fakultasPembimbing)
            : undefined,
          peserta: (row.peserta ?? row.jumlahPeserta) as
            | number
            | string
            | undefined,
          jumlahBlog: row.jumlahBlog as number | string | undefined,
        } satisfies DesaKKN;
      }
    }
    if (String(periode.id) === String(desaId) && periode.desa) {
      return {
        id: periode.id,
        nama: periode.desa,
        kecamatan: periode.kecamatan,
        kabupaten: periode.kabupaten,
        status: periode.status,
      } satisfies DesaKKN;
    }
    return null;
  })();
  const [menuLokalDesa, setMenuLokalDesa] = useState('Detail Desa');
  const [notice, setNotice] = useState('');
  const namaDesa = desaTerpilih?.nama ?? 'Desa';

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 2800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  if (!periode || !desaTerpilih) {
    return (
      <div className="min-h-[60vh] rounded-xl border border-[#E3EAF5] bg-white p-8 text-center">
        <h1 className="text-lg font-bold text-[#172943]">
          Data desa tidak ditemukan
        </h1>
        <p className="mt-2 text-sm text-[#71819B]">
          Periksa apakah data periode dan desa sudah tersimpan.
        </p>
        <button
          type="button"
          onClick={() => navigate(`/admin/kkn/periode/${id ?? ''}`)}
          className="mt-5 rounded-lg bg-[#245BD6] px-4 py-2.5 text-xs font-semibold text-white"
        >
          Kembali ke Detail Periode
        </button>
      </div>
    );
  }

  const menuDesa = [
    { label: 'Detail Desa', icon: FileText },
    { label: 'Pemetaan Prodi', icon: LayoutGrid },
    {
      label: 'Peserta',
      icon: Users,
      badge:
        nilai(desaTerpilih.peserta) === '-'
          ? '0 Mhs'
          : `${desaTerpilih.peserta} Mhs`,
    },
    {
      label: 'Blog',
      icon: BookOpen,
      badge: `${desaTerpilih.jumlahBlog ?? 0} Artikel`,
    },
    { label: 'Proposal Kelompok', icon: ClipboardList },
    { label: 'Bukti Kunjungan', icon: CalendarDays },
    { label: 'Laporan', icon: FileText },
    { label: 'Nilai', icon: Users },
  ];

  return (
    <div className="min-h-full bg-[#F7F9FC] p-4 sm:p-6 lg:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E3EAF5] bg-white px-5 py-4 shadow-sm">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-bold text-[#172943]">{namaDesa}</h1>
            <span className="rounded bg-[#EAF1FF] px-2 py-1 text-[10px] font-semibold text-[#245BD6]">
              Desa KKN
            </span>
            <span className="rounded bg-[#E8F7EF] px-2 py-1 text-[10px] font-semibold text-[#16805D]">
              {desaTerpilih.status ?? 'Aktif Ditugaskan'}
            </span>
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#71819B]">
            <MapPin size={13} />
            {[
              desaTerpilih.kecamatan ?? periode.kecamatan,
              desaTerpilih.kabupaten ?? periode.kabupaten,
              'Provinsi Bali',
            ]
              .filter(Boolean)
              .join(', ')}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/admin/kkn/periode/${periode?.id ?? id}`)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE5F1] bg-white px-3 py-2 text-[11px] font-semibold text-[#52627A] hover:bg-[#F7F9FC]"
        >
          <ChevronLeft size={14} /> Kembali ke Daftar Desa
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[215px_minmax(0,1fr)]">
        <aside className="rounded-xl border border-[#E3EAF5] bg-white p-3 shadow-sm">
          <p className="px-2 pt-1 text-[9px] font-bold uppercase tracking-widest text-[#8A97AA]">
            Navigasi Lokal
          </p>
          <div className="mb-2 mt-1 flex items-center justify-between px-2">
            <h2 className="text-xs font-bold text-[#273750]">Menu Desa</h2>
            <span className="rounded bg-[#EEF4FF] px-2 py-1 text-[9px] font-semibold text-[#45628F]">
              {namaDesa}
            </span>
          </div>
          <nav className="space-y-1">
            {menuDesa.map(({ label, icon: Icon, badge }) => (
              <button
                key={label}
                type="button"
                onClick={() => setMenuLokalDesa(label)}
                className={`flex min-h-[34px] w-full items-center gap-2 rounded-md border-l-[3px] px-2.5 py-2 text-left text-[11px] transition ${menuLokalDesa === label ? 'border-[#3569F6] bg-[#EAF1FF] font-semibold text-[#245BD6]' : 'border-transparent text-[#52627A] hover:bg-[#F6F8FC]'}`}
              >
                <Icon size={13} className="shrink-0" />
                <span className="min-w-0 flex-1">{label}</span>
                {badge && (
                  <span className="rounded-full bg-[#EAF1FF] px-1.5 py-0.5 text-[9px] text-[#45628F]">
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="my-3 border-t border-[#E8EEF7]" />
          <p className="px-2 pb-1 text-[9px] font-bold uppercase tracking-widest text-[#8A97AA]">
            Pengelolaan
          </p>
          <button
            type="button"
            onClick={() =>
              setNotice(
                'Fitur Ubah Desa akan dihubungkan setelah data desa tersedia.',
              )
            }
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] text-[#52627A] hover:bg-[#F6F8FC]"
          >
            <PencilLine size={13} /> Ubah Desa
          </button>
          <button
            type="button"
            onClick={() => {
              setNotice(
                `Desa ${namaDesa} belum dihapus. Hubungkan ke penyimpanan data desa terlebih dahulu.`,
              );
            }}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] text-[#D64545] hover:bg-red-50"
          >
            <Trash2 size={13} /> Hapus Desa
          </button>
        </aside>

        <main className="min-w-0 rounded-xl border border-[#E3EAF5] bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-[#E8EEF7] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#172943]">
                {menuLokalDesa === 'Detail Desa'
                  ? 'Detail Informasi Desa'
                  : menuLokalDesa}
              </h2>
              <p className="mt-1 max-w-2xl text-xs leading-5 text-[#71819B]">
                Data profil wilayah, perangkat desa, serta penugasan dosen
                pembimbing dan penguji KKN di Desa {namaDesa}.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setNotice(
                  'Fitur edit detail desa belum dihubungkan ke penyimpanan data.',
                )
              }
              className="rounded-lg bg-[#EAF1FF] p-2 text-[#245BD6] hover:bg-[#DCE8FF]"
              aria-label="Ubah informasi desa"
            >
              <PencilLine size={15} />
            </button>
          </div>

          {menuLokalDesa === 'Detail Desa' ? (
            <div className="space-y-6">
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold text-[#273750]">
                  <MapPin size={14} className="text-emerald-600" /> DATA DESA
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    ['Nama Desa', namaDesa],
                    ['Kecamatan', desaTerpilih.kecamatan ?? periode.kecamatan],
                    ['Kabupaten', desaTerpilih.kabupaten ?? periode.kabupaten],
                    ['Nama Kepala Desa', desaTerpilih.kepalaDesa],
                    ['Telepon Kantor Desa', desaTerpilih.telepon],
                    ['Klaster Penempatan', desaTerpilih.klaster],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="min-h-[66px] rounded-lg bg-[#EEF3FF] p-3"
                    >
                      <p className="text-[9px] font-bold uppercase tracking-wide text-[#687993]">
                        {label}
                      </p>
                      <p className="mt-1.5 break-words text-[11px] font-semibold text-[#273750]">
                        {nilai(value)}
                      </p>
                    </div>
                  ))}
                  <div className="rounded-lg bg-[#EEF3FF] p-3 sm:col-span-2 xl:col-span-3">
                    <p className="text-[9px] font-bold uppercase tracking-wide text-[#687993]">
                      Alamat Kantor / Titik Kumpul
                    </p>
                    <p className="mt-1.5 flex items-start gap-1.5 text-[11px] text-[#273750]">
                      <MapPin size={13} className="mt-0.5 shrink-0" />
                      {nilai(desaTerpilih.alamat)}
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold text-[#273750]">
                  <UserCheck size={14} className="text-emerald-600" />{' '}
                  PEMBIMBING LAPANGAN (DPL)
                </h3>
                <div className="rounded-lg bg-[#EEF3FF] p-4">
                  <p className="text-sm font-bold text-[#273750]">
                    {nilai(
                      desaTerpilih.pembimbing ?? desaTerpilih.dosenPembimbing,
                    )}
                  </p>
                  <span className="mt-2 inline-block rounded bg-[#DCE8FF] px-2 py-1 text-[9px] font-semibold text-[#245BD6]">
                    Dosen Pembimbing Lapangan
                  </span>
                  <p className="mt-2 text-[10px] text-[#71819B]">
                    NIP: {nilai(desaTerpilih.nipPembimbing)}
                  </p>
                  <p className="mt-1 text-[10px] text-[#71819B]">
                    Fakultas: {nilai(desaTerpilih.fakultasPembimbing)}
                  </p>
                </div>
              </section>
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold text-[#273750]">
                  <GraduationCap size={14} className="text-emerald-600" /> DOSEN
                  PENGUJI
                </h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {[
                    [
                      'Penguji 1',
                      desaTerpilih.penguji1 ?? desaTerpilih.penguji,
                    ],
                    ['Penguji 2', desaTerpilih.penguji2],
                  ].map(([label, name]) => (
                    <div
                      key={label}
                      className="rounded-lg border border-[#E3EAF5] p-4"
                    >
                      <p className="text-[9px] font-bold uppercase tracking-wide text-[#71819B]">
                        {label}
                      </p>
                      <p className="mt-2 text-xs font-bold text-[#273750]">
                        {nilai(name)}
                      </p>
                      <p className="mt-1 text-[10px] text-[#71819B]">
                        Informasi NIP belum tersedia
                      </p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold text-[#273750]">
                  <Users size={14} className="text-emerald-600" /> KOORDINATOR
                  DESA
                </h3>
                <div className="rounded-lg border border-[#E3EAF5] p-4">
                  <p className="text-xs font-bold text-[#273750]">
                    {nilai(
                      desaTerpilih.koordinator ?? desaTerpilih.koordinatorDesa,
                    )}
                  </p>
                  <p className="mt-1 text-[10px] text-[#71819B]">
                    Koordinator Desa KKN
                  </p>
                </div>
              </section>
            </div>
          ) : (
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-[#DCE5F1] bg-[#FBFCFE] p-8 text-center">
              <ClipboardList size={24} className="text-[#8EA4C6]" />
              <h3 className="mt-3 text-sm font-bold text-[#273750]">
                {menuLokalDesa}
              </h3>
              <p className="mt-2 max-w-md text-xs leading-5 text-[#71819B]">
                Bagian ini sudah disiapkan dalam navigasi lokal Desa {namaDesa}.
                Kontennya perlu dihubungkan dengan data modul terkait.
              </p>
            </div>
          )}
        </main>
      </div>
      {notice && (
        <div
          role="status"
          className="fixed right-5 top-5 z-[100] rounded-lg border border-[#C9D9FF] bg-white px-4 py-3 text-xs text-[#273750] shadow-lg"
        >
          {notice}
        </div>
      )}
    </div>
  );
}
