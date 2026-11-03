import { useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Plus, Trash2, Save } from 'lucide-react';
import { STORAGE_KEY, type PeriodeKKNData } from './Periode';

type Agenda = {
  id: number;
  nama: string;
  lamaKegiatan: string;
  kodeKegiatan: string;
  tanggal: string;
  nomorSuratTugas: string;
};

const inputClass =
  'mt-1.5 h-9 w-full min-w-0 rounded-md border border-[#9BBEFF] bg-white px-3 text-[11px] text-[#354760] outline-none focus:border-[#3569F6] focus:ring-1 focus:ring-blue-100';

const labelClass = 'block text-[10px] font-semibold text-[#43536B]';

const defaultForm = {
  tahunAjar: '2026/2027',
  semester: 'Ganjil',
  putaran: '1',
  kabupaten: 'Kabupaten Buleleng',
  kecamatan: '',
  desa: '',
  pendaftaranAwal: '',
  pendaftaranAkhir: '',
  batasProposal: '',
  batasUsulanDosen: '',
  pelaksanaanAwal: '',
  pelaksanaanAkhir: '',
  penilaianLapangan: '',
  targetBimbingan: '4',
  anggotaMinimal: '6',
  anggotaMaksimal: '16',
  lakiLakiMinimal: '8',
  perempuanMinimal: '8',
  ketuaLP2M: '',
  nipLP2M: '',
  ketuaPPKO: '',
  nipPPKO: '',
  pejabatPengesahan: '',
  nipPengesahan: '',
};

const initialAgenda: Agenda[] = [];

