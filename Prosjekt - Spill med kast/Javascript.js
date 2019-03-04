const hoydeInp = document.querySelector("#hoyde");
const vinkelInp = document.querySelector("#vinkel");
const kule = document.querySelector("#kule");
const kanon = document.querySelector("#kanon");
const blink = document.querySelector("#blink");
const tekstVinkel= document.querySelector("#tekstVinkel");
const tekstHoyde = document.querySelector("#tekstHoyde");
const tekstXpos = document.querySelector("#tekstXpos");
const tekstYpos = document.querySelector("#tekstYpos");
hoydeInp.value = 0; //Slik at starthøyden er 0;

let fart = 0;
let stigning = "positiv";
let vinkel = 45;
let fartX = fart*Math.cos(vinkel*Math.PI/180);
let fartY = fart*Math.sin(vinkel*Math.PI/180);
let tyngdekraft = 0.1;
let teller  =0; //Teller i sammenheng med tyngdekraft "tiden"
let kuleY = 400;
let kuleX = 20;
let blinkX = (Math.random()*300)+400;
let blinkY= Math.random()*400;

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

document.onkeydown = function() {
    if (startet === false) {
        interval = setInterval(leggTilTid(), 1000);
    }
};
document.onkeyup = function () {
    if (startet === false) {
        clearInterval(interval);
        console.log("Slutt farten ble " + fart);
        fartX = fart * Math.cos(vinkel * Math.PI / 180);
        fartY = fart * Math.sin(vinkel * Math.PI / 180);
        avfyr();
        fart = 0;

    }
};

function leggTilTid(){
    if (stigning === "positiv") {
        fart = fart + 1;
        if (fart === 15) {
            stigning = "negativ";
        }
    }
        else if (stigning === "negativ") {
            fart = fart- 1;
            if (fart <= 1) {
                stigning = "positiv";
            }
        }
    console.log(fart, stigning);
}
function avfyr() {
    kollisjon = false;
    nullstill = false;
    if (startet === false) {
        startet = true; //Sjekker om den allerede har startet, hvis ikke starter den det og sier at startet = true
        kanon.src = "bilder/kanon.gif"; //Bytter fra bilde til gif
        setTimeout(skudd, 420); //delay slik at det passer med animasjonen
    }
}
function byttBilde () {
    kanon.src = "bilder/kanonFirstFrame.png"
}
function skudd () {
    if (nullstill === false) {
        teller += 1;
        kuleX += fartX;
        kuleY = kuleY - (fartY - tyngdekraft * teller);
        kule.style.marginTop = kuleY + "px";
        kule.style.marginLeft = kuleX + "px";
        tekstXpos.innerHTML = `X-posisjon er ${kuleX.toFixed(0)}`;
        tekstYpos.innerHTML = `Y-posisjon er ${kuleY.toFixed(0)}`;
     //   console.log("X = " + kuleX + ", Y er = " + kuleY);
        regnUtKollisjon();
        setTimeout(byttBilde, 700);
        if (kollisjon === false) {
            requestAnimationFrame(skudd);
        }
    }

}
function regnUtKollisjon() {
    let kuleArray = ["kule", kuleX, kuleY];
    let blinkArray = ["blink", blinkX, blinkY];
    let vektorMellomBilder = [kuleArray[1] - blinkArray[1], kuleArray[2] - blinkArray[2]];
    let absMellomBilder = Math.round(Math.sqrt(((vektorMellomBilder[0]) * (vektorMellomBilder[0])) + ((vektorMellomBilder[1]) * (vektorMellomBilder[1]))));
    let radiusDifferanse = absMellomBilder - (35);
    //console.log("Abs mellom bilder er " + absMellomBilder);
    // console.log("Differanse i radius = " + radiusDifferanse);
    if (radiusDifferanse <= 0) {
        console.log("Du traff blinken");
        kollisjon = true;
        seier = true;
        nyttSkudd()

    }
    else if (kuleX > 800 || kuleX<0 || kuleY > 500 || kuleY <0)  {
        console.log("Du bomma! Prøv igjen");
        kollisjon = true;
        seier = false;
        nyttSkudd()

    }
}

function nyttSkudd() {
    if (seier === true){
        blinkX = (Math.random()*300)+400;
        blinkY= Math.random()*400;
        blink.style.marginTop= blinkY + "px";
        blink.style.marginLeft= blinkX + "px";
    }
    kuleY = 400- hoydeInp.value;
    kuleX = 20;
    teller = 0;
    fart  = 0;
    fartX = fart*Math.cos(vinkel*Math.PI/180);
    fartY = fart*Math.sin(vinkel*Math.PI/180);
    tyngdekraft = 0.1;
    kule.style.marginTop=kuleY + "px";
    kule.style.marginLeft=kuleX + "px";
    seier = false;
    startet= false;
    oppdaterTekst();
}

function reset() {
    kuleY = 400;
    kuleX = 20;
    teller = 0;
    fart  = 10;
    vinkel = 45;
    fartX = fart*Math.cos(vinkel*Math.PI/180);
    fartY = fart*Math.sin(vinkel*Math.PI/180);
    tyngdekraft = 0.1;
    kule.style.marginTop=kuleY + "px";
    kule.style.marginLeft=kuleX + "px";
    kanon.style.marginTop =  (kuleY-70) + "px";
    hoydeInp.value = 0;
    vinkelInp.value = 45;
    kollisjon = false;
    seier = false;
    startet= false;
    nullstill = true;
    oppdaterTekst();
}

function oppdaterTekst(){
    tekstXpos.innerHTML = `X-posisjon er ${kuleX.toFixed(0)}`;
    tekstYpos.innerHTML = `Y-posisjon er ${kuleY.toFixed(0)}`;
    tekstHoyde.innerHTML = `Starthøyden er ${hoydeInp.value}`;
    tekstVinkel.innerHTML = `Vinkelen er ${vinkel} grader`;
}
hoydeInp.onchange  = function () {
    if(hoydeInp.value < 400 && startet===false) {
        kuleY = 400;
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
        let kanonCSS = [
            {
                transform: "rotate(0deg)"
            },
            {

                transform: "rotate(" + vinkel + "deg)"
            }
        ];

        // kanon.animate(kanonCSS,{duration:3000});
    }
};




