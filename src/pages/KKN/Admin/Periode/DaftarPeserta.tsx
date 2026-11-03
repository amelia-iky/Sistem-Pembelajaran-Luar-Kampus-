import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ChangeEvent,
} from 'react';
import {
  Search,
  UserRoundPlus,
  PencilLine,
  Trash2,
  X,
  Check,
  MapPin,
  Paperclip,
} from 'lucide-react';

type DesaOption = { id: string | number; nama: string };

type MahasiswaOption = {
  nim: string;
  nama: string;
  prodi: string;
  jurusan: string;
  fakultas: string;
};

type Peserta = MahasiswaOption & {
  id: number;
  waktuAwal: string;
  waktuAkhir: string;
  desaId: string;
  desa: string;
  keanggotaan: string;
  telepon: string;
  ukuranBaju: string;
  foto?: string;
};

type Props = {
  periodeId: number;
  daftarDesa: DesaOption[];
  pendaftaranAwal?: string;
  pendaftaranAkhir?: string;
};

const MAHASISWA: MahasiswaOption[] = [
  {
    nim: '2301010001',
    nama: 'Mahasiswa Dummy 28940',
    prodi: 'Ilmu Hukum (S1)',
    jurusan: 'Hukum dan Kewarganegaraan',
    fakultas: 'Fakultas Hukum dan Ilmu Sosial',
  },
  {
    nim: '2301010002',
    nama: 'Mahasiswa Dummy 28941',
    prodi: 'Kebidanan (S1)',
    jurusan: 'Jurusan Kebidanan',
    fakultas: 'Fakultas Kedokteran',
  },
  {
    nim: '2301010003',
    nama: 'Mahasiswa Dummy 28942',
    prodi: 'Sistem Informasi (S1)',
    jurusan: 'Teknik Informatika',
    fakultas: 'Fakultas Teknik dan Kejuruan',
  },
  {
    nim: '2301010004',
    nama: 'Mahasiswa Dummy 28943',
    prodi: 'Ilmu Hukum (S1)',
    jurusan: 'Hukum dan Kewarganegaraan',
    fakultas: 'Fakultas Hukum dan Ilmu Sosial',
  },
  {
    nim: '2301010005',
    nama: 'Mahasiswa Dummy 28944',
    prodi: 'Kebidanan (S1)',
    jurusan: 'Jurusan Kebidanan',
    fakultas: 'Fakultas Kedokteran',
  },
];

const tanggalHariIni = () => new Date().toISOString().slice(0, 10);

const formatTanggal = (value: string) => {
  if (!value) return '-';

  const date = new Date(`${value}T00:00:00`);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
};

