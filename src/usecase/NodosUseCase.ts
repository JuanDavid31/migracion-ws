import {DaoNodo} from "../dao/DaoNodo";
import {DaoRelacion, RelacionGrupoNodo} from "../dao/DaoRelacion";
import {Edge, Elemento, Nodo} from "../classes/Elementos";

export namespace NodoUseCase {
    export const darNodosJson = async (idProblematica: number): Promise<Elemento[]> => {
        const darNodosPromise = DaoNodo.darNodos(idProblematica);
        const darRelacionesGrupoANodoPromise = DaoRelacion.darRelacionesGrupoANodoPorProblematica(idProblematica);
        const darRelacionesPromise = DaoNodo.darRelaciones(idProblematica);
        const resultados = await Promise.all([darNodosPromise, darRelacionesGrupoANodoPromise, darRelacionesPromise]);
        const nodos: Nodo[] = resultados[0];
        const relaciones: RelacionGrupoNodo[] = resultados[1];
        const edges: Edge[] = resultados[2];
        relaciones.forEach( relacion => {
            const nodoEncontrado = nodos.find(nodo => nodo.data.id === relacion.idNodo);
            nodoEncontrado!.data.parent = relacion.idGrupo;
        });

        return [...nodos, ...edges]; //Concatenas los 2 arreglos
    };
}
