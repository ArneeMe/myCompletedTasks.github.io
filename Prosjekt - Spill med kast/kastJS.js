const hoydeInp = document.querySelector("#hoyde");
const vinkelInp = document.querySelector("#vinkel");
const fartInp = document.querySelector("#fart");
const tyngdekraftInp = document.querySelector("#tyngdekraft");
const kule = document.querySelector("#kule");
const kanon = document.querySelector("#kanon");
const blink = document.querySelector("#blink");
const tekstVinkel= document.querySelector("#tekstVinkel");
const tekstHoyde = document.querySelector("#tekstHoyde");
const tekstFart = document.querySelector("#tekstFart");
const tekstXpos = document.querySelector("#tekstXpos");
const tekstYpos = document.querySelector("#tekstYpos");
const tekstSeier = document.querySelector("#tekstSeier");
const tekstTilbakemelding = document.querySelector("#tekstTilbakemelding");
const tekstTips = document.querySelector("#tekstTips");
const fiendeParent = document.querySelector("#fiendeParent");
hoydeInp.value = 0; //Slik at starthøyden er 0;
vinkelInp.value = 45;
fartInp.value = 0;
const tipsArray = ["Spillet fungerer dårlig hvis du scroller vinduet, zoom heller ut", "Husk å endre vinkel for å treffe akkuratt", "Starthøyde kan være lurt å variere","En fiende -eller et svart hull - restarter spillet", "Du kan endre tyngdkraften i rullevinduet øverst","Det legges til en fiende hver gang du treffer blinken", "Bruk knappene nederst til å endre antallet fiender", "Bruk de ulike tyngdekreftene til din fordel!"];

let fart = 0;
let stigning = "positiv";
let vinkel = 45;
let fartX = fart*Math.cos(vinkel*Math.PI/180);
let fartY = fart*Math.sin(vinkel*Math.PI/180);
let tyngdekraft = 0.1;
let teller  = 0; //Teller i sammenheng med tyngdekraft "tiden"
let antallSeier = 0;
let antallFiender = 0;
let kuleY = 500;
let kuleX = 20;
let blinkX = (Math.random()*420)+600;
let blinkY = (Math.random()*(420))+80;
let kuleYtekst;
let fiende;
let fiendeArray = [];
let minsteAvstandArray= [];
let tilfeldigTall = 1;
kule.style.marginTop= kuleY + "px";
kule.style.marginLeft= kuleX + "px";
kanon.style.marginTop =  (kuleY-70) + "px";
blink.style.marginTop= blinkY + "px";
blink.style.marginLeft= blinkX + "px";
let kollisjon = false;
let startet = false; // Slik at man ikke kan trykke på knappen mange ganger
let seier = false; //Sjekker om bruker har vunnet
let nullstill = false; //Nullstill brukes i sammenheng med funksjon reset(), slik at programmet vet at den skal stoppe å kjøre skudd() funksjonen
let interval; //brukes for å telle hvor lenge bruker holder inne en tast

/*
window.onmousemove = function(event){
    console.log(event.clientX, event.clientY)
}
*/
document.onkeydown = function(e) {
    if (startet === false && e.keyCode === 32) {
        interval = setInterval(leggTilTid(), 1000);
    }
};
document.onkeyup = function () {
    if (startet === false) {
        clearInterval(interval);
        if (fart > 1) {
            console.log("Slutt farten ble " + fart);
            fartX = fart * Math.cos(vinkel * Math.PI / 180);
            fartY = fart * Math.sin(vinkel * Math.PI / 180);
            avfyr();
        }
        else{
            console.log("Hold inne litt lengre!")
        }
        fart = 0;
    }
};
function leggTilTid() {
    if (stigning === "positiv") {
        fart = fart + 1;
        if (fart === 15) {
            stigning = "negativ";
        }
    } else if (stigning === "negativ") {
        fart = fart - 1;
        if (fart <= 1) {
            stigning = "positiv";
        }
    }
    fartInp.value = fart;
    tekstFart.innerHTML = `Utskytningsfarten er ${fart}`;
}
function avfyr() {
    kollisjon = false;
    nullstill = false;
    minsteAvstandArray= [];
    console.log("Fart er " + fart + "");
    kanon.src = "bilder/kanon.gif"; //Bytter fra bilde til gif
    if (startet === false) {
        startet = true; //Sjekker om den allerede har startet, hvis ikke starter den det og sier at startet = true
        setTimeout(skudd, 420); //delay slik at det passer med animasjonen
    }
}
function skudd () {
    if (nullstill === false) {
        teller += 1;
        kuleX += fartX;
        kuleY = kuleY - (fartY - tyngdekraft * teller);
        kule.style.marginTop = kuleY + "px";
        kule.style.marginLeft = kuleX + "px";
        kuleYtekst = 500 - kuleY;
        tekstXpos.innerHTML = `X-posisjon er ${kuleX.toFixed(0)}`;
        tekstYpos.innerHTML = `Y-posisjon er ${kuleYtekst.toFixed(0)}`;
        //   console.log("X = " + kuleX + ", Y er = " + kuleY);
        regnUtKollisjon();
        setTimeout(byttBilde, 700);
        if (kollisjon === false) {
            requestAnimationFrame(skudd);

        }
    }
}
function byttBilde () {
    kanon.src = "bilder/kanonFirstFrame.png"
}

