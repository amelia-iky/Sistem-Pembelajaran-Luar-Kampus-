import { useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  Info,
  Mail,
  Phone,
  School,
  Building2,
  Plus,
  X,
  Save,
  ShieldCheck,
  Send,
  UserRound,
} from 'lucide-react';

type Person = {
  name: string;
  nip: string;
  nuptk: string;
  email: string;
  phone: string;
  school: string;
  position: string;
  group: string;
  npwp: string;
  certificate: string;
  bank: string;
  account: string;
  accountName: string;
  verified: boolean;
};

const emptyPerson: Person = {
  name: '',
  nip: '',
  nuptk: '',
  email: '',
  phone: '',
  school: 'SMAN 1 Singaraja',
  position: '',
  group: '',
  npwp: '',
  certificate: '',
  bank: '',
  account: '',
  accountName: '',
  verified: false,
};

const sampleSupervisors = [
  {
    name: 'Dr. I Made Agus Wirawan, S.Kom., M.Cs.',
    nip: '198203152008121002',
    email: 'agus.wirawan@undiksha.ac.id',
    phone: '0889231456789',
  },
  {
    name: 'Nama Dosen Pembimbing 2',
    nip: 'NIP belum tersedia',
    email: 'Belum tersedia',
    phone: 'Belum tersedia',
  },
  {
    name: 'Nama Dosen Pembimbing 3',
    nip: 'NIP belum tersedia',
    email: 'Belum tersedia',
    phone: 'Belum tersedia',
  },
];

