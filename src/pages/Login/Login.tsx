import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const normalizedEmail = email.trim().toLowerCase();

    // LOGIN MAHASISWA
    if (
      normalizedEmail === 'mahasiswa@undiksha.ac.id' &&
      password === 'mahasiswa123'
    ) {
      sessionStorage.setItem('user-role', 'mahasiswa');
      sessionStorage.setItem('user-email', normalizedEmail);
      sessionStorage.removeItem('admin-program');

      navigate('/pendaftaran-program');
      return;
    }

    // LOGIN ADMIN MAGANG
    if (normalizedEmail === 'admin@undiksha.ac.id' && password === 'admin123') {
      sessionStorage.setItem('user-role', 'admin');
      sessionStorage.setItem('user-email', normalizedEmail);
      sessionStorage.setItem('admin-program', 'magang');

      navigate('/admin/magang/dashboard');
      return;
    }

    // LOGIN ADMIN KKN
    if (
      normalizedEmail === 'adminkkn@undiksha.ac.id' &&
      password === 'kkn123'
    ) {
      sessionStorage.setItem('user-role', 'admin');
      sessionStorage.setItem('user-email', normalizedEmail);
      sessionStorage.setItem('admin-program', 'kkn');

      navigate('/admin/kkn/dashboard');
      return;
    }

    setError('Username atau password yang Anda masukkan salah.');
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center px-4 py-6"
      style={{ backgroundColor: '#EBF3FF' }}
    >
      <section
        className="flex w-full overflow-hidden max-md:flex-col"
        style={{
          maxWidth: '1150px',
          minHeight: '675px',
          borderRadius: '22px',
          boxShadow: '0 8px 30px rgba(36, 90, 165, 0.15)',
        }}
      >
        {/* KOLOM KIRI */}
        <aside
          className="flex w-1/2 flex-col items-center px-11 py-10 text-white max-md:w-full max-md:px-6"
          style={{ backgroundColor: '#245AA5' }}
        >
          <div className="mb-6 flex justify-center">
            <img
              src="/logo-undiksha.png"
              alt="Logo Undiksha"
              className="object-contain"
              style={{ width: '105px', height: '105px' }}
            />
          </div>

          <h1
            className="mb-4 text-center font-bold text-white"
            style={{ fontSize: '24px', lineHeight: '1.3' }}
          >
            Visi Undiksha
          </h1>

          <p
            className="mb-8 text-center text-white"
            style={{ fontSize: '18px', lineHeight: '1.65' }}
          >
            Menjadi Universitas Unggul Pada Tahun 2045
            <br />
            Berlandaskan Falsafah Tri Hita Karana di Asia
          </p>

          <h2
            className="mb-4 text-center font-bold text-white"
            style={{ fontSize: '24px', lineHeight: '1.3' }}
          >
            Misi Undiksha
          </h2>

          <ol
            className="list-decimal pl-5 text-white"
            style={{ fontSize: '14.5px', lineHeight: '1.55' }}
          >
            <li className="mb-2">
              Menyelenggarakan pendidikan yang bermartabat untuk menghasilkan
              sumber daya manusia yang kompetitif, kolaboratif, dan berkarakter.
            </li>
            <li className="mb-2">
              Menyelenggarakan penelitian yang kompetitif, kolaboratif, dan
              inovatif untuk pengembangan dan penerapan ilmu pengetahuan dan
              teknologi.
            </li>
            <li className="mb-2">
              Menyelenggarakan pengabdian kepada masyarakat yang kompetitif,
              kolaboratif, akomodatif, dan inovatif.
            </li>
            <li>
              Menyelenggarakan tata kelola kelembagaan yang berkualitas secara
              terpadu, transparan, akuntabel, adil, dan bertanggung jawab.
            </li>
          </ol>
        </aside>

        {/* KOLOM KANAN */}
        <section className="flex w-1/2 items-center justify-center bg-white px-10 py-10 max-md:w-full max-md:px-6">
          <div className="w-full" style={{ maxWidth: '400px' }}>
            <div className="mb-6 flex justify-center">
              <img
                src="/logo-eganesha.png"
                alt="Logo E-Ganesha"
                className="object-contain"
                style={{ maxHeight: '80px', maxWidth: '180px' }}
              />
            </div>

            <h2
              className="mb-2 text-center font-bold"
              style={{
                fontSize: '27px',
                color: '#101D3A',
                lineHeight: '1.25',
              }}
            >
              Login E-Ganesha
            </h2>

            <p
              className="mb-7 text-center"
              style={{ fontSize: '15px', color: '#596782' }}
            >
              Silakan masukkan kredensial Anda
            </p>

            {/* PESAN ERROR */}
            {error && (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600"
                style={{ fontSize: '14px' }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              {/* USERNAME */}
              <div className="mb-4">
                <div
                  className={`rounded-lg border px-4 pb-2 pt-2 transition-all ${
                    email.length > 0
                      ? 'border-[#93B8F5] bg-[#E8F0FD]'
                      : 'border-[#C8D5E8] bg-white'
                  } focus-within:border-[#4D8AF0] focus-within:ring-2 focus-within:ring-[#C2D9FF]`}
                  style={{ minHeight: '63px' }}
                >
                  <label
                    htmlFor="email"
                    className="mb-0.5 block"
                    style={{
                      fontSize: '11px',
                      color: '#68758D',
                      lineHeight: '1.3',
                    }}
                  >
                    Username
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="username"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="block w-full bg-transparent outline-none"
                    style={{
                      fontSize: '14px',
                      color: '#111827',
                      lineHeight: '1.5',
                    }}
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <div
                  className={`flex items-center rounded-lg border px-4 pb-2 pt-2 transition-all ${
                    password.length > 0
                      ? 'border-[#93B8F5] bg-[#E8F0FD]'
                      : 'border-[#C8D5E8] bg-white'
                  } focus-within:border-[#4D8AF0] focus-within:ring-2 focus-within:ring-[#C2D9FF]`}
                  style={{ minHeight: '63px' }}
                >
                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="password"
                      className="mb-0.5 block"
                      style={{
                        fontSize: '11px',
                        color: '#68758D',
                        lineHeight: '1.3',
                      }}
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      className="block w-full bg-transparent outline-none"
                      style={{
                        fontSize: '14px',
                        color: '#111827',
                        lineHeight: '1.5',
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? 'Sembunyikan password' : 'Lihat password'
                    }
                    className="ml-2 flex-shrink-0 p-1"
                    style={{ color: '#68758D' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* LUPA PASSWORD */}
              <div className="mb-5 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setError(
                      'Fitur lupa password belum tersedia. Silakan hubungi administrator.',
                    )
                  }
                  className="hover:underline"
                  style={{ fontSize: '13px', color: '#1760C5' }}
                >
                  Lupa Password?
                </button>
              </div>

              {/* TOMBOL LOGIN */}
              <button
                type="submit"
                className="w-full font-semibold text-white transition-colors"
                style={{
                  backgroundColor: '#1957B7',
                  borderRadius: '8px',
                  height: '54px',
                  fontSize: '15px',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.backgroundColor = '#154FA3';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.backgroundColor = '#1957B7';
                }}
              >
                Login
              </button>
            </form>

            {/* LOGO BLE */}
            <div className="mt-7 flex justify-center">
              <img
                src="/logo-BLE.png"
                alt="Balai Besar Sertifikasi Elektronik"
                className="object-contain"
                style={{ width: '140px', height: '48px' }}
              />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