export default function TambahPeriode() {
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [agenda, setAgenda] = useState<Agenda[]>(initialAgenda);
  const [modalAgenda, setModalAgenda] = useState(false);
  const [agendaForm, setAgendaForm] = useState({
    nama: '',
    lamaKegiatan: '',
    kodeKegiatan: '',
    tanggal: '',
    nomorSuratTugas: '',
  });
  const [editAgendaId, setEditAgendaId] = useState<number | null>(null);
  const [error, setError] = useState('');

  function ubah(field: keyof typeof defaultForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function tambahAgenda() {
    setAgendaForm({
      nama: '',
      lamaKegiatan: '',
      kodeKegiatan: '',
      tanggal: '',
      nomorSuratTugas: '',
    });
    setEditAgendaId(null);
    setModalAgenda(true);
  }

  function simpanAgenda(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dataAgenda: Agenda = {
      id: editAgendaId ?? Date.now(),
      ...agendaForm,
    };

    setAgenda((current) =>
      editAgendaId === null
        ? [...current, dataAgenda]
        : current.map((item) => (item.id === editAgendaId ? dataAgenda : item)),
    );

    setModalAgenda(false);
  }

  function simpan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const requiredFields: (keyof typeof defaultForm)[] = [
      'tahunAjar',
      'semester',
      'putaran',
      'kabupaten',
      'kecamatan',
      'desa',
      'pendaftaranAwal',
      'pendaftaranAkhir',
      'pelaksanaanAwal',
      'pelaksanaanAkhir',
    ];

    const missing = requiredFields.some((field) => !String(form[field]).trim());

    if (missing) {
      setError('Lengkapi seluruh kolom wajib yang bertanda *.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Ambil data periode yang sudah tersimpan.
    const saved = localStorage.getItem(STORAGE_KEY);

    const existing: PeriodeKKNData[] = (() => {
      if (!saved) return [];

      try {
        const parsed: unknown = JSON.parse(saved);

        return Array.isArray(parsed) ? (parsed as PeriodeKKNData[]) : [];
      } catch {
        return [];
      }
    })();

    const now = new Date();

    const periodeBaru: PeriodeKKNData = {
      id: Date.now(),
      tahunAjar: form.tahunAjar,
      semester: form.semester,
      putaran: Number(form.putaran),
      kabupaten: form.kabupaten,
      kecamatan: form.kecamatan,
      desa: form.desa,
      status: 'Aktif',
      disimpanPada: now.toISOString().replace('T', ' ').slice(0, 19),
      detail: {
        ...form,
        agenda,
        daftarDesa: [
          {
            id: Date.now(),
            nama: form.desa,
            namaDesa: form.desa,
            kecamatan: form.kecamatan,
            kabupaten: form.kabupaten,
            pembimbing: '',
            dosenPembimbing: '',
            nipPembimbing: '',
            fakultasPembimbing: '',
            penguji: '',
            penguji1: '',
            nipPenguji1: '',
            penguji2: '',
            nipPenguji2: '',
            koordinator: '',
            koordinatorDesa: '',
            kepalaDesa: '',
            telepon: '',
            alamat: '',
            klaster: '',
            peserta: 0,
            jumlahBlog: 0,
            status: 'Belum Ditugaskan',
          },
        ],
      },
    };

    // Simpan periode baru bersama data sebelumnya.
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([periodeBaru, ...existing]),
    );

    // Kembali ke halaman utama periode.
    navigate('/admin/kkn/periode', {
      state: { saved: true },
    });
  }

  function bagian(
    nomor: string,
    judul: string,
    deskripsi: string,
    children: ReactNode,
  ) {
    return (
      <section className="mb-5 rounded-[10px] border border-[#B8CCFF] bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-start gap-2">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#3569F6]" />

          <div>
            <h2 className="text-[12px] font-bold text-[#172943]">
              {nomor}. {judul}
            </h2>
            <p className="mt-1 text-[10px] leading-4 text-[#71819B]">
              {deskripsi}
            </p>
          </div>
        </div>

        {children}
      </section>
    );
  }

  function field(
    label: string,
    key: keyof typeof defaultForm,
    placeholder = '',
    required = true,
    type = 'text',
  ) {
    return (
      <label className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
        <input
          type={type}
          required={required}
          min={type === 'number' ? 1 : undefined}
          value={form[key]}
          onChange={(event) => ubah(key, event.target.value)}
          placeholder={placeholder}
          className={inputClass}
        />
      </label>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FC] p-4 sm:p-6 lg:p-7">
      <div className="mx-auto max-w-[1200px]">
        {/* HEADER */}
        <div className="mb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/kkn/periode')}
            aria-label="Kembali ke daftar periode"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#DCE5F1] bg-white text-[#52627A] hover:bg-blue-50"
          >
            <ArrowLeft size={17} />
          </button>

          <div>
            <h1 className="text-[20px] font-bold text-[#172943]">
              Tambah Periode KKN
            </h1>
            <p className="mt-1 text-[11px] text-[#71819B]">
              Lengkapi informasi pelaksanaan program Kuliah Kerja Nyata.
            </p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[11px] text-red-600"
          >
            {error}
          </div>
        )}

        <form onSubmit={simpan}>
          {/* 1. DATA UMUM */}
          {bagian(
            '1',
            'Data Umum',
            'Informasi dasar periode akademik dan lokasi pelaksanaan KKN.',
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
              {field('Tahun Ajar', 'tahunAjar', 'Contoh: 2026/2027')}

              <label className={labelClass}>
                Semester <span className="text-red-500">*</span>
                <select
                  required
                  value={form.semester}
                  onChange={(event) => ubah('semester', event.target.value)}
                  className={inputClass}
                >
                  <option value="Ganjil">Ganjil</option>
                  <option value="Genap">Genap</option>
                </select>
                <p className="mt-1 text-[9px] font-normal text-[#8291A8]">
                  Semester pelaksanaan program KKN.
                </p>
              </label>

              {field(
                'Putaran Ke',
                'putaran',
                'Masukkan putaran',
                true,
                'number',
              )}

              {field('Kabupaten/Kota', 'kabupaten', 'Nama kabupaten/kota')}

              {field(
                'Kecamatan Tempat Pelaksanaan',
                'kecamatan',
                'Nama kecamatan',
              )}

              {field('Desa Tempat Pelaksanaan', 'desa', 'Nama desa')}
            </div>,
          )}

          {/* 2. JADWAL KEGIATAN */}
          {bagian(
            '2',
            'Jadwal Kegiatan',
            'Periode waktu tahapan pendaftaran, persiapan, pelaksanaan hingga penilaian.',
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
              {field('Pendaftaran Awal', 'pendaftaranAwal', '', true, 'date')}
              {field('Pendaftaran Akhir', 'pendaftaranAkhir', '', true, 'date')}
              {field(
                'Batas Upload Proposal DPL',
                'batasProposal',
                '',
                false,
                'date',
              )}
              {field(
                'Batas Usulan Dosen',
                'batasUsulanDosen',
                '',
                false,
                'date',
              )}
              {field(
                'Pelaksanaan KKN Awal',
                'pelaksanaanAwal',
                '',
                true,
                'date',
              )}
              {field(
                'Pelaksanaan KKN Akhir',
                'pelaksanaanAkhir',
                '',
                true,
                'date',
              )}
              {field(
                'Penilaian Lapangan',
                'penilaianLapangan',
                '',
                false,
                'date',
              )}

              <div className="flex items-center gap-2 rounded-md bg-[#EEF4FF] px-3 py-2 text-[10px] text-[#52627A] md:col-span-2">
                <CalendarDays size={15} className="shrink-0 text-[#3569F6]" />
                Pastikan jadwal kegiatan sesuai kalender akademik.
              </div>
            </div>,
          )}

          {/* 3. PERSYARATAN */}
          {bagian(
            '3',
            'Persyaratan',
            'Batasan kriteria peserta dan kuota anggota mahasiswa per desa.',
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {field(
                'Target Bimbingan Mahasiswa',
                'targetBimbingan',
                '',
                true,
                'number',
              )}
              {field(
                'Jumlah Minimal Anggota per Desa',
                'anggotaMinimal',
                '',
                true,
                'number',
              )}
              {field(
                'Jumlah Maksimal Anggota per Desa',
                'anggotaMaksimal',
                '',
                true,
                'number',
              )}

              <div className="rounded-lg border border-[#DCE5F1] p-3 md:col-span-2">
                <h3 className="mb-3 text-[10px] font-bold text-[#273750]">
                  Jumlah Minimal Peserta dalam Satu Desa
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {field(
                    'Laki-laki Minimal',
                    'lakiLakiMinimal',
                    '',
                    true,
                    'number',
                  )}
                  {field(
                    'Perempuan Minimal',
                    'perempuanMinimal',
                    '',
                    true,
                    'number',
                  )}
                </div>
              </div>
            </div>,
          )}

          {/* 4. INFORMASI PEJABAT */}
          {bagian(
            '4',
            'Informasi Dinas Pendidikan dan Pejabat Pengesah',
            'Informasi pejabat penandatangan dan penerbitan dokumen resmi.',
            <div className="space-y-4">
              {[
                {
                  title: 'Ketua LP2M',
                  name: 'ketuaLP2M' as const,
                  nip: 'nipLP2M' as const,
                },
                {
                  title: 'Pejabat Pembuat Komitmen (PPKO)',
                  name: 'ketuaPPKO' as const,
                  nip: 'nipPPKO' as const,
                },
                {
                  title: 'Pejabat Pengesahan',
                  name: 'pejabatPengesahan' as const,
                  nip: 'nipPengesahan' as const,
                },
              ].map((person) => (
                <div
                  key={person.title}
                  className="rounded-lg border border-[#9BBEFF] bg-white p-3"
                >
                  <h3 className="mb-3 text-[10px] font-bold text-[#273750]">
                    {person.title}
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {field(
                      'Nama Lengkap dan Gelar',
                      person.name,
                      'Nama lengkap',
                      false,
                    )}
                    {field('NIP / NIDN', person.nip, 'Nomor identitas', false)}
                  </div>
                </div>
              ))}

              <div className="border-t border-[#E8EEF7] pt-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-[11px] font-bold text-[#273750]">
                      Jadwal Kegiatan Lapangan
                    </h3>
                    <p className="mt-1 text-[10px] text-[#8291A8]">
                      Daftar agenda monitoring, survei, dan kunjungan.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={tambahAgenda}
                    className="inline-flex h-8 items-center gap-1 rounded-md bg-[#3569F6] px-3 text-[10px] font-semibold text-white hover:bg-blue-700"
                  >
                    <Plus size={13} />
                    Tambah Kegiatan
                  </button>
                </div>

                {agenda.length === 0 ? (
                  <div className="rounded-md border border-dashed border-[#9BBEFF] px-4 py-6 text-center text-[10px] text-[#8291A8]">
                    Belum ada jadwal kegiatan. Klik Tambah Kegiatan untuk
                    mengisi agenda.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-md border border-[#9BBEFF]">
                    <table className="w-full min-w-[650px] text-left text-[10px]">
                      <thead className="bg-[#F4F7FC] text-[#52627A]">
                        <tr>
                          <th className="px-3 py-2 font-semibold">
                            Nama Kegiatan
                          </th>
                          <th className="px-3 py-2 font-semibold">
                            Lama (Hari)
                          </th>
                          <th className="px-3 py-2 font-semibold">
                            Kode Kegiatan
                          </th>
                          <th className="px-3 py-2 font-semibold">Tanggal</th>
                          <th className="px-3 py-2 font-semibold">
                            Nomor Surat Tugas
                          </th>
                          <th className="px-3 py-2 text-center font-semibold">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {agenda.map((item) => (
                          <tr
                            key={item.id}
                            className="border-t border-[#E3ECFA] text-[#354760]"
                          >
                            <td className="px-3 py-2">{item.nama}</td>
                            <td className="px-3 py-2">{item.lamaKegiatan}</td>
                            <td className="px-3 py-2">{item.kodeKegiatan}</td>
                            <td className="px-3 py-2">
                              {item.tanggal
                                ? new Date(
                                    `${item.tanggal}T00:00:00`,
                                  ).toLocaleDateString('id-ID')
                                : '-'}
                            </td>
                            <td className="px-3 py-2">
                              {item.nomorSuratTugas || '-'}
                            </td>
                            <td className="px-3 py-2">
                              <div className="flex justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAgendaForm({
                                      nama: item.nama,
                                      lamaKegiatan: item.lamaKegiatan,
                                      kodeKegiatan: item.kodeKegiatan,
                                      tanggal: item.tanggal,
                                      nomorSuratTugas: item.nomorSuratTugas,
                                    });
                                    setEditAgendaId(item.id);
                                    setModalAgenda(true);
                                  }}
                                  className="rounded border border-[#9BBEFF] px-2 py-1 text-[#245BD6] hover:bg-blue-50"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setAgenda((current) =>
                                      current.filter(
                                        (row) => row.id !== item.id,
                                      ),
                                    )
                                  }
                                  aria-label="Hapus kegiatan"
                                  className="rounded border border-red-200 px-2 py-1 text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>,
          )}

          {/* TOMBOL FORM */}
          <div className="flex flex-wrap justify-end gap-2 pb-5">
            <button
              type="button"
              onClick={() => navigate('/admin/kkn/periode')}
              className="h-10 rounded-md border border-[#DCE5F1] bg-white px-5 text-[11px] font-semibold text-[#52627A] hover:bg-slate-50"
            >
              Batal
            </button>

            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-[#064BC5] px-5 text-[11px] font-semibold text-white hover:bg-blue-800"
            >
              <Save size={15} />
              Simpan Periode KKN
            </button>
          </div>
        </form>

        {modalAgenda && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#14243D]/40 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setModalAgenda(false);
            }}
          >
            <div className="w-full max-w-[620px] rounded-lg bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-[#E3ECFA] px-5 py-4">
                <div>
                  <h2 className="text-[13px] font-bold text-[#172943]">
                    {editAgendaId === null
                      ? 'Tambah Kegiatan'
                      : 'Edit Kegiatan'}
                  </h2>
                  <p className="mt-1 text-[10px] text-[#71819B]">
                    Lengkapi informasi jadwal kegiatan KKN.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalAgenda(false)}
                  aria-label="Tutup modal"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-[#71819B] hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={simpanAgenda} className="space-y-4 px-5 py-4">
                <label className={labelClass}>
                  Nama Kegiatan <span className="text-red-500">*</span>
                  <input
                    required
                    value={agendaForm.nama}
                    onChange={(event) =>
                      setAgendaForm((current) => ({
                        ...current,
                        nama: event.target.value,
                      }))
                    }
                    placeholder="Masukkan nama kegiatan"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Lama Kegiatan (Hari) <span className="text-red-500">*</span>
                  <input
                    required
                    type="number"
                    min="1"
                    value={agendaForm.lamaKegiatan}
                    onChange={(event) =>
                      setAgendaForm((current) => ({
                        ...current,
                        lamaKegiatan: event.target.value,
                      }))
                    }
                    placeholder="Contoh: 14"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Kode Kegiatan <span className="text-red-500">*</span>
                  <input
                    required
                    value={agendaForm.kodeKegiatan}
                    onChange={(event) =>
                      setAgendaForm((current) => ({
                        ...current,
                        kodeKegiatan: event.target.value,
                      }))
                    }
                    placeholder="Contoh: KKN-KL-01"
                    className={inputClass}
                  />
                </label>

                <div>
                  <h3 className="mb-2 text-[10px] font-semibold text-[#43536B]">
                    Tanggal dan Nomor Surat Tugas
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className={labelClass}>
                      Tanggal Kegiatan <span className="text-red-500">*</span>
                      <input
                        required
                        type="date"
                        value={agendaForm.tanggal}
                        onChange={(event) =>
                          setAgendaForm((current) => ({
                            ...current,
                            tanggal: event.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </label>

                    <label className={labelClass}>
                      Nomor Surat Tugas
                      <input
                        value={agendaForm.nomorSuratTugas}
                        onChange={(event) =>
                          setAgendaForm((current) => ({
                            ...current,
                            nomorSuratTugas: event.target.value,
                          }))
                        }
                        placeholder="Contoh: 124/UN48/KM/2026"
                        className={inputClass}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-[#E3ECFA] pt-4">
                  <button
                    type="button"
                    onClick={() => setModalAgenda(false)}
                    className="h-9 rounded-md border border-[#9BBEFF] px-4 text-[10px] font-semibold text-[#52627A] hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="h-9 rounded-md bg-[#064BC5] px-4 text-[10px] font-semibold text-white hover:bg-blue-800"
                  >
                    Simpan Kegiatan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
