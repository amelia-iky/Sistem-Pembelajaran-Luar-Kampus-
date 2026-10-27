import { useState } from 'react';
import {
  Search,
  Plus,
  MapPin,
  BriefcaseBusiness,
  Users,
  Building2,
  CheckCircle2,
  ChevronDown,
  X,
  Pencil,
  Check,
} from 'lucide-react';

interface InternshipPlace {
  id: number;
  name: string;
  location: string;
  field: string;
  quota: number;
  filled: number;
  address?: string;
  website?: string;
  description?: string;
  status?: 'tersedia' | 'menunggu';
}

const initialPlaces: InternshipPlace[] = [
  {
    id: 1,
    name: 'PT. Teknologi Nusantara',
    location: 'Denpasar, Bali',
    field: 'Teknologi Informasi',
    quota: 10,
    filled: 5,
    address: 'Jl. Teknologi No. 10, Denpasar, Bali',
    status: 'tersedia',
  },
  {
    id: 2,
    name: 'Dinas Komunikasi dan Informatika',
    location: 'Singaraja, Bali',
    field: 'Teknologi Informasi',
    quota: 10,
    filled: 8,
    address: '',
    status: 'tersedia',
  },
  {
    id: 3,
    name: 'PT. Bali Digital Solution',
    location: 'Badung, Bali',
    field: 'Software Development',
    quota: 5,
    filled: 3,
    address: '',
    status: 'tersedia',
  },
];

