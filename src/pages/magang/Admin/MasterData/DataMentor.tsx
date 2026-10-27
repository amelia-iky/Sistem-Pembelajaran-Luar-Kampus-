import { useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  RefreshCw,
  Plus,
  Download,
  Pencil,
  Trash2,
  Fingerprint,
  X,
  Check,
  Info,
  ChevronLeft,
  ChevronRight,
  Users,
} from 'lucide-react';

type Mentor = {
  id: number;
  tempatMagang: string;
  nama: string;
  email: string;
  alamat: string;
  noHp: string;
  jabatan: string;
  golongan: string;
  jumlahMahasiswa: number;
};

const initialData: Mentor[] = [
  {
    id: 1,
    tempatMagang: 'PT Telkom Indonesia',
    nama: 'Ir. Putu Agus Semarabawa, M.Kom.',
    email: 'agus.semarabawa@telkom.co.id',
    alamat: 'Jl. Japati No. 1, Bandung',
    noHp: '081234567812',
    jabatan: 'Senior Software Engineer',
    golongan: 'IV/a',
    jumlahMahasiswa: 3,
  },
  {
    id: 2,
    tempatMagang: 'Bank BPD Bali Kantor Pusat',
    nama: 'Ni Made Rai Sukmadewi, S.T., M.T.',
    email: 'rai.sukma@bpdbali.id',
    alamat: 'Jl. Renon No. 8, Denpasar',
    noHp: '081987654321',
    jabatan: 'Kepala Divisi IT & Digital',
    golongan: 'Senior Specialist',
    jumlahMahasiswa: 4,
  },
  {
    id: 3,
    tempatMagang: 'Dinas Kominfo Provinsi Bali',
    nama: 'Gede Bayu Permana, S.Kom.',
    email: 'bayu.permana@baliprov.go.id',
    alamat: 'Jl. D.I. Panjaitan No. 7, Denpasar',
    noHp: '082145678901',
    jabatan: 'Pranata Komputer Ahli Muda',
    golongan: 'III/c',
    jumlahMahasiswa: 5,
  },
  {
    id: 4,
    tempatMagang: 'PT Integra Teknologi Mandiri',
    nama: 'I Komang Wahyu Suputra, M.Cs.',
    email: 'wahyu.suputra@integra.co.id',
    alamat: 'Jl. Gatot Subroto Timur No. 120, Denpasar',
    noHp: '085239123456',
    jabatan: 'Lead UI/UX Designer',
    golongan: '-',
    jumlahMahasiswa: 2,
  },
  {
    id: 5,
    tempatMagang: 'Kantor Bappeda Kab. Buleleng',
    nama: 'Dewa Ketut Ariyasa, S.T., M.Si.',
    email: 'ariyasa.bappeda@bulelengkab.go.id',
    alamat: 'Jl. Pahlawan No. 1, Singaraja',
    noHp: '087861234567',
    jabatan: 'Kasubag Perencanaan & Evaluasi',
    golongan: 'IV/b',
    jumlahMahasiswa: 3,
  },
  {
    id: 6,
    tempatMagang: 'RSUD Kabupaten Buleleng',
    nama: 'dr. Luh Putu Saraswati, M.Biomed.',
    email: 'saraswati.rsud@bulelengkab.go.id',
    alamat: 'Jl. Ngurah Rai No. 30, Singaraja',
    noHp: '081339876543',
    jabatan: 'Koordinator Diklit & SIMRS',
    golongan: 'III/d',
    jumlahMahasiswa: 4,
  },
  {
    id: 7,
    tempatMagang: 'PT Bali Media Grafika',
    nama: 'Anak Agung Ngurah Mahendra, S.Sn.',
    email: 'ngurah.mahendra@balimedia.com',
    alamat: 'Jl. Hayam Wuruk No. 54, Denpasar',
    noHp: '089678123456',
    jabatan: 'Creative Production Lead',
    golongan: '-',
    jumlahMahasiswa: 3,
  },
  {
    id: 8,
    tempatMagang: 'Universitas Pendidikan Ganesha',
    nama: 'I Made Arya Pratama, S.Kom.',
    email: 'arya.pratama@undiksha.ac.id',
    alamat: 'Jl. Udayana No. 11, Singaraja',
    noHp: '081234567890',
    jabatan: 'Koordinator Laboratorium',
    golongan: 'III/b',
    jumlahMahasiswa: 2,
  },
  {
    id: 9,
    tempatMagang: 'CV Digital Bali',
    nama: 'Kadek Dwi Pradnyana, S.Kom.',
    email: 'kadek.pradnyana@digitalbali.id',
    alamat: 'Jl. Diponegoro No. 21, Denpasar',
    noHp: '082145678901',
    jabatan: 'Software Developer',
    golongan: '-',
    jumlahMahasiswa: 3,
  },
  {
    id: 10,
    tempatMagang: 'PT Teknologi Nusantara',
    nama: 'Ni Luh Putu Maharani, S.Kom.',
    email: 'maharani@teknus.id',
    alamat: 'Jl. Merdeka No. 15, Singaraja',
    noHp: '085239123456',
    jabatan: 'IT Project Manager',
    golongan: 'III/b',
    jumlahMahasiswa: 2,
  },
];

