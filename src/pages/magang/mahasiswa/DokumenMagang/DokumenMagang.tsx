import { useRef, useState } from 'react';
import {
  FileText,
  Download,
  Upload,
  FileCheck2,
  Trash2,
  Eye,
  Info,
} from 'lucide-react';

type DocumentItem = {
  id: number;
  title: string;
  description: string;
  status: 'Belum diunggah' | 'Sudah diunggah';
  file: File | null;
};

const initialDocuments: DocumentItem[] = [
  {
    id: 1,
    title: 'Surat Izin Orang Tua',
    description: 'Dokumen surat izin dari orang tua/wali mahasiswa.',
    status: 'Belum diunggah',
    file: null,
  },
  {
    id: 2,
    title: 'Proposal Magang',
    description: 'Proposal rencana kegiatan magang selama semester.',
    status: 'Belum diunggah',
    file: null,
  },
  {
    id: 3,
    title: 'Laporan Akhir Magang',
    description: 'Dokumen laporan akhir pelaksanaan magang.',
    status: 'Belum diunggah',
    file: null,
  },
];

export default function DokumenMagang() {
  const [documents, setDocuments] =
    useState<DocumentItem[]>(initialDocuments);

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleUpload = (id: number, file: File | undefined) => {
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    const allowedExtensions = /\.(pdf|doc|docx)$/i;

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.test(file.name)
    ) {
      alert('Format file harus PDF, DOC, atau DOCX.');
      return;
    }

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? { ...doc, file, status: 'Sudah diunggah' }
          : doc,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? { ...doc, file: null, status: 'Belum diunggah' }
          : doc,
      ),
    );
  };

  const handleDownload = (title: string) => {
    alert(`Format ${title} belum dihubungkan dengan file template.`);
  };

  const handleFileDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');

    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Judul Halaman */}
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
            Dokumen Magang
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Unggah dan kelola dokumen magang Anda dengan mudah.
          </p>
        </div>

        {/* Panduan Dokumen */}
        <section className="rounded-xl border border-blue-200 bg-white p-4 shadow-sm md:p-5">
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-bold text-slate-800">
                Panduan Dokumen
              </h2>

              <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-600">
                Terpadu Resmi
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Download format dokumen yang diperlukan sebelum
              mengunggah dokumen magang.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col rounded-lg border border-blue-200 bg-white p-3 shadow-sm"
              >
                <div className="flex items-start gap-2">
                  <div className="rounded-md bg-blue-50 p-2 text-blue-600">
                    <FileText size={17} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-800">
                      {doc.title}
                    </h3>

                    <p className="mt-1 text-[10px] text-slate-500">
                      Format{' '}
                      {doc.title === 'Surat Izin Orang Tua'
                        ? 'Surat Izin Orang Tua (DOCX)'
                        : doc.title === 'Proposal Magang'
                          ? 'Proposal Magang (DOCX)'
                          : 'Laporan Akhir Magang (DOCX)'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownload(doc.title)}
                  className="mt-4 flex items-center justify-center gap-1.5 rounded-md border border-blue-200 px-3 py-2 text-[10px] font-medium text-slate-600 transition hover:bg-blue-50"
                >
                  <Download size={12} />
                  Download Format
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Dokumen Saya */}
        <section className="rounded-xl border border-blue-200 bg-white p-4 shadow-sm md:p-5">
          <div className="mb-5">
            <h2 className="text-sm font-bold text-slate-800">
              Dokumen Saya
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Unggah dan kelola dokumen magang secara mandiri.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {documents.map((doc, index) => (
              <div
                key={doc.id}
                className="flex flex-col rounded-xl border border-blue-200 bg-white p-3 shadow-sm"
              >
                {/* Judul dan Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-800">
                      {doc.title}
                    </h3>

                    <p className="mt-1 text-[10px] leading-4 text-slate-500">
                      {doc.description}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-medium ${
                      doc.file
                        ? 'bg-green-50 text-green-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {doc.file ? 'Sudah diunggah' : 'Belum diunggah'}
                  </span>
                </div>

                {/* Input File */}
                <input
                  ref={(el) => {
                    fileInputRefs.current[index] = el;
                  }}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    handleUpload(doc.id, e.target.files?.[0]);
                    e.target.value = '';
                  }}
                />

                {/* Area Dokumen */}
                {doc.file ? (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/50 p-3">
                    <FileCheck2
                      size={20}
                      className="shrink-0 text-blue-600"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-medium text-slate-700">
                        {doc.file.name}
                      </p>

                      <p className="mt-1 text-[9px] text-slate-500">
                        {(doc.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 flex min-h-28 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/50 p-4 text-center">
                    <Upload size={19} className="text-slate-400" />

                    <p className="mt-2 text-[10px] font-medium text-slate-600">
                      Berkas belum tersedia
                    </p>

                    <p className="mt-1 text-[9px] text-slate-400">
                      Format PDF, DOC, atau DOCX
                    </p>
                  </div>
                )}

                {/* Keterangan Laporan Akhir */}
                {doc.id === 3 && (
                  <div className="mt-3 flex gap-2 rounded-lg bg-orange-50 p-2.5">
                    <Info
                      size={13}
                      className="mt-0.5 shrink-0 text-orange-500"
                    />

                    <p className="text-[9px] leading-4 text-orange-700">
                      Dapat diunggah menjelang akhir masa magang
                      setelah seluruh logbook dan evaluasi lapangan
                      diselesaikan.
                    </p>
                  </div>
                )}

                {/* Tombol Aksi */}
                <div className="mt-auto pt-4">
                  {doc.file ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleFileDownload(doc.file!)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-md border border-blue-200 px-2 py-2 text-[10px] font-medium text-slate-600 hover:bg-blue-50"
                      >
                        <Eye size={12} />
                        Unduh
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(doc.id)}
                        className="flex items-center justify-center rounded-md border border-red-200 px-3 py-2 text-red-500 hover:bg-red-50"
                        aria-label="Hapus dokumen"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[index]?.click()}
                      className="flex w-full items-center justify-center gap-1.5 rounded-md border border-blue-200 px-3 py-2 text-[10px] font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                      <Upload size={12} />
                      Upload Dokumen
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
