import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import {
  Search,
  Download,
  Upload,
  Eye,
  PencilLine,
  Trash2,
  X,
  Check,
} from 'lucide-react';

type Pemonev = {
  id: number;
  nip: string;
  nama: string;
  email: string;
  totalLaporan: number;
};

type Props = {
  periodeId: number;
};

const DATA_CONTOH: Pemonev[] = [
  {
    id: 1,
    nip: '197001012000031001',
    nama: 'Dr. I Made Suardana, S.Pd., M.Pd.',
    email: 'suardana@undiksha.ac.id',
    totalLaporan: 12,
  },
  {
    id: 2,
    nip: '197505152005011002',
    nama: 'Dr. Ni Ketut Suryani, M.Pd.',
    email: 'suryani@undiksha.ac.id',
    totalLaporan: 8,
  },
  {
    id: 3,
    nip: '198203102010121003',
    nama: 'I Wayan Adnyana, S.Pd., M.Pd.',
    email: 'adnyana@undiksha.ac.id',
    totalLaporan: 5,
  },
];

const parseCSV = (text: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === '"' && text[i + 1] === '"' && insideQuotes) {
      value += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === ',' && !insideQuotes) {
      row.push(value.trim());
      value = '';
    } else if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && text[i + 1] === '\n') i++;

      row.push(value.trim());

      if (row.some((item) => item !== '')) {
        rows.push(row);
      }

      row = [];
      value = '';
    } else {
      value += char;
    }
  }

  row.push(value.trim());

  if (row.some((item) => item !== '')) {
    rows.push(row);
  }

  return rows;
};

const escapeCSV = (value: string | number) =>
  `"${String(value).replace(/"/g, '""')}"`;