export default function TempatMagang() {
  const [places, setPlaces] = useState<InternshipPlace[]>(initialPlaces);
  const [selectedPlace, setSelectedPlace] = useState<InternshipPlace | null>(
    null,
  );
  const [fixedPlace, setFixedPlace] = useState<InternshipPlace | null>(null);
  const [modal, setModal] = useState<'add' | 'select' | 'edit' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    field: '',
    website: '',
    description: '',
  });

  // Filter berdasarkan nama, lokasi, dan bidang instansi
  const filteredPlaces = places.filter((place) => {
    const keyword = searchTerm.toLowerCase().trim();

    return (
      place.name.toLowerCase().includes(keyword) ||
      place.location.toLowerCase().includes(keyword) ||
      place.field.toLowerCase().includes(keyword)
    );
  });

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      field: '',
      website: '',
      description: '',
    });
  };

  const openAddModal = () => {
    resetForm();
    setModal('add');
  };

  const openEditModal = () => {
    if (!fixedPlace) return;

    setFormData({
      name: fixedPlace.name,
      address: fixedPlace.address || '',
      city: fixedPlace.location,
      field: fixedPlace.field,
      website: fixedPlace.website || '',
      description: fixedPlace.description || '',
    });

    setModal('edit');
  };

  const handleSelectPlace = (place: InternshipPlace) => {
    setSelectedPlace(place);
    setModal('select');
  };

  const handleAddPlace = () => {
    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.field.trim()
    ) {
      alert(
        'Nama instansi, alamat, kota/kabupaten, dan bidang instansi wajib diisi.',
      );
      return;
    }

    const newPlace: InternshipPlace = {
      id: Date.now(),
      name: formData.name.trim(),
      location: formData.city.trim(),
      field: formData.field.trim(),
      quota: 5,
      filled: 0,
      address: formData.address.trim(),
      website: formData.website.trim(),
      description: formData.description.trim(),
      status: 'tersedia',
    };

    // Tempat baru langsung muncul di urutan paling atas
    setPlaces((prev) => [newPlace, ...prev]);
    setSearchTerm('');
    setModal(null);
    resetForm();
  };

  const handleFixPlace = () => {
    if (!selectedPlace) return;

    const fixed: InternshipPlace = {
      ...selectedPlace,
      status: 'menunggu',
    };

    setFixedPlace(fixed);
    setPlaces((prev) =>
      prev.map((place) => (place.id === fixed.id ? fixed : place)),
    );
    setSelectedPlace(null);
    setModal(null);
  };

  const handleEditPlace = () => {
    if (!fixedPlace) return;

    const updatedPlace: InternshipPlace = {
      ...fixedPlace,
      name: formData.name.trim(),
      location: formData.city.trim(),
      field: formData.field.trim(),
      address: formData.address.trim(),
      website: formData.website.trim(),
      description: formData.description.trim(),
      status: 'menunggu',
    };

    setPlaces((prev) =>
      prev.map((place) => (place.id === fixedPlace.id ? updatedPlace : place)),
    );
    setFixedPlace(updatedPlace);
    setModal(null);
  };

  const renderFormFields = () => (
    <div className="mt-5 space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-700">
          Nama Instansi <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Masukkan nama instansi"
          className="h-10 w-full rounded-lg border border-slate-200 px-3.5 text-xs outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-700">
          Alamat Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Masukkan alamat lengkap instansi"
          className="h-10 w-full rounded-lg border border-slate-200 px-3.5 text-xs outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">
            Kota/Kabupaten <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Masukkan kota/kabupaten"
            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700">
            Bidang Instansi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.field}
            onChange={(e) =>
              setFormData({ ...formData, field: e.target.value })
            }
            placeholder="Masukkan bidang instansi"
            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-700">
          Website
        </label>
        <input
          type="text"
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
          placeholder="https://website.com"
          className="h-10 w-full rounded-lg border border-slate-200 px-3.5 text-xs outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="border-t border-slate-100 pt-5">
        <h3 className="text-xs font-bold tracking-wide text-slate-700">
          INFORMASI TAMBAHAN
        </h3>
        <p className="mt-1 text-[11px] text-slate-400">
          Tambahkan informasi tambahan apabila diperlukan.
        </p>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-slate-700">
          Keterangan
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Tuliskan informasi tambahan apabila diperlukan..."
          className="w-full resize-none rounded-lg border border-slate-200 px-3.5 py-3 text-xs outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>
    </div>
  );

  const renderFormModal = (isEdit: boolean) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="flex max-h-[90vh] w-full max-w-[600px] flex-col overflow-hidden rounded-2xl border border-blue-300 bg-white shadow-2xl">
        <div className="flex shrink-0 items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              {isEdit ? 'Ubah Data Tempat Magang' : 'Tambah Tempat Magang'}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              {isEdit
                ? 'Perbarui data tempat Magang Anda.'
                : 'Lengkapi data instansi untuk mengajukan tempat Magang baru.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setModal(null)}
            aria-label="Tutup modal"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <h3 className="text-xs font-bold tracking-wide text-slate-700">
            DATA TEMPAT MAGANG
          </h3>
          <p className="mt-1 text-[11px] text-slate-400">
            Masukkan informasi instansi tempat Anda akan melaksanakan Magang.
          </p>
          {renderFormFields()}
        </div>

        <div className="flex shrink-0 justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={() => setModal(null)}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={isEdit ? handleEditPlace : handleAddPlace}
            className="flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1D4ED8]"
          >
            <Check size={17} strokeWidth={2.5} />
            Simpan Data
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
          Tempat Magang
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Cari atau tambahkan tempat pelaksanaan program Magang Anda.
        </p>
      </div>

      {fixedPlace ? (
        <div className="rounded-xl border border-blue-300 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Building2 size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {fixedPlace.name}
                </h2>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={14} />
                  <span>{fixedPlace.location}</span>
                </div>
              </div>
            </div>

            <span className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-600">
              <CheckCircle2 size={14} />
              Menunggu Validasi
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 border-t border-slate-100 pt-5 sm:grid-cols-2">
            <div>
              <p className="text-xs text-slate-400">Alamat Instansi</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {fixedPlace.address || '-'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Bidang Instansi</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {fixedPlace.field}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Periode Magang</p>
              <p className="mt-1 text-sm font-medium text-slate-700">
                24 Juli 2026 - 31 Desember 2026
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Status Validasi</p>
              <p className="mt-1 text-sm font-medium text-orange-600">
                Menunggu Validasi Operator
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={openEditModal}
              className="flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#1D4ED8]"
            >
              <Pencil size={15} />
              Ubah Data
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* SEARCH DAN TAMBAH */}
          <div className="rounded-xl border border-blue-300 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari nama instansi, lokasi, atau bidang..."
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="button"
                onClick={openAddModal}
                className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1D4ED8]"
              >
                <Plus size={17} />
                Tambah Tempat Magang
              </button>
            </div>
            <p className="mt-2.5 text-xs text-slate-400">
              Temukan tempat Magang yang tersedia atau tambahkan tempat baru
              jika belum terdaftar.
            </p>
          </div>

          {/* JUDUL DAFTAR */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Tempat Magang Tersedia
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Daftar instansi yang tersedia untuk program Magang.
              </p>
            </div>
            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"
            >
              Semua Lokasi
              <ChevronDown size={14} />
            </button>
          </div>

          {/* HASIL PENCARIAN */}
          <div className="space-y-3">
            {filteredPlaces.length === 0 ? (
              <div className="rounded-xl border border-blue-300 bg-white px-5 py-10 text-center">
                <Search className="mx-auto mb-3 text-slate-300" size={30} />
                <p className="text-sm font-medium text-slate-700">
                  Tempat magang tidak ditemukan
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Coba gunakan kata kunci nama instansi, lokasi, atau bidang
                  lainnya.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  Hapus pencarian
                </button>
              </div>
            ) : (
              filteredPlaces.map((place) => {
                const percentage = Math.round(
                  (place.filled / place.quota) * 100,
                );
                const isSelected = selectedPlace?.id === place.id;

                return (
                  <div
                    key={place.id}
                    className={`flex flex-col gap-4 rounded-xl border bg-white px-5 py-4 shadow-sm transition sm:flex-row sm:items-center ${
                      isSelected
                        ? 'border-blue-500 ring-2 ring-blue-100'
                        : 'border-blue-300 hover:border-blue-500 hover:shadow-md'
                    }`}
                  >
                    <button
                      type="button"
                      aria-label={`Pilih ${place.name}`}
                      onClick={() => setSelectedPlace(place)}
                      className={`flex h-5 w-5 shrink-0 items-center justify-center self-start rounded-full border-2 sm:self-auto ${
                        isSelected ? 'border-blue-600' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                      )}
                    </button>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <Building2 size={21} className="text-blue-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-slate-800">
                        {place.name}
                      </h3>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          {place.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BriefcaseBusiness size={13} />
                          {place.field}
                        </span>
                      </div>

                      <div className="mt-2.5 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Users size={13} />
                          Kuota: {place.filled} / {place.quota} mahasiswa
                        </span>
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
                      <span className="flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1.5 text-xs font-medium text-green-600">
                        <CheckCircle2 size={12} />
                        Tersedia
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelectPlace(place)}
                        className="rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Pilih
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* MODAL TAMBAH */}
      {modal === 'add' && renderFormModal(false)}

      {/* MODAL UBAH */}
      {modal === 'edit' && fixedPlace && renderFormModal(true)}

      {/* MODAL PILIH TEMPAT */}
      {modal === 'select' && selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
          <div className="w-full max-w-lg rounded-2xl border border-blue-300 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Pilih Tempat Magang
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Pastikan tempat magang yang dipilih sudah sesuai.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModal(null)}
                aria-label="Tutup modal"
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="rounded-xl border border-blue-300 bg-blue-50/50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white">
                    <Building2 size={21} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      {selectedPlace.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {selectedPlace.location}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {selectedPlace.field}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                Dengan menyimpan pilihan ini, tempat magang akan ditetapkan
                sebagai tempat magang Anda dan menunggu validasi operator.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleFixPlace}
                className="flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1D4ED8]"
              >
                <Check size={17} strokeWidth={2.5} />
                Simpan Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