export default function PendampingAM() {
  const [guruPamong, setGuruPamong] = useState<Person | null>(null);
  const [kepalaSekolah, setKepalaSekolah] = useState<Person | null>(null);
  const [modalType, setModalType] = useState<'guru' | 'kepala' | null>(null);
  const [form, setForm] = useState<Person>(emptyPerson);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  const isGuru = modalType === 'guru';

  function openModal(type: 'guru' | 'kepala') {
    setModalType(type);
    setForm(
      type === 'guru'
        ? (guruPamong ?? { ...emptyPerson, position: 'Guru Kelas' })
        : (kepalaSekolah ?? { ...emptyPerson, position: 'Kepala Sekolah' }),
    );

    setOtp('');
    setOtpSent(false);
    setMessage('');
  }

  function closeModal() {
    setModalType(null);
    setMessage('');
  }

  function updateField(field: keyof Person, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function savePerson() {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.school.trim() ||
      !form.position.trim()
    ) {
      setMessage(
        'Lengkapi Nama, Email, No. HP, Sekolah, dan Jabatan terlebih dahulu.',
      );
      return;
    }

    if (isGuru && !form.verified) {
      setMessage('Verifikasi email Guru Pamong terlebih dahulu.');
      return;
    }

    if (isGuru) {
      setGuruPamong({ ...form });
    } else {
      setKepalaSekolah({ ...form });
    }

    closeModal();
  }

  function verifyEmail() {
    if (!form.email.trim()) {
      setMessage('Masukkan email terlebih dahulu.');
      return;
    }

    setOtpSent(true);
    setMessage(
      'Kode contoh telah dikirim. Untuk demo UI, gunakan kode 729415.',
    );
  }

  function confirmOtp() {
    if (otp === '729415') {
      setForm((prev) => ({ ...prev, verified: true }));
      setMessage('Email berhasil diverifikasi untuk demo UI.');
    } else {
      setMessage('Kode tidak sesuai. Gunakan kode demo 729415.');
    }
  }

  const inputClass =
    'mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-50';

  const labelClass = 'text-[10px] font-medium text-slate-600';

  return (
    <div className="min-h-screen bg-white px-6 py-6 md:px-8">
      <div className="mb-6">
        <h1 className="text-lg font-bold tracking-tight text-slate-800">
          Pendamping Asistensi Mengajar
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Kelola informasi dosen pembimbing, guru pamong, dan kepala sekolah
          dalam program Asistensi Mengajar.
        </p>
      </div>

      <div className="space-y-6">
        <section className="rounded-lg border border-blue-200 bg-white p-4 shadow-[0_4px_8px_rgba(0,0,0,0.12)] md:p-5">
          <SectionHeader
            title="Dosen Pembimbing"
            description="Informasi tiga dosen yang membimbing mahasiswa selama program Asistensi Mengajar."
            icon={<GraduationCap size={17} />}
          />

          <div className="mt-4 space-y-3">
            {sampleSupervisors.map((person, index) => (
              <PersonCard
                key={index}
                title={`DOSEN PEMBIMBING ${index + 1}`}
                name={person.name}
                identifier={person.nip}
                email={person.email}
                phone={person.phone}
                icon={<GraduationCap size={18} />}
                color="blue"
              />
            ))}
          </div>

          <InfoNote>
            Data dosen pembimbing mengikuti penetapan program studi.
          </InfoNote>
        </section>

        <section className="rounded-lg border border-blue-200 bg-white p-4 shadow-[0_4px_8px_rgba(0,0,0,0.12)] md:p-5">
          <SectionHeader
            title="Guru Pamong"
            description="Guru yang membimbing mahasiswa dalam kegiatan pembelajaran di sekolah mitra."
            icon={<School size={17} />}
          />

          {guruPamong ? (
            <div className="mt-4">
              <PersonCard
                title="GURU PAMONG"
                name={guruPamong.name}
                identifier={guruPamong.nip || 'NIP belum tersedia'}
                email={guruPamong.email}
                phone={guruPamong.phone}
                icon={<School size={18} />}
                color="amber"
                school={guruPamong.school}
                verified={guruPamong.verified}
              />
              <button
                onClick={() => openModal('guru')}
                className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Ubah Data Guru Pamong
              </button>
            </div>
          ) : (
            <EmptyPerson
              title="Guru Pamong Belum Ditambahkan"
              description="Tambahkan data guru pamong yang akan mendampingi kegiatan mengajar."
              buttonText="Tambah Guru Pamong"
              onClick={() => openModal('guru')}
            />
          )}
        </section>

        <section className="rounded-lg border border-blue-200 bg-white p-4 shadow-[0_4px_8px_rgba(0,0,0,0.12)] md:p-5">
          <SectionHeader
            title="Kepala Sekolah"
            description="Informasi kepala sekolah di tempat pelaksanaan Asistensi Mengajar."
            icon={<Building2 size={17} />}
          />

          {kepalaSekolah ? (
            <div className="mt-4">
              <PersonCard
                title="KEPALA SEKOLAH"
                name={kepalaSekolah.name}
                identifier={kepalaSekolah.nip || 'NIP belum tersedia'}
                email={kepalaSekolah.email}
                phone={kepalaSekolah.phone}
                icon={<Building2 size={18} />}
                color="purple"
                school={kepalaSekolah.school}
              />
              <button
                onClick={() => openModal('kepala')}
                className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Ubah Data Kepala Sekolah
              </button>
            </div>
          ) : (
            <EmptyPerson
              title="Kepala Sekolah Belum Ditambahkan"
              description="Tambahkan informasi kepala sekolah SMAN 1 Singaraja."
              buttonText="Tambah Kepala Sekolah"
              onClick={() => openModal('kepala')}
            />
          )}
        </section>
      </div>

      {modalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-[2px] sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-orange-600">
                  Asistensi Mengajar
                </span>
                <h2 className="mt-1 text-base font-bold text-slate-800">
                  {isGuru ? 'Tambah Guru Pamong' : 'Tambah Kepala Sekolah'}
                </h2>
                <p className="mt-1 text-[10px] text-slate-400">
                  Lengkapi data {isGuru ? 'guru pamong' : 'kepala sekolah'} pada
                  sekolah tempat Anda melaksanakan Asistensi Mengajar.
                </p>
              </div>

              <button
                onClick={closeModal}
                aria-label="Tutup modal"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
              <FormSection number="1" title="DATA PRIBADI & SEKOLAH">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField label="NIP">
                    <input
                      className={inputClass}
                      value={form.nip}
                      onChange={(e) => updateField('nip', e.target.value)}
                      placeholder="Masukkan NIP"
                    />
                  </FormField>
                  <FormField label="NUPTK">
                    <input
                      className={inputClass}
                      value={form.nuptk}
                      onChange={(e) => updateField('nuptk', e.target.value)}
                      placeholder="Masukkan NUPTK"
                    />
                  </FormField>
                  <div className="sm:col-span-2">
                    <FormField label="Nama Lengkap (beserta gelar) *">
                      <input
                        required
                        className={inputClass}
                        value={form.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Masukkan nama lengkap"
                      />
                    </FormField>
                  </div>
                  <FormField label="Email *">
                    <div className="relative">
                      <Mail
                        size={13}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />
                      <input
                        required
                        type="email"
                        className={`${inputClass} pl-8`}
                        value={form.email}
                        onChange={(e) => {
                          updateField('email', e.target.value);
                          updateField('verified', false);
                        }}
                        placeholder="nama@sekolah.sch.id"
                      />
                    </div>
                  </FormField>
                  <FormField label="No. HP / WhatsApp *">
                    <div className="relative">
                      <Phone
                        size={13}
                        className="absolute left-3 top-3.5 text-slate-400"
                      />
                      <input
                        required
                        className={`${inputClass} pl-8`}
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>
                  </FormField>
                  <div className="sm:col-span-2">
                    <FormField label="Sekolah Penempatan *">
                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
                        <School size={14} className="shrink-0 text-slate-400" />
                        <input
                          required
                          className="min-w-0 flex-1 bg-transparent text-xs text-slate-700 outline-none"
                          value={form.school}
                          onChange={(e) =>
                            updateField('school', e.target.value)
                          }
                        />
                        <span className="text-[9px] text-slate-400">
                          Sekolah Mitra
                        </span>
                      </div>
                    </FormField>
                  </div>
                </div>
              </FormSection>

              <FormSection number="2" title="DATA KEGURUAN">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField label="Jabatan *">
                    <select
                      required
                      className={inputClass}
                      value={form.position}
                      onChange={(e) => updateField('position', e.target.value)}
                    >
                      <option value="">Pilih jabatan</option>
                      {isGuru ? (
                        <>
                          <option>Guru Kelas</option>
                          <option>Guru Mata Pelajaran</option>
                          <option>Guru Pamong</option>
                        </>
                      ) : (
                        <option>Kepala Sekolah</option>
                      )}
                    </select>
                  </FormField>
                  <FormField label="Golongan">
                    <select
                      className={inputClass}
                      value={form.group}
                      onChange={(e) => updateField('group', e.target.value)}
                    >
                      <option value="">Pilih golongan</option>
                      <option>III/b - Penata Muda Tingkat I</option>
                      <option>III/c - Penata</option>
                      <option>IV/a - Pembina</option>
                      <option>IV/b - Pembina Tingkat I</option>
                      <option>Non-PNS / Belum tersedia</option>
                    </select>
                  </FormField>
                  <FormField label="NPWP">
                    <input
                      className={inputClass}
                      value={form.npwp}
                      onChange={(e) => updateField('npwp', e.target.value)}
                      placeholder="Masukkan NPWP"
                    />
                  </FormField>
                  <FormField label="Nomor Sertifikasi">
                    <input
                      className={inputClass}
                      value={form.certificate}
                      onChange={(e) =>
                        updateField('certificate', e.target.value)
                      }
                      placeholder="Nomor sertifikasi pendidik"
                    />
                  </FormField>
                </div>
              </FormSection>

              <FormSection number="3" title="DATA PERBANKAN">
                <p className="mb-3 text-[9px] text-slate-400">
                  Diperlukan apabila berlaku untuk administrasi dan honorarium.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <FormField label="Nama Bank">
                    <select
                      className={inputClass}
                      value={form.bank}
                      onChange={(e) => updateField('bank', e.target.value)}
                    >
                      <option value="">Pilih bank</option>
                      <option>Bank BPD Bali</option>
                      <option>Bank BRI</option>
                      <option>Bank BNI</option>
                      <option>Bank Mandiri</option>
                      <option>Bank BCA</option>
                      <option>Lainnya</option>
                    </select>
                  </FormField>
                  <FormField label="Nomor Rekening">
                    <input
                      className={inputClass}
                      value={form.account}
                      onChange={(e) => updateField('account', e.target.value)}
                      placeholder="Nomor rekening"
                    />
                  </FormField>
                  <FormField label="Atas Nama">
                    <input
                      className={inputClass}
                      value={form.accountName}
                      onChange={(e) =>
                        updateField('accountName', e.target.value)
                      }
                      placeholder="Nama pemilik rekening"
                    />
                  </FormField>
                </div>
              </FormSection>

              {isGuru && (
                <FormSection number="4" title="VERIFIKASI EMAIL GURU PAMONG">
                  <p className="mb-3 text-[10px] leading-relaxed text-slate-500">
                    Pastikan alamat email benar. Pada versi demo ini, pengiriman
                    email belum terhubung ke layanan backend.
                  </p>

                  <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="rounded-md bg-blue-100 p-2 text-blue-600">
                        <Mail size={15} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] text-slate-400">
                          EMAIL GURU PAMONG
                        </p>
                        <p className="break-all text-[10px] font-semibold text-slate-700">
                          {form.email || 'Email belum diisi'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={verifyEmail}
                      className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-[10px] font-semibold text-white hover:bg-blue-700"
                    >
                      <Send size={12} />
                      Kirim Kode Verifikasi
                    </button>
                  </div>

                  {otpSent && (
                    <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
                      <label className={labelClass}>
                        Kode Verifikasi (6 Digit)
                      </label>
                      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                        <input
                          maxLength={6}
                          inputMode="numeric"
                          value={otp}
                          onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, ''))
                          }
                          className={`${inputClass} mt-0 sm:flex-1`}
                          placeholder="Masukkan 729415 untuk demo"
                        />
                        <button
                          onClick={confirmOtp}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          Verifikasi
                        </button>
                      </div>
                    </div>
                  )}

                  {form.verified && (
                    <p className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-emerald-600">
                      <ShieldCheck size={14} />
                      Email berhasil diverifikasi untuk demo UI.
                    </p>
                  )}
                </FormSection>
              )}

              {message && (
                <div
                  className={`rounded-lg border p-3 text-xs ${message.includes('berhasil') ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-800'}`}
                >
                  {message}
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-[9px] text-slate-400">
                * Wajib diisi sebelum menyimpan data
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={closeModal}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  onClick={savePerson}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  <Save size={14} />
                  {isGuru ? 'Simpan Guru Pamong' : 'Simpan Kepala Sekolah'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeader({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-slate-100 pb-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-bold text-slate-800">{title}</h2>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function PersonCard({
  title,
  name,
  identifier,
  email,
  phone,
  icon,
  color,
  school,
  verified,
}: {
  title: string;
  name: string;
  identifier: string;
  email: string;
  phone: string;
  icon: React.ReactNode;
  color: 'blue' | 'amber' | 'purple';
  school?: string;
  verified?: boolean;
}) {
  const styles = {
    blue: 'border-blue-100 bg-blue-50 text-blue-600',
    amber: 'border-amber-100 bg-amber-50 text-amber-700',
    purple: 'border-purple-100 bg-purple-50 text-purple-700',
  };

  return (
    <div className="rounded-lg border border-blue-200 bg-slate-50/50 p-3">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${styles[color]}`}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <span
              className={`inline-flex rounded border px-2 py-0.5 text-[9px] font-bold ${styles[color]}`}
            >
              {title}
            </span>
            <h3 className="mt-2 break-words text-xs font-bold text-slate-800">
              {name}
            </h3>
            <p className="mt-1 text-[10px] text-slate-500">{identifier}</p>
            {school && (
              <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
                <School size={11} />
                {school}
              </p>
            )}
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:w-[48%]">
          <ContactDisplay
            icon={<Phone size={12} />}
            label="No. HP"
            value={phone}
          />
          <ContactDisplay
            icon={<Mail size={12} />}
            label="Email"
            value={email}
          />
        </div>
      </div>

      {verified && (
        <p className="mt-3 flex items-center gap-1 text-[10px] text-emerald-600">
          <CheckCircle2 size={12} /> Email terverifikasi (demo)
        </p>
      )}
    </div>
  );
}

function ContactDisplay({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-md border border-slate-200 bg-white px-3 py-2">
      <p className="flex items-center gap-1 text-[9px] text-slate-400">
        {icon}
        {label}
      </p>
      <p className="mt-1 break-all text-[10px] font-medium text-slate-700">
        {value}
      </p>
    </div>
  );
}

function EmptyPerson({
  title,
  description,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div className="mt-4 flex flex-col justify-between gap-4 rounded-lg border border-dashed border-slate-300 bg-slate-50/50 p-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400">
          <UserRound size={18} />
        </div>
        <div>
          <h3 className="text-xs font-semibold text-slate-700">{title}</h3>
          <p className="mt-1 text-[11px] text-slate-500">{description}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-[10px] font-semibold text-white hover:bg-blue-700"
      >
        <Plus size={13} />
        {buttonText}
      </button>
    </div>
  );
}

function FormSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-50 text-[10px] font-bold text-blue-600">
          {number}
        </span>
        <h3 className="text-[10px] font-bold text-slate-700">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="text-[10px] font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function InfoNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex items-start gap-2 text-[10px] leading-relaxed text-slate-400">
      <Info size={12} className="mt-0.5 shrink-0" />
      <p>{children}</p>
    </div>
  );
}
