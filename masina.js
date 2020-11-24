export class Masina {
    constructor(marca, model, anFabricatie, tipTractiune, porneste) {
        this.marca = marca;
        this.model = model;
        this.anFabricatie = anFabricatie;
        this.tipTractiune = tipTractiune;
        this.porneste = porneste;
    }
    getMasina() {
        console.log(`Masina este o ${this.marca} ${this.model} din anul ${this.anFabricatie}.`);
    }
    getTipTractiune() {
        console.log(`Masina are tractiune ${this.tipTractiune}.`);
    }
    getPorneste() {
        if (this.porneste)
            console.log(`Masina porneste, poti merge la drum.`);
        else
            console.log(`Masina nu porneste, mergi pe jos.`);
    }
}