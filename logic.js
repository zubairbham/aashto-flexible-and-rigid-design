// INPUTS Section 01
const pavtType = document.getElementById('pavt-type');
const roadType = document.getElementById('road-type');
const roadClass = document.getElementById('road-class');
const carriagewayType = document.getElementById("carriageway-type");
const numberOfLanes = document.getElementById("number-of-lanes");
const designLife = document.getElementById("design-life");
const generalNextBtn = document.getElementById('general-next-btn');
const materialPropBox = document.getElementById('material-prop-box');

const sgCbrValue = document.getElementById("cbr-value-sg");
const sbCbrValue = document.getElementById('cbr-value-sb'); // Modulus of Rupture (psi)
const bsCbrValue = document.getElementById('cbr-value-bs'); // Elastic Modulus of Concrete (psi)
const abModulus = document.getElementById('modulus-ab'); // Load Transfer Coefficient
const awModulus = document.getElementById('modulus-aw'); // Subbase Thickness (inch)

const ruptureModulus = document.getElementById('rupture-modulus'); // Modulus of Rupture (psi)
const elasticModulus = document.getElementById('elastic-modulus'); // Elastic Modulus of Concrete (psi)
const loadTransferCoef = document.getElementById('load-transfer-coef'); // Load Transfer Coefficient
const subbaseThickness = document.getElementById('subbase-thickness'); //Subbase Thickness (inch)

const materialNextBtn = document.getElementById('material-next-btn');
const trafficBox = document.getElementById('traffic-box');
const calcBtnBox = document.getElementById('calc-btn-box');

const inputValue1 = document.getElementById('veh-type');
const inputValue2 = document.getElementById('aadt');
const inputValue3 = document.getElementById('growth-rate');
const myAddBtn = document.getElementById('add-btn');
let totalEsal = document.getElementById('comm-esal');
const resultBox = document.getElementById('result-box');
const closeDisplay = document.getElementById('close-display');
const claculateBtn = document.getElementById('calculate-btn');

let awcTh;
let abcTh;
let aggbsTh;
let sbTh;
let impSgTh;

const displayAwcTh = document.getElementById('box1');
const displayAbcTh = document.getElementById('box2');
const displayAggbsTh = document.getElementById('box3');
const displaySbTh = document.getElementById('box4');
const displayImpSg = document.getElementById('box5');
const displaySgTh = document.getElementById('box6');

const menuBtn = document.getElementById('menu-btn');
const showMailBox = document.getElementById('show-mail-box');

// General Input BUtton
generalNextBtn.addEventListener('click', showMaterialBox);
function showMaterialBox(e) {
    if (pavtType.value == "" || roadType.value == "" || roadClass.value == "" || designLife.value == "" || carriagewayType.value == "" || numberOfLanes.value == "") {
        alert("Some fields are empty.");
    } else {
        materialPropBox.style = "display: block;";
        generalNextBtn.style = "display: none;";
        if (pavtType.value == "rigid") {
            ruptureModulus.style = 'display: block';
            sbCbrValue.style = 'display: none;';
            elasticModulus.style = 'display: block';
            bsCbrValue.style = 'display: none';
            loadTransferCoef.style = 'display: block';
            abModulus.style = 'display: none';
            subbaseThickness.style = 'display: block;';
            awModulus.style = 'display: none;';
        }
    }
}

// Material Properties Input
materialNextBtn.addEventListener('click', showTrafficBox);
function showTrafficBox(e) {
    if (pavtType.value == "flexible") {
        if (sgCbrValue.value == "" || sbCbrValue.value == "" || bsCbrValue.value == "" || abModulus.value == "" || awModulus.value == "") {
            alert("Some fields are empty.");
        } else {
            trafficBox.style = "display: block;";
            calcBtnBox.style = "display: block;";
            materialNextBtn.style = "display: none;";
        }
    } else if (pavtType.value == "rigid") {
        if (sgCbrValue.value == "" || ruptureModulus.value == "" || elasticModulus.value == "" || loadTransferCoef.value == "" || subbaseThickness.value == "") {
            alert("Some fields are empty.");
        } else {
            trafficBox.style = "display: block;";
            calcBtnBox.style = "display: block;";
            materialNextBtn.style = "display: none;";
        }
    }
}

