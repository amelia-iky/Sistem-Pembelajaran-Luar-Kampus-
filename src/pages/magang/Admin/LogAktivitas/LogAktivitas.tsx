import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  RefreshCw,
  Eye,
  Trash2,
  X,
  Check,
  CalendarDays,
  Activity,
} from 'lucide-react';

type LogAktivitasItem = {
  id: number;
  user: string;
  email: string;
  role: string;
  tanggal: string;
  waktu: string;
  ip: string;
  browser: string;
  browserVersion: string;
  os: string;
  architecture: string;
  url: string;
  requestMethod: string;
  request: string;
  controller: string;
  method: string;
  aktivitas: string;
};

const initialData: LogAktivitasItem[] = [
  {
    id: 1,
    user: 'Super Admin',
    email: 'admin@undiksha.ac.id',
    role: 'Super Admin',
    tanggal: '2026-07-20',
    waktu: '10:45:12',
    ip: '103.23.100.15',
    browser: 'Chrome',
    browserVersion: '126',
    os: 'Windows 11',
    architecture: 'x64',
    url: 'https://magang-dev.undiksha.ac.id/cp/dosen/update_prodi',
    requestMethod: 'POST',
    request:
      'dosen : d6894399982106bc32e852bdc61a2a5be71baf7542dad7b60182134aeb3cd4c69ba19985d3dce44b40a7651fe8\nkode_jurusan : 03502',
    controller: 'dosen',
    method: 'update_prodi',
    aktivitas:
      'Memperbarui data program studi untuk dosen pembimbing magang pada sistem informasi akademik.',
  },
  {
    id: 2,
    user: 'Super Admin',
    email: 'admin@undiksha.ac.id',
    role: 'Super Admin',
    tanggal: '2026-07-20',
    waktu: '10:45:12',
    ip: '103.23.100.15',
    browser: 'Chrome',
    browserVersion: '126',
    os: 'Windows 11',
    architecture: 'x64',
    url: 'https://magang-dev.undiksha.ac.id/cp/admin/update_user',
    requestMethod: 'POST',
    request: 'user_id : 1024\nstatus : aktif',
    controller: 'admin',
    method: 'update_user',
    aktivitas: 'Memperbarui informasi akun pengguna pada sistem.',
  },
  {
    id: 3,
    user: 'Super Admin',
    email: 'admin@undiksha.ac.id',
    role: 'Super Admin',
    tanggal: '2026-07-20',
    waktu: '10:45:12',
    ip: '103.23.100.15',
    browser: 'Chrome',
    browserVersion: '126',
    os: 'Windows 11',
    architecture: 'x64',
    url: 'https://magang-dev.undiksha.ac.id/cp/magang/update_periode',
    requestMethod: 'PUT',
    request: 'periode_id : 3\nstatus : aktif',
    controller: 'magang',
    method: 'update_periode',
    aktivitas: 'Memperbarui informasi periode pelaksanaan magang.',
  },
  {
    id: 4,
    user: 'Admin Magang',
    email: 'admin.magang@undiksha.ac.id',
    role: 'Admin',
    tanggal: '2026-07-19',
    waktu: '09:30:15',
    ip: '103.23.100.20',
    browser: 'Microsoft Edge',
    browserVersion: '127',
    os: 'Windows 11',
    architecture: 'x64',
    url: 'https://magang-dev.undiksha.ac.id/cp/magang/update_tempat',
    requestMethod: 'POST',
    request: 'tempat_id : 12\nstatus : aktif',
    controller: 'magang',
    method: 'update_tempat',
    aktivitas: 'Memperbarui data tempat magang.',
  },
  {
    id: 5,
    user: 'Admin Magang',
    email: 'admin.magang@undiksha.ac.id',
    role: 'Admin',
    tanggal: '2026-07-18',
    waktu: '14:20:08',
    ip: '103.23.100.21',
    browser: 'Chrome',
    browserVersion: '126',
    os: 'Windows 11',
    architecture: 'x64',
    url: 'https://magang-dev.undiksha.ac.id/cp/magang/update_pengumuman',
    requestMethod: 'POST',
    request: 'pengumuman_id : 8\nstatus : diterbitkan',
    controller: 'magang',
    method: 'update_pengumuman',
    aktivitas: 'Memperbarui pengumuman untuk peserta program magang.',
  },
];

function formatTanggal(tanggal: string) {
  if (!tanggal) return '—';

  const [tahun, bulan, hari] = tanggal.split('-');
  return `${hari}-${bulan}-${tahun}`;
}

