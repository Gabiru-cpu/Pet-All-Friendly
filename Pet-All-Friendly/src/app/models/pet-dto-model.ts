export interface PetDTO {
  id?: number;
  sexo: boolean;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  fotoUrl?: string;
  peso?: number;
  altura?: number;
  microchip?: boolean;
  vacinas?: string[];
  dono?: {
    id: number;
    nome: string;
  };
}