export default function DaftarPeserta({
  periodeId,
  daftarDesa,
  pendaftaranAwal,
  pendaftaranAkhir,
}: Props) {
  const storageKey = `kkn-daftar-peserta-${periodeId}`;

  const [peserta, setPeserta] = useState<Peserta[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        const dataTersimpan = JSON.parse(saved) as Peserta[];

        if (Array.isArray(dataTersimpan) && dataTersimpan.length > 0) {
          return dataTersimpan;
        }
      }

      const demoSeedKey = `${storageKey}-demo-seeded`;

      if (localStorage.getItem(demoSeedKey) === 'true') {
        return [];
      }

      const desaPertama = daftarDesa[0];

      const dataContoh: Peserta[] = MAHASISWA.map((mahasiswa, index) => ({
        ...mahasiswa,
        id: index + 1,
        waktuAwal: pendaftaranAwal || '2026-08-03',
        waktuAkhir: pendaftaranAkhir || '2026-08-14',
        desaId: String(desaPertama?.id ?? ''),
        desa: desaPertama?.nama ?? '-',
        keanggotaan:
          index === 0
            ? 'Koordinator Desa'
            : index === 1
              ? 'Ketua Kelompok'
              : 'Anggota',
        telepon: `08123456789${index}`,
        ukuranBaju: ['M', 'L', 'M', 'XL', 'L'][index],
        foto: '',
      }));

      localStorage.setItem(demoSeedKey, 'true');

      return dataContoh;
    } catch {
      return [];
    }
  });

  const [cari, setCari] = useState('');
  const [modalTambah, setModalTambah] = useState(false);
  const [pesertaEdit, setPesertaEdit] = useState<Peserta | null>(null);

  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [prodi, setProdi] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [fakultas, setFakultas] = useState('');

  const [desaId, setDesaId] = useState('');
  const [keanggotaan, setKeanggotaan] = useState('Anggota');
  const [telepon, setTelepon] = useState('');
  const [ukuranBaju, setUkuranBaju] = useState('');
  const [foto, setFoto] = useState('');

  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(peserta));
  }, [peserta, storageKey]);

  useEffect(() => {
    if (!notice) return;

    const timer = window.setTimeout(() => setNotice(''), 2600);

    return () => window.clearTimeout(timer);
  }, [notice]);

  const daftarTampil = useMemo(
    () =>
      peserta.filter((item) =>
        `${item.nim} ${item.nama} ${item.prodi} ${item.jurusan} ${item.fakultas} ${item.desa}`
          .toLowerCase()
          .includes(cari.trim().toLowerCase()),
      ),
    [peserta, cari],
  );

  const resetForm = () => {
    setNama('');
    setNim('');
    setProdi('');
    setJurusan('');
    setFakultas('');
    setDesaId('');
    setKeanggotaan('Anggota');
    setTelepon('');
    setUkuranBaju('');
    setFoto('');
    setError('');
  };

  const bukaTambah = () => {
    resetForm();
    setPesertaEdit(null);
    setModalTambah(true);
  };

  const bukaEdit = (item: Peserta) => {
    setPesertaEdit(item);
    setDesaId(item.desaId);
    setKeanggotaan(item.keanggotaan);
    setTelepon(item.telepon);
    setUkuranBaju(item.ukuranBaju);
    setFoto(item.foto ?? '');
    setError('');
  };

  const pilihFoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Format foto harus JPG atau PNG.');
      event.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Ukuran foto maksimal 2 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFoto(String(reader.result ?? ''));
      setError('');
    };

    reader.onerror = () => {
      setError('Foto gagal dibaca. Silakan pilih ulang.');
    };

    reader.readAsDataURL(file);
  };

  const simpanTambah = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const desa = daftarDesa.find((item) => String(item.id) === desaId);

    if (!nama.trim() || !nim.trim() || !desa) {
      setError('Nama, NIM, dan desa penempatan wajib diisi.');
      return;
    }

    if (peserta.some((item) => item.nim === nim.trim())) {
      setError('NIM ini sudah terdaftar pada periode ini.');
      return;
    }

    const row: Peserta = {
      nama: nama.trim(),
      nim: nim.trim(),
      prodi: prodi.trim() || '-',
      jurusan: jurusan.trim() || '-',
      fakultas: fakultas.trim() || '-',
      id: Date.now(),
      waktuAwal: pendaftaranAwal || tanggalHariIni(),
      waktuAkhir: pendaftaranAkhir || tanggalHariIni(),
      desaId,
      desa: desa.nama,
      keanggotaan,
      telepon,
      ukuranBaju,
      foto,
    };

    setPeserta((old) => [row, ...old]);
    setModalTambah(false);
    resetForm();
    setNotice('Peserta berhasil ditambahkan.');
  };

  const simpanEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pesertaEdit) return;

    const desa = daftarDesa.find((item) => String(item.id) === desaId);

    if (!desa) {
      setError('Pilih desa penempatan terlebih dahulu.');
      return;
    }

    setPeserta((old) =>
      old.map((item) =>
        item.id === pesertaEdit.id
          ? { ...item, desaId, desa: desa.nama, keanggotaan }
          : item,
      ),
    );

    setPesertaEdit(null);
    setNotice('Penempatan mahasiswa berhasil diperbarui.');
  };

  const hapusPeserta = (item: Peserta) => {
    if (
      !window.confirm(`Hapus ${item.nama} dari daftar peserta periode ini?`)
    ) {
      return;
    }

    setPeserta((old) => old.filter((row) => row.id !== item.id));

    setNotice('Peserta berhasil dihapus.');
  };

  const fieldClass =
    'h-10 w-full rounded-md border border-[#DCE5F1] bg-white px-3 text-[12px] text-[#354760] outline-none transition placeholder:text-[#9AA8BA] focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/10';

  const labelClass = 'mb-1.5 block text-[11px] font-semibold text-[#40516A]';

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-5">
        <h2 className="text-[15px] font-bold text-[#172943]">Daftar Peserta</h2>

        <p className="mt-1 text-[11px] text-[#71819B]">
          Data seluruh mahasiswa peserta KKN yang terdaftar dalam periode ini.
        </p>
      </div>

      {/* SEARCH DAN TOMBOL TAMBAH */}
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
            placeholder="Cari nama, NIM, atau prodi..."
            aria-label="Cari peserta"
            className="h-10 w-full rounded-md border border-[#B8CCFF] bg-[#E7F0FC] pl-9 pr-3 text-[12px] text-[#34445E] outline-none placeholder:text-[#91A4BF] focus:border-[#3569F6] focus:ring-2 focus:ring-[#3569F6]/10"
          />
        </div>

        <button
          type="button"
          onClick={bukaTambah}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#3569F6] px-3.5 text-[11px] font-semibold text-white transition hover:bg-[#245BD6]"
        >
          <UserRoundPlus size={15} />
          Masukkan Peserta
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#DCE7F7] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="bg-[#EEF4FF] text-[9px] font-bold uppercase tracking-wide text-[#52627A]">
                {[
                  'NIM',
                  'NAMA',
                  'PRODI / JUR. / FAK.',
                  'WAKTU DAFTAR AWAL',
                  'WAKTU DAFTAR AKHIR',
                  'DESA',
                  'AKSI',
                ].map((label) => (
                  <th key={label} className="px-3 py-3">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {daftarTampil.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[#EDF1F7] text-[10px] text-[#34445E] hover:bg-[#F8FAFF]"
                >
                  <td className="px-3 py-3.5 font-medium">{item.nim}</td>

                  <td className="px-3 py-3.5">
                    <p className="font-semibold text-[#273750]">{item.nama}</p>
                  </td>

                  <td className="px-3 py-3.5">
                    <p className="font-medium">{item.prodi}</p>

                    <p className="mt-0.5 text-[9px] text-[#71819B]">
                      {item.jurusan} / {item.fakultas}
                    </p>
                  </td>

                  <td className="px-3 py-3.5">
                    {formatTanggal(item.waktuAwal)}
                  </td>

                  <td className="px-3 py-3.5">
                    {formatTanggal(item.waktuAkhir)}
                  </td>

                  <td className="px-3 py-3.5">{item.desa}</td>

                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        title="Edit penempatan"
                        aria-label={`Edit ${item.nama}`}
                        onClick={() => bukaEdit(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#B8CCFF] text-[#245BD6] hover:bg-[#EEF4FF]"
                      >
                        <PencilLine size={14} />
                      </button>

                      <button
                        type="button"
                        title="Hapus peserta"
                        aria-label={`Hapus ${item.nama}`}
                        onClick={() => hapusPeserta(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#FFCACA] text-[#D64545] hover:bg-[#FFF3F3]"
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
                    colSpan={7}
                    className="px-4 py-12 text-center text-[11px] text-[#8492A8]"
                  >
                    {cari
                      ? 'Tidak ada peserta yang sesuai dengan pencarian.'
                      : 'Belum ada peserta yang terdaftar pada periode ini.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-[#EDF1F7] px-4 py-3 text-[10px] text-[#8492A8]">
          Menampilkan {daftarTampil.length} dari {peserta.length} peserta
        </div>
      </div>

      {/* MODAL EDIT PENEMPATAN */}
      {pesertaEdit && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#14233B]/45 p-4">
          <form
            onSubmit={simpanEdit}
            className="w-full max-w-[480px] overflow-hidden rounded-xl border border-[#E2EAF5] bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3569F6]">
                  <MapPin size={17} />
                </div>

                <h2 className="text-[14px] font-semibold text-[#263750]">
                  Ubah Penempatan Mahasiswa
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setPesertaEdit(null)}
                className="rounded-md p-1 text-[#91A0B5] transition hover:bg-[#F1F5FA] hover:text-[#34445E]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-[#40516A]">
                  Desa Penempatan
                </label>

                <select
                  required
                  value={desaId}
                  onChange={(event) => setDesaId(event.target.value)}
                  className={fieldClass}
                >
                  <option value="">Pilih Desa</option>

                  {daftarDesa.map((desa) => (
                    <option key={desa.id} value={String(desa.id)}>
                      {desa.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-semibold text-[#40516A]">
                  Keanggotaan / Peran
                </label>

                <select
                  value={keanggotaan}
                  onChange={(event) => setKeanggotaan(event.target.value)}
                  className={fieldClass}
                >
                  {[
                    'Koordinator Desa',
                    'Wakil Koordinator Desa',
                    'Sekretaris',
                    'Bendahara',
                    'Anggota',
                  ].map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              {error && <p className="text-[11px] text-red-600">{error}</p>}
            </div>

            <div className="flex shrink-0 justify-end gap-2 border-t border-[#E8EEF7] bg-[#FBFCFE] px-5 py-3.5">
              <button
                type="button"
                onClick={() => setPesertaEdit(null)}
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

      {/* MODAL TAMBAH PESERTA */}
      {modalTambah && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-[#14233B]/45 p-4">
          <form
            onSubmit={simpanTambah}
            className="my-auto flex max-h-[90vh] w-full max-w-[480px] flex-col overflow-hidden rounded-xl border border-[#E2EAF5] bg-white shadow-xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-[#E8EEF7] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3569F6]">
                  <UserRoundPlus size={17} />
                </div>

                <h2 className="text-[14px] font-semibold text-[#263750]">
                  Masukkan Peserta KKN
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setModalTambah(false)}
                className="rounded-md p-1 text-[#91A0B5] transition hover:bg-[#F1F5FA] hover:text-[#34445E]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
              <div>
                <label className={labelClass}>Nama Mahasiswa</label>

                <input
                  required
                  value={nama}
                  onChange={(event) => setNama(event.target.value)}
                  placeholder="Masukkan nama lengkap mahasiswa"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>NIM</label>

                <input
                  required
                  value={nim}
                  onChange={(event) => setNim(event.target.value)}
                  placeholder="Masukkan NIM mahasiswa"
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Program Studi</label>

                  <input
                    list="daftar-prodi-kkn"
                    value={prodi}
                    onChange={(event) => setProdi(event.target.value)}
                    placeholder="Ketik atau pilih prodi"
                    className={fieldClass}
                  />

                  <datalist id="daftar-prodi-kkn">
                    {[...new Set(MAHASISWA.map((item) => item.prodi))].map(
                      (item) => (
                        <option key={item} value={item} />
                      ),
                    )}
                  </datalist>
                </div>

                <div>
                  <label className={labelClass}>Jurusan</label>

                  <input
                    list="daftar-jurusan-kkn"
                    value={jurusan}
                    onChange={(event) => setJurusan(event.target.value)}
                    placeholder="Ketik atau pilih jurusan"
                    className={fieldClass}
                  />

                  <datalist id="daftar-jurusan-kkn">
                    {[...new Set(MAHASISWA.map((item) => item.jurusan))].map(
                      (item) => (
                        <option key={item} value={item} />
                      ),
                    )}
                  </datalist>
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Fakultas</label>

                  <input
                    list="daftar-fakultas-kkn"
                    value={fakultas}
                    onChange={(event) => setFakultas(event.target.value)}
                    placeholder="Ketik atau pilih fakultas"
                    className={fieldClass}
                  />

                  <datalist id="daftar-fakultas-kkn">
                    {[...new Set(MAHASISWA.map((item) => item.fakultas))].map(
                      (item) => (
                        <option key={item} value={item} />
                      ),
                    )}
                  </datalist>
                </div>
              </div>

              <div>
                <label className={labelClass}>Foto</label>

                <label className="flex min-h-[58px] cursor-pointer items-center gap-3 rounded-md border border-dashed border-[#C7D9F5] bg-[#F8FAFD] px-3 py-2.5 transition hover:bg-[#F1F6FF]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE7F7] bg-white text-[#52627A]">
                    <Paperclip size={16} />
                  </span>

                  <span className="text-[12px] font-medium text-[#34445E]">
                    {foto ? 'Foto berhasil dipilih' : 'Pilih foto mahasiswa'}

                    <span className="ml-1 text-[10px] font-normal text-[#91A4BF]">
                      JPG atau PNG • Maks. 2 MB
                    </span>
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={pilihFoto}
                    className="hidden"
                  />
                </label>

                {foto && (
                  <img
                    src={foto}
                    alt="Pratinjau foto peserta"
                    className="mt-2 h-16 w-16 rounded-md border border-[#DCE7F7] object-cover"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>No. HP</label>

                  <input
                    value={telepon}
                    onChange={(event) => setTelepon(event.target.value)}
                    placeholder="Masukkan nomor HP"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Ukuran Baju</label>

                  <select
                    required
                    value={ukuranBaju}
                    onChange={(event) => setUkuranBaju(event.target.value)}
                    className={fieldClass}
                  >
                    <option value="">Pilih ukuran</option>

                    {['S', 'M', 'L', 'XL', 'XXL'].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Desa Penempatan</label>

                <select
                  required
                  value={desaId}
                  onChange={(event) => setDesaId(event.target.value)}
                  className={fieldClass}
                >
                  <option value="">Pilih desa</option>

                  {daftarDesa.map((desa) => (
                    <option key={desa.id} value={String(desa.id)}>
                      {desa.nama}
                    </option>
                  ))}
                </select>
              </div>

              {error && <p className="text-[11px] text-red-600">{error}</p>}
            </div>

            <div className="flex shrink-0 justify-end gap-2 border-t border-[#E8EEF7] bg-[#FBFCFE] px-5 py-3.5">
              <button
                type="button"
                onClick={() => setModalTambah(false)}
                className="h-9 rounded-md border border-[#DCE5F1] bg-white px-4 text-[11px] font-semibold text-[#52627A] transition hover:bg-[#F5F8FC]"
              >
                Batal
              </button>

              <button
                type="submit"
                className="inline-flex h-9 items-center gap-2 rounded-md bg-[#2860E8] px-4 text-[11px] font-semibold text-white transition hover:bg-[#194DBD]"
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
