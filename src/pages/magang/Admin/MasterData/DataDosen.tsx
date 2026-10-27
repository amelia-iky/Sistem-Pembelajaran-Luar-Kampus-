import { useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  Info,
} from 'lucide-react';

type StatusPegawai = 'PNS' | 'PPPK' | 'Dosen Tetap Non-PNS';

type DosenItem = {
  id: number;
  nama: string;
  email: string;
  nip: string;
  nidn: string;
  prodi: string;
  statusPegawai: StatusPegawai;
  noIndukUndiksha: string;
  noHp: string;
  golongan: string;
  pangkat: string;
  jabatanFungsional: string;
};

const initialData: DosenItem[] = [
  {
    id: 1,
    nama: 'Dr. I Gede Wirawan, S.Kom., M.T.',
    email: 'wirawan@undiksha.ac.id',
    nip: '198205142008121002',
    nidn: '0814058201',
    prodi: 'S1 Sistem Informasi',
    statusPegawai: 'PNS',
    noIndukUndiksha: 'UND-D5N-6812',
    noHp: '081238491029',
    golongan: 'IV/a',
    pangkat: 'Pembina',
    jabatanFungsional: 'Lektor Kepala',
  },
  {
    id: 2,
    nama: 'Prof. Dr. I Wayan Santyasa, M.Si.',
    email: 'wayan.santyasa@undiksha.ac.id',
    nip: '195801101985031003',
    nidn: '0010105801',
    prodi: 'S1 Pendidikan Fisika',
    statusPegawai: 'PNS',
    noIndukUndiksha: 'UND-D5N-6101',
    noHp: '081139401294',
    golongan: 'IV/d',
    pangkat: 'Pembina Utama Madya',
    jabatanFungsional: 'Guru Besar',
  },
  {
    id: 3,
    nama: 'Dr. Ketut Sutama, S.T., M.Kom.',
    email: 'ketut.sutama@undiksha.ac.id',
    nip: '197609212005011001',
    nidn: '0021097602',
    prodi: 'S1 Pendidikan Teknik Informatika',
    statusPegawai: 'PNS',
    noIndukUndiksha: 'UND-D5N-0419',
    noHp: '081999201948',
    golongan: 'IV/a',
    pangkat: 'Pembina',
    jabatanFungsional: 'Lektor Kepala',
  },
  {
    id: 4,
    nama: 'Dr. I Gede Retraya, S.T., M.T.',
    email: 'retraya@undiksha.ac.id',
    nip: '197404122001121001',
    nidn: '0012047402',
    prodi: 'S1 Pendidikan Teknik Elektro',
    statusPegawai: 'PNS',
    noIndukUndiksha: 'UND-D5N-0955',
    noHp: '081338719203',
    golongan: 'IV/b',
    pangkat: 'Pembina Tk. I',
    jabatanFungsional: 'Lektor Kepala',
  },
  {
    id: 5,
    nama: 'Ni Made Sri Mertarsari, M.Pd.',
    email: 'sri.mertarsari@undiksha.ac.id',
    nip: '198002212022032021',
    nidn: '0012028202',
    prodi: 'S1 Sistem Informasi',
    statusPegawai: 'PPPK',
    noIndukUndiksha: 'UND-D5N-1290',
    noHp: '081747820194',
    golongan: 'X',
    pangkat: 'Penata',
    jabatanFungsional: 'Asisten Ahli',
  },
  {
    id: 6,
    nama: 'I Made Ardi Pradnyana, S.T., M.T.',
    email: 'ardi.pradnyana@undiksha.ac.id',
    nip: '198511242016121002',
    nidn: '0824118501',
    prodi: 'S1 Pendidikan Teknik Informatika',
    statusPegawai: 'PNS',
    noIndukUndiksha: 'UND-D5N-0731',
    noHp: '081936281940',
    golongan: 'III/c',
    pangkat: 'Penata',
    jabatanFungsional: 'Lektor',
  },
  {
    id: 7,
    nama: 'Luh Putu Eka Damayanthi, S.Pd., M.Pd.',
    email: 'eka.damayanthi@undiksha.ac.id',
    nip: '199104862019032814',
    nidn: '0888490103',
    prodi: 'S1 Teknologi Pendidikan',
    statusPegawai: 'Dosen Tetap Non-PNS',
    noIndukUndiksha: 'UND-D5N-1482',
    noHp: '087860912837',
    golongan: 'III/b',
    pangkat: 'Penata Muda Tk. I',
    jabatanFungsional: 'Asisten Ahli',
  },
  {
    id: 8,
    nama: 'Luh Putu Eka Damayanthi, S.Pd., M.Pd.',
    email: 'eka.damayanthi@undiksha.ac.id',
    nip: '199104862019032814',
    nidn: '0888490103',
    prodi: 'S1 Teknologi Pendidikan',
    statusPegawai: 'Dosen Tetap Non-PNS',
    noIndukUndiksha: 'UND-D5N-1482',
    noHp: '087860912837',
    golongan: 'III/b',
    pangkat: 'Penata Muda Tk. I',
    jabatanFungsional: 'Asisten Ahli',
  },
];