export default function DaftarPemonev({ periodeId }: Props) {
  const storageKey = `kkn-daftar-pemonev-${periodeId}`;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pemonev, setPemonev] = useState<Pemonev[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        return JSON.parse(saved) as Pemonev[];
      }

      return DATA_CONTOH;
    } catch {
      return DATA_CONTOH;
    }
  });

  const [cari, setCari] = useState('');
  const [pemonevDilihat, setPemonevDilihat] = useState<Pemonev | null>(null);
  const [pemonevEdit, setPemonevEdit] = useState<Pemonev | null>(null);

  const [nip, setNip] = useState('');
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [totalLaporan, setTotalLaporan] = useState('0');

  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(pemonev));
  }, [pemonev, storageKey]);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(''), 2600);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const daftarTampil = useMemo(
    () =>
      pemonev.filter((item) =>
        `${item.nip} ${item.nama} ${item.email}`
          .toLowerCase()
          .includes(cari.trim().toLowerCase()),
      ),
    [pemonev, cari],
  );

  const unduhFormat = () => {
    const header = ['NIP', 'Nama Lengkap', 'Email', 'Total Laporan'];

    const contoh = [
      '198001012005011001',
      'Nama Pemonev',
      'email@undiksha.ac.id',
      '0',
    ];

    const csv = [header, contoh]
      .map((row) => row.map(escapeCSV).join(','))
      .join('\r\n');

    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'Format_Import_Pemonev.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  const bukaImport = () => {
    fileInputRef.current?.click();
  };

  const importPemonev = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setNotice('Format file harus CSV.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const content = String(reader.result ?? '').replace(/^\uFEFF/, '');
        const rows = parseCSV(content);

        if (rows.length < 2) {
          setNotice('File CSV tidak memiliki data Pemonev.');
          return;
        }

        const header = rows[0].map((item) =>
          item.toLowerCase().replace(/\s+/g, ' ').trim(),
        );

        const indexNip = header.indexOf('nip');
        const indexNama = header.indexOf('nama lengkap');
        const indexEmail = header.indexOf('email');
        const indexLaporan = header.indexOf('total laporan');

        if (indexNip === -1 || indexNama === -1 || indexEmail === -1) {
          setNotice('Format kolom CSV tidak sesuai template.');
          return;
        }

        const dataBaru: Pemonev[] = rows
          .slice(1)
          .reduce<Pemonev[]>((hasil, row) => {
            const nipBaru = row[indexNip]?.trim();
            const namaBaru = row[indexNama]?.trim();
            const emailBaru = row[indexEmail]?.trim();

            if (!nipBaru || !namaBaru || !emailBaru) return hasil;

            const sudahAda = pemonev.some((item) => item.nip === nipBaru);

            const duplikatFile = hasil.some((item) => item.nip === nipBaru);

            if (sudahAda || duplikatFile) return hasil;

            const laporan = Number(row[indexLaporan] ?? 0);

            hasil.push({
              id: Date.now() + hasil.length,
              nip: nipBaru,
              nama: namaBaru,
              email: emailBaru,
              totalLaporan:
                Number.isFinite(laporan) && laporan >= 0 ? laporan : 0,
            });

            return hasil;
          }, []);

        if (dataBaru.length === 0) {
          setNotice('Tidak ada data baru yang dapat diimpor.');
          return;
        }

        setPemonev((old) => [...dataBaru, ...old]);
        setNotice(`${dataBaru.length} data Pemonev berhasil diimpor.`);
      } catch {
        setNotice('File gagal dibaca. Periksa kembali format CSV.');
      }
    };

    reader.onerror = () => {
      setNotice('File gagal dibaca.');
    };

    reader.readAsText(file);
    event.target.value = '';
  };

  const bukaEdit = (item: Pemonev) => {
    setPemonevEdit(item);
    setNip(item.nip);
    setNama(item.nama);
    setEmail(item.email);
    setTotalLaporan(String(item.totalLaporan));
    setError('');
  };

  const resetEdit = () => {
    setPemonevEdit(null);
    setNip('');
    setNama('');
    setEmail('');
    setTotalLaporan('0');
    setError('');
  };

  const simpanEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pemonevEdit) return;

    if (!nip.trim() || !nama.trim() || !email.trim()) {
      setError('Semua data wajib diisi.');
      return;
    }

    if (!Number.isInteger(Number(totalLaporan)) || Number(totalLaporan) < 0) {
      setError('Total laporan harus berupa angka minimal 0.');
      return;
    }

    if (
      pemonev.some(
        (item) => item.nip === nip.trim() && item.id !== pemonevEdit.id,
      )
    ) {
      setError('NIP sudah terdaftar.');
      return;
    }

    setPemonev((old) =>
      old.map((item) =>
        item.id === pemonevEdit.id
          ? {
              ...item,
              nip: nip.trim(),
              nama: nama.trim(),
              email: email.trim(),
              totalLaporan: Number(totalLaporan),
            }
          : item,
      ),
    );

    resetEdit();
    setNotice('Data Pemonev berhasil diperbarui.');
  };

  const hapusPemonev = (item: Pemonev) => {
    if (!window.confirm(`Hapus data Pemonev ${item.nama}?`)) return;

    setPemonev((old) => old.filter((row) => row.id !== item.id));
    setNotice('Data Pemonev berhasil dihapus.');
  };

  const fieldClass =
    'h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[12px] text-[#354760] outline-none transition placeholder:text-[#9AA8BA] focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/10';

  const labelClass = 'mb-1.5 block text-[11px] font-semibold text-[#40516A]';

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-5">
        <h2 className="text-[15px] font-bold text-[#172943]">Daftar Pemonev</h2>

        <p className="mt-1 text-[11px] text-[#71819B]">
          Data dosen pemantau dan evaluator pelaksanaan KKN pada periode ini.
        </p>
      </div>

      {/* TOOLBAR SEARCH DAN IMPORT */}
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
            placeholder="Cari NIP, nama, atau email..."
            aria-label="Cari Pemonev"
            className="h-10 w-full rounded-md border border-[#B8CCFF] bg-[#E7F0FC] pl-9 pr-3 text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF] focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/10"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={unduhFormat}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-[#B8CCFF] bg-white px-3.5 text-[11px] font-semibold text-[#3569F6] transition hover:bg-[#EEF4FF]"
          >
            <Download size={15} />
            Unduh Format
          </button>

          <button
            type="button"
            onClick={bukaImport}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-3.5 text-[11px] font-semibold text-white transition hover:bg-[#245BD6]"
          >
            <Upload size={15} />
            Import Pemonev
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={importPemonev}
            className="hidden"
          />
        </div>
      </div>

      {/* TABEL PEMONEV */}
      <div className="overflow-hidden rounded-lg border border-[#DCE7F7] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse text-left">
            <thead>
              <tr className="bg-[#EEF4FF] text-[9px] font-bold uppercase tracking-wide text-[#52627A]">
                {['NIP', 'NAMA LENGKAP', 'EMAIL', 'TOTAL LAPORAN', 'AKSI'].map(
                  (label) => (
                    <th
                      key={label}
                      className={`px-4 py-3 ${
                        label === 'TOTAL LAPORAN' || label === 'AKSI'
                          ? 'text-center'
                          : ''
                      }`}
                    >
                      {label}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {daftarTampil.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[#EDF1F7] text-[10px] text-[#34445E] hover:bg-[#F8FAFF]"
                >
                  <td className="px-4 py-3.5 font-medium">{item.nip}</td>

                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-[#273750]">{item.nama}</p>
                  </td>

                  <td className="px-4 py-3.5">{item.email}</td>

                  <td className="px-4 py-3.5 text-center">
                    <span className="inline-flex min-w-8 items-center justify-center rounded-md bg-[#EEF4FF] px-2 py-1 font-semibold text-[#3569F6]">
                      {item.totalLaporan}
                    </span>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        title="Lihat detail"
                        aria-label={`Lihat ${item.nama}`}
                        onClick={() => setPemonevDilihat(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#3569F6] transition hover:bg-[#EEF4FF]"
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        type="button"
                        title="Edit Pemonev"
                        aria-label={`Edit ${item.nama}`}
                        onClick={() => bukaEdit(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#245BD6] transition hover:bg-[#EEF4FF]"
                      >
                        <PencilLine size={14} />
                      </button>

                      <button
                        type="button"
                        title="Hapus Pemonev"
                        aria-label={`Hapus ${item.nama}`}
                        onClick={() => hapusPemonev(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#FFCACA] text-[#D64545] transition hover:bg-[#FFF3F3]"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {daftarTampil.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-[11px] text-[#8492A8]"
                  >
                    {cari
                      ? 'Tidak ada Pemonev yang sesuai dengan pencarian.'
                      : 'Belum ada Pemonev yang terdaftar pada periode ini.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#EDF1F7] px-4 py-3 text-[10px] text-[#8492A8]">
          Menampilkan {daftarTampil.length} dari {pemonev.length} Pemonev
        </div>
      </div>

      {/* MODAL LIHAT DETAIL */}
      {pemonevDilihat && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#14233B]/45 p-4">
          <div className="w-full max-w-[480px] overflow-hidden rounded-xl border border-[#E2EAF5] bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3569F6]">
                  <Eye size={17} />
                </div>

                <h2 className="text-[14px] font-semibold text-[#263750]">
                  Detail Pemonev
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setPemonevDilihat(null)}
                className="rounded-md p-1 text-[#91A0B5] transition hover:bg-[#F1F5FA] hover:text-[#34445E]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              {[
                { label: 'NIP', value: pemonevDilihat.nip },
                { label: 'Nama Lengkap', value: pemonevDilihat.nama },
                { label: 'Email', value: pemonevDilihat.email },
                {
                  label: 'Total Laporan',
                  value: `${pemonevDilihat.totalLaporan} laporan`,
                },
              ].map((item) => (
                <div key={item.label}>
                  <p className="mb-1 text-[10px] font-medium text-[#8492A8]">
                    {item.label}
                  </p>
                  <p className="text-[12px] font-semibold text-[#34445E]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end border-t border-[#E8EEF7] bg-[#FBFCFE] px-5 py-3.5">
              <button
                type="button"
                onClick={() => setPemonevDilihat(null)}
                className="h-9 rounded-md border border-[#DCE5F1] bg-white px-4 text-[11px] font-semibold text-[#52627A] transition hover:bg-[#F5F8FC]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT PEMONEV */}
      {pemonevEdit && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#14233B]/45 p-4">
          <form
            onSubmit={simpanEdit}
            className="w-full max-w-[480px] overflow-hidden rounded-xl border border-[#E2EAF5] bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3569F6]">
                  <PencilLine size={17} />
                </div>

                <h2 className="text-[14px] font-semibold text-[#263750]">
                  Ubah Data Pemonev
                </h2>
              </div>

              <button
                type="button"
                onClick={resetEdit}
                className="rounded-md p-1 text-[#91A0B5] transition hover:bg-[#F1F5FA] hover:text-[#34445E]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <label className={labelClass}>NIP</label>
                <input
                  required
                  value={nip}
                  onChange={(event) => setNip(event.target.value)}
                  placeholder="Masukkan NIP"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Nama Lengkap</label>
                <input
                  required
                  value={nama}
                  onChange={(event) => setNama(event.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Masukkan email"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Total Laporan</label>
                <input
                  required
                  type="number"
                  min="0"
                  step="1"
                  value={totalLaporan}
                  onChange={(event) => setTotalLaporan(event.target.value)}
                  placeholder="Masukkan total laporan"
                  className={fieldClass}
                />
              </div>

              {error && <p className="text-[11px] text-red-600">{error}</p>}
            </div>

            <div className="flex shrink-0 justify-end gap-2 border-t border-[#E8EEF7] bg-[#FBFCFE] px-5 py-3.5">
              <button
                type="button"
                onClick={resetEdit}
                className="h-9 rounded-md border border-[#DCE5F1] bg-white px-4 text-[11px] font-semibold text-[#52627A] transition hover:bg-[#F5F8FC]"
              >
                Batal
              </button>

              <button
                type="submit"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-[#2860E8] px-4 text-[11px] font-semibold text-white transition hover:bg-[#194DBD]"
              >
                <Check size={14} />
                Simpan Perubahan
              </button>
            </div>
          </form>
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
