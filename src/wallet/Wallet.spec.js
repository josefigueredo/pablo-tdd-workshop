import Wallet from "./Wallet";
import {
    fail
} from "assert";

describe('Wallet', () => {
    it('smoke test', () => {
        expect(true).toBe(true)
    })

    describe('cuando no tenemos dinero', () => {
        const wallet = new Wallet();
        describe('y consultamos el saldo de nuestra cuenta', () => {
            const result = wallet.getSaldo();
            it('nos devuelve 0', () => {
                expect(result).toEqual(0);
            })
        })
    })

    describe('cuando tenemos dinero', () => {
        const wallet = new Wallet(50);
        describe('y consultamos el saldo de nuestra cuenta', () => {
            const result = wallet.getSaldo();
            it('nos devuelve el saldo actual', () => {
                expect(result).toEqual(50);
            })
        })
    })

    describe('cuando hacemos una transaccion de CREDITO', () => {
        describe('y el monto es positivo', () => {
            const wallet = new Wallet();

            beforeAll(() => {
                wallet.add({
                    monto: 300,
                    tipo: "CREDITO"
                })
            })

            it('se suma saldo a nuestra cuenta', () => {
                expect(wallet.getSaldo()).toEqual(300);
            })
        })

        describe('y el monto es negativo', () => {
            const wallet = new Wallet();

            it('no se modifica el saldo', () => {
                try {
                    fail()
                } catch (e) {
                    expect(wallet.getSaldo()).toBe(0);
                }

            })
            it('lanza una exception "monto invalido"', () => {
                expect(() => {
                    wallet.add({
                        monto: -200,
                        tipo: "CREDITO"
                    })
                }).toThrow("monto invalido")
            })
        })
    })

    describe('cuando hacemos una transaccion de DEBITO', () => {

        describe('y tenemos saldo suficiente', () => {
            const wallet = new Wallet(400);

            beforeAll(() => {
                wallet.add({
                    monto: 60,
                    tipo: "DEBITO"
                })
            })

            it('restamos ese monto a nuestra cuenta', () => {
                expect(wallet.getSaldo()).toEqual(340);
            })
        })

        describe('y no tenemos la plata necesaria', () => {
            const wallet = new Wallet(20);

            it('lanza una exception que diga saldo insuficiente', () => {
                expect(() =>
                    wallet.add({
                        monto: 200,
                        tipo: "DEBITO"
                    })
                ).toThrow('saldo insuficiente');
            })

            it('y no resta el saldo de nuestra cuenta', () => {
                try {
                    wallet.add({
                        monto: 200,
                        tipo: "DEBITO"
                    })
                    fail();
                } catch (e) {
                    expect(wallet.getSaldo()).toEqual(20)
                }
            })
        })
    })
})