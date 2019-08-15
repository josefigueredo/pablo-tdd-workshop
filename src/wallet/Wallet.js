export default class Wallet {

    constructor(montoInicial) {
        this.saldo = montoInicial || 0;
    }

    getSaldo() {
        return this.saldo
    }

    add(transaccion) {
        if (transaccion.tipo === "CREDITO") {
            if (transaccion.monto < 0) {
                throw new Error('monto invalido')

            }
            this.saldo += transaccion.monto
        } else {
            if (this.saldo < transaccion.monto) {
                throw new Error('saldo insuficiente')
            }
            this.saldo -= transaccion.monto
        }
    }
}