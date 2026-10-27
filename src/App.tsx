import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';

import Sidebar from './components/layout/sidebar';
import SidebarAdmin from './components/layout/admin/sidebaradmin';
import Header from './components/layout/header';
import { ProfileProvider } from './context/ProfileContext';

import Login from './pages/Login/Login';

// MAHASISWA MAGANG
import DashboardMagangMahasiswa from './pages/magang/mahasiswa/Dashboard/Dashboard';
import TempatMagangMahasiswa from './pages/magang/mahasiswa/TempatMagang/TempatMagang';
import PendampingMagang from './pages/magang/mahasiswa/PendampingMagang/PendampingMagang';
import DokumenMagang from './pages/magang/mahasiswa/DokumenMagang/DokumenMagang';
import JurnalMagang from './pages/magang/mahasiswa/Jurnal/JurnalMagang';

// MAHASISWA KKN
import DashboardKKNMahasiswa from './pages/KKN/mahasiswa/DashboardKKN/Dashboard';
import TempatKKN from './pages/KKN/mahasiswa/TempatKKN/TempatKKN';
import PendampingKKN from './pages/KKN/mahasiswa/PendampingKKN/PendampingKKN';
import DokumenKKN from './pages/KKN/mahasiswa/DokumenKKN/DokumenKKN';
import JurnalKKN from './pages/KKN/mahasiswa/JurnalKKN/JurnalKKN';
import BlogKKN from './pages/KKN/mahasiswa/BlogKKN/BlogKKN';
import PenilaianKKN from './pages/KKN/mahasiswa/PenilaianKKN/PenilaianKKN';

// MAHASISWA AM
import DashboardAMMahasiswa from './pages/AM/mahasiswa/DashboardAM/DashboardAM';
import TempatAM from './pages/AM/mahasiswa/TempatAM/TempatAM';
import PendampingAM from './pages/AM/mahasiswa/PendampingAM/PendampingAM';
import DokumenAM from './pages/AM/mahasiswa/DokumenAM/DokumenAM';
import JurnalHarianAM from './pages/AM/mahasiswa/JurnalHarianAM/JurnalHarianAM';
import UnduhInstrumenAM from './pages/AM/mahasiswa/UnduhInstrumenAM/UnduhInstrumenAM';
import LinkViconAM from './pages/AM/mahasiswa/LinkViconAM/LinkViconAM';
import RuangKolaboratifAM from './pages/AM/mahasiswa/RuangKolaboratifAM/RuangKolaboratifAM';

// HALAMAN UMUM MAHASISWA
import PendaftaranProgram from './pages/PendaftaranProgram/PendaftaranProgram';
import Profil from './pages/Profil/Profiuser';

// ADMIN MAGANG
import DashboardAdminMagang from './pages/magang/Admin/Dashboard/Dashboard';
import PeriodeMagangAdmin from './pages/magang/Admin/PeriodeMagang/PeriodeMagang';
import TempatMagangAdmin from './pages/magang/Admin/TempatMagang/TempatMagang';
import PengumumanMagangAdmin from './pages/magang/Admin/Pengumuman/Pengumuman';
import SPDMagangAdmin from './pages/magang/Admin/SPDMagang/SPDMagang';
import ManajemenMagangAdmin from './pages/magang/Admin/ManajemenMagang/ManajemenMagang';
import SetMahasiswa from './pages/magang/Admin/ManajemenMagang/SetMahasiswa';
import PenilaianMagangAdmin from './pages/magang/Admin/PenilaianMagang/PenilaianMagang';
import DataUser from './pages/magang/Admin/MasterData/DataUser';
import DataDosen from './pages/magang/Admin/MasterData/DataDosen';
import DataMahasiswa from './pages/magang/Admin/MasterData/DataMahasiswa';
import DataMentor from './pages/magang/Admin/MasterData/DataMentor';
import Surat from './pages/magang/Admin/Surat/Surat';
import Penguji from './pages/magang/Admin/MasterDataK/DataInstrumen/Penguji';
import Pemonitor from './pages/magang/Admin/MasterDataK/DataInstrumen/Pemonitor';
import Mitra from './pages/magang/Admin/MasterDataK/DataInstrumen/Mitra';
import Pembimbing from './pages/magang/Admin/MasterDataK/DataInstrumen/Pembimbing';
import DataFakultas from './pages/magang/Admin/MasterDataK/DataFakultas';
import DataJurusan from './pages/magang/Admin/MasterDataK/DataJurusan';
import DataProdi from './pages/magang/Admin/MasterDataK/DataProdi';
import JurnalHarian from './pages/magang/Admin/JurnalHarian/JurnalHarian';
import DetailJurnal from './pages/magang/Admin/JurnalHarian/DetailJurnal';
import LogbookBimbingan from './pages/magang/Admin/LogbookBimbingan/LogbookBimbingan';
import DetailLogbookBimbingan from './pages/magang/Admin/LogbookBimbingan/DetailLogbookBimbingan';
import Pengaturan from './pages/magang/Admin/Pengaturan/Pengaturan';
import LogAktivitas from './pages/magang/Admin/LogAktivitas/LogAktivitas';