// STEP 05 - TRAFFIC
myAddBtn.addEventListener('click', trafficCalc);
let commuEsal = 0;
function trafficCalc(e) {
    let dd;
    if (carriagewayType.value == "single") {
        dd = 1;
    } else {
        dd = 0.55;
    }

    let dl;
    if (numberOfLanes.value == 1) {
        dl = 1;
    } else if (numberOfLanes.value == 2) {
        dl = 0.9;
    } else if (numberOfLanes.value == 3) {
        dl = 0.6;
    } else {
        dl = 0.4;
    }

    let esalValue;
    let tf;
    let gf;

    if (inputValue3.value > 0) {
        if (inputValue1.value == "1.2") {
            tf = 4.134;
            gf = (((1 + (inputValue3.value / 100)) ** designLife.value) - 1) / (inputValue3.value / 100);
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        } else if (inputValue1.value == "1.2-2") {
            tf = 13.931;
            gf = (((1 + (inputValue3.value / 100)) ** designLife.value) - 1) / (inputValue3.value / 100);
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        } else if (inputValue1.value == "1.22") {
            tf = 10.325;
            gf = (((1 + (inputValue3.value / 100)) ** designLife.value) - 1) / (inputValue3.value / 100);
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        } else if (inputValue1.value == "1.2-22") {
            tf = 10.512;
            gf = (((1 + (inputValue3.value / 100)) ** designLife.value) - 1) / (inputValue3.value / 100);
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        } else if (inputValue1.value == "1.22-22") {
            tf = 8.192;
            gf = (((1 + (inputValue3.value / 100)) ** designLife.value) - 1) / (inputValue3.value / 100);
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        } else if (inputValue1.value == "1.22+222") {
            tf = 10.789;
            gf = (((1 + (inputValue3.value / 100)) ** designLife.value) - 1) / (inputValue3.value / 100);
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        }
    } else if (inputValue3.value == 0) {
        if (inputValue1.value == "1.2") {
            tf = 4.134;
            gf = designLife.value;
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        } else if (inputValue1.value == "1.2-2") {
            tf = 13.931;
            gf = designLife.value;
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        } else if (inputValue1.value == "1.22") {
            tf = 10.325;
            gf = designLife.value;
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        } else if (inputValue1.value == "1.2-22") {
            tf = 10.512;
            gf = designLife.value;
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        } else if (inputValue1.value == "1.22-22") {
            tf = 8.192;
            gf = designLife.value;
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        } else if (inputValue1.value == "1.22+222") {
            tf = 10.789;
            gf = designLife.value;
            esalValue = Math.round(tf * gf * dd * dl * inputValue2.value * 365);
        }
    }

    if (inputValue1.value != "" && inputValue2.value != "" && inputValue3.value != "") {
        let zub = document.createElement('tr');
        zub.innerHTML = `<td>` + inputValue1.value + `</td>
        <td>`+ inputValue2.value + `</td>
        <td>`+ inputValue3.value + `</td>
        <td  id="esal">`+ esalValue + `</td>`;
        tableBody.append(zub);
    } else {
        esalValue = 0;
        alert("Some fields are empty.")
    }
    commuEsal = commuEsal + esalValue
    totalEsal.innerHTML = commuEsal;
}


