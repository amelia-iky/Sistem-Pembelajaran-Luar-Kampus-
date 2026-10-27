import {
  MapPin,
  CheckCircle2,
  Navigation,
  Phone,
  UserRound,
  Building2,
  Map,
  Maximize,
  Plus,
  Minus,
  LocateFixed,
  ArrowUpRight,
  School,
} from 'lucide-react';

export default function TempatAM() {
  const schoolName = 'SMAN 1 Singaraja';
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=SMAN+1+Singaraja+Bali';

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-6 md:px-8">
      <div className="mb-5">
        <h1 className="text-lg font-bold tracking-tight text-slate-800">
          Informasi Penempatan Asistensi Mengajar
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Informasi sekolah tempat Anda akan melaksanakan program Asistensi
          Mengajar.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-blue-300 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.12)]">
        <div className="flex flex-col gap-4 p-4 md:p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <School size={21} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-slate-800">
                  {schoolName}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Sekolah Mitra Program Asistensi Mengajar
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-600">
              <CheckCircle2 size={12} />
              Penempatan Terkonfirmasi
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.35fr_1fr]">
            <div className="min-w-0">
              <div className="mb-4">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Rincian Sekolah dan Administrasi
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <InfoItem label="Nama Sekolah" value="SMAN 1 Singaraja" />

                <InfoItem label="Kecamatan" value="Buleleng" />

                <InfoItem
                  label="Jenjang Pendidikan"
                  value="Sekolah Menengah Atas"
                />

                <InfoItem
                  label="Nama Kepala Sekolah"
                  value="I Wayan Suardana, S.Pd"
                  detail="NIP: 51050987654321"
                  icon={<UserRound size={12} />}
                />

                <InfoItem
                  label="Telepon / No. HP Sekolah"
                  value="088102456789"
                  icon={<Phone size={12} />}
                />

                <InfoItem
                  label="Lokasi Penempatan"
                  value="Singaraja, Bali"
                  icon={<Navigation size={12} />}
                />
              </div>

              <div className="mt-5">
                <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Alamat Sekolah Mitra
                </h3>

                <div className="flex gap-2 rounded-lg border border-blue-300 bg-slate-50 p-3">
                  <Building2
                    size={15}
                    className="mt-0.5 shrink-0 text-slate-500"
                  />
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    Jl.Pramuka No.4, Banjar Jawa, Kec. Buleleng, Kabupaten
                    Buleleng, Bali 81119. <br />
                    Silakan verifikasi alamat lengkap melalui Google Maps atau
                    pihak sekolah.
                  </p>
                </div>
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Peta Lokasi Sekolah
                </h3>

                <span className="flex items-center gap-1 text-[9px] font-medium text-blue-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Lokasi Sekolah
                </span>
              </div>

              <div className="relative h-[240px] overflow-hidden rounded-lg border border-blue-300 bg-[#e8edf3] shadow-[0_4px_12px_rgba(15,23,42,0.15)]">
                <MapBackground />

                <div className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2">
                  <div className="mb-2 whitespace-nowrap rounded bg-slate-800 px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg">
                    SMAN 1 Singaraja
                  </div>

                  <MapPin
                    size={31}
                    fill="#ef4444"
                    className="mx-auto text-red-600 drop-shadow-md"
                  />
                </div>

                <div className="absolute left-2 top-2 flex flex-col overflow-hidden rounded border border-blue-300 bg-white shadow-lg">
                  <button
                    type="button"
                    aria-label="Perbesar peta"
                    className="border-b border-blue-200 p-2 text-slate-600 hover:bg-slate-50"
                  >
                    <Plus size={14} />
                  </button>

                  <button
                    type="button"
                    aria-label="Perkecil peta"
                    className="p-2 text-slate-600 hover:bg-slate-50"
                  >
                    <Minus size={14} />
                  </button>
                </div>

                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      window.open(mapsUrl, '_blank', 'noopener,noreferrer')
                    }
                    className="flex items-center gap-1 rounded bg-white px-2 py-1.5 text-[10px] text-slate-700 shadow-lg hover:bg-slate-50"
                  >
                    <LocateFixed size={12} />
                    Lihat lokasi
                  </button>

                  <button
                    type="button"
                    aria-label="Buka Google Maps"
                    onClick={() =>
                      window.open(mapsUrl, '_blank', 'noopener,noreferrer')
                    }
                    className="rounded bg-white p-1.5 text-slate-700 shadow-lg hover:bg-slate-50"
                  >
                    <Maximize size={13} />
                  </button>
                </div>

                <div className="absolute bottom-1 left-2 text-[8px] text-slate-500">
                  Peta ilustrasi
                </div>
              </div>

              <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div className="flex items-start gap-1.5 text-[10px] text-slate-500">
                  <MapPin size={12} className="mt-0.5 shrink-0" />
                  <span>Singaraja, Kabupaten Buleleng, Bali</span>
                </div>

                <p className="text-[10px] italic text-slate-400 sm:max-w-[145px]">
                  Lokasi sekolah mitra Asistensi Mengajar
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  window.open(mapsUrl, '_blank', 'noopener,noreferrer')
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-300 bg-white px-4 py-2.5 text-xs font-semibold text-blue-600 shadow-md transition hover:bg-blue-50 hover:shadow-lg"
              >
                <Map size={15} />
                Buka di Google Maps
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <div className="flex items-start gap-1.5">
        {icon && <span className="mt-0.5 shrink-0 text-slate-400">{icon}</span>}

        <div className="min-w-0">
          <p className="break-words text-[11px] font-semibold text-slate-800">
            {value}
          </p>

          {detail && (
            <p className="mt-1 text-[10px] text-slate-500">{detail}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function MapBackground() {
  return (
    <svg
      viewBox="0 0 500 320"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-label="Ilustrasi peta sekolah"
    >
      <rect width="500" height="320" fill="#e8edf3" />

      <path
        d="M-30 35 L530 75 M-20 105 L520 140 M-20 205 L520 180 M20 300 L490 245"
        stroke="#ffffff"
        strokeWidth="8"
        fill="none"
      />

      <path
        d="M80 -20 L110 340 M220 -20 L245 340 M370 -20 L390 340"
        stroke="#ffffff"
        strokeWidth="6"
        fill="none"
      />

      <path
        d="M-20 70 L520 110 M-20 250 L520 210"
        stroke="#d4dce7"
        strokeWidth="1.5"
        fill="none"
      />

      <path
        d="M310 -20 C300 60 330 100 315 160 S350 260 335 340"
        stroke="#8dd9f6"
        strokeWidth="10"
        fill="none"
      />

      <path
        d="M310 -20 C300 60 330 100 315 160 S350 260 335 340"
        stroke="#bceafa"
        strokeWidth="5"
        fill="none"
      />

      <g fill="#d3dde8">
        <rect x="45" y="55" width="48" height="28" rx="4" />
        <rect x="115" y="175" width="62" height="36" rx="4" />
        <rect x="350" y="45" width="45" height="26" rx="4" />
        <rect x="390" y="205" width="70" height="35" rx="4" />
        <rect x="260" y="235" width="45" height="24" rx="4" />
        <rect x="75" y="235" width="36" height="30" rx="4" />
      </g>
    </svg>
  );
}