// LAYOUT ADMIN MAGANG
function AdminMagangLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Tutup sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 cursor-default bg-slate-900/50 lg:hidden"
        />
      )}

      {/* Sidebar — di mobile: fixed overlay; di desktop: bagian dari flex row */}
      <div
        className={`shrink-0 transition-[width] duration-300 overflow-hidden ${
          sidebarOpen ? 'w-[245px]' : 'w-0'
        } fixed inset-y-0 left-0 z-30 lg:relative lg:inset-auto lg:z-auto`}
      >
        <SidebarAdmin isOpen={sidebarOpen} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto max-w-[1500px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const userRole = sessionStorage.getItem('user-role');
  const path = location.pathname.toLowerCase();

  if (path === '/' || path === '/login') {
    if (userRole === 'mahasiswa') {
      return <Navigate to="/pendaftaran-program" replace />;
    }

    if (userRole === 'admin') {
      return <Navigate to="/admin/magang/dashboard" replace />;
    }

    return <Login />;
  }

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (path === '/pendaftaran-program') {
    return userRole === 'mahasiswa' ? (
      <PendaftaranProgram />
    ) : (
      <Navigate to="/admin/magang/dashboard" replace />
    );
  }

  // ROUTE ADMIN
  if (path.startsWith('/admin')) {
    if (userRole !== 'admin') {
      return <Navigate to="/pendaftaran-program" replace />;
    }

    return (
      <Routes>
        <Route
          path="/admin"
          element={<Navigate to="/admin/magang/dashboard" replace />}
        />
        <Route
          path="/admin/dashboard"
          element={<Navigate to="/admin/magang/dashboard" replace />}
        />

        <Route path="/admin/magang" element={<AdminMagangLayout />}>
          <Route
            index
            element={<Navigate to="/admin/magang/dashboard" replace />}
          />
          <Route path="dashboard" element={<DashboardAdminMagang />} />
          <Route path="periode" element={<PeriodeMagangAdmin />} />
          <Route path="tempat-magang" element={<TempatMagangAdmin />} />
          <Route path="spd" element={<SPDMagangAdmin />} />
          <Route path="pengumuman" element={<PengumumanMagangAdmin />} />
          <Route path="manajemen" element={<ManajemenMagangAdmin />} />
          <Route path="set-mahasiswa" element={<SetMahasiswa />} />
          <Route path="penilaian" element={<PenilaianMagangAdmin />} />

          <Route path="data-user" element={<DataUser />} />
          <Route path="data-dosen" element={<DataDosen />} />
          <Route path="data-mahasiswa" element={<DataMahasiswa />} />
          <Route path="data-mentor" element={<DataMentor />} />
          <Route path="surat" element={<Surat />} />

          <Route path="data-instrumen-nilai/penguji" element={<Penguji />} />
          <Route
            path="data-instrumen-nilai/pemonitor"
            element={<Pemonitor />}
          />
          <Route path="data-instrumen-nilai/mitra" element={<Mitra />} />
          <Route
            path="data-instrumen-nilai/pembimbing"
            element={<Pembimbing />}
          />

          <Route path="data-fakultas" element={<DataFakultas />} />
          <Route path="data-jurusan" element={<DataJurusan />} />
          <Route path="data-prodi" element={<DataProdi />} />

          <Route path="jurnal-harian" element={<JurnalHarian />} />
          <Route path="jurnal-harian/:nim" element={<DetailJurnal />} />

          <Route path="logbook-bimbingan" element={<LogbookBimbingan />} />
          <Route
            path="logbook-bimbingan/:nim"
            element={<DetailLogbookBimbingan />}
          />

          <Route path="pengaturan" element={<Pengaturan />} />
          <Route path="log-aktivitas" element={<LogAktivitas />} />

          <Route
            path="*"
            element={<Navigate to="/admin/magang/dashboard" replace />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/admin/magang/dashboard" replace />}
        />
      </Routes>
    );
  }

  // ROUTE MAHASISWA
  if (
    (path.startsWith('/magang/') ||
      path.startsWith('/kkn/') ||
      path.startsWith('/am/') ||
      path === '/profil') &&
    userRole !== 'mahasiswa'
  ) {
    return <Navigate to="/admin/magang/dashboard" replace />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
      <Sidebar isOpen={false} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={() => {}} />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto max-w-[1500px]">
            <Routes>
              {/* MAHASISWA MAGANG */}
              <Route
                path="/magang/mahasiswa"
                element={<Navigate to="/magang/mahasiswa/dashboard" replace />}
              />
              <Route
                path="/magang/mahasiswa/dashboard"
                element={<DashboardMagangMahasiswa />}
              />
              <Route
                path="/magang/mahasiswa/tempat-magang"
                element={<TempatMagangMahasiswa />}
              />
              <Route
                path="/magang/mahasiswa/pendamping-magang"
                element={<PendampingMagang />}
              />
              <Route
                path="/magang/mahasiswa/dokumen-magang"
                element={<DokumenMagang />}
              />
              <Route
                path="/magang/mahasiswa/jurnal"
                element={<JurnalMagang />}
              />

              {/* MAHASISWA KKN */}
              <Route
                path="/kkn/mahasiswa"
                element={<Navigate to="/kkn/mahasiswa/dashboard" replace />}
              />
              <Route
                path="/kkn/mahasiswa/dashboard"
                element={<DashboardKKNMahasiswa />}
              />
              <Route path="/kkn/mahasiswa/tempat-kkn" element={<TempatKKN />} />
              <Route
                path="/kkn/mahasiswa/pendamping-kkn"
                element={<PendampingKKN />}
              />
              <Route
                path="/kkn/mahasiswa/dokumen-kkn"
                element={<DokumenKKN />}
              />
              <Route path="/kkn/mahasiswa/jurnal" element={<JurnalKKN />} />
              <Route path="/kkn/mahasiswa/blog" element={<BlogKKN />} />
              <Route
                path="/kkn/mahasiswa/penilaian"
                element={<PenilaianKKN />}
              />

              {/* MAHASISWA ASISTENSI MENGAJAR */}
              <Route
                path="/am/mahasiswa"
                element={<Navigate to="/am/mahasiswa/dashboard" replace />}
              />
              <Route
                path="/am/mahasiswa/dashboard"
                element={<DashboardAMMahasiswa />}
              />
              <Route path="/am/mahasiswa/tempat" element={<TempatAM />} />
              <Route
                path="/am/mahasiswa/pendamping"
                element={<PendampingAM />}
              />
              <Route path="/am/mahasiswa/dokumen" element={<DokumenAM />} />
              <Route
                path="/am/mahasiswa/unduh-instrumen"
                element={<UnduhInstrumenAM />}
              />
              <Route path="/am/mahasiswa/jurnal" element={<JurnalHarianAM />} />
              <Route
                path="/am/mahasiswa/link-vicon"
                element={<LinkViconAM />}
              />
              <Route
                path="/am/mahasiswa/ruang-kolaboratif"
                element={<RuangKolaboratifAM />}
              />

              {/* HALAMAN UMUM MAHASISWA */}
              <Route path="/profil" element={<Profil />} />

              <Route
                path="*"
                element={
                  <div className="py-10 text-center text-sm text-slate-500">
                    Halaman tidak ditemukan.
                  </div>
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    </BrowserRouter>
  );
}
