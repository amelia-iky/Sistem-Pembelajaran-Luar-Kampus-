import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
  useOutletContext,
} from 'react-router-dom';

import Sidebar from './components/layout/sidebar';
import SidebarAdmin from './components/layout/admin/sidebaradmin';
import Header from './components/layout/header';
import { ProfileProvider } from './context/ProfileContext';

import Login from './pages/Login/Login';

// ======================================================
// MAHASISWA - MAGANG
// ======================================================

import DashboardMagangMahasiswa from './pages/magang/mahasiswa/Dashboard/Dashboard';
import TempatMagangMahasiswa from './pages/magang/mahasiswa/TempatMagang/TempatMagang';
import PendampingMagang from './pages/magang/mahasiswa/PendampingMagang/PendampingMagang';
import DokumenMagang from './pages/magang/mahasiswa/DokumenMagang/DokumenMagang';
import JurnalMagang from './pages/magang/mahasiswa/Jurnal/JurnalMagang';

// ======================================================
// MAHASISWA - KKN
// ======================================================

import DashboardKKNMahasiswa from './pages/KKN/mahasiswa/DashboardKKN/Dashboard';
import TempatKKN from './pages/KKN/mahasiswa/TempatKKN/TempatKKN';
import PendampingKKN from './pages/KKN/mahasiswa/PendampingKKN/PendampingKKN';
import DokumenKKN from './pages/KKN/mahasiswa/DokumenKKN/DokumenKKN';
import JurnalKKN from './pages/KKN/mahasiswa/JurnalKKN/JurnalKKN';
import BlogKKN from './pages/KKN/mahasiswa/BlogKKN/BlogKKN';
import PenilaianKKN from './pages/KKN/mahasiswa/PenilaianKKN/PenilaianKKN';

// ======================================================
// MAHASISWA - ASISTENSI MENGAJAR
// ======================================================

import DashboardAMMahasiswa from './pages/AM/mahasiswa/DashboardAM/DashboardAM';
import TempatAM from './pages/AM/mahasiswa/TempatAM/TempatAM';
import PendampingAM from './pages/AM/mahasiswa/PendampingAM/PendampingAM';
import DokumenAM from './pages/AM/mahasiswa/DokumenAM/DokumenAM';
import JurnalHarianAM from './pages/AM/mahasiswa/JurnalHarianAM/JurnalHarianAM';
import UnduhInstrumenAM from './pages/AM/mahasiswa/UnduhInstrumenAM/UnduhInstrumenAM';
import LinkViconAM from './pages/AM/mahasiswa/LinkViconAM/LinkViconAM';
import RuangKolaboratifAM from './pages/AM/mahasiswa/RuangKolaboratifAM/RuangKolaboratifAM';

// ======================================================
// HALAMAN UMUM MAHASISWA
// ======================================================

import PendaftaranProgram from './pages/PendaftaranProgram/PendaftaranProgram';
import Profil from './pages/Profil/Profiuser';

// ======================================================
// ADMIN - MAGANG
// ======================================================

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

// ======================================================
// ADMIN - KKN
// ======================================================

import Dashboard from './pages/KKN/Admin/Dashboard/Dashboard';
import Periode from './pages/KKN/Admin/Periode/Periode';
import TambahPeriode from './pages/KKN/Admin/Periode/TambahPeriode';
import DetailPeriode from './pages/KKN/Admin/Periode/DetailPeriode';
import PengumumanKKN from './pages/KKN/Admin/Pengumuman/Pengumuman';

import LayoutDesa from './pages/KKN/Admin/Periode/DetailDesa/LayoutDesa';
import DetailDesa from './pages/KKN/Admin/Periode/DetailDesa/DetailDesa';
import Pemetaanprodi from './pages/KKN/Admin/Periode/DetailDesa/Pemetaanprodi';
import Peserta from './pages/KKN/Admin/Periode/DetailDesa/Peserta';
import Blog from './pages/KKN/Admin/Periode/DetailDesa/Blog';
import DokumenKelompokDesa from './pages/KKN/Admin/Periode/DetailDesa/DokumenKelompok';
import BuktiKunjungan from './pages/KKN/Admin/Periode/DetailDesa/BuktiKunjungan';
import Nilai from './pages/KKN/Admin/Periode/DetailDesa/Nilai';

import type { DesaRouteContext } from './pages/KKN/Admin/Periode/DetailDesa/DesaContext';

