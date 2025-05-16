import { CuidadoDTO } from "./cuidados-dto-model";
import { LembreteDTO } from "./Lembrete-dto-model";

export interface PetDTO {
  id?: number;
  sexo: boolean;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  imageData?: string;
  peso?: number;
  altura?: number;
  microchip?: boolean;
  vacinas?: string[];
  dono?: {
    id: number;
    nome: string;
  };
  lembretes?: LembreteDTO[];
  cuidados?: CuidadoDTO;
}
