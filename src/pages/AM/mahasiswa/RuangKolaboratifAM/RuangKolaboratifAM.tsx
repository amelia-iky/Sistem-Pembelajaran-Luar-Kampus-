import { useRef, useState, type KeyboardEvent } from 'react';
import { UserRound, Paperclip, Send, FileText } from 'lucide-react';

type Participant = {
  id: number;
  role: string;
  name: string;
  subtitle: string;
};

type ChatMessage = {
  id: number;
  sender: 'student';
  text: string;
  time: string;
  fileName?: string;
};

const participants: Participant[] = [
  {
    id: 1,
    role: 'DOSEN PEMBIMBING 1',
    name: 'Dr. I Gede Ketut Arya, S.Pd., M.Kom.',
    subtitle:
      'Dosen Pembimbing Lapangan • NIP: 197805122005001002 • SMA Negeri 1 Singaraja',
  },
  {
    id: 2,
    role: 'DOSEN PEMBIMBING 2',
    name: 'Made Sri Wahyuni, M.Pd.',
    subtitle: 'Dosen Pembimbing Lapangan',
  },
  {
    id: 3,
    role: 'DOSEN PEMBIMBING 3',
    name: 'I Wayan Sukadana, M.Kom.',
    subtitle: 'Dosen Pembimbing Lapangan',
  },
  {
    id: 4,
    role: 'GURU PAMONG',
    name: 'Drs. Ketut Merta, M.P.',
    subtitle: 'Guru Pamong • SMA Negeri 1 Singaraja',
  },
];

export default function RuangKolaboratifAM() {
  const [activeParticipantId, setActiveParticipantId] = useState(1);
  const [messagesByParticipant, setMessagesByParticipant] = useState<
    Record<number, ChatMessage[]>
  >({});
  const [messageInput, setMessageInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeParticipant = participants.find(
    (participant) => participant.id === activeParticipantId,
  )!;

  const messages = messagesByParticipant[activeParticipantId] ?? [];

  const sendMessage = () => {
    const text = messageInput.trim();

    if (!text && !selectedFile) return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      sender: 'student',
      text,
      time:
        new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Makassar',
        }) + ' WITA',
      fileName: selectedFile?.name,
    };

    setMessagesByParticipant((current) => ({
      ...current,
      [activeParticipantId]: [
        ...(current[activeParticipantId] ?? []),
        newMessage,
      ],
    }));

    setMessageInput('');
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    window.setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-full w-full bg-white px-4 py-5 sm:px-6 md:px-8">
      {/* Judul halaman */}
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
          Ruang Kolaboratif Asistensi Mengajar
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Komunikasi dengan dosen pembimbing dan guru pamong selama pelaksanaan
          Asistensi Mengajar.
        </p>
      </div>

      {/* Daftar dosen pembimbing dan guru pamong */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {participants.map((participant) => {
          const active = participant.id === activeParticipantId;

          return (
            <button
              key={participant.id}
              type="button"
              onClick={() => setActiveParticipantId(participant.id)}
              className={`flex min-w-0 items-center gap-3 rounded-lg border p-3 text-left transition ${
                active
                  ? 'border-blue-500 bg-blue-50/60 ring-1 ring-blue-400'
                  : 'border-blue-100 bg-white hover:border-blue-300 hover:bg-blue-50/30'
              }`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
                  active
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <UserRound size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[9px] font-bold tracking-wide text-slate-500">
                  {participant.role}
                </p>

                <p className="break-words text-[10px] font-semibold leading-relaxed text-slate-800">
                  {participant.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Panel percakapan */}
      <section className="overflow-hidden rounded-xl border border-blue-200 bg-white shadow-[0_3px_8px_rgba(15,23,42,0.06)]">
        {/* Header chat */}
        <div className="flex items-center gap-3 border-b border-blue-100 px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <UserRound size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-xs font-bold text-slate-800 sm:text-sm">
              {activeParticipant.name}
            </h2>

            <p className="mt-1 text-[9px] leading-relaxed text-slate-400">
              {activeParticipant.subtitle}
            </p>
          </div>
        </div>

        {/* Area chat */}
        <div className="flex min-h-[390px] flex-col px-3 py-4 sm:px-5">
          {messages.length > 0 && (
            <div className="mb-5 flex justify-center">
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[9px] text-slate-500">
                Hari ini, 14 Oktober 2026
              </span>
            </div>
          )}

          <div className="flex-1 space-y-5">
            {messages.map((message) => (
              <div key={message.id} className="flex flex-col items-end">
                <p className="mb-1.5 text-[9px] font-medium text-slate-500">
                  Anda (Mahasiswa)
                </p>

                <div className="max-w-[92%] rounded-xl rounded-tr-sm bg-blue-600 px-3 py-2.5 text-[11px] leading-relaxed text-white sm:max-w-[75%]">
                  {message.text && <p>{message.text}</p>}

                  {message.fileName && (
                    <div className="mt-2 flex items-center gap-2 rounded-md bg-blue-500 p-2">
                      <FileText size={15} />
                      <span className="break-all text-[10px]">
                        {message.fileName}
                      </span>
                    </div>
                  )}
                </div>

                <p className="mt-1 text-[9px] text-slate-400">
                  {message.time} • Terkirim
                </p>
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input pesan */}
        <div className="border-t border-blue-100 bg-white p-3">
          {selectedFile && (
            <div className="mb-2 flex items-center justify-between gap-3 rounded-md border border-blue-100 bg-blue-50 px-3 py-2">
              <div className="flex min-w-0 items-center gap-2 text-[10px] text-slate-600">
                <FileText size={14} className="shrink-0 text-blue-600" />
                <span className="truncate">{selectedFile.name}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);

                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
                aria-label="Hapus lampiran"
                className="shrink-0 text-slate-400 hover:text-rose-500"
              >
                ×
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(event) =>
                setSelectedFile(event.target.files?.[0] ?? null)
              }
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Lampirkan file"
              aria-label="Lampirkan file"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-blue-100 bg-slate-50 text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
            >
              <Paperclip size={15} />
            </button>

            <input
              type="text"
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan Anda... (Tekan Enter untuk mengirim)"
              className="h-9 min-w-0 flex-1 rounded-md border border-blue-100 bg-slate-50 px-3 text-[10px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50"
            />

            <button
              type="button"
              onClick={sendMessage}
              disabled={!messageInput.trim() && !selectedFile}
              className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-4 text-[10px] font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Kirim
              <Send size={12} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