import RunningText from './pages/KKN/Admin/RunningText/RunningText';
import Dosen from './pages/KKN/Admin/Dosen/Dosen';
import Mahasiswa from './pages/KKN/Admin/Mahasiswa/Mahasiswa';
import Pengguna from './pages/KKN/Admin/Pengguna/Pengguna';
import Kabupaten from './pages/KKN/Admin/Lokasi/Kabupaten';
import Kecamatan from './pages/KKN/Admin/Lokasi/Kecamatan';
import DesaKelurahan from './pages/KKN/Admin/Lokasi/DesaKelurahan';

// ======================================================
// ADMIN - ASISTENSI MENGAJAR
// ======================================================

import UserAM from './pages/AM/Admin/User/User';
import AdminUser from './pages/AM/Admin/User/Admin';
import MahasiswaAM from './pages/AM/Admin/User/Mahasisswa';
import DosenAM from './pages/AM/Admin/User/Dossen';
import GuruAM from './pages/AM/Admin/User/Guru';

import MasterData from './pages/AM/Admin/MasterData/Masterdataa';
import Fakultas from './pages/AM/Admin/MasterData/Fakultas';
import Jurusan from './pages/AM/Admin/MasterData/Jurusan';
import Prodi from './pages/AM/Admin/MasterData/Prodi';

// ======================================================
// ROUTE PENDUKUNG HALAMAN DESA KKN
// ======================================================

function PemetaanProdiRoute() {
  const context = useOutletContext<DesaRouteContext>();

  return (
    <Pemetaanprodi
      periodeId={context.periodeId}
      desaId={context.desaId}
      namaDesa={context.namaDesa}
    />
  );
}

function PesertaRoute() {
  const context = useOutletContext<DesaRouteContext>();

  return (
    <Peserta
      periodeId={context.periodeId}
      desaId={context.desaId}
      namaDesa={context.namaDesa}
    />
  );
}

function BlogRoute() {
  const context = useOutletContext<DesaRouteContext>();

  return (
    <Blog
      periodeId={context.periodeId}
      desaId={context.desaId}
      namaDesa={context.namaDesa}
    />
  );
}

function DokumenKelompokDesaRoute() {
  const context = useOutletContext<DesaRouteContext>();

  return (
    <DokumenKelompokDesa
      periodeId={context.periodeId}
      desaId={context.desaId}
      namaDesa={context.namaDesa}
    />
  );
}

function BuktiKunjunganRoute() {
  const context = useOutletContext<DesaRouteContext>();

  return (
    <BuktiKunjungan
      periodeId={context.periodeId}
      desaId={context.desaId}
      namaDesa={context.namaDesa}
    />
  );
}

function NilaiRoute() {
  const context = useOutletContext<DesaRouteContext>();

  return (
    <Nilai
      periodeId={context.periodeId}
      desaId={context.desaId}
      namaDesa={context.namaDesa}
    />
  );
}

// ======================================================
// LAYOUT ADMIN
// ======================================================

type AdminLayoutProps = {
  program: 'magang' | 'kkn' | 'am';
};

function AdminLayout({ program }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Tutup sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 cursor-default bg-slate-900/50 lg:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 w-[245px] shrink-0 overflow-hidden transition-transform duration-300 lg:relative lg:inset-auto lg:z-auto lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarAdmin isOpen={sidebarOpen} program={program} />
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

function AdminMagangLayout() {
  return <AdminLayout program="magang" />;
}

function AdminKKNLayout() {
  return <AdminLayout program="kkn" />;
}

function AdminAMLayout() {
  return <AdminLayout program="am" />;
}

// ======================================================
// HALAMAN SEMENTARA ADMIN AM
// ======================================================

function AMPagePlaceholder() {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-8">
      <h1 className="text-lg font-semibold text-[#093060]">
        Halaman Asistensi Mengajar
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Halaman ini belum dihubungkan dengan komponen frontend.
      </p>
    </div>
  );
}

// ======================================================
// KONTROL AKSES DAN ROUTING UTAMA
// ======================================================

