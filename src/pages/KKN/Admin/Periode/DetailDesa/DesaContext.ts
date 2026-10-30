import { useOutletContext } from 'react-router-dom';

export type DesaRecord = {
  id?: string | number;
  nama?: string;
  namaDesa?: string;
  desa?: string;
  kecamatan?: string;
  kabupaten?: string;
  status?: string;
  alamat?: string;
  kepalaDesa?: string;
  telepon?: string;
  klaster?: string;
  pembimbing?: string;
  dosenPembimbing?: string;
  nipPembimbing?: string;
  fakultasPembimbing?: string;
  penguji?: string;
  penguji1?: string;
  penguji2?: string;
  nipPenguji1?: string;
  nipPenguji2?: string;
  koordinator?: string;
  koordinatorDesa?: string;
  [key: string]: unknown;
};

export type PeriodeDesa = {
  id: string | number;
  desa?: string;
  kecamatan?: string;
  kabupaten?: string;
  status?: string;
  detail?: {
    daftarDesa?: DesaRecord[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export type DesaRouteContext = {
  periodeId: number;
  desaId: string;
  namaDesa: string;
  desa: DesaRecord;
  periode: PeriodeDesa;
};

export function useDesaContext() {
  return useOutletContext<DesaRouteContext>();
}
