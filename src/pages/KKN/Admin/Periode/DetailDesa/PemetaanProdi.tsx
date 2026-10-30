import { useEffect, useState, type FormEvent } from 'react';
import {
  PencilLine,
  Trash2,
  Users,
  Plus,
  X,
  MapPin,
  Check,
} from 'lucide-react';

type PlotingProdi = {
  id: number;
  prodi: string;
  jurusan: string;
  fakultas: string;
  jumlah: number;
};

type PemetaanProdiProps = {
  periodeId: number;
  desaId: string | number;
  namaDesa: string;
};

const DATA_AWAL: PlotingProdi[] = [
  {
    id: 1,
    prodi: 'Kebidanan (S1)',
    jurusan: 'Jurusan Kebidanan',
    fakultas: 'Fakultas Kedokteran',
    jumlah: 1,
  },
  {
    id: 2,
    prodi: 'Kebidanan (S1)',
    jurusan: 'Jurusan Kebidanan',
    fakultas: 'Fakultas Kedokteran',
    jumlah: 1,
  },
  {
    id: 3,
    prodi: 'Kebidanan (S1)',
    jurusan: 'Jurusan Kebidanan',
    fakultas: 'Fakultas Kedokteran',
    jumlah: 1,
  },
  {
    id: 4,
    prodi: 'Ilmu Hukum (S1)',
    jurusan: 'Jurusan Hukum dan Kewarganegaraan',
    fakultas: 'Fakultas Hukum dan Ilmu Sosial',
    jumlah: 1,
  },
];

