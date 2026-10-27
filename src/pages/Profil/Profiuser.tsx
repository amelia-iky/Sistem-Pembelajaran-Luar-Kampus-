import { useRef, useState } from 'react';
import {
  UserRound,
  IdCard,
  CalendarDays,
  Building2,
  GraduationCap,
  Pencil,
  Check,
  X,
  Upload,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { useProfile } from '../../context/useprofile';

export default function Profil() {
  const { profile, setProfile } = useProfile();

  const [savedProfile, setSavedProfile] = useState({ ...profile });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [syncing, setSyncing] = useState(false);

  const photoRef = useRef<HTMLInputElement>(null);

  const fields = [
    { key: 'fullName' as const, label: 'Nama Lengkap', icon: UserRound },
    { key: 'nim' as const, label: 'Nomor Induk Mahasiswa (NIM)', icon: IdCard },
    {
      key: 'semester' as const,
      label: 'Semester Akademik',
      icon: CalendarDays,
    },
    { key: 'faculty' as const, label: 'Fakultas', icon: Building2 },
    {
      key: 'studyProgram' as const,
      label: 'Program Studi',
      icon: GraduationCap,
    },
  ];

  const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Pilih file gambar yang valid.');
      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Ukuran foto maksimal 5 MB.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProfile({
        ...profile,
        photo: String(reader.result),
      });
      setError('');
      setMessage('');
    };

    reader.onerror = () => setError('Foto gagal dibaca.');
    reader.readAsDataURL(file);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !profile.fullName.trim() ||
      !profile.nim.trim() ||
      !profile.semester.trim() ||
      !profile.faculty.trim() ||
      !profile.studyProgram.trim()
    ) {
      setError('Semua informasi profil wajib diisi.');
      return;
    }

    setProfile({ ...profile });
    setSavedProfile({ ...profile });
    setEditing(false);
    setError('');
    setMessage('Profil berhasil disimpan.');
  };

  const handleCancel = () => {
    setProfile({ ...savedProfile });
    setEditing(false);
    setError('');
    setMessage('');
  };

  const handleSync = () => {
    setSyncing(true);
    setMessage('');
    setError('');

    // Simulasi sinkronisasi frontend.
    // Nantinya dapat diganti dengan pemanggilan API backend.
    window.setTimeout(() => {
      setSavedProfile({ ...profile });
      setSyncing(false);
      setMessage('Sinkronisasi informasi mahasiswa berhasil.');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Judul halaman */}
        <header>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Profil Saya
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Lihat dan kelola informasi profil mahasiswa.
          </p>
        </header>

        {/* Notifikasi berhasil */}
        {message && (
          <div
            role="status"
            className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              {message}
            </span>

            <button
              type="button"
              onClick={() => setMessage('')}
              aria-label="Tutup pemberitahuan"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Card informasi mahasiswa dengan stroke biru */}
          <section className="overflow-hidden rounded-xl border border-blue-300 bg-white shadow-[0_4px_10px_rgba(15,23,42,0.10)]">
            {/* Judul dan tombol sinkronisasi */}
            <div className="flex flex-col gap-3 border-b border-blue-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h2 className="text-sm font-bold text-slate-800">
                  Informasi Mahasiswa
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Data diri dan identitas akademik.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSync}
                disabled={syncing}
                className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-md bg-blue-600 px-4 text-xs font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
              >
                <RefreshCw
                  size={13}
                  className={syncing ? 'animate-spin' : ''}
                />
                {syncing ? 'Menyinkronkan...' : 'Sinkronisasi'}
              </button>
            </div>

            <div className="p-5 sm:p-6">
              {/* Foto dan identitas singkat */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="h-28 w-28 shrink-0">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt="Foto profil"
                      className="h-28 w-28 rounded-full border-4 border-blue-100 object-cover"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600">
                      <UserRound size={48} strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    {profile.fullName}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {profile.studyProgram}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    NIM: {profile.nim}
                  </p>

                  {editing && (
                    <div className="mt-3">
                      <input
                        ref={photoRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handlePhoto}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => photoRef.current?.click()}
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                      >
                        <Upload size={15} />
                        Unggah Foto
                      </button>

                      <p className="mt-2 text-[11px] text-slate-400">
                        JPG, PNG, atau WEBP. Maksimal 5 MB.
                      </p>
                    </div>
                  )}
                </div>

                {!editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setSavedProfile({ ...profile });
                      setEditing(true);
                      setMessage('');
                      setError('');
                    }}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-blue-200 px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 sm:self-center"
                  >
                    <Pencil size={15} />
                    Edit Profil
                  </button>
                )}
              </div>

              <div className="my-6 border-t border-blue-100" />

              {/* Detail informasi mahasiswa */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {fields.map((field) => {
                  const Icon = field.icon;

                  return (
                    <div key={field.key}>
                      <label
                        htmlFor={`profile-${field.key}`}
                        className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-600"
                      >
                        <Icon size={15} className="text-blue-500" />
                        {field.label}
                      </label>

                      {editing ? (
                        <input
                          id={`profile-${field.key}`}
                          type="text"
                          value={profile[field.key]}
                          onChange={(event) =>
                            setProfile({
                              ...profile,
                              [field.key]: event.target.value,
                            })
                          }
                          required
                          className="w-full rounded-lg border border-blue-200 px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      ) : (
                        <div className="min-h-11 rounded-lg border border-blue-200 bg-blue-50/30 px-3.5 py-3 text-sm text-slate-800">
                          {profile[field.key] || '-'}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {error && (
                <p role="alert" className="mt-5 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            {/* Tombol edit */}
            {editing && (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-blue-200 bg-blue-50/40 px-5 py-4 sm:px-6">
                <p className="text-xs text-slate-500">
                  Pastikan informasi sudah benar.
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50"
                  >
                    <X size={15} />
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <Check size={16} />
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            )}
          </section>
        </form>
      </div>
    </div>
  );
}