function regnUtKollisjon() {
    let kuleArray = ["kule", kuleX, kuleY];
    let blinkArray = ["blink", blinkX, blinkY];
    let vektorMellomBilder = [kuleArray[1] - blinkArray[1], kuleArray[2] - blinkArray[2]];
    let absMellomBilder = Math.round(Math.sqrt(((vektorMellomBilder[0]) * (vektorMellomBilder[0])) + ((vektorMellomBilder[1]) * (vektorMellomBilder[1]))));
    //console.log("Abs mellom bilder er " + absMellomBilder);
    // console.log("Differanse i radius = " + radiusDifferanse);
    if (absMellomBilder <= 35) {
        console.log("Du traff blinken");
        kollisjon = true;
        seier = true;
        antallSeier++;
        console.log("Seiere er " +antallSeier);
        leggTilFiende();
        oppdaterBlink();
        nyttSkudd();
        tekstTilbakemelding.style.color = "#4CAF50";
        tekstTilbakemelding.innerHTML = "Grattis, du traff!";
    }
    else if (kuleX > 1200  || kuleX<0 || kuleY > 600 || kuleY <-500) {
        console.log("Du bomma! Prøv igjen");
        kollisjon = true;
        seier = false;
        nyttSkudd()
        if (minsteAvstandArray[0] < 30 && minsteAvstandArray[0] > 10) {
            tekstTilbakemelding.style.color = "blue";
            tekstTilbakemelding.innerHTML = "Det var nærme fienden!";
            console.log("Det var nærme fienden")
        } else {
            tekstTilbakemelding.style.color = "red";
            tekstTilbakemelding.innerHTML = "Du bomma, prøv igjen!"
        }
    }
    for (let i = 0; i<antallFiender; i++){
        let fiendeX = fiendeArray[i][1];
        let fiendeY = fiendeArray[i][2];
        //console.log("Fiende x er " + Math.round(fiendeX) + "Fiende Y er " + Math.round(fiendeY))
        let vektorBlinkFiende = [kuleArray[1] - fiendeX, kuleArray[2] - fiendeY];
        //console.log(vektorBlinkFiende);
        let absMellomBilder2 = Math.round(Math.sqrt(((vektorBlinkFiende[0]) * (vektorBlinkFiende[0])) + ((vektorBlinkFiende[1]) * (vektorBlinkFiende[1]))));
        //console.log("Abs er " + absMellomBilder2);
        minsteAvstandArray.push(absMellomBilder2);
        // console.log("Kule x,y er "+ Math.round(kuleX) +"," +Math.round(kuleY) + ". Fienden er ved " + Math.round(fiendeX)+ "," + Math.round(fiendeY) + ". Abs er da "+ absMellomBilder2)
        if (absMellomBilder2 <= 10){
            console.log("Du traff fienden");
            kollisjon = true;
            seier = false;
            reset();
        }
    }
    minsteAvstandArray.sort(function(a, b){return a - b});
}
function nyttSkudd() {
    kuleY = 500;
    kuleY = kuleY - hoydeInp.value;
    kuleX = 20;
    teller = 0;
    fart  = 0;
    fartX = fart*Math.cos(vinkel*Math.PI/180);
    fartY = fart*Math.sin(vinkel*Math.PI/180);
    kule.style.marginTop=kuleY + "px";
    kule.style.marginLeft=kuleX + "px";
    kanon.style.marginTop =  (kuleY-70) + "px";
    fartInp.value=0;
    seier = false;
    startet= false;
    oppdaterTekst();

    console.log(tilfeldigTall);
    if (tilfeldigTall===1){
        oppdaterTips();
    }
    tilfeldigTall = Math.round(Math.random()*3);
}
function reset() {
    kuleY = 500;
    kuleX = 20;
    teller = 0;
    fart  = 0;
    vinkel = 45;
    fartX = fart*Math.cos(vinkel*Math.PI/180);
    fartY = fart*Math.sin(vinkel*Math.PI/180);
    kule.style.marginTop=kuleY + "px";
    kule.style.marginLeft=kuleX + "px";
    kanon.style.marginTop =  (kuleY-70) + "px";
    hoydeInp.value = 0;
    vinkelInp.value = 45;
    kollisjon = false;
    seier = false;
    startet= false;
    nullstill = true;
    fjernFiender();
    oppdaterBlink();
    oppdaterTekst();
    tekstTilbakemelding.style.color = "black";
    tekstTilbakemelding.innerHTML=`Du traff blinken ${antallSeier} ganger før du traff et sort hull `;
    antallSeier = 0;
    tekstSeier.innerHTML = `Antall treff: 0`
   // window.location.href =
}
function oppdaterTekst(){
    kuleYtekst = 500 - kuleY;
    tekstXpos.innerHTML = `X-posisjon er ${kuleX.toFixed(0)}`;
    tekstYpos.innerHTML = `Y-posisjon er ${kuleYtekst.toFixed(0)}`;
    tekstHoyde.innerHTML = `Starthøyden er ${hoydeInp.value}`;
    tekstVinkel.innerHTML = `Vinkelen er ${vinkel} grader`;
    tekstSeier.innerHTML = `Antall treff: ${antallSeier}`;
    console.log("minsteavstand array" + minsteAvstandArray[0]);
}
function oppdaterBlink(){
    blinkX = (Math.random()*420)+ 600;
    blinkY= ((Math.random()*420))+80;
    blink.style.marginTop= blinkY + "px";
    blink.style.marginLeft= blinkX + "px";
}
hoydeInp.onchange  = function () {
    if(startet===false) {
        kuleY = 500;
        kuleY = kuleY - hoydeInp.value;
        kule.style.marginTop = kuleY + "px";
        kanon.style.marginTop = (kuleY-70)  + "px";
        oppdaterTekst();
    }
};
vinkelInp.onchange = function () {
    vinkel = vinkelInp.value;
    if (startet === false) {
        fartX = fart * Math.cos(vinkel * Math.PI / 180);
        fartY = fart * Math.sin(vinkel * Math.PI / 180);
        oppdaterTekst();
    }
};
tyngdekraftInp.onchange = function () {
    if (tyngdekraftInp.value === "1"){
        tyngdekraft = 0.1;
    }
    else if (tyngdekraftInp.value === "2"){
        tyngdekraft = 0.01;
    }
    else if (tyngdekraftInp.value === "3"){
        tyngdekraft = 0.3
    }
};
function leggTilFiende() {
    antallFiender+= 1;
    fiende = document.createElement("img");
    fiende.id = "fiende" + antallFiender;
    fiende.className = "fiende";
    fiende.style.position= "absolute";
    //fiende.i = "stjerne1";
    let fiendeStartX = (Math.random()*(900))+100;
    let fiendeStartY =  (Math.random()*300)+200;
    fiende.style.marginLeft = fiendeStartX + "px";
    fiende.style.marginTop =  fiendeStartY + "px";
    fiende.src = "bilder/sortHull2.jpg";
    fiende.style.width = (10) + "px";
    fiende.style.height = (10)+ "px";
    fiende.style.transform = "translate(-50%, -50%)";
    fiendeParent.appendChild(fiende);
    let fiendeKordinatArray = [fiende.id,fiendeStartX, fiendeStartY];
    fiendeArray.push(fiendeKordinatArray);
    console.log(fiendeArray)
}
function fjernFiender() {
    for (let h=1;h<antallFiender+1; h++) {
        const elements = document.getElementById("fiende"+h);
        elements.remove();
    }
    antallFiender=0;
    fiendeArray=[];
    tekstSeier.innerHTML = `Antall treff: 0`
}
function oppdaterTips() {
    let tilfeldigTips = tipsArray[(Math.round(Math.random()*(tipsArray.length-1)))];
    tekstTips.innerHTML = tilfeldigTips;

}