
import {Elemento} from "../classes/Elementos";
import { GrupoUseCase } from "./GrupoUseCase";
import { NodoUseCase } from "./NodosUseCase";

export const darElementos = async (idProblematica: number): Promise<Elemento[]> => {
    const darGruposPromise: Promise<Elemento[]> = GrupoUseCase.darGruposJson(idProblematica);
    const darNodosPromise: Promise<Elemento[]> = NodoUseCase.darNodosJson(idProblematica);

    const [gruposYRelaciones, nodosYRelaciones] = await Promise.all([darGruposPromise, darNodosPromise]);

    return [...gruposYRelaciones, ...nodosYRelaciones];
};
