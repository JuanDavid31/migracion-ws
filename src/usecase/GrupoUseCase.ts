import { DaoGrupo } from "../dao/DaoGrupo";
import { Edge, Elemento, Grupo } from "../classes/Elementos";

export namespace GrupoUseCase {
    export const darGruposJson = async (idProblematica: number): Promise<Elemento[]> => {
        const grupos: Grupo[] = await DaoGrupo.darGrupos(idProblematica);
        const relaciones: Edge[] = grupos.filter(grupo => grupo.data.parent != null)
            .map(grupo => grupo.data)
            .map( ({ id, parent }) => new Edge(`${parent}${id}`, parent!, id));
        return [...grupos, ...relaciones];
    };
}