const emptyForm = {
  tempatMagang: '',
  nama: '',
  email: '',
  alamat: '',
  noHp: '',
  jabatan: '',
  golongan: '',
  jumlahMahasiswa: '0',
};

const fieldClass =
  'mt-1.5 h-9 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6]';

export default function DataMentor() {
  const [data, setData] = useState<Mentor[]>(initialData);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 7;
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [notice, setNotice] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return data;
    return data.filter((item) =>
      [
        item.tempatMagang,
        item.nama,
        item.email,
        item.alamat,
        item.noHp,
        item.jabatan,
        item.golongan,
      ].some((value) => value.toLowerCase().includes(keyword)),
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
    setModalOpen(true);
  }

  function openEdit(item: Mentor) {
    setEditingId(item.id);
    setForm({
      tempatMagang: item.tempatMagang,
      nama: item.nama,
      email: item.email,
      alamat: item.alamat,
      noHp: item.noHp,
      jabatan: item.jabatan,
      golongan: item.golongan,
      jumlahMahasiswa: String(item.jumlahMahasiswa),
    });
    setModalOpen(true);
  }

  function saveData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = {
      ...form,
      jumlahMahasiswa: Math.max(0, Number(form.jumlahMahasiswa) || 0),
    };
    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId ? { ...item, ...values } : item,
        ),
      );
      setNotice({
        title: 'Data mentor diperbarui',
        message: 'Perubahan data mentor berhasil disimpan.',
      });
    } else {
      setData((current) => [{ id: Date.now(), ...values }, ...current]);
      setPage(1);
      setNotice({
        title: 'Data mentor ditambahkan',
        message: 'Data mentor baru berhasil disimpan.',
      });
    }
    setModalOpen(false);
  }

  function deleteData(item: Mentor) {
    if (!window.confirm(`Yakin ingin menghapus mentor "${item.nama}"?`)) return;
    setData((current) => current.filter((row) => row.id !== item.id));
    setNotice({
      title: 'Data mentor dihapus',
      message: 'Data mentor telah dihapus dari daftar.',
    });
  }

  function resetPassword(item: Mentor) {
    setNotice({
      title: 'Reset password',
      message: `Permintaan reset password untuk ${item.nama}. Fitur ini belum terhubung ke backend.`,
    });
  }

  function syncData() {
    setSearch('');
    setPage(1);
    setNotice({
      title: 'Sinkronisasi Berhasil',
      message: 'Daftar mentor diperbarui. Data saat ini masih berupa dummy.',
    });
  }

  function exportData() {
    const headers = [
      'Tempat Magang',
      'Nama Mentor',
      'Email',
      'Alamat',
      'No. HP',
      'Nama Jabatan',
      'Golongan',
      'List Mahasiswa',
    ];
    const rows = filteredData.map((item) => [
      item.tempatMagang,
      item.nama,
      item.email,
      item.alamat,
      item.noHp,
      item.jabatan,
      item.golongan,
      item.jumlahMahasiswa,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','),
      )
      .join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data-mentor.csv';
    link.click();
    URL.revokeObjectURL(url);
    setNotice({
      title: 'Ekspor data berhasil',
      message: 'Data mentor berhasil diekspor ke file CSV.',
    });
  }

  const field = (
    label: string,
    key: keyof typeof emptyForm,
    required = false,
    wide = false,
  ) => (
    <label className={wide ? 'block sm:col-span-2' : 'block'}>
      <span className="text-[10px] font-medium text-[#52627A]">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        value={form[key]}
        required={required}
        type={
          key === 'email'
            ? 'email'
            : key === 'jumlahMahasiswa'
              ? 'number'
              : 'text'
        }
        min={key === 'jumlahMahasiswa' ? 0 : undefined}
        onChange={(event) =>
          setForm((current) => ({ ...current, [key]: event.target.value }))
        }
        className={fieldClass}
        placeholder={`Masukkan ${label.toLowerCase()}`}
      />
    </label>
  );

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Data Mentor
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola data mentor dan tempat pelaksanaan magang.
          </p>
        </header>

        {/* Card 1: heading + search + actions */}
        <section className="mb-4 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-3">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Mentor
            </h2>
            <p className="mt-1 text-[10px] leading-4 text-[#71819B]">
              Daftar mentor dan informasi tempat magang yang terdaftar.
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
                placeholder="Cari tempat magang, nama mentor, email, atau jabatan..."
                className="w-full bg-transparent text-[11px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 xl:shrink-0">
              <button
                type="button"
                onClick={openAdd}
                className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[11px] font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={14} /> Tambah Data Mentor
              </button>
              <button
                type="button"
                onClick={exportData}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#B8CCFF] bg-white px-3 text-[11px] font-semibold text-[#3569F6] transition hover:bg-blue-50"
              >
                <Download size={14} /> Eksport Data Mentor
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

        {/* Card 2: mentor table */}
        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  {[
                    'NO.',
                    'TEMPAT MAGANG',
                    'NAMA MENTOR',
                    'EMAIL',
                    'ALAMAT',
                    'NO. HP',
                    'NAMA JABATAN',
                    'GOLONGAN',
                    'LIST MHS',
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
                    <td className="min-w-[145px] px-3 py-3 text-[10px] font-semibold leading-4 text-[#273750]">
                      {item.tempatMagang}
                    </td>
                    <td className="min-w-[155px] px-3 py-3">
                      <p className="text-[10px] font-semibold leading-4 text-[#273750]">
                        {item.nama}
                      </p>
                      <p className="mt-0.5 text-[9px] text-[#8291A8]">
                        ID: MTR-{String(item.id + 202400).padStart(6, '0')}
                      </p>
                    </td>
                    <td className="min-w-[165px] px-3 py-3 text-[9px] text-[#52627A]">
                      {item.email}
                    </td>
                    <td className="min-w-[130px] px-3 py-3 text-[9px] leading-4 text-[#52627A]">
                      {item.alamat}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-[9px] text-[#52627A]">
                      {item.noHp}
                    </td>
                    <td className="min-w-[125px] px-3 py-3 text-[10px] leading-4 text-[#273750]">
                      {item.jabatan}
                    </td>
                    <td className="min-w-[90px] px-3 py-3 text-center text-[9px] text-[#52627A]">
                      {item.golongan}
                    </td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded bg-[#EEF4FF] px-2 py-1 text-[9px] font-medium text-[#3569F6]">
                        <Users size={10} />
                        {item.jumlahMahasiswa} Mhs
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          title="Edit mentor"
                          aria-label={`Edit ${item.nama}`}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] hover:bg-blue-50"
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteData(item)}
                          title="Hapus mentor"
                          aria-label={`Hapus ${item.nama}`}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-red-200 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => resetPassword(item)}
                          title="Reset password"
                          aria-label={`Reset password ${item.nama}`}
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DCE5F1] text-[#52627A] hover:bg-slate-50 hover:text-[#3569F6]"
                        >
                          <Fingerprint size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {visibleData.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-4 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada data mentor yang sesuai dengan pencarian.
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
              {filteredData.length} entri
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

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalOpen(false);
          }}
        >
          <div className="max-h-[94vh] w-full max-w-[760px] overflow-y-auto rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E8EEF7] bg-white px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null
                    ? 'Edit Data Mentor'
                    : 'Tambah Data Mentor'}
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Lengkapi informasi mentor dan tempat magang.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Tutup formulir"
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>
            <form onSubmit={saveData} className="px-5 py-4">
              <div className="mb-4 flex items-center gap-2 border-b border-[#E8EEF7] pb-2 text-[10px] font-bold tracking-wide text-[#52627A]">
                <Info size={13} className="text-[#3569F6]" />
                INFORMASI MENTOR
              </div>
              <div className="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2">
                {field('Tempat Magang', 'tempatMagang', true)}
                {field('Nama Mentor', 'nama', true)}
                {field('Email', 'email', true)}
                {field('Alamat', 'alamat', true)}
                {field('No. HP', 'noHp', true)}
                {field('Nama Jabatan', 'jabatan', true)}
                {field('Golongan', 'golongan')}
                {field('Jumlah Mahasiswa', 'jumlahMahasiswa')}
              </div>
              <div className="mt-4 flex justify-end gap-2 border-t border-[#E8EEF7] pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
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
