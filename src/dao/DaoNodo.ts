import { pool } from "./Db";
import {Edge, Nodo} from "../classes/Elementos";

export namespace DaoNodo{
    export const darNodos = async (idProblematica: number): Promise<Nodo[]> => {
        try {
            const sql = `select N.c_id as id, N.a_nombre as nombre, N.a_url_foto as "urlFoto", concat(p.d_nombres, ' ', p.d_apellidos) as "nombreCreador"
                    from nodo n
                    inner join persona_problematica pp on n.a_id_pers_prob = pp.a_id
                    inner join persona p on pp.a_email = p.a_email
                    where pp.c_id_problematica = $1`;
            const result = await pool.query(sql, [idProblematica]);
            pool.end();
            return result.rows.map(row => new Nodo(row.id, row.nombre, row.urlFoto, row.nombreCreador));
        } catch (e) {
            console.log(e);
            return [];
        }
    };

    export const darRelaciones = async (idProblematica: number) => {
        try {
            const sql = `SELECT R.c_id as id, N.c_id as "idNodo", R.c_id_nodo_padre as "idNodoPadre"
                        FROM NODO n
                        inner join PERSONA_PROBLEMATICA pp on pp.a_id = n.a_id_pers_prob
                        inner join RELACION R ON N.c_id = R.c_id_nodo
                        where PP.c_id_problematica = $1
                        AND c_id_nodo_padre is not null
                        AND R.c_fase = 2`;
            const result = await pool.query(sql, [idProblematica]);
            pool.end();
            return result.rows.map(row => new Edge(row.id, row.idNodoPadre, row.idNodo));
        }catch (e) {
            console.log(e);
            return [];
        }
    }

}
