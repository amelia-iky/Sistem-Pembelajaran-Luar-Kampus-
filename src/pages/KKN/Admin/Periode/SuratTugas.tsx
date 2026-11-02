import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  Search,
  Plus,
  Eye,
  PencilLine,
  Trash2,
  X,
  FileText,
  Check,
} from 'lucide-react';

type Dosen = {
  id: number;
  nip: string;
  nama: string;
  nomorSurat: string;
  tanggalSurat: string;
};

const STORAGE_KEY = 'kkn-surat-tugas-dosen';

const DATA_AWAL: Dosen[] = [
  {
    id: 1,
    nip: '197805122005011002',
    nama: 'Dr. I Made Sutama, S.Pd., M.Pd.',
    nomorSurat: '123/UN48.16/DT/2026',
    tanggalSurat: '2026-07-10',
  },
  {
    id: 2,
    nip: '198203152008121001',
    nama: 'Ni Luh Putu Sri Wahyuni, S.Pd., M.Pd.',
    nomorSurat: '124/UN48.16/DT/2026',
    tanggalSurat: '2026-07-12',
  },
  {
    id: 3,
    nip: '197912202006041003',
    nama: 'Dr. I Gede Sujana, M.Si.',
    nomorSurat: '125/UN48.16/DT/2026',
    tanggalSurat: '2026-07-15',
  },
];

const formatTanggal = (value: string) => {
  if (!value) return '-';

  const tanggal = new Date(`${value}T00:00:00`);

  return Number.isNaN(tanggal.getTime())
    ? value
    : tanggal.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
};

const fieldClass =
  'h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[12px] text-[#354760] outline-none transition placeholder:text-[#9AA8BA] focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/10';

const labelClass = 'mb-1.5 block text-[11px] font-semibold text-[#40516A]';