//  CALCULATE THICKNESSES
claculateBtn.addEventListener('click', calculate);
function calculate(e) {
    // STEP 01 START - PAVEMENT PERFORMANCE
    let pi;
    let pt;
    let psi;
    if (pavtType.value == "flexible") {
        pi = 4.2;
    } else if (pavtType.value == "rigid") {
        pi = 4.5;
    }
    if (roadClass.value == "freeway" || roadClass.value == "arterial") {
        pt = 2.5;
    } else if (roadClass.value == "collector") {
        pt = 2.25;
    } else if (roadClass.value == "street") {
        pt = 2;
    }
    psi = (pi - pt).toFixed(2);
    console.log("Pi=" + pi + "<br>Pt=" + pt);
    console.log("PSI=" + psi);
    // STEP 01 END - PAVEMENT PERFORMANCE

    // STEP 02 START - ROADBED SOIL
    let subgradeK;
    let resModulus;
    if (pavtType.value == "flexible") {
        resModulus = (2555 * (sgCbrValue.value ** 0.64)).toFixed(2);
        console.log("Mr=" + resModulus);
    } else if (pavtType.value == "rigid") {
        subgradeK = (((1500 * sgCbrValue.value) / 26) ** 0.7788).toFixed(2);
        console.log("K-Value=" + subgradeK);
    }
    // STEP 02 END - ROAD BED SOIL

    // STEP 03 START - RELIABILITY
    let reliability;
    let zr;
    if (roadType.value == "urban" && roadClass.value == "freeway") {
        reliability = 95;
    } else if (roadType.value == "urban" && roadClass.value == "arterial") {
        reliability = 90;
    } else if (roadType.value == "urban" && roadClass.value == "collector") {
        reliability = 90;
    } else if (roadType.value == "urban" && roadClass.value == "street") {
        reliability = 70;
    } else if (roadType.value == "rural" && roadClass.value == "freeway") {
        reliability = 90;
    } else if (roadType.value == "rural" && roadClass.value == "arterial") {
        reliability = 85;
    } else if (roadType.value == "rural" && roadClass == "collector") {
        reliability = 85;
    } else if (roadType.value == "rural" && roadClass.value == "street") {
        reliability = 70;
    }

    if (reliability == 95) {
        zr = -1.645;
    } else if (reliability == 90) {
        zr = -1.282;
    } else if (reliability == 85) {
        zr = -1.037;
    } else if (reliability == 70) {
        zr = -0.524;
    }
    console.log("R=" + reliability);
    console.log("Zr=" + zr);

    // STEP 03 END - RELIABILITY

    // STEP 04 START - STANDARD DEVIATION
    let sd;
    if (pavtType.value == "flexible") {
        sd = 0.45;
    } else if (pavtType.value == "rigid") {
        sd = 0.35;
    }
    console.log("So=" + sd);
    // STEP 04 END - STANDARD DEVIATION

    // STEP 05 START - TRAFFIC
    console.log("ESAL=" + commuEsal);
    // STEP 05 END - TRAFFIC

    // STEP 06 START - MATERIAL PROPERTIES
    let sbModulus;
    let bsModulus;
    let abLayerCoef;
    let awLayerCoef;
    let sbLayerCoef;
    let bsLayerCoef;
    let drainageCoef;
    let subbaseK;
    if (pavtType.value == "flexible") {
        if (sbCbrValue.value == 20) {
            sbLayerCoef = 0.095;
        } else if (sbCbrValue.value == 25) {
            sbLayerCoef = 0.1;
        } else if (sbCbrValue.value == 30) {
            sbLayerCoef = 0.11;
        } else if (sbCbrValue.value == 35) {
            sbLayerCoef = 0.115;
        } else if (sbCbrValue.value == 40) {
            sbLayerCoef = 0.12;
        } else if (sbCbrValue.value == 45) {
            sbLayerCoef = 0.125;
        } else if (sbCbrValue.value == 50) {
            sbLayerCoef = 0.127;
        }

        if (bsCbrValue.value == 50) {
            bsLayerCoef = 0.118;
        } else if (bsCbrValue.value == 55) {
            bsLayerCoef = 0.122;
        } else if (bsCbrValue.value == 60) {
            bsLayerCoef = 0.125;
        } else if (bsCbrValue.value == 65) {
            bsLayerCoef = 0.129;
        } else if (bsCbrValue.value == 70) {
            bsLayerCoef = 0.132;
        } else if (bsCbrValue.value == 75) {
            bsLayerCoef = 0.134;
        } else if (bsCbrValue.value == 80) {
            bsLayerCoef = 0.136;
        } else if (bsCbrValue.value == 85) {
            bsLayerCoef = 0.137;
        } else if (bsCbrValue.value == 90) {
            bsLayerCoef = 0.139;
        }

        abLayerCoef = ((0.1776 * Math.log(abModulus.value)) - 1.9662).toFixed(3);
        awLayerCoef = ((0.0000005 * awModulus.value) + 0.215).toFixed(3);

        if (pavtType.value == "flexible") {
            drainageCoef = 0.9;
        } else if (pavtType.value == "rigid") {
            drainageCoef = 1;
        }

        sbModulus = Math.round((5585.3 * Math.log(sbCbrValue.value)) - 4257.5);
        bsModulus = Math.round((9001 * Math.log(bsCbrValue.value)) - 11129);
        console.log("AWC Layer Coef=" + awLayerCoef);
        console.log("AWC E. Modulus=" + awModulus.value);
        console.log("ABC Layer Coef=" + abLayerCoef);
        console.log("ABC E. Modulus=" + abModulus.value);
        console.log("AGB Layer Coef=" + bsLayerCoef);
        console.log("AGB CBR=" + bsCbrValue.value);
        console.log("SBS Layer Coef=" + sbLayerCoef);
        console.log("SBS CBR=" + sbCbrValue.value);
    } else if (pavtType.value == "rigid") {
        if (subgradeK >= 50 && subgradeK <= 100) {
            if (subbaseThickness.value == 4) {
                subbaseK = (((130 - 65) / (100 - 50)) * (subgradeK - 50)) + 65;
            } else if (subbaseThickness.value == 6) {
                subbaseK = (((140 - 75) / (100 - 50)) * (subgradeK - 50)) + 75;
            } else if (subbaseThickness.value == 9) {
                subbaseK = (((160 - 85) / (100 - 50)) * (subgradeK - 50)) + 85;
            } else if (subbaseThickness.value == 12) {
                subbaseK = (((190 - 110) / (100 - 50)) * (subgradeK - 50)) + 110;
            }
        } else if (subgradeK >= 100 && subgradeK <= 200) {
            if (subbaseThickness.value == 4) {
                subbaseK = (((230 - 130) / (200 - 100)) * (subgradeK - 100)) + 130;
            } else if (subbaseThickness.value == 6) {
                subbaseK = (((230 - 140) / (200 - 100)) * (subgradeK - 100)) + 140;
            } else if (subbaseThickness.value == 9) {
                subbaseK = (((270 - 160) / (200 - 100)) * (subgradeK - 100)) + 160;
            } else if (subbaseThickness.value == 12) {
                subbaseK = (((320 - 190) / (200 - 100)) * (subgradeK - 100)) + 190;
            }
        } else if (subgradeK >= 200 && subgradeK <= 300) {
            if (subbaseThickness.value == 4) {
                subbaseK = (((320 - 230) / (300 - 200)) * (subgradeK - 200)) + 230;
            } else if (subbaseThickness.value == 6) {
                subbaseK = (((330 - 230) / (300 - 200)) * (subgradeK - 200)) + 230;
            } else if (subbaseThickness.value == 9) {
                subbaseK = (((370 - 270) / (300 - 200)) * (subgradeK - 200)) + 270;
            } else if (subbaseThickness.value == 12) {
                subbaseK = (((430 - 320) / (300 - 200)) * (subgradeK - 200)) + 320;
            }
        }

        console.log("Subbase K-Value=" + subbaseK);
        console.log("Subbase Thickness=" + subbaseThickness.value);

    }

    // STEP 06 END - MATERIAL PROPERTIES

    // FINAL STEP START - THICKNESS DESIGN
    if (pavtType.value == "flexible") {
        // SN4
        if (sgCbrValue.value < 5) {
            let lhs4;
            lhs4 = (Math.log10(commuEsal)).toFixed(3);
            let rhs4 = 0;
            let sn4 = 0;
            for (let i = 0; rhs4 < lhs4; i++) {
                sn4 = sn4 + 0.001;

                rhs4 = (zr * sd) + ((9.36 * Math.log10(sn4 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn4 + 1) ** 5.19)))) + (2.32 * Math.log10(resModulus)) - (8.07));
            }
            sn4 = sn4.toFixed(3);
            // SN3
            let lhs3;
            lhs3 = (Math.log10(commuEsal)).toFixed(3);
            let rhs3 = 0;
            let sn3 = 0;

            for (let i = 0; rhs3 < lhs3; i++) {
                sn3 = sn3 + 0.001;

                rhs3 = (zr * sd) + ((9.36 * Math.log10(sn3 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn3 + 1) ** 5.19)))) + (2.32 * Math.log10(2555 * (10 ** 0.64))) - (8.07));
                // here in above equation, cbr of improved subgrade is takes as 10. Since. Mr=2555*(cbr^0.64), hence, Mr=2555*(10^0.64)
            }
            sn3 = sn3.toFixed(3);

            // SN2
            let lhs2;
            lhs2 = (Math.log10(commuEsal)).toFixed(3);
            let rhs2 = 0;
            let sn2 = 0;

            for (let i = 0; rhs2 < lhs2; i++) {
                sn2 = sn2 + 0.001;

                rhs2 = (zr * sd) + ((9.36 * Math.log10(sn2 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn2 + 1) ** 5.19)))) + (2.32 * Math.log10(sbModulus)) - (8.07));
            }
            sn2 = sn2.toFixed(3);

            // SN1
            let lhs1;
            lhs1 = (Math.log10(commuEsal)).toFixed(3);
            let rhs1 = 0;
            let sn1 = 0;

            for (let i = 0; rhs1 < lhs1; i++) {
                sn1 = sn1 + 0.001;

                rhs1 = (zr * sd) + ((9.36 * Math.log10(sn1 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn1 + 1) ** 5.19)))) + (2.32 * Math.log10(bsModulus)) - (8.07));
            }
            sn1 = sn1.toFixed(3);


            // Final Thicknesses
            // Surface Course
            let surfTh = sn1 / abLayerCoef;
            awcTh = 2;
            abcTh = surfTh - awcTh;

            sn1 = abLayerCoef * surfTh;

            // Base Course
            aggbsTh = Math.ceil(((sn2 - sn1) / (bsLayerCoef * drainageCoef)) * 2) / 2;

            sn2 = sn1 + (bsLayerCoef * drainageCoef * aggbsTh);

            // Subbase Course
            sbTh = Math.ceil(((sn3 - sn2) / (sbLayerCoef * drainageCoef)) * 2) / 2;
            sn3 = sn2 + (sbLayerCoef * drainageCoef * sbTh);
            // Improved Subgrade Thickness
            impSgTh = Math.ceil(((sn4 - sn3) / (0.08 * drainageCoef)) * 2) / 2;

            awcTh = Math.ceil(awcTh * 25);
            abcTh = Math.ceil(abcTh * 25);
            if (aggbsTh <= 4) {
                aggbsTh = 4 * 25;
            } else {
                aggbsTh = Math.ceil(aggbsTh * 25);
            }
            if (sbTh <= 4) {
                sbTh = 4 * 25;
            } else {
                sbTh = Math.ceil(sbTh * 25);
            }
            impSgTh = Math.ceil(impSgTh * 25);

            displayImpSg.style = "display: block;"
        } else {
            // SN3
            let lhs3;
            lhs3 = (Math.log10(commuEsal)).toFixed(3);
            let rhs3 = 0;
            let sn3 = 0;

            for (let i = 0; rhs3 < lhs3; i++) {
                sn3 = sn3 + 0.001;
                rhs3 = (zr * sd) + ((9.36 * Math.log10(sn3 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn3 + 1) ** 5.19)))) + (2.32 * Math.log10(resModulus)) - (8.07));
            }
            sn3 = sn3.toFixed(3);

            // SN2
            let lhs2;
            lhs2 = (Math.log10(commuEsal)).toFixed(3);
            let rhs2 = 0;
            let sn2 = 0;

            for (let i = 0; rhs2 < lhs2; i++) {
                sn2 = sn2 + 0.001;
                rhs2 = (zr * sd) + ((9.36 * Math.log10(sn2 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn2 + 1) ** 5.19)))) + (2.32 * Math.log10(sbModulus)) - (8.07));
            }
            sn2 = sn2.toFixed(3);

            // SN1
            let lhs1;
            lhs1 = (Math.log10(commuEsal)).toFixed(3);
            let rhs1 = 0;
            let sn1 = 0;

            for (let i = 0; rhs1 < lhs1; i++) {
                sn1 = sn1 + 0.001;

                rhs1 = (zr * sd) + ((9.36 * Math.log10(sn1 + 1)) - (0.2) + ((Math.log10(psi / 1.7)) / (0.4 + (1094 / ((sn1 + 1) ** 5.19)))) + (2.32 * Math.log10(bsModulus)) - (8.07));
            }
            sn1 = sn1.toFixed(3);



            // Final Thicknesses
            // Surface Course
            let surfTh = sn1 / abLayerCoef;
            awcTh = 2;
            abcTh = surfTh - awcTh;

            sn1 = abLayerCoef * surfTh;

            // Base Course
            aggbsTh = Math.ceil(((sn2 - sn1) / (bsLayerCoef * drainageCoef)) * 2) / 2;

            sn2 = sn1 + (bsLayerCoef * drainageCoef * aggbsTh);

            // Subbase Course
            sbTh = Math.ceil(((sn3 - sn2) / (sbLayerCoef * drainageCoef)) * 2) / 2;
            sn3 = sn2 + (sbLayerCoef * drainageCoef * sbTh);


            awcTh = Math.ceil(awcTh * 25);
            abcTh = Math.ceil(abcTh * 25);
            if (aggbsTh <= 4) {
                aggbsTh = 4 * 25;
            } else {
                aggbsTh = Math.ceil(aggbsTh * 25);
            }
            if (sbTh <= 4) {
                sbTh = 4 * 25;
            } else {
                sbTh = Math.ceil(sbTh * 25);
            }
        }
        displayAwcTh.textContent = 'Asphalt Wearing Course (E = ' + awModulus.value + ' psi) - ' + awcTh + ' mm';
        displayAbcTh.textContent = 'Asphalt Base Course (E = ' + abModulus.value + ' psi) - ' + abcTh + ' mm';
        displayAggbsTh.textContent = 'Aggregate Base Course (CBR ' + bsCbrValue.value + ') - ' + aggbsTh + ' mm';
        displaySbTh.textContent = 'Granular Subbase Course (CBR ' + sbCbrValue.value + ') - ' + sbTh + ' mm';
        displayImpSg.textContent = 'Improved Subgrade (CBR 10) - ' + impSgTh + ' mm';
        displaySgTh.textContent = 'Natural Subgrade (CBR ' + sgCbrValue.value + ')';
    } else if (pavtType.value == "rigid") {
        let sc = 690;
        let cd = 1;
        let j = 3.2;
        let ec = 4000000;

        let lhs = Math.log10(commuEsal);
        console.log(lhs);
        let rhs = 0;
        let d = 4;
        for (let i = 0; rhs < lhs; i++) {
            d = d + 0.01;

            rhs = (zr * sd) + (7.35 * Math.log10(d + 1)) - 0.06 + ((Math.log10(psi / 3)) / (1 + (16240000 / ((d + 1) ** 8.46)))) + ((4.22 - (0.32 * 2.5)) * Math.log10((ruptureModulus.value * cd * ((d ** 0.75) - 1.132)) / (215.63 * loadTransferCoef.value * ((d ** 0.75) - (18.42 / ((elasticModulus.value / subbaseK) ** 0.25))))));
        }
        d = Math.ceil(d * 25);
        console.log("D=" + d);

        displayAwcTh.textContent = 'Cement Concrete Slab (E = ' + elasticModulus.value + ' psi) - ' + d + ' mm';
        displayAbcTh.style = "display: none;";
        displayAggbsTh.style = "display: none;";
        displaySbTh.textContent = 'Untreated Subbase Course (K-Value ' + Math.ceil(subbaseK) + ' pci) - ' + (subbaseThickness.value * 25) + ' mm';
        displayImpSg.tyle = "display: none;";
        displaySgTh.textContent = 'Natural Subgrade (CBR ' + sgCbrValue.value + ')';
    }




    // Thickness Adjustments


    // FINAL STEP END - THICKNESS DESIGN

    // Show result
    resultBox.style = "visibility: visible;"
}


// CLOSE RESULT BOX
closeDisplay.addEventListener('click', closeResultBox);
function closeResultBox(e) {
    resultBox.style = "visibility: hidden;"
    location.reload();
}

// Menu Btn
menuBtn.addEventListener('click', showMail);
function showMail(e) {
    showMailBox.style = "display: flex;";
}