export default function LogAktivitas() {
  const [data, setData] = useState<LogAktivitasItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [selectedLog, setSelectedLog] = useState<LogAktivitasItem | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => {
      setNotice(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) => {
      const cocokPencarian = [
        item.user,
        item.email,
        item.role,
        item.tanggal,
        formatTanggal(item.tanggal),
        item.waktu,
        item.ip,
        item.browser,
        item.os,
        item.url,
        item.request,
        item.controller,
        item.method,
        item.aktivitas,
      ]
        .join(' ')
        .toLowerCase()
        .includes(keyword);

      const cocokTanggalMulai = !tanggalMulai || item.tanggal >= tanggalMulai;

      const cocokTanggalSelesai =
        !tanggalSelesai || item.tanggal <= tanggalSelesai;

      return cocokPencarian && cocokTanggalMulai && cocokTanggalSelesai;
    });
  }, [data, search, tanggalMulai, tanggalSelesai]);

  function handleReset() {
    setSearch('');
    setTanggalMulai('');
    setTanggalSelesai('');
    setNotice('Data log aktivitas berhasil dimuat ulang.');
  }

  function handleDelete(item: LogAktivitasItem) {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus log aktivitas "${item.aktivitas}"?`,
    );

    if (!confirmed) return;

    setData((current) => current.filter((log) => log.id !== item.id));
    setSelectedLog((current) => (current?.id === item.id ? null : current));
    setNotice('Log aktivitas berhasil dihapus.');
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Log Aktivitas
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Pantau riwayat aktivitas pengguna selama menggunakan sistem.
          </p>
        </header>

        {/* Informasi */}
        <section className="mb-6 flex items-start gap-3 rounded-[10px] border border-[#B8CCFF] bg-[#EEF4FF] p-4">
          <Activity size={19} className="mt-0.5 shrink-0 text-[#3569F6]" />
          <div>
            <h2 className="text-[11px] font-bold text-[#3569F6]">INFORMASI</h2>
            <p className="mt-1 text-[12px] leading-5 text-[#52627A]">
              Log aktivitas mencatat informasi pengguna, waktu akses, alamat IP,
              browser, serta tindakan yang dilakukan pada sistem. Klik ikon mata
              untuk melihat detail aktivitas.
            </p>
          </div>
        </section>

        {/* Filter dan pencarian */}
        <section className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-4">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Riwayat Aktivitas Pengguna
            </h2>
            <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
              Cari dan filter riwayat aktivitas berdasarkan tanggal.
            </p>
          </div>

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            {/* Search */}
            <div className="flex h-10 min-w-0 w-full items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3 xl:max-w-[350px] xl:flex-1">
              <Search size={16} className="shrink-0 text-[#8EA3C0]" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari user, role, IP, atau aktivitas..."
                className="w-full min-w-0 bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            {/* Tanggal mulai */}
            <div className="flex h-10 min-w-0 items-center gap-2 rounded-md border border-[#DCE5F1] bg-white px-3 xl:w-[190px]">
              <CalendarDays size={15} className="shrink-0 text-[#8295B0]" />
              <input
                type="date"
                aria-label="Tanggal mulai"
                value={tanggalMulai}
                max={tanggalSelesai || undefined}
                onChange={(event) => setTanggalMulai(event.target.value)}
                className="w-full min-w-0 bg-transparent text-[11px] text-[#52627A] outline-none"
              />
            </div>

            {/* Tanggal selesai */}
            <div className="flex h-10 min-w-0 items-center gap-2 rounded-md border border-[#DCE5F1] bg-white px-3 xl:w-[190px]">
              <CalendarDays size={15} className="shrink-0 text-[#8295B0]" />
              <input
                type="date"
                aria-label="Tanggal selesai"
                value={tanggalSelesai}
                min={tanggalMulai || undefined}
                onChange={(event) => setTanggalSelesai(event.target.value)}
                className="w-full min-w-0 bg-transparent text-[11px] text-[#52627A] outline-none"
              />
            </div>

            {/* Sinkronisasi */}
            <div className="flex shrink-0 items-center justify-end gap-2 xl:ml-auto">
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
          </div>
        </section>

        {/* Tabel log aktivitas */}
        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  <th className="w-[70px] px-4 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    No.
                  </th>
                  <th className="min-w-[190px] px-4 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    User
                  </th>
                  <th className="w-[140px] px-4 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Role
                  </th>
                  <th className="w-[165px] px-4 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Waktu
                  </th>
                  <th className="w-[155px] px-4 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    IP
                  </th>
                  <th className="w-[155px] px-4 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Agent
                  </th>
                  <th className="w-[125px] px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#E5EBF4] last:border-b-0 transition hover:bg-[#F8FAFF]"
                  >
                    <td className="px-4 py-4 text-[11px] text-[#465670]">
                      {index + 1}
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-[11px] font-medium text-[#172943]">
                        {item.user}
                      </p>
                      <p className="mt-1 text-[10px] text-[#71819B]">
                        {item.email}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex whitespace-nowrap rounded border border-[#DCE5F1] bg-[#F1F5F9] px-2 py-1 text-[10px] font-medium text-[#34445E]">
                        {item.role}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <p className="text-[11px] font-medium text-[#172943]">
                        {formatTanggal(item.tanggal)}
                      </p>
                      <p className="mt-1 text-[10px] text-[#71819B]">
                        {item.waktu} WITA
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span className="whitespace-nowrap rounded border border-[#E0E7F0] bg-[#F1F5F9] px-1.5 py-1 font-mono text-[10px] text-[#52627A]">
                        {item.ip}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <p className="text-[11px] text-[#34445E]">
                        {item.browser}
                      </p>
                      <p className="text-[11px] text-[#34445E]">
                        {item.browserVersion}
                      </p>
                      <p className="mt-1 text-[10px] leading-5 text-[#91A4BF]">
                        {item.os}
                        <br />({item.architecture})
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedLog(item)}
                          title="Lihat detail"
                          aria-label="Lihat detail aktivitas"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#3569F6] bg-white text-[#3569F6] transition hover:bg-[#EEF4FF]"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          title="Hapus log"
                          aria-label="Hapus log aktivitas"
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#FF5263] bg-white text-[#FF334B] transition hover:bg-[#FFF0F1]"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredData.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada log aktivitas yang sesuai dengan pencarian atau
                      rentang tanggal.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EDF1F7] px-4 py-3">
            <p className="text-[10px] text-[#8A99B0]">
              Menampilkan {filteredData.length} dari {data.length} aktivitas
            </p>
          </div>
        </section>
      </div>

      {/* Modal detail log aktivitas */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-[#172943]/30 px-3 py-6 sm:px-5 sm:py-10"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedLog(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-log-title"
            className="w-full max-w-[760px] overflow-hidden rounded-xl border border-[#E1E8F2] bg-white shadow-[0_16px_48px_rgba(15,23,42,0.18)]"
          >
            {/* Header modal */}
            <div className="flex items-center justify-between px-5 pb-3 pt-4">
              <h2
                id="detail-log-title"
                className="text-[17px] font-bold tracking-[-0.3px] text-[#273449]"
              >
                Detail Log Aktivitas
              </h2>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                aria-label="Tutup detail"
                className="rounded p-1 text-[#91A4BF] transition hover:bg-[#F1F5F9] hover:text-[#34445E]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Informasi utama */}
            <div className="mx-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-[#E8EDF5] py-3 sm:grid-cols-4">
              <div className="min-w-0">
                <p className="text-[10px] text-[#91A4BF]">User:</p>
                <p className="mt-0.5 break-words text-[11px] font-medium text-[#34445E]">
                  {selectedLog.email}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-[#91A4BF]">Role:</p>
                <p className="mt-0.5 text-[11px] font-medium text-[#34445E]">
                  {selectedLog.role}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-[#91A4BF]">Waktu:</p>
                <p className="mt-0.5 text-[11px] font-medium text-[#34445E]">
                  {selectedLog.tanggal} {selectedLog.waktu}
                </p>
              </div>

              <div>
                <p className="text-[10px] text-[#91A4BF]">IP Address:</p>
                <p className="mt-0.5 font-mono text-[11px] text-[#34445E]">
                  {selectedLog.ip}
                </p>
              </div>
            </div>

            {/* Isi detail */}
            <div className="space-y-4 px-5 py-5">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-[#71819B]">
                  URL
                </label>
                <div className="break-all rounded-lg border border-[#E0E7F0] bg-[#F8FAFC] px-3 py-3 font-mono text-[12px] leading-5 text-[#40516B]">
                  {selectedLog.url}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-[#71819B]">
                  Request {selectedLog.requestMethod}
                </label>
                <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-lg border border-[#E0E7F0] bg-[#F8FAFC] px-3 py-3 font-mono text-[11px] leading-5 text-[#40516B]">
                  {selectedLog.request || 'Tidak ada data request.'}
                </pre>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-[#71819B]">
                  Controller → Method
                </label>
                <div className="break-all rounded-lg border border-[#E0E7F0] bg-[#F8FAFC] px-3 py-3 font-mono text-[12px] text-[#40516B]">
                  {selectedLog.controller} → {selectedLog.method}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-[#71819B]">
                  Aktivitas
                </label>
                <div className="rounded-lg border border-[#E0E7F0] bg-[#F8FAFC] px-3 py-3 text-[12px] leading-6 text-[#40516B]">
                  {selectedLog.aktivitas}
                </div>
              </div>
            </div>

            {/* Footer modal */}
            <div className="flex justify-end border-t border-[#E5EBF4] bg-[#F8FAFC] px-5 py-3">
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="h-9 rounded-lg border border-[#3569F6] bg-white px-5 text-[12px] font-medium text-[#3569F6] transition hover:bg-[#EEF4FF]"
              >
                Tutup
              </button>
            </div>
          </section>
        </div>
      )}

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
              Log Aktivitas
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