function AppContent() {
  const location = useLocation();

  const userRole = sessionStorage.getItem('user-role');
  const adminProgram = sessionStorage.getItem('admin-program');
  const path = location.pathname.toLowerCase();

  const isAdminProgramValid =
    adminProgram === 'magang' ||
    adminProgram === 'kkn' ||
    adminProgram === 'am';

  const adminDashboard =
    adminProgram === 'kkn'
      ? '/admin/kkn/dashboard'
      : adminProgram === 'am'
        ? '/admin/am/dashboard'
        : '/admin/magang/dashboard';

  // ====================================================
  // LOGIN DAN HALAMAN AWAL
  // ====================================================

  if (path === '/' || path === '/login') {
    if (userRole === 'mahasiswa') {
      return <Navigate to="/pendaftaran-program" replace />;
    }

    if (userRole === 'admin' && isAdminProgramValid) {
      return <Navigate to={adminDashboard} replace />;
    }

    return <Login />;
  }

  // ====================================================
  // PENDAFTARAN PROGRAM MAHASISWA
  // ====================================================

  if (path === '/pendaftaran-program') {
    return userRole === 'mahasiswa' ? (
      <PendaftaranProgram />
    ) : (
      <Navigate
        to={
          userRole === 'admin' && isAdminProgramValid
            ? adminDashboard
            : '/login'
        }
        replace
      />
    );
  }

  // ====================================================
  // ROUTING ADMIN
  // ====================================================

  if (path.startsWith('/admin')) {
    if (userRole !== 'admin') {
      return <Navigate to="/login" replace />;
    }

    if (!isAdminProgramValid) {
      sessionStorage.removeItem('user-role');
      sessionStorage.removeItem('user-email');
      sessionStorage.removeItem('admin-program');

      return <Navigate to="/login" replace />;
    }

    // Admin hanya boleh mengakses programnya sendiri.
    if (adminProgram === 'magang' && !path.startsWith('/admin/magang')) {
      return <Navigate to="/admin/magang/dashboard" replace />;
    }

    if (adminProgram === 'kkn' && !path.startsWith('/admin/kkn')) {
      return <Navigate to="/admin/kkn/dashboard" replace />;
    }

    if (adminProgram === 'am' && !path.startsWith('/admin/am')) {
      return <Navigate to="/admin/am/dashboard" replace />;
    }

    return (
      <Routes>
        {/* ============================================== */}
        {/* ADMIN MAGANG */}
        {/* ============================================== */}

        <Route path="/admin/magang" element={<AdminMagangLayout />}>
          <Route
            index
            element={<Navigate to="/admin/magang/dashboard" replace />}
          />

          <Route path="dashboard" element={<DashboardAdminMagang />} />
          <Route path="periode" element={<PeriodeMagangAdmin />} />

          <Route path="tempat-magang" element={<TempatMagangAdmin />} />
          <Route path="manajemen" element={<ManajemenMagangAdmin />} />
          <Route path="set-mahasiswa" element={<SetMahasiswa />} />

          <Route path="penilaian" element={<PenilaianMagangAdmin />} />
          <Route path="spd" element={<SPDMagangAdmin />} />
          <Route path="pengumuman" element={<PengumumanMagangAdmin />} />

          <Route path="data-user" element={<DataUser />} />
          <Route path="data-dosen" element={<DataDosen />} />
          <Route path="data-mahasiswa" element={<DataMahasiswa />} />
          <Route path="data-mentor" element={<DataMentor />} />

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

          <Route path="surat" element={<Surat />} />

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

        {/* ============================================== */}
        {/* ADMIN KKN */}
        {/* ============================================== */}

        <Route path="/admin/kkn" element={<AdminKKNLayout />}>
          <Route
            index
            element={<Navigate to="/admin/kkn/dashboard" replace />}
          />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="periode" element={<Periode />} />
          <Route path="periode/tambah" element={<TambahPeriode />} />
          <Route path="periode/:id" element={<DetailPeriode />} />

          <Route path="pengumuman" element={<PengumumanKKN />} />
          <Route path="running-text" element={<RunningText />} />
          <Route path="dosen" element={<Dosen />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="pengguna" element={<Pengguna />} />

          <Route path="lokasi-kkn/kabupaten" element={<Kabupaten />} />
          <Route path="lokasi-kkn/kecamatan" element={<Kecamatan />} />
          <Route path="lokasi-kkn/desa" element={<DesaKelurahan />} />

          <Route path="periode/:id/desa/:desaId" element={<LayoutDesa />}>
            <Route index element={<DetailDesa />} />
            <Route path="pemetaan-prodi" element={<PemetaanProdiRoute />} />
            <Route path="peserta" element={<PesertaRoute />} />
            <Route path="blog" element={<BlogRoute />} />
            <Route
              path="dokumen-kelompok"
              element={<DokumenKelompokDesaRoute />}
            />
            <Route path="bukti-kunjungan" element={<BuktiKunjunganRoute />} />
            <Route path="nilai" element={<NilaiRoute />} />
          </Route>

          <Route
            path="*"
            element={<Navigate to="/admin/kkn/dashboard" replace />}
          />
        </Route>

        {/* ============================================== */}
        {/* ADMIN ASISTENSI MENGAJAR */}
        {/* ============================================== */}

        <Route path="/admin/am" element={<AdminAMLayout />}>
          <Route
            index
            element={<Navigate to="/admin/am/dashboard" replace />}
          />

          <Route path="dashboard" element={<Dashboard />} />

          {/* MASTER DATA USER */}
          <Route path="user" element={<UserAM />}>
            <Route index element={<Navigate to="admin" replace />} />
            <Route path="admin" element={<AdminUser />} />
            <Route path="mahasiswa" element={<MahasiswaAM />} />
            <Route path="dosen" element={<DosenAM />} />
            <Route path="guru" element={<GuruAM />} />
          </Route>

          {/* MASTER DATA */}
          <Route path="master-data" element={<MasterData />}>
            <Route index element={<Navigate to="fakultas" replace />} />
            <Route path="fakultas" element={<Fakultas />} />
            <Route path="jurusan" element={<Jurusan />} />
            <Route path="prodi" element={<Prodi />} />
          </Route>

          {/* DATA SEKOLAH */}
          <Route path="kabupaten" element={<AMPagePlaceholder />} />
          <Route path="kecamatan" element={<AMPagePlaceholder />} />
          <Route path="sekolah" element={<AMPagePlaceholder />} />

          {/* HALAMAN UMUM AM */}
          <Route path="pengumuman" element={<AMPagePlaceholder />} />
          <Route path="log-aktivitas" element={<AMPagePlaceholder />} />

          {/* PPL DALAM NEGERI */}
          <Route
            path="ppl-dalam-negeri/jenis-asistensi"
            element={<AMPagePlaceholder />}
          />
          <Route
            path="ppl-dalam-negeri/prasyarat"
            element={<AMPagePlaceholder />}
          />
          <Route
            path="ppl-dalam-negeri/jenis-berkas"
            element={<AMPagePlaceholder />}
          />
          <Route path="ppl-dalam-negeri/spd" element={<AMPagePlaceholder />} />
          <Route
            path="ppl-dalam-negeri/periode"
            element={<AMPagePlaceholder />}
          />
          <Route
            path="ppl-dalam-negeri/pemetaan-sekolah"
            element={<AMPagePlaceholder />}
          />
          <Route
            path="ppl-dalam-negeri/instrumen-penilaian"
            element={<AMPagePlaceholder />}
          />

          <Route
            path="*"
            element={<Navigate to="/admin/am/dashboard" replace />}
          />
        </Route>

        {/* REDIRECT ADMIN */}
        {/* ============================================== */}

        <Route
          path="/admin"
          element={<Navigate to={adminDashboard} replace />}
        />

        <Route
          path="/admin/dashboard"
          element={<Navigate to={adminDashboard} replace />}
        />

        <Route path="*" element={<Navigate to={adminDashboard} replace />} />
      </Routes>
    );
  }

  // ====================================================
  // ADMIN TIDAK BOLEH MENGAKSES HALAMAN MAHASISWA
  // ====================================================

  if (
    userRole === 'admin' &&
    (path.startsWith('/magang/') ||
      path.startsWith('/kkn/') ||
      path.startsWith('/am/') ||
      path === '/profil')
  ) {
    return <Navigate to={adminDashboard} replace />;
  }

  if (userRole !== 'mahasiswa') {
    return <Navigate to="/login" replace />;
  }

  // ====================================================
  // LAYOUT DAN ROUTING MAHASISWA
  // ====================================================

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F8FAFC]">
      <Sidebar isOpen={false} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={() => {}} />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto max-w-[1500px]">
            <Routes>
              {/* ========================================== */}
              {/* MAHASISWA MAGANG */}
              {/* ========================================== */}

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

              {/* ========================================== */}
              {/* MAHASISWA KKN */}
              {/* ========================================== */}

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

              {/* ========================================== */}
              {/* MAHASISWA ASISTENSI MENGAJAR */}
              {/* ========================================== */}

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

              {/* ========================================== */}
              {/* HALAMAN UMUM MAHASISWA */}
              {/* ========================================== */}

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

// ======================================================
// APP UTAMA
// ======================================================

export default function App() {
  return (
    <BrowserRouter>
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    </BrowserRouter>
  );
}
