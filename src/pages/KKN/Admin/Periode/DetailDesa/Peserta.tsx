import { useEffect, useState, type FormEvent } from 'react';
import {
  UserRoundPlus,
  Users,
  User,
  Search,
  PencilLine,
  Trash2,
  X,
  UsersRound,
  FileText,
  BookOpen,
  Check,
} from 'lucide-react';

type PesertaKKN = {
  id: number;
  nim: string;
  nama: string;
  gender: 'Laki-laki' | 'Perempuan';
  keanggotaan:
    | 'Koordinator Desa'
    | 'Ketua Kelompok'
    | 'Wakil Ketua'
    | 'Sekretaris'
    | 'Bendahara'
    | 'Anggota';
  prodi: string;
  fakultas: string;
  telepon: string;
  jurnal: 'Sudah' | 'Belum';
  laporan: 'Sudah' | 'Belum';
};

type PesertaProps = {
  periodeId: number;
  desaId: string | number;
  namaDesa: string;
};

const DATA_AWAL: PesertaKKN[] = [
  {
    id: 1,
    nim: '2301010001',
    nama: 'Mahasiswa Contoh 01',
    gender: 'Laki-laki',
    keanggotaan: 'Koordinator Desa',
    prodi: 'Kebidanan (S1)',
    fakultas: 'Fakultas Kedokteran',
    telepon: '081234567801',
    jurnal: 'Sudah',
    laporan: 'Belum',
  },
  {
    id: 2,
    nim: '2301010002',
    nama: 'Mahasiswa Contoh 02',
    gender: 'Laki-laki',
    keanggotaan: 'Ketua Kelompok',
    prodi: 'Kebidanan (S1)',
    fakultas: 'Fakultas Kedokteran',
    telepon: '081234567802',
    jurnal: 'Sudah',
    laporan: 'Sudah',
  },
  {
    id: 3,
    nim: '2301010003',
    nama: 'Mahasiswa Contoh 03',
    gender: 'Laki-laki',
    keanggotaan: 'Wakil Ketua',
    prodi: 'Kebidanan (S1)',
    fakultas: 'Fakultas Kedokteran',
    telepon: '081234567803',
    jurnal: 'Belum',
    laporan: 'Belum',
  },
  {
    id: 4,
    nim: '2301010004',
    nama: 'Mahasiswa Contoh 04',
    gender: 'Laki-laki',
    keanggotaan: 'Sekretaris',
    prodi: 'Ilmu Hukum (S1)',
    fakultas: 'Fakultas Hukum dan Ilmu Sosial',
    telepon: '081234567804',
    jurnal: 'Sudah',
    laporan: 'Belum',
  },
  {
    id: 5,
    nim: '2301010005',
    nama: 'Mahasiswa Contoh 05',
    gender: 'Perempuan',
    keanggotaan: 'Bendahara',
    prodi: 'Kebidanan (S1)',
    fakultas: 'Fakultas Kedokteran',
    telepon: '081234567805',
    jurnal: 'Sudah',
    laporan: 'Sudah',
  },
  {
    id: 6,
    nim: '2301010006',
    nama: 'Mahasiswa Contoh 06',
    gender: 'Perempuan',
    keanggotaan: 'Anggota',
    prodi: 'Kebidanan (S1)',
    fakultas: 'Fakultas Kedokteran',
    telepon: '081234567806',
    jurnal: 'Sudah',
    laporan: 'Belum',
  },
  {
    id: 7,
    nim: '2301010007',
    nama: 'Mahasiswa Contoh 07',
    gender: 'Perempuan',
    keanggotaan: 'Anggota',
    prodi: 'Kebidanan (S1)',
    fakultas: 'Fakultas Kedokteran',
    telepon: '081234567807',
    jurnal: 'Belum',
    laporan: 'Belum',
  },
  {
    id: 8,
    nim: '2301010008',
    nama: 'Mahasiswa Contoh 08',
    gender: 'Perempuan',
    keanggotaan: 'Anggota',
    prodi: 'Ilmu Hukum (S1)',
    fakultas: 'Fakultas Hukum dan Ilmu Sosial',
    telepon: '081234567808',
    jurnal: 'Sudah',
    laporan: 'Sudah',
  },
  {
    id: 9,
    nim: '2301010009',
    nama: 'Mahasiswa Contoh 09',
    gender: 'Perempuan',
    keanggotaan: 'Anggota',
    prodi: 'Kebidanan (S1)',
    fakultas: 'Fakultas Kedokteran',
    telepon: '081234567809',
    jurnal: 'Sudah',
    laporan: 'Belum',
  },
  {
    id: 10,
    nim: '2301010010',
    nama: 'Mahasiswa Contoh 10',
    gender: 'Perempuan',
    keanggotaan: 'Anggota',
    prodi: 'Kebidanan (S1)',
    fakultas: 'Fakultas Kedokteran',
    telepon: '081234567810',
    jurnal: 'Belum',
    laporan: 'Belum',
  },
  {
    id: 11,
    nim: '2301010011',
    nama: 'Mahasiswa Contoh 11',
    gender: 'Perempuan',
    keanggotaan: 'Anggota',
    prodi: 'Ilmu Hukum (S1)',
    fakultas: 'Fakultas Hukum dan Ilmu Sosial',
    telepon: '081234567811',
    jurnal: 'Sudah',
    laporan: 'Sudah',
  },
  {
    id: 12,
    nim: '2301010012',
    nama: 'Mahasiswa Contoh 12',
    gender: 'Perempuan',
    keanggotaan: 'Anggota',
    prodi: 'Kebidanan (S1)',
    fakultas: 'Fakultas Kedokteran',
    telepon: '081234567812',
    jurnal: 'Belum',
    laporan: 'Belum',
  },
  {
    id: 13,
    nim: '2301010013',
    nama: 'Mahasiswa Contoh 13',
    gender: 'Perempuan',
    keanggotaan: 'Anggota',
    prodi: 'Kebidanan (S1)',
    fakultas: 'Fakultas Kedokteran',
    telepon: '081234567813',
    jurnal: 'Sudah',
    laporan: 'Belum',
  },
];

