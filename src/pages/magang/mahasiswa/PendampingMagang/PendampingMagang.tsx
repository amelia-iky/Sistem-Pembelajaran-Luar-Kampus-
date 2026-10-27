import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  GraduationCap,
  UserRound,
  Plus,
  CheckCircle2,
  X,
  Pencil,
  Mail,
  Phone,
  BriefcaseBusiness,
  Info,
  Send,
  Clock3,
  BadgeCheck,
  CircleAlert,
} from 'lucide-react';

interface Mentor {
  id: number;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  notes?: string;
}

type MentorForm = {
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
};

const initialMentors: Mentor[] = [
  {
    id: 1,
    name: 'I Made Aditya Pratama',
    position: 'Software Engineer',
    company: 'PT. Teknologi Nusantara',
    email: 'aditya@perusahaan.com',
    phone: '081234567890',
    notes: 'Mentor pembimbing teknis divisi rekayasa perangkat lunak.',
  },
  {
    id: 2,
    name: 'Ni Luh Putu Sari',
    position: 'Project Manager',
    company: 'PT. Teknologi Nusantara',
    email: 'sari@perusahaan.com',
    phone: '081298765432',
  },
  {
    id: 3,
    name: 'I Gede Putra Mahendra',
    position: 'Web Developer',
    company: 'PT. Teknologi Nusantara',
    email: 'putra@perusahaan.com',
    phone: '081234567891',
  },
];

const emptyForm: MentorForm = {
  name: '',
  position: '',
  company: '',
  email: '',
  phone: '',
  notes: '',
};

