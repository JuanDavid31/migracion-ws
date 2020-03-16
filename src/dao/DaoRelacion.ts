import {pool} from "./Db";

export class RelacionGrupoNodo{
    idGrupo: string;
    idNodo: string;
    constructor(idGrupo: string, idNodo: string) {
        this.idGrupo = idGrupo;
        this.idNodo = idNodo;
    }
}

export namespace DaoRelacion {
    export const darRelacionesGrupoANodoPorProblematica = async (idProblematica: number): Promise<RelacionGrupoNodo[]> => {
        try {
            const sql = `select r.c_id_grupo_padre as "idGrupoPadre", r.c_id_nodo as "idNodo" from
                    grupo g inner join relacion r on g.c_id = r.c_id_grupo_padre
                    where c_id_problematica = $1
                    AND r.c_id_nodo is not null
                    AND r.c_id_nodo_padre is null
                    AND r.c_id_grupo is null
                    AND c_fase = 2`;
            const res = await pool.query(sql, [idProblematica]);
            pool.end();
            return res.rows.map(row => new RelacionGrupoNodo(row.idGrupoPadre, row.idNodo));
        }catch (e) {
            console.log(e);
            return [];
        }
    };
}
