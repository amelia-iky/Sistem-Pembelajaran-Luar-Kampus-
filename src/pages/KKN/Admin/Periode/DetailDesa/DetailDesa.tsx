import { useState, type FormEvent } from 'react';
import {
  MapPin,
  UserCheck,
  GraduationCap,
  Users,
  PencilLine,
  Check,
  X,
} from 'lucide-react';

import { STORAGE_KEY } from '../Periode';
import { useDesaContext } from './DesaContext';
import type { DesaRecord, PeriodeDesa } from './DesaContext';

const val = (value: unknown): string => {
  if (value === undefined || value === null || value === '') {
    return '-';
  }

  return String(value);
};

type FormDesa = Record<string, string>;

export default function DetailDesa() {
  const { periodeId, desaId, namaDesa, desa, periode } = useDesaContext();

  const [modal, setModal] = useState(false);
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState<FormDesa>({});

  const bukaEdit = () => {
    setForm({
      nama: desa.nama ?? desa.namaDesa ?? '',
      kecamatan: desa.kecamatan ?? periode.kecamatan ?? '',
      kabupaten: desa.kabupaten ?? periode.kabupaten ?? '',
      alamat: desa.alamat ?? '',
      kepalaDesa: desa.kepalaDesa ?? '',
      telepon: desa.telepon ?? '',
      klaster: desa.klaster ?? '',
      pembimbing: desa.pembimbing ?? desa.dosenPembimbing ?? '',
      nipPembimbing: desa.nipPembimbing ?? '',
      fakultasPembimbing: desa.fakultasPembimbing ?? '',
      penguji1: desa.penguji1 ?? desa.penguji ?? '',
      nipPenguji1: desa.nipPenguji1 ?? '',
      penguji2: desa.penguji2 ?? '',
      nipPenguji2: desa.nipPenguji2 ?? '',
      koordinator: desa.koordinator ?? desa.koordinatorDesa ?? '',
    });

    setModal(true);
  };

  const simpan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const parsed: unknown = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || '[]',
      );

      if (!Array.isArray(parsed)) {
        throw new Error('Format data periode tidak valid');
      }

      const semua = parsed as PeriodeDesa[];

      const next = semua.map((item) => {
        if (String(item.id) !== String(periodeId)) {
          return item;
        }

        const rows: DesaRecord[] = item.detail?.daftarDesa ?? [];

        const dataBaru: DesaRecord = {
          ...desa,
          ...form,
          nama: form.nama,
          namaDesa: form.nama,
          dosenPembimbing: form.pembimbing,
          penguji: form.penguji1,
        };

        const updated =
          rows.length > 0
            ? rows.map((row, index) => {
                const idBaris = String(row.id ?? index + 1);

                return idBaris === String(desaId)
                  ? { ...row, ...dataBaru }
                  : row;
              })
            : [{ ...dataBaru, id: desa.id }];

        return {
          ...item,
          detail: {
            ...item.detail,
            daftarDesa: updated,
          },
        };
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      setModal(false);
      setNotice('Perubahan data desa berhasil disimpan.');
    } catch {
      setNotice('Gagal menyimpan perubahan data desa.');
    }
  };

  const dataDesa: { label: string; value: unknown }[] = [
    { label: 'Nama Desa', value: namaDesa },
    {
      label: 'Kecamatan',
      value: desa.kecamatan ?? periode.kecamatan,
    },
    {
      label: 'Kabupaten',
      value: desa.kabupaten ?? periode.kabupaten,
    },
    { label: 'Nama Kepala Desa', value: desa.kepalaDesa },
    { label: 'Telepon Kantor Desa', value: desa.telepon },
    { label: 'Klaster Penempatan', value: desa.klaster },
  ];

  const dataPenguji: {
    label: string;
    nama: unknown;
    nip: unknown;
  }[] = [
    {
      label: 'Penguji 1',
      nama: desa.penguji1 ?? desa.penguji,
      nip: desa.nipPenguji1,
    },
    {
      label: 'Penguji 2',
      nama: desa.penguji2,
      nip: desa.nipPenguji2,
    },
  ];

  const fieldLabels: Record<string, string> = {
    nama: 'Nama Desa',
    kepalaDesa: 'Nama Kepala Desa',
    alamat: 'Alamat Desa',
    telepon: 'Telp Kantor Desa',
    klaster: 'Klaster Penempatan',
    kecamatan: 'Kecamatan',
    kabupaten: 'Kabupaten',
    pembimbing: 'Nama Pembimbing',
    nipPembimbing: 'NIP Pembimbing',
    fakultasPembimbing: 'Fakultas Pembimbing',
    penguji1: 'Nama Penguji 1',
    nipPenguji1: 'NIP Penguji 1',
    penguji2: 'Nama Penguji 2',
    nipPenguji2: 'NIP Penguji 2',
    koordinator: 'Nama Koordinator Desa',
  };

  return (
    <div>
      <div className="mb-6 flex items-start justify-between gap-3 pb-4">
        <div>
          <h2 className="text-base font-bold text-[#172943]">
            Detail Informasi Desa
          </h2>

          <p className="mt-1 text-xs text-[#71819B]">
            Data profil wilayah, perangkat desa, serta penugasan dosen
            pembimbing dan penguji KKN di Desa {namaDesa}.
          </p>
        </div>

        <button
          type="button"
          onClick={bukaEdit}
          className="rounded-lg bg-[#EAF1FF] p-2 text-[#245BD6] hover:bg-[#DCE8FF]"
          aria-label="Ubah informasi desa"
        >
          <PencilLine size={15} />
        </button>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold text-[#273750]">
            <MapPin size={14} className="text-emerald-600" />
            DATA DESA
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {dataDesa.map((item) => (
              <div
                key={item.label}
                className="min-h-[66px] rounded-lg border border-[#C7D9F5] bg-white p-3"
              >
                <p className="text-[9px] font-bold uppercase tracking-wide text-[#687993]">
                  {item.label}
                </p>

                <p className="mt-1.5 text-[11px] font-semibold text-[#273750]">
                  {val(item.value)}
                </p>
              </div>
            ))}

            <div className="rounded-lg border border-[#C7D9F5] bg-white p-3 sm:col-span-2 xl:col-span-3">
              <p className="text-[9px] font-bold uppercase text-[#687993]">
                Alamat Kantor / Titik Kumpul
              </p>

              <p className="mt-1.5 text-[11px] text-[#273750]">
                {val(desa.alamat)}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold text-[#273750]">
            <UserCheck size={14} className="text-emerald-600" />
            PEMBIMBING LAPANGAN (DPL)
          </h3>

          <div className="rounded-lg border border-[#C7D9F5] bg-white p-4">
            <p className="text-sm font-bold text-[#273750]">
              {val(desa.pembimbing ?? desa.dosenPembimbing)}
            </p>

            <span className="mt-2 inline-block rounded bg-[#DCE8FF] px-2 py-1 text-[9px] font-semibold text-[#245BD6]">
              Dosen Pembimbing Lapangan
            </span>

            <p className="mt-2 text-[10px] text-[#71819B]">
              NIP: {val(desa.nipPembimbing)}
            </p>

            <p className="mt-1 text-[10px] text-[#71819B]">
              Fakultas: {val(desa.fakultasPembimbing)}
            </p>
          </div>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold text-[#273750]">
            <GraduationCap size={14} className="text-emerald-600" />
            DOSEN PENGUJI
          </h3>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {dataPenguji.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-[#C7D9F5] bg-white p-4"
              >
                <p className="text-[9px] font-bold uppercase text-[#71819B]">
                  {item.label}
                </p>

                <p className="mt-2 text-xs font-bold text-[#273750]">
                  {val(item.nama)}
                </p>

                <p className="mt-1 text-[10px] text-[#71819B]">
                  NIP: {val(item.nip)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-xs font-bold text-[#273750]">
            <Users size={14} className="text-emerald-600" />
            KOORDINATOR DESA
          </h3>

          <div className="rounded-lg border border-[#C7D9F5] bg-white p-4">
            <p className="text-xs font-bold text-[#273750]">
              {val(desa.koordinator ?? desa.koordinatorDesa)}
            </p>

            <p className="mt-1 text-[10px] text-[#71819B]">
              Koordinator Desa KKN
            </p>
          </div>
        </section>
      </div>

      {modal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#14233B]/45 p-3 sm:p-5">
          <form
            onSubmit={simpan}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-[#C7D9F5] bg-white shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex justify-between border-b border-[#C7D9F5] bg-white px-5 py-4">
              <div>
                <h2 className="text-sm font-bold text-[#172943]">Ubah Desa</h2>

                <p className="mt-1 text-[10px] text-[#71819B]">
                  Perbarui informasi desa dan penanggung jawab KKN.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModal(false)}
                className="p-1 text-[#8492A6]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              {Object.entries(fieldLabels).map(([key, label]) => (
                <label
                  key={key}
                  className={key === 'alamat' ? 'sm:col-span-2' : ''}
                >
                  <span className="mb-1 block text-[10px] font-medium text-[#52627A]">
                    {label}
                  </span>

                  {key === 'alamat' ? (
                    <textarea
                      rows={2}
                      value={form[key] ?? ''}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          [key]: event.target.value,
                        }))
                      }
                      className="w-full rounded-md border border-[#AFC8F5] px-3 py-2 text-[11px] outline-none focus:border-[#3569F6]"
                    />
                  ) : (
                    <input
                      value={form[key] ?? ''}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          [key]: event.target.value,
                        }))
                      }
                      className="h-9 w-full rounded-md border border-[#AFC8F5] px-3 text-[11px] outline-none focus:border-[#3569F6]"
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="sticky bottom-0 flex justify-end gap-2 border-t bg-white px-5 py-3">
              <button
                type="button"
                onClick={() => setModal(false)}
                className="rounded-md border border-[#8DB2FF] px-4 py-2 text-[11px] font-semibold text-[#245BD6]"
              >
                Batal
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-md bg-[#245BD6] px-4 py-2 text-[11px] font-semibold text-white"
              >
                <Check size={14} />
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="fixed right-5 top-5 z-[150] rounded-lg border border-[#C9D9FF] bg-white px-4 py-3 text-xs text-[#273750] shadow-lg"
        >
          {notice}
          <button
            type="button"
            onClick={() => setNotice('')}
            className="ml-3 font-semibold text-[#245BD6]"
          >
            Tutup
          </button>
        </div>
      )}
    </div>
  );
}
