import { useMemo, useState } from 'react';
import {
  Search,
  RefreshCw,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Info,
} from 'lucide-react';

type Instrumen = {
  id: number;
  nama: string;
  bobot: number;
  aktif: boolean;
};

type FormInstrumen = {
  nama: string;
  bobot: string;
  status: 'Aktif' | 'Nonaktif';
};

const initialData: Instrumen[] = [
  { id: 1, nama: 'Tanggung Jawab', bobot: 10, aktif: true },
  { id: 2, nama: 'Keuletan/Ketekunan', bobot: 15, aktif: true },
  { id: 3, nama: 'Semangat Kerja', bobot: 10, aktif: true },
  { id: 4, nama: 'Kesopanan (Tatakrama)', bobot: 10, aktif: true },
  { id: 5, nama: 'Kejujuran', bobot: 15, aktif: true },
  { id: 6, nama: 'Kedisiplinan', bobot: 10, aktif: true },
  { id: 7, nama: 'Kreativitas', bobot: 15, aktif: true },
  { id: 8, nama: 'Kerjasama', bobot: 15, aktif: true },
];

const emptyForm: FormInstrumen = {
  nama: '',
  bobot: '',
  status: 'Aktif',
};

const inputClass =
  'mt-1.5 h-10 w-full rounded-md border border-[#D6E0EF] bg-white px-3 text-[12px] text-[#354760] outline-none transition focus:border-[#3569F6] focus:ring-2 focus:ring-blue-100';