export default function Pemetaanprodi({
  periodeId,
  desaId,
  namaDesa,
}: PemetaanProdiProps) {
  const storageKey = `kkn-ploting-prodi-${periodeId}-${String(desaId)}`;

  const [plotingProdi, setPlotingProdi] = useState<PlotingProdi[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as PlotingProdi[];
        return parsed.map((item) =>
          item.prodi === 'Kebidanan (S1)'
            ? {
                ...item,
                jurusan:
                  !item.jurusan || item.jurusan === '—'
                    ? 'Jurusan Kebidanan'
                    : item.jurusan,
                fakultas:
                  !item.fakultas || item.fakultas === '—'
                    ? 'Fakultas Kedokteran'
                    : item.fakultas,
              }
            : item,
        );
      }
    } catch {
      // Gunakan data awal jika localStorage belum tersedia.
    }
    return DATA_AWAL;
  });

  const [modalPloting, setModalPloting] = useState(false);
  const [editPlotingId, setEditPlotingId] = useState<number | null>(null);
  const [formPloting, setFormPloting] = useState({ prodi: '', jumlah: '' });
  const [notice, setNotice] = useState('');
  const [plotingDilihat, setPlotingDilihat] = useState<PlotingProdi | null>(
    null,
  );

  const kuotaTotal = 17;
  const jumlahTerplot = plotingProdi.reduce(
    (total, item) => total + item.jumlah,
    0,
  );
  const kuotaTersedia = Math.max(0, kuotaTotal - jumlahTerplot);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(plotingProdi));
  }, [plotingProdi, storageKey]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 2800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const bukaFormPloting = (item?: PlotingProdi) => {
    setEditPlotingId(item?.id ?? null);
    setFormPloting({
      prodi: item?.prodi ?? '',
      jumlah: item ? String(item.jumlah) : '',
    });
    setModalPloting(true);
  };

  const simpanPloting = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const jumlah = Number(formPloting.jumlah);
    if (!formPloting.prodi || !Number.isInteger(jumlah) || jumlah < 1) return;

    const prodiInfo: Record<string, { jurusan: string; fakultas: string }> = {
      'Kebidanan (S1)': {
        jurusan: 'Jurusan Kebidanan',
        fakultas: 'Fakultas Kedokteran',
      },
      'Ilmu Hukum (S1)': {
        jurusan: 'Jurusan Hukum dan Kewarganegaraan',
        fakultas: 'Fakultas Hukum dan Ilmu Sosial',
      },
    };

    const jumlahLama =
      editPlotingId === null
        ? 0
        : (plotingProdi.find((item) => item.id === editPlotingId)?.jumlah ?? 0);
    const sisaJikaEdit = kuotaTersedia + jumlahLama;

    if (jumlah > sisaJikaEdit) {
      setNotice(
        `Jumlah mahasiswa melebihi kuota tersedia (${sisaJikaEdit} mahasiswa).`,
      );
      return;
    }

    const info = prodiInfo[formPloting.prodi];
    if (editPlotingId !== null) {
      setPlotingProdi((old) =>
        old.map((item) =>
          item.id === editPlotingId
            ? { ...item, ...info, prodi: formPloting.prodi, jumlah }
            : item,
        ),
      );
    } else {
      setPlotingProdi((old) => [
        ...old,
        { id: Date.now(), ...info, prodi: formPloting.prodi, jumlah },
      ]);
    }

    setModalPloting(false);
    setNotice(
      editPlotingId === null
        ? 'Ploting program studi berhasil ditambahkan.'
        : 'Ploting program studi berhasil diperbarui.',
    );
  };

  const hapusPloting = (item: PlotingProdi) => {
    if (!window.confirm(`Hapus ploting ${item.prodi}?`)) return;
    setPlotingProdi((old) => old.filter((row) => row.id !== item.id));
    setNotice(`Ploting ${item.prodi} berhasil dihapus.`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#172943]">Pemetaan Prodi</h2>
          <p className="mt-1 text-xs leading-5 text-[#71819B]">
            Daftar program studi dan jumlah mahasiswa yang ditempatkan di Desa{' '}
            {namaDesa}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => bukaFormPloting()}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#0755D9] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0648B8]"
        >
          <Plus size={15} /> Masukkan Ploting Desa
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#C7D9F5] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="bg-gradient-to-r from-[#EAF1FF] to-[#F3F7FF] text-[10px] font-bold uppercase tracking-wide text-[#52688C]">
                <th className="px-5 py-4 text-center">No.</th>
                <th className="px-5 py-4">Prodi</th>
                <th className="px-5 py-4">Jurusan / Fakultas</th>
                <th className="px-5 py-4 text-center">Jumlah Mahasiswa</th>
                <th className="px-5 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {plotingProdi.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-t border-[#EAF0F8] text-xs text-[#273750] transition-colors hover:bg-[#F8FAFF]"
                >
                  <td className="px-5 py-4 text-center text-[#64748B]">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4 font-semibold">{item.prodi}</td>
                  <td className="px-5 py-3">
                    <div className="max-w-[230px] leading-5">
                      <p>{item.jurusan}</p>
                      <p className="text-[11px] text-[#71819B]">
                        {item.fakultas}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex min-w-[116px] items-center justify-center gap-1.5 rounded-full border border-[#BFD3FF] bg-gradient-to-r from-[#EAF2FF] to-[#DCE9FF] px-3.5 py-1.5 text-[11px] font-bold text-[#1D55C7] shadow-sm">
                      <Users size={13} />
                      {item.jumlah} Mahasiswa
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => bukaFormPloting(item)}
                        title="Edit ploting"
                        aria-label="Edit ploting"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#BFD0FF] bg-white text-[#2563EB] transition hover:bg-[#EFF5FF]"
                      >
                        <PencilLine size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => hapusPloting(item)}
                        title="Hapus ploting"
                        aria-label="Hapus ploting"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#F5BFC3] bg-white text-[#EF4444] transition hover:bg-[#FFF1F2]"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {plotingProdi.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-xs text-[#71819B]"
                  >
                    Belum ada pemetaan program studi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalPloting && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-[#14233B]/45 p-3 sm:p-5">
          <form
            onSubmit={simpanPloting}
            className="w-full max-w-2xl rounded-xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-[#C7D9F5] px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-[#172943]">
                  {editPlotingId === null
                    ? 'Masukkan Ploting Desa'
                    : 'Ubah Ploting Desa'}
                </h2>
                <p className="mt-1 text-xs text-[#71819B]">
                  Tambahkan pemetaan program studi dan jumlah mahasiswa yang
                  akan ditempatkan di Desa {namaDesa}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalPloting(false)}
                className="rounded p-1 text-[#8A97AA] hover:bg-[#F1F5FA]"
                aria-label="Tutup"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 px-5 py-6">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#40516A]">
                  Program Studi <span className="text-red-500">*</span>
                </span>
                <select
                  required
                  value={formPloting.prodi}
                  onChange={(event) =>
                    setFormPloting((old) => ({
                      ...old,
                      prodi: event.target.value,
                    }))
                  }
                  className="h-12 w-full rounded-md border-2 border-[#A9C5F5] bg-white px-4 text-sm text-[#40516A] outline-none transition focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/15"
                >
                  <option value="">Pilih Program Studi</option>
                  <option value="Kebidanan (S1)">Kebidanan (S1)</option>
                  <option value="Ilmu Hukum (S1)">Ilmu Hukum (S1)</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[#40516A]">
                  Jumlah Mahasiswa <span className="text-red-500">*</span>
                </span>
                <input
                  required
                  min="1"
                  max={
                    kuotaTersedia +
                    (editPlotingId === null
                      ? 0
                      : jumlahLamaForEdit(plotingProdi, editPlotingId))
                  }
                  type="number"
                  value={formPloting.jumlah}
                  onChange={(event) =>
                    setFormPloting((old) => ({
                      ...old,
                      jumlah: event.target.value,
                    }))
                  }
                  placeholder="Masukkan jumlah mahasiswa"
                  className="h-12 w-full rounded-md border-2 border-[#A9C5F5] bg-white px-4 text-sm text-[#273750] outline-none placeholder:text-[#9AAAC0] transition focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/15"
                />
                <span className="mt-2 block text-xs text-[#71819B]">
                  Masukkan jumlah mahasiswa yang akan ditempatkan pada program
                  studi ini.
                </span>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-[#C7D9F5] bg-[#F4F8FF] px-4 py-4 text-sm">
                <span className="inline-flex items-center gap-2 text-[#273750]">
                  <MapPin size={16} className="shrink-0 text-[#3569F6]" />{' '}
                  {namaDesa}
                </span>
                <span className="text-[#52627A]">
                  Kuota yang tersedia:{' '}
                  <strong className="text-[#245BD6]">
                    {kuotaTersedia +
                      (editPlotingId === null
                        ? 0
                        : jumlahLamaForEdit(plotingProdi, editPlotingId))}{' '}
                    mahasiswa
                  </strong>
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#C7D9F5] px-5 py-4">
              <button
                type="button"
                onClick={() => setModalPloting(false)}
                className="rounded-md border border-[#DCE5F1] bg-white px-5 py-3 text-sm font-semibold text-[#52627A] hover:bg-[#F7F9FC]"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-[#2860E8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#194DBD]"
              >
                <Check size={16} /> Simpan Ploting
              </button>
            </div>
          </form>
        </div>
      )}

      {plotingDilihat && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-[#14233B]/45 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-[#C7D9F5] px-5 py-4">
              <div>
                <h3 className="text-base font-bold text-[#172943]">
                  Detail Ploting Prodi
                </h3>
                <p className="mt-1 text-xs text-[#71819B]">
                  Informasi penempatan program studi di Desa {namaDesa}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPlotingDilihat(null)}
                aria-label="Tutup detail ploting"
                className="rounded-md p-1.5 text-[#71819B] hover:bg-[#F2F6FC]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2">
              <div className="rounded-lg border border-[#8FB3F0] bg-white p-3">
                <p className="text-[10px] font-semibold uppercase text-[#71819B]">
                  Program Studi
                </p>
                <p className="mt-1.5 text-sm font-semibold text-[#24344D]">
                  {plotingDilihat.prodi}
                </p>
              </div>
              <div className="rounded-lg border border-[#8FB3F0] bg-white p-3">
                <p className="text-[10px] font-semibold uppercase text-[#71819B]">
                  Jumlah Mahasiswa
                </p>
                <p className="mt-1.5 text-sm font-semibold text-[#24344D]">
                  {plotingDilihat.jumlah} Mahasiswa
                </p>
              </div>
              <div className="rounded-lg border border-[#8FB3F0] bg-white p-3 sm:col-span-2">
                <p className="text-[10px] font-semibold uppercase text-[#71819B]">
                  Jurusan
                </p>
                <p className="mt-1.5 text-sm font-semibold text-[#24344D]">
                  {plotingDilihat.jurusan}
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase text-[#71819B]">
                  Fakultas
                </p>
                <p className="mt-1 text-sm text-[#24344D]">
                  {plotingDilihat.fakultas}
                </p>
              </div>
            </div>
            <div className="flex justify-end border-t border-[#C7D9F5] px-5 py-3">
              <button
                type="button"
                onClick={() => setPlotingDilihat(null)}
                className="rounded-lg border border-[#D5E0EF] px-4 py-2 text-xs font-semibold text-[#52627A] hover:bg-[#F7F9FC]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

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

function jumlahLamaForEdit(items: PlotingProdi[], id: number) {
  return items.find((item) => item.id === id)?.jumlah ?? 0;
}
