const net = require('net');
const readline = require('readline');
const { arregloTags1BStatusBomba, arregloTagsApendiceStatusBomba, arregloTagsCamarpasaStatusBomba, arregloTagsDePescaStatusBomba, arregloTagsPreSantaMonicaStatusBomba, arregloTagsSanDiegoStatusBomba, arregloTagsSanFranciscoStatusBomba, arregloTagsSantaBarbaraStatusBomba, arregloTagsSantaMonicaAStatusBomba, arregloTagsSantaRosaAStatusBomba, arregloTagsSantaRosaBStatusBomba, arregloTagsCabala1StatusBomba, arregloTagsCabala2StatusBomba } = require("../helpers/arregloTags");
const HistoryBomba = require('../models/HistoryBomba');

let estado1B = ['FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE'];
let estadoAPN = ['FALSE', 'FALSE', 'FALSE', 'FALSE'];
let estadoCMP = ['FALSE', 'FALSE', 'FALSE'];
let estadoDP = ['FALSE', 'FALSE', 'FALSE'];

let estadoPSM = ['FALSE'];
let estadoSD = ['FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE'];
let estadoSF = ['FALSE', 'FALSE'];
let estadoSB = ['FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE'];
let estadoSMA = ['FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE'];
let estadoSRA = ['FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE', 'FALSE'];
let estadoSRB = ['FALSE', 'FALSE'];
let estadoCBL1 = ['FALSE', 'FALSE', 'FALSE'];
let estadoCBL2 = ['FALSE', 'FALSE', 'FALSE'];

const eb1B = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTags1BStatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estado1B[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: ex.Name.slice(0, 2),
                                bomba: ex.Name.slice(3, 9),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'
                            });
                            await bomba.save();
                            estado1B[i] = ex.Value
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebApendice = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsApendiceStatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoAPN[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: ex.Name.slice(0, 3),
                                bomba: ex.Name.slice(4, 10),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'

                            });
                            await bomba.save();
                            estadoAPN[i] = ex.Value
                        }

                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebCamarpasa = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCamarpasaStatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoCMP[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: ex.Name.slice(0, 3),
                                bomba: ex.Name.slice(4, 10),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'

                            });
                            await bomba.save();
                            estadoCMP[i] = ex.Value;
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebDePesca = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsDePescaStatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoDP[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: ex.Name.slice(0, 2),
                                bomba: ex.Name.slice(3, 9),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'

                            });
                            await bomba.save();
                            estadoDP[i] = ex.Value;
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebPreSantaMonica = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsPreSantaMonicaStatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoPSM[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: ex.Name.slice(0, 3),
                                bomba: ex.Name.slice(4, 10),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'

                            });
                            await bomba.save();
                            estadoPSM[i] = ex.Value;
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebSanDiego = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanDiegoStatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoSD[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: ex.Name.slice(0, 2),
                                bomba: ex.Name.slice(3, 9),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'
                            });
                            await bomba.save();
                            estadoSD[i] = ex.Value
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebSanFrancisco = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSanFranciscoStatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoSF[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: ex.Name.slice(0, 2),
                                bomba: ex.Name.slice(3, 9),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'
                            });
                            await bomba.save();
                            estadoSF[i] = ex.Value
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebSantaBarbara = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaBarbaraStatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoSB[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: ex.Name.slice(0, 2),
                                bomba: ex.Name.slice(3, 9),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'
                            });
                            await bomba.save();
                            estadoSB[i] = ex.Value
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebSantaMonicaA = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaMonicaAStatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoSMA[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: ex.Name.slice(0, 3),
                                bomba: ex.Name.slice(4, 10),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'

                            });
                            await bomba.save();
                            estadoSMA[i] = ex.Value;
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebSantaRosaA = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaAStatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoSRA[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: ex.Name.slice(0, 3),
                                bomba: ex.Name.slice(4, 10),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'

                            });
                            await bomba.save();
                            estadoSRA[i] = ex.Value;
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebSantaRosaB = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsSantaRosaBStatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoSRB[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: "SRB",
                                bomba: ex.Name.slice(15, 19),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'

                            });
                            await bomba.save();
                            estadoSRB[i] = ex.Value;
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebCabala1 = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCabala1StatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoCBL1[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: "CBL1",
                                bomba: ex.Name.slice(5, 11),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'

                            });
                            await bomba.save();
                            estadoCBL1[i] = ex.Value;
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebCabala2 = () => {
    let fechaActualUTC = new Date();
    const desfaseHorario = -5 * 60;
    fechaActualUTC = new Date(fechaActualUTC.getTime() + (desfaseHorario * 60 * 1000));
    try {
        let client = net.connect('\\\\.\\pipe\\HmiRuntime', () => {
            let tagReadCommand = `{"Message":"ReadTag","Params":{"Tags": ${arregloTagsCabala2StatusBomba()}},"ClientCookie":"myReadTagRequest1"}\n`;

            client.write(tagReadCommand);
            const rl = readline.createInterface({
                input: client,
                crlfDelay: Infinity
            });
            rl.on('line', (line) => {
                const obj = JSON.parse(line);
                if (obj.Message === 'NotifyReadTag') {
                    const arreglo = obj.Params.Tags;
                    arreglo.forEach(async (ex, i) => {
                        if (estadoCBL2[i] != ex.Value) {
                            bomba = new HistoryBomba({
                                date: fechaActualUTC.getTime(),
                                estacion: "CBL2",
                                bomba: ex.Name.slice(5, 11),
                                estado: ex.Value == 'TRUE' ? 'On' : 'Off'

                            });
                            await bomba.save();
                            estadoCBL2[i] = ex.Value;
                        }
                    });
                }
                client.end();
            });
        });
    } catch (error) {
        console.error(error);
    }
};

const ebChanduyHistorial = () => {
    eb1B()
    ebApendice(),
    ebCamarpasa(),
    ebDePesca(),
    ebPreSantaMonica(),
    ebSanDiego(),
    ebSanFrancisco(),
    ebSantaBarbara(),
    ebSantaMonicaA(),
    ebSantaRosaA(),
    ebSantaRosaB(),
    ebCabala1(),
    ebCabala2()
}



module.exports = {
    //eb1B,
    //ebApendice,
    //ebCamarpasa,
    //ebDePesca,
    ebChanduyHistorial
}