const emptyForm = {
  nama: '',
  email: '',
  nip: '',
  nidn: '',
  prodi: '',
  statusPegawai: 'PNS' as StatusPegawai,
  noIndukUndiksha: '',
  noHp: '',
  golongan: '',
  pangkat: '',
  jabatanFungsional: '',
};

const inputClass =
  'mt-1.5 h-10 w-full border-0 border-b border-[#D6D6D6] bg-transparent px-0 text-[12px] text-[#404040] outline-none focus:border-[#3569F6]';

export default function DataDosen() {
  const [data, setData] = useState<DosenItem[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [notice, setNotice] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return data.filter((item) =>
      `${item.nama} ${item.email} ${item.nip} ${item.nidn} ${item.prodi} ${item.statusPegawai} ${item.noIndukUndiksha} ${item.noHp} ${item.golongan} ${item.pangkat} ${item.jabatanFungsional}`
        .toLowerCase()
        .includes(keyword),
    );
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const visibleData = filteredData.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setFormOpen(true);
  }

  function openEdit(item: DosenItem) {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      email: item.email,
      nip: item.nip,
      nidn: item.nidn,
      prodi: item.prodi,
      statusPegawai: item.statusPegawai,
      noIndukUndiksha: item.noIndukUndiksha,
      noHp: item.noHp,
      golongan: item.golongan,
      pangkat: item.pangkat,
      jabatanFungsional: item.jabatanFungsional,
    });
    setFormOpen(true);
  }

  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId ? { ...item, ...form } : item,
        ),
      );
      setNotice({
        title: 'Data dosen berhasil diperbarui',
        message: 'Perubahan data dosen berhasil disimpan.',
      });
    } else {
      setData((current) => [{ id: Date.now(), ...form }, ...current]);
      setPage(1);
      setNotice({
        title: 'Data dosen berhasil ditambahkan',
        message: 'Data dosen baru berhasil disimpan.',
      });
    }
    setFormOpen(false);
  }

  function deleteData(item: DosenItem) {
    if (!window.confirm(`Yakin ingin menghapus data dosen "${item.nama}"?`))
      return;
    setData((current) => current.filter((row) => row.id !== item.id));
    setPage(1);
    setNotice({
      title: 'Data dosen berhasil dihapus',
      message: 'Data telah dihapus dari daftar.',
    });
  }

  function syncData() {
    setSearch('');
    setPage(1);
    setNotice({
      title: 'Sinkronisasi Berhasil',
      message: 'Daftar dosen berhasil diperbarui. Data masih berupa dummy.',
    });
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
              Data Dosen
            </h1>
            <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
              Kelola informasi dan data dosen.
            </p>
          </div>
        </header>

        <section className="mb-4 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-3">
            <h2 className="text-[13px] font-bold text-[#172943]">Data Dosen</h2>
            <p className="mt-1 text-[10px] leading-4 text-[#71819B]">
              Daftar dosen yang terdaftar pada Sistem Pembelajaran Luar Kampus.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex h-9 min-w-0 max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={15} className="shrink-0 text-[#8EA3C0]" />
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Cari nama, email, NIP, NIDN, atau prodi..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={openAdd}
                className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[11px] font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={14} />
                Tambah Data
              </button>
              <button
                type="button"
                onClick={syncData}
                title="Sinkronisasi data"
                aria-label="Sinkronisasi data"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#B8CCFF] text-[#8295B0] transition hover:bg-blue-50 hover:text-[#3569F6]"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1450px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  {[
                    'NO.',
                    'NAMA',
                    'EMAIL',
                    'NIP',
                    'NIDN',
                    'PRODI',
                    'STATUS PEGAWAI',
                    'NO. INDUK UNDIKSHA',
                    'NO. HP',
                    'GOLONGAN',
                    'PANGKAT',
                    'JABATAN FUNGSIONAL',
                    'AKSI',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-3 py-3 text-[9px] font-bold tracking-wide text-[#52627A]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#EDF1F7] last:border-b-0 hover:bg-[#FCFDFF]"
                  >
                    <td className="px-3 py-3 text-[10px] text-[#465670]">
                      {(safePage - 1) * pageSize + index + 1}
                    </td>
                    <td className="min-w-[190px] px-3 py-3">
                      <p className="text-[10px] font-semibold leading-4 text-[#273750]">
                        {item.nama}
                      </p>
                      <p className="mt-0.5 text-[9px] text-[#8291A8]">
                        ID: DSK-{String(item.id).padStart(5, '0')}
                      </p>
                    </td>
                    <td className="px-3 py-3 text-[9px] text-[#3569F6]">
                      <span className="inline-flex items-center gap-1">
                        <Mail size={10} />
                        {item.email}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-[9px] text-[#52627A]">
                      {item.nip}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-[9px] text-[#52627A]">
                      {item.nidn}
                    </td>
                    <td className="min-w-[145px] px-3 py-3 text-[9px] leading-4 text-[#354760]">
                      {item.prodi}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex rounded border px-1.5 py-1 text-[9px] font-medium ${item.statusPegawai === 'PNS' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : item.statusPegawai === 'PPPK' ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-amber-200 bg-amber-50 text-amber-700'}`}
                      >
                        {item.statusPegawai}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-[9px] text-[#52627A]">
                      {item.noIndukUndiksha}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-[9px] text-[#52627A]">
                      {item.noHp}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-[9px] text-[#52627A]">
                      {item.golongan}
                    </td>
                    <td className="min-w-[130px] px-3 py-3 text-[9px] leading-4 text-[#52627A]">
                      {item.pangkat}
                    </td>
                    <td className="min-w-[125px] px-3 py-3 text-[9px] leading-4 text-[#52627A]">
                      {item.jabatanFungsional}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          title="Edit dosen"
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-blue-50"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteData(item)}
                          title="Hapus dosen"
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visibleData.length === 0 && (
                  <tr>
                    <td
                      colSpan={13}
                      className="px-4 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada data dosen yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#EDF1F7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[9px] text-[#8A99B0]">
              Menampilkan{' '}
              {filteredData.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, filteredData.length)} dari{' '}
              {filteredData.length} dosen
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                aria-label="Halaman sebelumnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8295B0] disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    className={`h-7 min-w-7 rounded-md border px-2 text-[10px] ${safePage === number ? 'border-[#3569F6] bg-[#3569F6] font-semibold text-white' : 'border-[#E1E8F2] text-[#61718A] hover:bg-blue-50'}`}
                  >
                    {number}
                  </button>
                ),
              )}
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                aria-label="Halaman berikutnya"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#E1E8F2] text-[#8295B0] disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-5 z-[100] flex w-[326px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
        >
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={19} strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1 pr-1">
            <p className="text-[12px] font-semibold text-[#172943]">
              {notice.title}
            </p>
            <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
              {notice.message}
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

      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setFormOpen(false);
          }}
        >
          <div className="max-h-[94vh] w-full max-w-[760px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E8EEF7] bg-white px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null ? 'Edit Data Dosen' : 'Tambah Data Dosen'}
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Lengkapi informasi data dosen.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                aria-label="Tutup formulir"
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>
            <form onSubmit={saveData} className="px-5 py-4">
              <div className="mb-4 flex items-center gap-2 border-b border-[#E8EEF7] pb-2 text-[10px] font-bold tracking-wide text-[#52627A]">
                <Info size={13} className="text-[#3569F6]" />
                INFORMASI DOSEN
              </div>
              <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    Nama <span className="text-red-500">*</span>
                  </span>
                  <input
                    value={form.nama}
                    required
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        nama: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan nama dosen"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    required
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="nama@undiksha.ac.id"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    NIP
                  </span>
                  <input
                    value={form.nip}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        nip: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan NIP"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    NIDN
                  </span>
                  <input
                    value={form.nidn}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        nidn: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan NIDN"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    Prodi
                  </span>
                  <select
                    value={form.prodi}
                    onChange={(event) =>
                      setForm({ ...form, prodi: event.target.value })
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                  >
                    <option value="">Pilih program studi</option>
                    <option>S1 Sistem Informasi</option>
                    <option>S1 Pendidikan Fisika</option>
                    <option>S1 Pendidikan Teknik Informatika</option>
                    <option>S1 Pendidikan Teknik Elektro</option>
                    <option>S1 Teknologi Pendidikan</option>
                    {form.prodi &&
                      ![
                        'S1 Sistem Informasi',
                        'S1 Pendidikan Fisika',
                        'S1 Pendidikan Teknik Informatika',
                        'S1 Pendidikan Teknik Elektro',
                        'S1 Teknologi Pendidikan',
                      ].includes(form.prodi) && <option>{form.prodi}</option>}
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    Status Pegawai
                  </span>
                  <select
                    value={form.statusPegawai}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        statusPegawai: event.target.value as StatusPegawai,
                      })
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                  >
                    <option>PNS</option>
                    <option>PPPK</option>
                    <option>Dosen Tetap Non-PNS</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    No. Induk Undiksha
                  </span>
                  <input
                    value={form.noIndukUndiksha}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        noIndukUndiksha: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan nomor induk"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    No. HP
                  </span>
                  <input
                    value={form.noHp}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        noHp: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan nomor HP"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    Golongan
                  </span>
                  <input
                    value={form.golongan}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        golongan: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan golongan"
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    Pangkat
                  </span>
                  <input
                    value={form.pangkat}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        pangkat: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan pangkat"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[10px] font-medium text-[#52627A]">
                    Jabatan Fungsional
                  </span>
                  <input
                    value={form.jabatanFungsional}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        jabatanFungsional: event.target.value,
                      }))
                    }
                    className="mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]"
                    placeholder="Masukkan jabatan fungsional"
                  />
                </label>
              </div>
              <div className="mt-4 flex justify-end gap-2 border-t border-[#E8EEF7] pt-3">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="inline-flex h-[36px] items-center justify-center rounded-md border border-[#D6E0EF] bg-white px-4 text-[11px] font-medium text-[#52627A] transition hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex h-[36px] items-center gap-1.5 rounded-md bg-[#3569F6] px-4 text-[11px] font-semibold text-white transition hover:bg-blue-700"
                >
                  <Check size={13} strokeWidth={2.5} />
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
