import { useMemo } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';

import {
  MapPin,
  FileText,
  LayoutGrid,
  Users,
  BookOpen,
  ClipboardList,
  CalendarDays,
  ChevronLeft,
  UserCheck,
} from 'lucide-react';

import { STORAGE_KEY } from '../Periode';
import type { DesaRouteContext, PeriodeDesa } from './DesaContext';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export default function LayoutDesa() {
  const { id, desaId } = useParams();
  const navigate = useNavigate();

  const periodeId = Number(id);

  const { periode, desa } = useMemo(() => {
    try {
      const parsed: unknown = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]',
      );

      if (!Array.isArray(parsed)) {
        return { periode: null, desa: null };
      }

      const semua = parsed.filter(isObject) as PeriodeDesa[];

      const dataPeriode = semua.find(
        (item) => String(item.id) === String(periodeId),
      );

      if (!dataPeriode) {
        return { periode: null, desa: null };
      }

      const daftarDesa = dataPeriode.detail?.daftarDesa ?? [];

      const dataDesa = daftarDesa.find(
        (item, index) => String(item.id ?? index + 1) === String(desaId),
      );

      return {
        periode: dataPeriode,
        desa: dataDesa ?? null,
      };
    } catch {
      return { periode: null, desa: null };
    }
  }, [periodeId, desaId]);

  if (!periode || !desa) {
    return (
      <div className="rounded-xl border border-[#C7D9F5] bg-white p-8 text-center text-sm text-slate-600">
        Data desa tidak ditemukan.
      </div>
    );
  }

  const namaDesa = String(desa.nama ?? desa.namaDesa ?? desa.desa ?? 'Desa');

  const context: DesaRouteContext = {
    periodeId,
    desaId: String(desaId),
    namaDesa,
    desa,
    periode,
  };

  const menus = [
    { label: 'Detail Desa', to: '', icon: FileText },
    { label: 'Pemetaan Prodi', to: 'pemetaan-prodi', icon: LayoutGrid },
    { label: 'Peserta', to: 'peserta', icon: Users },
    { label: 'Blog', to: 'blog', icon: BookOpen },
    { label: 'Dokumen kelompok', to: 'dokumen-kelompok', icon: ClipboardList },
    { label: 'Bukti Kunjungan', to: 'bukti-kunjungan', icon: CalendarDays },
    { label: 'Nilai', to: 'nilai', icon: UserCheck },
  ];

  return (
    <div className="min-h-full bg-[#F7F9FC]">
      {/* HEADER DESA */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#C7D9F5] bg-white px-5 py-4 shadow-sm">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-bold text-[#172943]">{namaDesa}</h1>

            <span className="inline-flex items-center rounded-full bg-[#EAF1FF] px-3 py-1 text-[10px] font-semibold text-[#245BD6]">
              Desa KKN
            </span>

            <span className="inline-flex items-center rounded-full bg-[#E5F5EF] px-3 py-1 text-[10px] font-semibold text-[#16805D]">
              {desa.status ?? 'Aktif Ditugaskan'}
            </span>
          </div>

          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#71819B]">
            <MapPin size={13} className="shrink-0 text-[#3569F6]" />
            {[
              desa.kecamatan ?? periode.kecamatan,
              desa.kabupaten ?? periode.kabupaten,
              'Provinsi Bali',
            ]
              .filter(Boolean)
              .join(', ')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/admin/kkn/periode/${periodeId}`)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#245BD6] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1949B5] hover:shadow-md active:scale-[0.98]"
        >
          <ChevronLeft size={15} strokeWidth={2.5} />
          Kembali ke Daftar Desa
        </button>
      </div>

      {/* LAYOUT SIDEBAR DAN KONTEN */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[215px_minmax(0,1fr)]">
        {/* SIDEBAR */}
        <aside className="rounded-xl border border-[#C7D9F5] bg-white p-3 shadow-sm">
          <p className="px-2 pt-1 text-[9px] font-bold uppercase tracking-widest text-[#8A97AA]">
            Navigasi Lokal
          </p>

          <div className="mb-2 mt-1 px-2">
            <h2 className="text-xs font-bold text-[#273750]">Menu Desa</h2>
          </div>

          <nav className="space-y-1">
            {menus.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={label}
                to={to}
                end={!to}
                className={({ isActive }) =>
                  `flex min-h-[34px] items-center gap-2 rounded-md border px-2.5 py-2 text-[11px] transition ${
                    isActive
                      ? 'border-[#9DBAF3] bg-[#EAF1FF] font-semibold text-[#245BD6]'
                      : 'border-[#E1EAF8] bg-white text-[#52627A] hover:border-[#B8CCF0] hover:bg-[#F6F8FC]'
                  }`
                }
              >
                <Icon size={13} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* KONTEN HALAMAN */}
        <main className="min-w-0 rounded-xl border border-[#C7D9F5] bg-white p-5 shadow-sm sm:p-6">
          <Outlet context={context} />
        </main>
      </div>
    </div>
  );
}
