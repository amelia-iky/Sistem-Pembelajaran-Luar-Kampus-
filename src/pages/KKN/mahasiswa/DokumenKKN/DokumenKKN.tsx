import {
  FileText,
  Upload,
  Eye,
  Download,
  Pencil,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { useRef, useState } from 'react';

interface DocumentData {
  id: number;
  title: string;
  description: string;
  status: 'Belum diunggah' | 'Sudah diunggah';
  fileName?: string;
  fileSize?: string;
  uploadedAt?: string;
}

export default function DokumenKKN() {
  const [documents, setDocuments] = useState<DocumentData[]>([
    {
      id: 1,
      title: 'Unggah Proker',
      description:
        'Dokumen surat izin dari orang tua/wali mahasiswa untuk pelaksanaan KKN di instansi tujuan.',
      status: 'Belum diunggah',
    },
    {
      id: 2,
      title: 'Laporan Individu',
      description: 'Proposal rencana kegiatan individu selama pelaksanaan KKN.',
      status: 'Sudah diunggah',
      fileName: 'Proposal_KKN_Amelia.pdf',
      fileSize: '3.2 MB',
      uploadedAt: '12 Okt 2026, 10:45 WITA',
    },
    {
      id: 3,
      title: 'Laporan Kelompok',
      description:
        'Dokumen laporan akhir pelaksanaan KKN yang telah disetujui mentor lapangan dan dosen pembimbing.',
      status: 'Belum diunggah',
    },
  ]);

  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);
  const [previewDocument, setPreviewDocument] = useState<number | null>(null);
  const [notice, setNotice] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file?: File) => {
    if (!file || selectedDocument === null) return;

    const sizeInMB = file.size / (1024 * 1024);

    if (sizeInMB > 10) {
      setNotice('Ukuran file maksimal 10 MB.');
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (
      !allowedTypes.includes(file.type) &&
      !/\.(pdf|doc|docx)$/i.test(file.name)
    ) {
      setNotice('Format file harus PDF, DOC, atau DOCX.');
      return;
    }

    setDocuments((current) =>
      current.map((document) =>
        document.id === selectedDocument
          ? {
              ...document,
              status: 'Sudah diunggah',
              fileName: file.name,
              fileSize:
                sizeInMB < 1
                  ? `${Math.max(1, Math.round(file.size / 1024))} KB`
                  : `${sizeInMB.toFixed(1)} MB`,
              uploadedAt:
                new Date().toLocaleString('id-ID', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Makassar',
                }) + ' WITA',
            }
          : document,
      ),
    );

    setNotice('Dokumen berhasil ditambahkan.');
    setSelectedDocument(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id: number) => {
    setDocuments((current) =>
      current.map((document) =>
        document.id === id
          ? {
              ...document,
              status: 'Belum diunggah',
              fileName: undefined,
              fileSize: undefined,
              uploadedAt: undefined,
            }
          : document,
      ),
    );

    setNotice('Dokumen berhasil dihapus.');
  };

  const uploadedCount = documents.filter(
    (document) => document.status === 'Sudah diunggah',
  ).length;

  return (
    <div className="min-h-full w-full bg-white px-6 py-6 md:px-8">
      <div className="mb-6">
        <h1 className="text-lg font-bold tracking-tight text-slate-800">
          Dokumen KKN
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Kelola dokumen yang diperlukan selama program KKN.
        </p>
      </div>

      <section className="rounded-xl border border-blue-300 bg-white p-4 shadow-[0_4px_10px_rgba(15,23,42,0.18)] md:p-5">
        <div className="mb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-slate-800">Dokumen Saya</h2>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-medium text-blue-600">
              {uploadedCount} dari {documents.length} dokumen diunggah
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-500">
            Unggah dan kelola dokumen KKN Anda secara mandiri.
          </p>
        </div>

        {notice && (
          <div
            className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-700"
            role="status"
          >
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice('')}
              className="font-semibold"
            >
              Tutup
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
          {documents.map((document) => {
            const uploaded = document.status === 'Sudah diunggah';

            return (
              <article
                key={document.id}
                className="flex min-w-0 flex-col rounded-xl border border-blue-300 bg-white p-3 shadow-[0_3px_6px_rgba(15,23,42,0.16)] transition-shadow hover:shadow-[0_5px_12px_rgba(15,23,42,0.20)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xs font-bold text-slate-800">
                    {document.title}
                  </h3>

                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-medium ${
                      uploaded
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {uploaded ? 'Sudah diunggah' : 'Belum diunggah'}
                  </span>
                </div>

                <p className="mt-2 min-h-[42px] text-[10px] leading-relaxed text-slate-500">
                  {document.description}
                </p>

                {uploaded ? (
                  <div className="mt-3 flex min-w-0 items-center gap-2 rounded-lg border border-blue-100 bg-blue-50/50 p-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-50 text-red-500">
                      <FileText size={16} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-semibold text-slate-700">
                        {document.fileName}
                      </p>
                      <p className="mt-1 text-[9px] text-slate-400">
                        {document.fileSize} • {document.uploadedAt}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 flex min-h-[100px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/50 px-3 py-4 text-center">
                    <Upload size={19} className="text-slate-400" />
                    <p className="mt-2 text-[10px] text-slate-500">
                      Berkas belum tersedia
                    </p>
                    <p className="mt-1 text-[9px] text-slate-400">
                      Format PDF, DOC, DOCX • Maks. 10 MB
                    </p>
                  </div>
                )}

                {document.id === 3 && !uploaded && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-2.5">
                    <AlertCircle
                      size={13}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />
                    <p className="text-[9px] leading-relaxed text-amber-700">
                      Dapat diunggah menjelang akhir masa magang setelah seluruh
                      logbook dan evaluasi lapangan diselesaikan.
                    </p>
                  </div>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
                  {uploaded && (
                    <>
                      <button
                        type="button"
                        onClick={() => setPreviewDocument(document.id)}
                        className="flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1.5 text-[10px] text-slate-600 hover:bg-slate-50"
                      >
                        <Eye size={11} />
                        Lihat
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setNotice(
                            'File contoh ini hanya tersimpan pada status tampilan. Unggah ulang file untuk mengunduh dokumen aslinya.',
                          );
                        }}
                        className="flex items-center gap-1 rounded-full border border-slate-200 px-2.5 py-1.5 text-[10px] text-slate-600 hover:bg-slate-50"
                      >
                        <Download size={11} />
                        Unduh
                      </button>

                      <div className="flex-1" />

                      <button
                        type="button"
                        aria-label="Ubah dokumen"
                        onClick={() => {
                          setSelectedDocument(document.id);
                          fileInputRef.current?.click();
                        }}
                        className="rounded border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50"
                      >
                        <Pencil size={12} />
                      </button>

                      <button
                        type="button"
                        aria-label="Hapus dokumen"
                        onClick={() => handleDelete(document.id)}
                        className="rounded border border-slate-200 p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={12} />
                      </button>
                    </>
                  )}

                  {!uploaded && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDocument(document.id);
                        fileInputRef.current?.click();
                      }}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-blue-300 px-3 py-2 text-[10px] font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                      <Upload size={12} />
                      Upload Dokumen
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(event) => handleUpload(event.target.files?.[0])}
        />
      </section>

      {previewDocument !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          onClick={() => setPreviewDocument(null)}
        >
          <div
            className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-sm font-bold text-slate-800">Detail Dokumen</h2>

            {documents
              .filter((document) => document.id === previewDocument)
              .map((document) => (
                <div key={document.id} className="mt-4">
                  <p className="text-xs text-slate-500">{document.title}</p>
                  <p className="mt-2 break-all text-sm font-semibold text-slate-800">
                    {document.fileName}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    Ukuran: {document.fileSize}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Diunggah: {document.uploadedAt}
                  </p>
                </div>
              ))}

            <button
              type="button"
              onClick={() => setPreviewDocument(null)}
              className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