const FORM_AWAL = {
  nim: '',
  nama: '',
  gender: 'Laki-laki' as PesertaKKN['gender'],
  keanggotaan: 'Anggota' as PesertaKKN['keanggotaan'],
  prodi: '',
  telepon: '',
};

export default function Peserta({ periodeId, desaId, namaDesa }: PesertaProps) {
  const storageKey = `kkn-peserta-${periodeId}-${String(desaId)}`;

  const [peserta, setPeserta] = useState<PesertaKKN[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (!saved) return DATA_AWAL;

      const parsed = JSON.parse(saved) as Array<
        PesertaKKN & { keanggotaan: string }
      >;

      return parsed.map((item) => ({
        ...item,
        keanggotaan: ['Reguler', 'Mandiri'].includes(item.keanggotaan)
          ? 'Anggota'
          : item.keanggotaan,
      })) as PesertaKKN[];
    } catch {
      return DATA_AWAL;
    }
  });

  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(FORM_AWAL);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(peserta));
  }, [peserta, storageKey]);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(''), 2800);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const jumlahLaki = peserta.filter(
    (item) => item.gender === 'Laki-laki',
  ).length;

  const jumlahPerempuan = peserta.filter(
    (item) => item.gender === 'Perempuan',
  ).length;

  const pesertaTampil = peserta.filter((item) =>
    `${item.nim} ${item.nama} ${item.prodi} ${item.fakultas} ${item.keanggotaan} ${item.telepon}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const bukaModal = (item?: PesertaKKN) => {
    setEditId(item?.id ?? null);

    setForm(
      item
        ? {
            nim: item.nim,
            nama: item.nama,
            gender: item.gender,
            keanggotaan: item.keanggotaan,
            prodi: item.prodi,
            telepon: item.telepon,
          }
        : FORM_AWAL,
    );

    setModal(true);
  };

  const simpanPeserta = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const prodiInfo: Record<string, string> = {
      'Kebidanan (S1)': 'Fakultas Kedokteran',
      'Ilmu Hukum (S1)': 'Fakultas Hukum dan Ilmu Sosial',
    };

    const dataBaru: PesertaKKN = {
      id: editId ?? Date.now(),
      ...form,
      fakultas: prodiInfo[form.prodi] ?? '-',
      jurnal:
        editId === null
          ? 'Belum'
          : (peserta.find((item) => item.id === editId)?.jurnal ?? 'Belum'),
      laporan:
        editId === null
          ? 'Belum'
          : (peserta.find((item) => item.id === editId)?.laporan ?? 'Belum'),
    };

    if (editId === null) {
      setPeserta((old) => [...old, dataBaru]);
      setNotice('Peserta berhasil ditambahkan.');
    } else {
      setPeserta((old) =>
        old.map((item) => (item.id === editId ? dataBaru : item)),
      );
      setNotice('Data peserta berhasil diperbarui.');
    }

    setModal(false);
  };

  const hapusPeserta = (item: PesertaKKN) => {
    if (!window.confirm(`Hapus peserta ${item.nama}?`)) return;

    setPeserta((old) => old.filter((row) => row.id !== item.id));
    setNotice('Peserta berhasil dihapus.');
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-bold text-[#172943]">Peserta</h2>
        <p className="mt-1 text-xs text-[#71819B]">
          Daftar mahasiswa yang ditempatkan di Desa {namaDesa}.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex h-10 min-w-0 w-full max-w-[520px] flex-1 items-center gap-2 rounded-md border border-[#B8CCFF] bg-[#E7F0FC] px-3">
          <Search size={16} className="shrink-0 text-[#8EA3C0]" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari NIM atau nama mahasiswa..."
            className="w-full bg-transparent text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF]"
          />
        </div>

        <button
          type="button"
          onClick={() => bukaModal()}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#0755D9] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0648B8]"
        >
          <UserRoundPlus size={15} />
          Masukkan Peserta
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            label: 'Peserta Laki-laki',
            value: jumlahLaki,
            icon: User,
            tone: 'blue',
          },
          {
            label: 'Peserta Perempuan',
            value: jumlahPerempuan,
            icon: Users,
            tone: 'blue',
          },
          {
            label: 'Total Peserta',
            value: peserta.length,
            icon: UsersRound,
            tone: 'primary',
          },
        ].map(({ label, value, icon: Icon, tone }) => (
          <div
            key={label}
            className="rounded-xl border border-[#C7D9F5] bg-[#EEF4FF] px-4 py-4 shadow-sm"
          >
            <div className="flex items-center justify-center gap-2">
              <Icon size={17} className="text-[#3569F6]" />
              <span
                className={`text-2xl font-bold tabular-nums ${
                  tone === 'primary' ? 'text-[#245BD6]' : 'text-[#172943]'
                }`}
              >
                {value}
              </span>
            </div>

            <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-wide text-[#64748B]">
              {label}
            </p>
          </div>
        ))}
      </div>

      <section>
        <div className="overflow-hidden rounded-xl border border-[#C7D9F5] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] border-collapse text-left">
              <thead>
                <tr className="bg-gradient-to-r from-[#EAF1FF] to-[#F3F7FF] text-[10px] font-bold uppercase tracking-wide text-[#52688C]">
                  <th className="px-3 py-3 text-center">No.</th>
                  <th className="px-3 py-3">NIM</th>
                  <th className="px-3 py-3">Nama Mahasiswa</th>
                  <th className="px-3 py-3">Keanggotaan</th>
                  <th className="px-3 py-3">Prodi / Fakultas</th>
                  <th className="px-3 py-3">Telp / No. HP</th>
                  <th className="px-3 py-3">Jurnal Harian</th>
                  <th className="px-3 py-3">Laporan Individu</th>
                  <th className="px-3 py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {pesertaTampil.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-[#DCE7F8] text-[11px] text-[#273750] transition-colors hover:bg-[#F8FAFF]"
                  >
                    <td className="px-3 py-3.5 text-center text-[#71819B]">
                      {index + 1}
                    </td>

                    <td className="px-3 py-3.5 font-medium">{item.nim}</td>

                    <td className="px-3 py-3.5 font-semibold">{item.nama}</td>

                    <td className="px-3 py-3.5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                          item.keanggotaan === 'Koordinator Desa'
                            ? 'border-[#BFD2FF] bg-[#E4EEFF] text-[#1D55C7]'
                            : 'border-[#D5E2F6] bg-[#F1F6FF] text-[#45658F]'
                        }`}
                      >
                        {item.keanggotaan}
                      </span>
                    </td>

                    <td className="px-3 py-3.5">
                      <p className="font-semibold">{item.prodi}</p>
                      <p className="mt-0.5 text-[10px] text-[#71819B]">
                        {item.fakultas}
                      </p>
                    </td>

                    <td className="px-3 py-3.5">{item.telepon || '-'}</td>

                    <td className="px-3 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[9px] font-semibold ${
                          item.jurnal === 'Sudah'
                            ? 'bg-[#E8F8F1] text-[#16805D]'
                            : 'bg-[#FFF5E8] text-[#B7791F]'
                        }`}
                      >
                        <BookOpen size={11} className="mr-1" />
                        {item.jurnal}
                      </span>
                    </td>

                    <td className="px-3 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[9px] font-semibold ${
                          item.laporan === 'Sudah'
                            ? 'bg-[#E8F8F1] text-[#16805D]'
                            : 'bg-[#FFF5E8] text-[#B7791F]'
                        }`}
                      >
                        <FileText size={11} className="mr-1" />
                        {item.laporan}
                      </span>
                    </td>

                    <td className="px-3 py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => bukaModal(item)}
                          aria-label="Edit peserta"
                          title="Edit peserta"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#C9D9FF] bg-white text-[#245BD6] transition hover:bg-[#EEF4FF]"
                        >
                          <PencilLine size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => hapusPeserta(item)}
                          aria-label="Hapus peserta"
                          title="Hapus peserta"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#F4CACA] bg-white text-[#D64545] transition hover:bg-[#FFF1F1]"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pesertaTampil.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-10 text-center text-xs text-[#71819B]"
                    >
                      Peserta tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {modal && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-[#14233B]/45 p-3 sm:p-5">
          <form
            onSubmit={simpanPeserta}
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#E8EEF7] bg-white px-5 py-4">
              <div>
                <h3 className="text-base font-bold text-[#172943]">
                  {editId === null ? 'Masukkan Peserta' : 'Ubah Data Peserta'}
                </h3>
                <p className="mt-1 text-xs text-[#71819B]">
                  Lengkapi data mahasiswa yang ditempatkan di Desa {namaDesa}.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModal(false)}
                aria-label="Tutup modal"
                className="rounded-md p-1.5 text-[#71819B] hover:bg-[#F2F6FC]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold text-[#52627A]">
                  NIM *
                </span>
                <input
                  required
                  value={form.nim}
                  onChange={(event) =>
                    setForm((old) => ({ ...old, nim: event.target.value }))
                  }
                  className="h-10 w-full rounded-md border border-[#BFD0EE] px-3 text-xs text-[#273750] outline-none focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/15"
                  placeholder="Masukkan NIM"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold text-[#52627A]">
                  Nama Mahasiswa *
                </span>
                <input
                  required
                  value={form.nama}
                  onChange={(event) =>
                    setForm((old) => ({ ...old, nama: event.target.value }))
                  }
                  className="h-10 w-full rounded-md border border-[#BFD0EE] px-3 text-xs text-[#273750] outline-none focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/15"
                  placeholder="Masukkan nama mahasiswa"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold text-[#52627A]">
                  Jenis Kelamin *
                </span>
                <select
                  value={form.gender}
                  onChange={(event) =>
                    setForm((old) => ({
                      ...old,
                      gender: event.target.value as PesertaKKN['gender'],
                    }))
                  }
                  className="h-10 w-full rounded-md border border-[#BFD0EE] bg-white px-3 text-xs text-[#273750] outline-none focus:border-[#3569F6]"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold text-[#52627A]">
                  Keanggotaan *
                </span>
                <select
                  value={form.keanggotaan}
                  onChange={(event) =>
                    setForm((old) => ({
                      ...old,
                      keanggotaan: event.target
                        .value as PesertaKKN['keanggotaan'],
                    }))
                  }
                  className="h-10 w-full rounded-md border border-[#BFD0EE] bg-white px-3 text-xs text-[#273750] outline-none focus:border-[#3569F6]"
                >
                  <option value="Koordinator Desa">Koordinator Desa</option>
                  <option value="Ketua Kelompok">Ketua Kelompok</option>
                  <option value="Wakil Ketua">Wakil Ketua</option>
                  <option value="Sekretaris">Sekretaris</option>
                  <option value="Bendahara">Bendahara</option>
                  <option value="Anggota">Anggota</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold text-[#52627A]">
                  Program Studi *
                </span>
                <select
                  required
                  value={form.prodi}
                  onChange={(event) =>
                    setForm((old) => ({ ...old, prodi: event.target.value }))
                  }
                  className="h-10 w-full rounded-md border border-[#BFD0EE] bg-white px-3 text-xs text-[#273750] outline-none focus:border-[#3569F6]"
                >
                  <option value="">Pilih Program Studi</option>
                  <option value="Kebidanan (S1)">Kebidanan (S1)</option>
                  <option value="Ilmu Hukum (S1)">Ilmu Hukum (S1)</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-semibold text-[#52627A]">
                  Telp / No. HP
                </span>
                <input
                  value={form.telepon}
                  onChange={(event) =>
                    setForm((old) => ({
                      ...old,
                      telepon: event.target.value,
                    }))
                  }
                  className="h-10 w-full rounded-md border border-[#BFD0EE] px-3 text-xs text-[#273750] outline-none focus:border-[#3569F6]"
                  placeholder="Masukkan nomor telepon"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 border-t border-[#E8EEF7] px-5 py-4">
              <button
                type="button"
                onClick={() => setModal(false)}
                className="rounded-md border border-[#8DB2FF] bg-white px-4 py-2 text-xs font-semibold text-[#245BD6] hover:bg-[#F3F7FF]"
              >
                Batal
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-[#245BD6] px-4 py-2 text-xs font-semibold text-white hover:bg-[#194DBD]"
              >
                <Check size={14} />
                Simpan Peserta
              </button>
            </div>
          </form>
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