export default function SuratTugasDosen() {
  const [dataDosen, setDataDosen] = useState<Dosen[]>(() => {
    try {
      const tersimpan = localStorage.getItem(STORAGE_KEY);

      return tersimpan ? JSON.parse(tersimpan) : DATA_AWAL;
    } catch {
      return DATA_AWAL;
    }
  });

  const [cari, setCari] = useState('');
  const [modalTambah, setModalTambah] = useState(false);
  const [dosenEdit, setDosenEdit] = useState<Dosen | null>(null);
  const [dosenLihat, setDosenLihat] = useState<Dosen | null>(null);

  const [nip, setNip] = useState('');
  const [nama, setNama] = useState('');
  const [nomorSurat, setNomorSurat] = useState('');
  const [tanggalSurat, setTanggalSurat] = useState('');

  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataDosen));
  }, [dataDosen]);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(''), 2600);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const dataTampil = useMemo(() => {
    const keyword = cari.trim().toLowerCase();

    return dataDosen.filter((item) =>
      `${item.nip} ${item.nama} ${item.nomorSurat} ${item.tanggalSurat}`
        .toLowerCase()
        .includes(keyword),
    );
  }, [dataDosen, cari]);

  const resetForm = () => {
    setNip('');
    setNama('');
    setNomorSurat('');
    setTanggalSurat('');
    setError('');
  };

  const bukaTambah = () => {
    resetForm();
    setDosenEdit(null);
    setModalTambah(true);
  };

  const bukaEdit = (item: Dosen) => {
    setDosenEdit(item);
    setNip(item.nip);
    setNama(item.nama);
    setNomorSurat(item.nomorSurat);
    setTanggalSurat(item.tanggalSurat);
    setError('');
  };

  const simpanData = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!nip.trim() || !nama.trim() || !nomorSurat.trim() || !tanggalSurat) {
      setError('Semua data wajib diisi.');
      return;
    }

    const nipDuplikat = dataDosen.some(
      (item) => item.nip === nip.trim() && item.id !== dosenEdit?.id,
    );

    if (nipDuplikat) {
      setError('NIP dosen sudah terdaftar.');
      return;
    }

    if (dosenEdit) {
      setDataDosen((old) =>
        old.map((item) =>
          item.id === dosenEdit.id
            ? {
                ...item,
                nip: nip.trim(),
                nama: nama.trim(),
                nomorSurat: nomorSurat.trim(),
                tanggalSurat,
              }
            : item,
        ),
      );

      setNotice('Data surat tugas berhasil diperbarui.');
      setDosenEdit(null);
    } else {
      const dataBaru: Dosen = {
        id: Date.now(),
        nip: nip.trim(),
        nama: nama.trim(),
        nomorSurat: nomorSurat.trim(),
        tanggalSurat,
      };

      setDataDosen((old) => [dataBaru, ...old]);
      setModalTambah(false);
      setNotice('Data surat tugas berhasil ditambahkan.');
    }

    resetForm();
  };

  const hapusData = (item: Dosen) => {
    const konfirmasi = window.confirm(
      `Apakah kamu yakin ingin menghapus surat tugas ${item.nama}?`,
    );

    if (!konfirmasi) return;

    setDataDosen((old) => old.filter((data) => data.id !== item.id));

    setNotice('Data surat tugas berhasil dihapus.');
  };

  const tutupModal = () => {
    setModalTambah(false);
    setDosenEdit(null);
    resetForm();
  };

  return (
    <div className="p-0">
      {/* JUDUL */}
      <div className="mb-5">
        <h2 className="text-[15px] font-bold text-[#172943]">
          SPD dan Surat Tugas Dosen
        </h2>

        <p className="mt-1 text-[11px] text-[#71819B]">
          Kelola data dosen dan surat tugas dalam periode KKN.
        </p>
      </div>

      {/* SEARCH DAN TAMBAH */}
      <div className="mb-5 flex flex-col gap-3 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-[0_2px_5px_rgba(31,52,80,0.04)] sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full min-w-0 sm:max-w-[520px] sm:flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8EA3C0]"
          />

          <input
            type="search"
            value={cari}
            onChange={(event) => setCari(event.target.value)}
            placeholder="Cari NIP, nama dosen, atau nomor surat..."
            aria-label="Cari surat tugas dosen"
            className="h-10 w-full rounded-md border border-[#B8CCFF] bg-[#E7F0FC] pl-9 pr-3 text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF] focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/10"
          />
        </div>

        <button
          type="button"
          onClick={bukaTambah}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-3.5 text-[11px] font-semibold text-white transition hover:bg-[#245BD6]"
        >
          <Plus size={15} />
          Tambah Surat Tugas
        </button>
      </div>

      {/* TABEL */}
      <div className="overflow-hidden rounded-lg border border-[#DCE7F7] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead>
              <tr className="bg-[#EEF4FF] text-[9px] font-bold uppercase tracking-wide text-[#52627A]">
                <th className="px-3 py-3">NIP</th>
                <th className="px-3 py-3">Nama Dosen</th>
                <th className="px-3 py-3">Nomor Surat Tugas</th>
                <th className="px-3 py-3">Tanggal Surat Tugas</th>
                <th className="px-3 py-3 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {dataTampil.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[#EDF1F7] text-[10px] text-[#34445E] transition hover:bg-[#F8FAFF]"
                >
                  <td className="whitespace-nowrap px-3 py-3.5 font-medium">
                    {item.nip}
                  </td>

                  <td className="px-3 py-3">
                    <p className="font-semibold text-[#273750]">{item.nama}</p>
                  </td>

                  <td className="whitespace-nowrap px-3 py-3.5">
                    {item.nomorSurat}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3.5">
                    {formatTanggal(item.tanggalSurat)}
                  </td>

                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        title="Lihat detail"
                        aria-label={`Lihat ${item.nama}`}
                        onClick={() => setDosenLihat(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] transition hover:bg-[#EEF4FF]"
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        type="button"
                        title="Edit data"
                        aria-label={`Edit ${item.nama}`}
                        onClick={() => bukaEdit(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#245BD6] transition hover:bg-[#EEF4FF]"
                      >
                        <PencilLine size={14} />
                      </button>

                      <button
                        type="button"
                        title="Hapus data"
                        aria-label={`Hapus ${item.nama}`}
                        onClick={() => hapusData(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#FFCACA] text-[#D64545] transition hover:bg-[#FFF3F3]"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {dataTampil.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-[11px] text-[#8492A8]"
                  >
                    {cari
                      ? 'Tidak ada data yang sesuai dengan pencarian.'
                      : 'Belum ada data surat tugas dosen.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#EDF1F7] px-3 py-3 text-[10px] text-[#8492A8]">
          Menampilkan {dataTampil.length} dari {dataDosen.length} data dosen
        </div>
      </div>

      {/* MODAL TAMBAH DAN EDIT */}
      {(modalTambah || dosenEdit) && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[#14233B]/45 p-4">
          <form
            onSubmit={simpanData}
            className="my-auto w-full max-w-[460px] overflow-hidden rounded-xl border border-[#E2EAF5] bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3569F6]">
                  <FileText size={17} />
                </div>

                <h2 className="text-[14px] font-semibold text-[#263750]">
                  {dosenEdit
                    ? 'Edit Surat Tugas Dosen'
                    : 'Tambah Surat Tugas Dosen'}
                </h2>
              </div>

              <button
                type="button"
                onClick={tutupModal}
                aria-label="Tutup modal"
                className="rounded-md p-1 text-[#91A0B5] transition hover:bg-[#F1F5FA] hover:text-[#34445E]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <label className={labelClass}>NIP Dosen</label>
                <input
                  required
                  value={nip}
                  onChange={(event) => setNip(event.target.value)}
                  placeholder="Masukkan NIP dosen"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Nama Dosen</label>
                <input
                  required
                  value={nama}
                  onChange={(event) => setNama(event.target.value)}
                  placeholder="Masukkan nama lengkap dosen"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Nomor Surat Tugas</label>
                <input
                  required
                  value={nomorSurat}
                  onChange={(event) => setNomorSurat(event.target.value)}
                  placeholder="Masukkan nomor surat tugas"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Tanggal Surat Tugas</label>
                <input
                  required
                  type="date"
                  value={tanggalSurat}
                  onChange={(event) => setTanggalSurat(event.target.value)}
                  className={fieldClass}
                />
              </div>

              {error && <p className="text-[11px] text-red-600">{error}</p>}
            </div>

            <div className="flex justify-end gap-2 border-t border-[#E8EEF7] bg-[#FBFCFE] px-5 py-3.5">
              <button
                type="button"
                onClick={tutupModal}
                className="h-9 rounded-md border border-[#DCE5F1] bg-white px-4 text-[11px] font-semibold text-[#52627A] transition hover:bg-[#F5F8FC]"
              >
                Batal
              </button>

              <button
                type="submit"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-[#2860E8] px-4 text-[11px] font-semibold text-white transition hover:bg-[#194DBD]"
              >
                <Check size={14} />
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL LIHAT DETAIL */}
      {dosenLihat && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#14233B]/45 p-4">
          <div className="w-full max-w-[440px] overflow-hidden rounded-xl border border-[#E2EAF5] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3569F6]">
                  <Eye size={17} />
                </div>

                <h2 className="text-[14px] font-semibold text-[#263750]">
                  Detail Surat Tugas
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setDosenLihat(null)}
                aria-label="Tutup detail"
                className="rounded-md p-1 text-[#91A0B5] transition hover:bg-[#F1F5FA]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              {[
                { label: 'NIP', value: dosenLihat.nip },
                { label: 'Nama Dosen', value: dosenLihat.nama },
                {
                  label: 'Nomor Surat Tugas',
                  value: dosenLihat.nomorSurat,
                },
                {
                  label: 'Tanggal Surat Tugas',
                  value: formatTanggal(dosenLihat.tanggalSurat),
                },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-semibold text-[#8492A8]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[12px] font-medium text-[#34445E]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end border-t border-[#E8EEF7] bg-[#FBFCFE] px-5 py-3.5">
              <button
                type="button"
                onClick={() => setDosenLihat(null)}
                className="h-9 rounded-md bg-[#3569F6] px-4 text-[11px] font-semibold text-white transition hover:bg-[#245BD6]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFIKASI */}
      {notice && (
        <div
          role="status"
          className="fixed right-5 top-5 z-[150] rounded-lg border border-[#C9D9FF] bg-white px-4 py-3 text-xs text-[#273750] shadow-lg"
        >
          {notice}
        </div>
      )}
    </div>
  );
}