export default function Mitra() {
  const [data, setData] = useState<Instrumen[]>(initialData);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormInstrumen>({ ...emptyForm });
  const [notice, setNotice] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) =>
      `${item.nama} ${item.bobot} ${item.aktif ? 'aktif' : 'nonaktif'}`
        .toLowerCase()
        .includes(keyword),
    );
  }, [data, search]);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setFormOpen(true);
  }

  function openEdit(item: Instrumen) {
    setEditingId(item.id);
    setForm({
      nama: item.nama,
      bobot: String(item.bobot),
      status: item.aktif ? 'Aktif' : 'Nonaktif',
    });
    setFormOpen(true);
  }

  function saveData() {
    const bobot = Number(form.bobot);

    if (
      !form.nama.trim() ||
      form.bobot.trim() === '' ||
      !Number.isFinite(bobot) ||
      bobot < 0 ||
      bobot > 100
    ) {
      setNotice({
        title: 'Data belum valid',
        message: 'Isi nama instrumen dan bobot antara 0 sampai 100.',
      });
      return;
    }

    if (editingId !== null) {
      setData((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                nama: form.nama.trim(),
                bobot,
                aktif: form.status === 'Aktif',
              }
            : item,
        ),
      );

      setNotice({
        title: 'Data berhasil diperbarui',
        message: 'Perubahan instrumen mitra berhasil disimpan.',
      });
    } else {
      const newItem: Instrumen = {
        id: Date.now(),
        nama: form.nama.trim(),
        bobot,
        aktif: form.status === 'Aktif',
      };

      setData((current) => [newItem, ...current]);

      setNotice({
        title: 'Data berhasil ditambahkan',
        message: 'Instrumen mitra baru berhasil ditambahkan.',
      });
    }

    setFormOpen(false);
  }

  function deleteData(item: Instrumen) {
    if (!window.confirm(`Yakin ingin menghapus instrumen "${item.nama}"?`)) {
      return;
    }

    setData((current) => current.filter((row) => row.id !== item.id));

    setNotice({
      title: 'Data berhasil dihapus',
      message: 'Instrumen mitra telah dihapus dari daftar.',
    });
  }

  function syncData() {
    setData([...initialData]);
    setSearch('');

    setNotice({
      title: 'Sinkronisasi berhasil',
      message: 'Data contoh instrumen mitra berhasil dimuat ulang.',
    });
  }

  return (
    <div className="min-h-[calc(100vh-62px)] bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5">
          <h1 className="text-[22px] font-bold tracking-[-0.4px] text-[#172943]">
            Instrumen Mitra
          </h1>
          <p className="mt-2 text-[12px] leading-5 text-[#71819B]">
            Kelola instrumen penilaian mahasiswa oleh mitra tempat magang.
          </p>
        </header>

        <section className="mb-6 flex items-start gap-3 rounded-[10px] border border-[#B8CCFF] bg-[#EEF4FF] p-4">
          <Info size={19} className="mt-0.5 shrink-0 text-[#3569F6]" />
          <div>
            <h2 className="text-[11px] font-bold text-[#3569F6]">INFORMASI</h2>
            <p className="mt-1 text-[12px] leading-5 text-[#52627A]">
              Kelola nama instrumen, bobot penilaian, dan status keberlakuan
              instrumen penilaian oleh mitra.
            </p>
          </div>
        </section>

        <section className="mb-6 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="mb-4">
            <h2 className="text-[13px] font-bold text-[#172943]">
              Data Instrumen Mitra
            </h2>
            <p className="mt-1 text-[11px] leading-4 text-[#71819B]">
              Daftar instrumen penilaian beserta bobot dan statusnya.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex h-10 min-w-0 w-full max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
              <Search size={16} className="shrink-0 text-[#8EA3C0]" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari nama instrumen atau status..."
                className="w-full bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
              />
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2">
              <button
                type="button"
                onClick={openAdd}
                className="inline-flex h-10 items-center gap-1.5 rounded-md bg-[#3569F6] px-3 text-[11px] font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={15} />
                Tambah Data
              </button>

              <button
                type="button"
                onClick={syncData}
                title="Sinkronisasi data"
                aria-label="Sinkronisasi data"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#B8CCFF] bg-white text-[#8295B0] transition hover:bg-blue-50 hover:text-[#3569F6]"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[10px] border border-[#B8CCFF] bg-white shadow-[0_2px_5px_rgba(31,52,80,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#D9E5F7] bg-[#EEF4FF]">
                  <th className="w-[65px] px-4 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    No.
                  </th>
                  <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Instrumen
                  </th>
                  <th className="w-[110px] px-4 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Bobot
                  </th>
                  <th className="w-[130px] px-4 py-4 text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Status
                  </th>
                  <th className="w-[110px] px-4 py-4 text-center text-[10px] font-bold uppercase tracking-wide text-[#52627A]">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#EDF1F7] last:border-b-0 transition hover:bg-[#F8FAFF]"
                  >
                    <td className="px-4 py-4 text-[11px] text-[#61718A]">
                      {index + 1}
                    </td>
                    <td className="min-w-[280px] px-4 py-4">
                      <p className="text-[11px] font-semibold leading-5 text-[#273750]">
                        {item.nama}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-[11px] text-[#34445E]">
                      {item.bobot}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                          item.aktif
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-slate-200 bg-slate-100 text-slate-500'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.aktif ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {item.aktif ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          title="Edit instrumen"
                          aria-label={`Edit ${item.nama}`}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-[#3569F6] text-[#3569F6] transition hover:bg-blue-50"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteData(item)}
                          title="Hapus instrumen"
                          aria-label={`Hapus ${item.nama}`}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-red-200 text-red-500 transition hover:bg-red-50"
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
                      colSpan={5}
                      className="px-5 py-12 text-center text-[12px] text-[#8A99B0]"
                    >
                      Tidak ada instrumen yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-[#EDF1F7] px-4 py-3">
            <p className="text-[10px] text-[#8A99B0]">
              Menampilkan {filteredData.length} dari {data.length} instrumen
            </p>
          </div>
        </section>
      </div>

      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setFormOpen(false);
          }}
        >
          <div className="w-full max-w-[480px] overflow-hidden rounded-xl border border-[#DCE5F1] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div>
                <h2 className="text-[14px] font-bold text-[#172943]">
                  {editingId !== null
                    ? 'Edit Instrumen Mitra'
                    : 'Tambah Instrumen Mitra'}
                </h2>
                <p className="mt-1 text-[10px] text-[#8291A8]">
                  Lengkapi informasi instrumen penilaian.
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

            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveData();
              }}
              className="px-5 py-5"
            >
              <div className="space-y-4">
                <label className="block">
                  <span className="text-[11px] font-medium text-[#354760]">
                    Nama Instrumen <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    value={form.nama}
                    required
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        nama: event.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="Masukkan nama instrumen"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] font-medium text-[#354760]">
                    Bobot <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    value={form.bobot}
                    required
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        bobot: event.target.value,
                      }))
                    }
                    className={inputClass}
                    placeholder="Masukkan bobot"
                  />
                </label>

                <label className="block">
                  <span className="text-[11px] font-medium text-[#354760]">
                    Status <span className="text-red-500">*</span>
                  </span>
                  <select
                    value={form.status}
                    required
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        status: event.target.value as 'Aktif' | 'Nonaktif',
                      }))
                    }
                    className={inputClass}
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-[#E8EEF7] pt-4">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-[#D6E0EF] bg-white px-4 text-[11px] font-medium text-[#52627A] transition hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3569F6] px-4 text-[11px] font-semibold text-white transition hover:bg-blue-700"
                >
                  <Check size={14} />
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 top-5 z-[100] flex w-[326px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
        >
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={19} />
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
    </div>
  );
}