export default function PendampingMagang() {
  const [mentors, setMentors] = useState<Mentor[]>(initialMentors);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [fixedMentor, setFixedMentor] = useState<Mentor | null>(null);

  const [modal, setModal] = useState<'add' | 'select' | 'edit' | null>(null);
  const [formData, setFormData] = useState<MentorForm>(emptyForm);

  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [countdown, setCountdown] = useState(45);
  const [showSuccess, setShowSuccess] = useState('');

  const inputClass =
    'w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

  const labelClass = 'mb-1.5 block text-[11px] font-medium text-slate-700';

  function resetForm() {
    setFormData(emptyForm);
    setVerificationSent(false);
    setVerificationCode('');
    setEmailVerified(false);
    setVerificationMessage('');
    setCountdown(45);
  }

  function openAddModal() {
    resetForm();
    setModal('add');
  }

  function openEditModal() {
    if (!fixedMentor) return;

    setFormData({
      name: fixedMentor.name,
      position: fixedMentor.position,
      company: fixedMentor.company,
      email: fixedMentor.email,
      phone: fixedMentor.phone,
      notes: fixedMentor.notes ?? '',
    });

    setVerificationSent(true);
    setEmailVerified(true);
    setVerificationMessage('Email mentor telah terverifikasi.');
    setModal('edit');
  }

  function closeModal() {
    setModal(null);
    setSelectedMentor(null);
    resetForm();
  }

  function handleAddMentor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!emailVerified) {
      setVerificationMessage('Verifikasi email mentor terlebih dahulu.');
      return;
    }

    const newMentor: Mentor = {
      id: Date.now(),
      ...formData,
    };

    setMentors((previous) => [newMentor, ...previous]);
    setShowSuccess('Mentor lapangan berhasil ditambahkan.');
    closeModal();
  }

  function handleEditMentor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fixedMentor) return;

    const updatedMentor: Mentor = {
      id: fixedMentor.id,
      ...formData,
    };

    setMentors((previous) =>
      previous.map((mentor) =>
        mentor.id === updatedMentor.id ? updatedMentor : mentor,
      ),
    );

    setFixedMentor(updatedMentor);
    setShowSuccess('Data mentor berhasil diperbarui.');
    closeModal();
  }

  function handleSelectMentor() {
    if (!selectedMentor) return;

    setFixedMentor(selectedMentor);
    setSelectedMentor(null);
    setModal(null);
    setShowSuccess('Mentor berhasil dipilih.');
  }

  function sendVerificationCode() {
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setVerificationMessage('Masukkan alamat email mentor yang valid.');
      return;
    }

    setVerificationSent(true);
    setEmailVerified(false);
    setVerificationCode('');
    setCountdown(45);

    // Simulasi frontend: tidak mengirim email sungguhan.
    setVerificationMessage(
      'Simulasi: kode verifikasi contoh adalah 849201. Email belum benar-benar dikirim.',
    );
  }

  function checkVerificationCode() {
    if (!verificationSent) {
      setVerificationMessage('Kirim kode verifikasi terlebih dahulu.');
      return;
    }

    // Hanya untuk demonstrasi frontend.
    if (verificationCode.trim() === '849201') {
      setEmailVerified(true);
      setVerificationMessage('Email mentor berhasil diverifikasi (simulasi).');
    } else {
      setEmailVerified(false);
      setVerificationMessage('Kode verifikasi salah. Periksa kembali kode.');
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800 md:text-2xl">
            Pendamping Magang
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Informasi dosen pembimbing, mentor lapangan, dan dosen penguji
            selama pelaksanaan magang.
          </p>
        </div>

        {showSuccess && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} />
              {showSuccess}
            </span>
            <button
              type="button"
              onClick={() => setShowSuccess('')}
              aria-label="Tutup pesan"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <section className="rounded-xl border border-blue-300 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
              <GraduationCap size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Dosen Pembimbing
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Dosen pembimbing yang ditetapkan oleh sistem.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-blue-300 p-4">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Dr. I Made Arya Suyasa, S.Kom., M.Kom.
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  NIP. 198501012010121001
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <CheckCircle2 size={13} />
                Telah Ditentukan
              </span>
            </div>

            <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Phone size={15} className="text-slate-400" />
                081234567890
              </div>
              <div className="flex items-center gap-2 break-all text-xs text-slate-600">
                <Mail size={15} className="shrink-0 text-slate-400" />
                dosen.pembimbing@undiksha.ac.id
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-blue-300 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Mentor Lapangan
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Pilih mentor yang akan membimbing selama magang.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
            >
              <Plus size={15} />
              Tambah Mentor
            </button>
          </div>

          {fixedMentor ? (
            <div className="rounded-xl border border-blue-300 p-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    {fixedMentor.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {fixedMentor.position}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {fixedMentor.company}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openEditModal}
                  className="flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
                >
                  <Pencil size={14} />
                  Ubah Data
                </button>
              </div>

              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <Mail size={15} className="mt-0.5 shrink-0 text-slate-400" />
                  <span className="break-all">{fixedMentor.email}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <Phone size={15} className="mt-0.5 shrink-0 text-slate-400" />
                  <span>{fixedMentor.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <BriefcaseBusiness
                    size={15}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />
                  <span>{fixedMentor.company}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  <CheckCircle2 size={13} />
                  Mentor Dipilih
                </span>
                <button
                  type="button"
                  onClick={() => setFixedMentor(null)}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  Ganti Mentor
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-blue-300 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                      <UserRound size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        {mentor.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {mentor.position}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {mentor.company}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMentor(mentor);
                      setModal('select');
                    }}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 sm:w-auto"
                  >
                    Pilih Mentor
                  </button>
                </div>
              ))}

              {mentors.length === 0 && (
                <div className="rounded-xl border border-dashed border-blue-300 py-8 text-center">
                  <UserRound size={28} className="mx-auto text-slate-400" />
                  <p className="mt-3 text-sm text-slate-600">
                    Belum ada data mentor.
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Klik Tambah Mentor untuk menambahkan data.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-blue-300 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-2.5 text-purple-600">
              <GraduationCap size={22} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Dosen Penguji
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Informasi dosen penguji kegiatan magang.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-slate-300 p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-amber-50 p-2 text-amber-600">
                <Info size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Dosen Penguji Belum Ditentukan
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Informasi dosen penguji akan ditampilkan setelah penetapan
                  dilakukan oleh pihak program studi.
                </p>
              </div>
            </div>
            <div className="mt-4 border-t border-slate-100 pt-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                <Info size={13} />
                Menunggu Penetapan
              </span>
            </div>
          </div>
        </section>
      </div>

      {modal === 'add' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 sm:p-5"
          onClick={closeModal}
        >
          <div
            className="my-auto w-full max-w-[465px] overflow-hidden rounded-xl border border-blue-300 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
              <div>
                <h2 className="text-sm font-bold text-slate-800">
                  Tambah Mentor Lapangan
                </h2>
                <p className="mt-1 text-[10px] text-slate-500">
                  Masukkan data mentor dari instansi tempat Anda melaksanakan
                  Magang.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Tutup modal"
                className="ml-3 rounded p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleAddMentor}>
              <div className="max-h-[75vh] space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
                <div>
                  <h3 className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-700">
                    <span className="h-3 w-1 rounded-full bg-blue-600" />
                    Data Mentor Lapangan
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className={labelClass}>
                        Nama Mentor <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        value={formData.name}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            name: event.target.value,
                          })
                        }
                        placeholder="Masukkan nama lengkap mentor"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Jabatan <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        value={formData.position}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            position: event.target.value,
                          })
                        }
                        placeholder="Contoh: Software Engineer"
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>
                          Email Mentor <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              email: event.target.value,
                            });
                            setEmailVerified(false);
                            setVerificationSent(false);
                            setVerificationMessage('');
                          }}
                          placeholder="mentor@perusahaan.com"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          No. Handphone <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              phone: event.target.value,
                            })
                          }
                          placeholder="081234567890"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Instansi Magang</label>
                      <input
                        value={formData.company}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            company: event.target.value,
                          })
                        }
                        placeholder="Nama instansi tempat magang"
                        className={`${inputClass} bg-slate-50`}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Keterangan Tambahan</label>
                      <textarea
                        value={formData.notes}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            notes: event.target.value,
                          })
                        }
                        rows={2}
                        placeholder="Tambahkan informasi mentor jika diperlukan."
                        className={`${inputClass} resize-y`}
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h3 className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-700">
                    <span className="h-3 w-1 rounded-full bg-blue-600" />
                    Verifikasi Email Mentor
                  </h3>
                  <p className="mb-3 text-[10px] leading-4 text-slate-500">
                    Klik tombol di bawah untuk mengirim kode verifikasi ke email
                    mentor. Pada versi ini, proses verifikasi masih berupa
                    simulasi.
                  </p>

                  <div className="rounded-lg border border-blue-300 p-3">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="rounded-full bg-blue-50 p-2 text-blue-600">
                          <Mail size={15} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] text-slate-400">
                            Alamat Email Mentor Tujuan:
                          </p>
                          <p className="break-all text-[10px] font-semibold text-slate-700">
                            {formData.email || 'Belum ada email'}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={sendVerificationCode}
                        disabled={
                          verificationSent && !emailVerified && countdown > 0
                        }
                        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-[10px] font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Send size={12} />
                        Kirim Kode Verifikasi
                      </button>
                    </div>

                    {verificationSent && (
                      <div className="mt-3 flex items-start gap-2 rounded-md border border-blue-100 bg-blue-50 p-2.5 text-[10px] leading-4 text-blue-700">
                        <Info size={13} className="mt-0.5 shrink-0" />
                        <p>
                          Kode verifikasi simulasi: <strong>849201</strong>.
                          Tidak ada email sungguhan yang dikirim.
                        </p>
                      </div>
                    )}

                    <div className="mt-3">
                      <label className={labelClass}>
                        Kode Verifikasi <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          value={verificationCode}
                          onChange={(event) =>
                            setVerificationCode(
                              event.target.value.replace(/\D/g, '').slice(0, 6),
                            )
                          }
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="Masukkan 6 digit kode"
                          className={`${inputClass} min-w-0`}
                        />
                        <button
                          type="button"
                          onClick={checkVerificationCode}
                          className="shrink-0 rounded-md bg-slate-800 px-3 py-2 text-[10px] font-semibold text-white hover:bg-slate-700"
                        >
                          Cek Kode
                        </button>
                      </div>
                    </div>

                    {verificationMessage && (
                      <div
                        className={`mt-3 flex items-start gap-2 rounded-md border p-2.5 text-[10px] leading-4 ${
                          emailVerified
                            ? 'border-green-200 bg-green-50 text-green-700'
                            : 'border-blue-100 bg-blue-50 text-blue-700'
                        }`}
                      >
                        {emailVerified ? (
                          <BadgeCheck size={14} className="mt-0.5 shrink-0" />
                        ) : (
                          <CircleAlert size={14} className="mt-0.5 shrink-0" />
                        )}
                        <p>{verificationMessage}</p>
                      </div>
                    )}

                    {emailVerified && (
                      <div className="mt-3 flex items-center gap-2 rounded-md border border-green-200 bg-green-50 p-2.5 text-[10px] font-semibold text-green-700">
                        <CheckCircle2 size={14} />
                        Email mentor terverifikasi (simulasi).
                      </div>
                    )}

                    {verificationSent && !emailVerified && (
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[9px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock3 size={12} />
                          Simulasi waktu kirim ulang: {countdown} detik
                        </span>
                        <button
                          type="button"
                          disabled={countdown > 0}
                          onClick={() => {
                            setCountdown(45);
                            setVerificationMessage(
                              'Kode simulasi siap digunakan kembali: 849201.',
                            );
                          }}
                          className="font-medium text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400"
                        >
                          Kirim Ulang Kode
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-4 py-3 sm:px-5">
                <p className="text-[9px] text-slate-500">
                  <span className="text-red-500">*</span> Wajib diisi
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-[10px] font-medium text-slate-600 hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-[10px] font-semibold text-white hover:bg-blue-700"
                  >
                    <CheckCircle2 size={13} />
                    Simpan Mentor
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {modal === 'select' && selectedMentor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => {
            setSelectedMentor(null);
            setModal(null);
          }}
        >
          <div
            className="w-full max-w-md rounded-xl border border-blue-300 bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="text-base font-bold text-slate-800">
                Pilih Mentor
              </h2>
              <button
                type="button"
                onClick={() => {
                  setSelectedMentor(null);
                  setModal(null);
                }}
                aria-label="Tutup modal"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm text-slate-600">
                Apakah kamu yakin ingin memilih mentor berikut?
              </p>
              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <h3 className="text-sm font-bold text-slate-800">
                  {selectedMentor.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedMentor.position}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedMentor.company}
                </p>
                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  <p className="break-all">{selectedMentor.email}</p>
                  <p>{selectedMentor.phone}</p>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMentor(null);
                    setModal(null);
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSelectMentor}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-blue-700"
                >
                  <CheckCircle2 size={15} />
                  Ya, Pilih Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modal === 'edit' && fixedMentor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
          onClick={closeModal}
        >
          <div
            className="my-auto w-full max-w-lg rounded-xl border border-blue-300 bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Ubah Data Mentor
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Perbarui informasi mentor yang dipilih.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Tutup modal"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditMentor} className="space-y-4 p-5">
              <div>
                <label className={labelClass}>Nama Lengkap</label>
                <input
                  required
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Jabatan</label>
                <input
                  required
                  value={formData.position}
                  onChange={(event) =>
                    setFormData({ ...formData, position: event.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Nama Instansi</label>
                <input
                  required
                  value={formData.company}
                  onChange={(event) =>
                    setFormData({ ...formData, company: event.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData({ ...formData, email: event.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Nomor Telepon</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData({ ...formData, phone: event.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Keterangan Tambahan</label>
                <textarea
                  value={formData.notes}
                  onChange={(event) =>
                    setFormData({ ...formData, notes: event.target.value })
                  }
                  rows={2}
                  className={inputClass}
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-blue-700"
                >
                  <CheckCircle2 size={15} />
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
