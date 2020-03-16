import { DataEdge, DataGrupo, DataNodo } from "./Data";

export class Elemento {
    data: DataGrupo | DataGrupo | DataEdge;
    /**
     * The model position of the node (optional on init, mandatory after)
     */
    position?: Position;

    constructor(data: DataGrupo | DataEdge) {
        this.data = data;
    }
}

export class Grupo extends Elemento {
    data: DataGrupo;

    constructor(id: string, nombre: string, parent?: string) {
        const data = new DataGrupo(id, nombre, parent);
        super(data);
        this.data = data;
    }
}

export class Nodo extends Elemento{
    data: DataNodo;

    constructor(id: string, nombre: string, urlFoto: string, nombreCreador: string, parent?: string) {
        const data = new DataNodo(id, nombre, urlFoto, nombreCreador, parent);
        super(data);
        this.data = data;
    }
}

export class Edge extends Elemento {
    data: DataEdge;

    constructor(id: string, source: string, target: string) {
        super(new DataEdge(id, source, target));
        this.data = new DataEdge(id, source, target);
    }

}
