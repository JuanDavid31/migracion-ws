import { pool } from "./Db";
import { Edge, Grupo } from "../classes/Elementos";

export namespace DaoGrupo {
    export const darGrupos = async (idProblematica: number): Promise<Grupo[]> => {
        try {
            const sql = `select g.c_id as id, g.d_nombre as nombre, r.c_id_grupo_padre as "idPadre"
                    from grupo g left join relacion r on g.c_id = r.c_id_grupo
                    where c_id_problematica = $1`;
            const res = await pool.query(sql, [idProblematica]);
            const grupos: Grupo[] = res.rows.map(row => new Grupo(row.id, row.nombre, row.idPadre));
            pool.end();
            return grupos;
        } catch (e) {
            console.log(e);
            return [];
        }
    };
}
