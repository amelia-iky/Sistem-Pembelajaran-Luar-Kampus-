export type MahasiswaBimbingan = {
  nama: string;
  nim: string;
  pembimbing: string;
  tempatMagang: string;
  jurusan: string;
};

export type LogBimbingan = {
  id: number;
  tanggal: string;
  judul: string;
  isi: string;
  file?: string;
};

export const mahasiswaBimbingan: MahasiswaBimbingan[] = [
  {
    nama: 'Mahasiswa Dummy 27985',
    nim: '9900027985',
    pembimbing: 'Dosen Dummy 424',
    tempatMagang: 'Perusahaan Dummy 1350',
    jurusan: 'Sistem Informasi (SI) (S1)',
  },
  {
    nama: 'Mahasiswa Dummy 27991',
    nim: '9900027991',
    pembimbing: 'Dosen Dummy 424',
    tempatMagang: 'Perusahaan Dummy 1350',
    jurusan: 'Sistem Informasi (SI) (S1)',
  },
];

export const logBimbingan: Record<string, LogBimbingan[]> = {
  '9900027985': [
    {
      id: 1,
      tanggal: '2026-07-21',
      judul: 'Diskusi Progres Kegiatan Magang',
      isi: 'Mendiskusikan progres kegiatan magang bersama dosen pembimbing serta menyampaikan hasil pekerjaan yang telah dilakukan.',
      file: 'Laporan_Progres.pdf',
    },
    {
      id: 2,
      tanggal: '2026-07-24',
      judul: 'Evaluasi Hasil Pekerjaan',
      isi: 'Melakukan evaluasi terhadap hasil pekerjaan dan menerima masukan untuk perbaikan pada tahap berikutnya.',
      file: 'Hasil_Evaluasi.pdf',
    },
    {
      id: 3,
      tanggal: '2026-07-28',
      judul: 'Konsultasi Laporan Magang',
      isi: 'Melakukan konsultasi mengenai penyusunan laporan magang dan membahas bagian laporan yang perlu disempurnakan.',
    },
  ],

  '9900027991': [
    {
      id: 1,
      tanggal: '2026-07-22',
      judul: 'Konsultasi Awal Magang',
      isi: 'Membahas rencana kegiatan magang, target pekerjaan, dan tahapan pelaksanaan bersama dosen pembimbing.',
      file: 'Rencana_Kegiatan.pdf',
    },
    {
      id: 2,
      tanggal: '2026-07-29',
      judul: 'Laporan Perkembangan Magang',
      isi: 'Menyampaikan perkembangan kegiatan magang serta mendiskusikan kendala yang ditemukan selama pengerjaan tugas.',
    },
  ],
};
