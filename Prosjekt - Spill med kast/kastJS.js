const hoydeInp = document.querySelector("#hoyde");
const vinkelInp = document.querySelector("#vinkel");
const fartInp = document.querySelector("#fart");
const tyngdekraftInp = document.querySelector("#tyngdekraft");
const kule = document.querySelector("#kule");
const kanon = document.querySelector("#kanon");
const blink = document.querySelector("#blink");
const tekstVinkel= document.querySelector("#tekstVinkel");
const tekstHoyde = document.querySelector("#tekstHoyde");
const tekstXpos = document.querySelector("#tekstXpos");
const tekstYpos = document.querySelector("#tekstYpos");
hoydeInp.value = 0; //Slik at starthøyden er 0;
vinkelInp.value = 45;
fartInp.value = 0;


let vinduHoyde = window.innerHeight;
let vinduBredde = window.innerWidth;
let fart = 0;
let stigning = "positiv";
let vinkel = 45;
let fartX = fart*Math.cos(vinkel*Math.PI/180);
let fartY = fart*Math.sin(vinkel*Math.PI/180);
let tyngdekraft = 0.1;
let teller  = 0; //Teller i sammenheng med tyngdekraft "tiden"
let antallSeier = 0;
let antallFiender = 0;
let kuleY = vinduHoyde-250;
let kuleX = 20;
let blinkX = (Math.random()*300)+(vinduBredde-420);
let blinkY= Math.random()*(vinduHoyde-200);
let kuleYtekst;
let fiende;
let fiendeArray = [];
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
    fartInp.value= fart;
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
function skudd () {
    if (nullstill === false) {
        teller += 1;
        kuleX += fartX;
        kuleY = kuleY - (fartY - tyngdekraft * teller);
        kule.style.marginTop = kuleY + "px";
        kule.style.marginLeft = kuleX + "px";
        kuleYtekst = 400 - kuleY;
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
    let radiusDifferanse = absMellomBilder - (35);
    //console.log("Abs mellom bilder er " + absMellomBilder);
    // console.log("Differanse i radius = " + radiusDifferanse);
    if (radiusDifferanse <= 0) {
        console.log("Du traff blinken");
        kollisjon = true;
        seier = true;
        antallSeier++;
        console.log(antallSeier);
        nyttSkudd()
    }
    else if (kuleX > vinduBredde || kuleX<0 || kuleY > (vinduHoyde-150) || kuleY <-300)  {
        console.log("Du bomma! Prøv igjen");
        kollisjon = true;
        seier = false;
        nyttSkudd()
    }

    for (let i = 0; i<antallFiender; i++){
        let fiendeX = fiendeArray[i][1];
        let fiendeY = fiendeArray[i][2];
       console.log(fiendeX);
        let vektorBlinkFiende = [kuleArray[1] - fiendeX, kuleArray[2] - fiendeY];
      //  console.log(vektorBlinkFiende);
        let absMellomBilder = Math.round(Math.sqrt(((vektorBlinkFiende[0]) * (vektorBlinkFiende[0])) + ((vektorBlinkFiende[1]) * (vektorBlinkFiende[1]))));
        let radiusDifferanse = absMellomBilder - (5);
  //      console.log(absMellomBilder)

        if (radiusDifferanse <= 0){
            console.log("Du traff fienden");
            kollisjon = true;
            seier = false;
            reset();
        }
    }

}

function nyttSkudd() {
    if (seier === true){
        oppdaterBlink();
    }
    kuleY = vinduHoyde-250;
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
}

function reset() {
    kuleY = vinduHoyde-250;
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
    oppdaterBlink();
    oppdaterTekst();
}

function oppdaterTekst(){
    kuleYtekst = 400-kuleY;
    tekstXpos.innerHTML = `X-posisjon er ${kuleX.toFixed(0)}`;
    tekstYpos.innerHTML = `Y-posisjon er ${kuleYtekst.toFixed(0)}`;
    tekstHoyde.innerHTML = `Starthøyden er ${hoydeInp.value}`;
    tekstVinkel.innerHTML = `Vinkelen er ${vinkel} grader`;
}

function oppdaterBlink(){
    blinkX = (Math.random()*300)+(vinduBredde-420);
    blinkY= Math.random()*(vinduHoyde-200);
    blink.style.marginTop= blinkY + "px";
    blink.style.marginLeft= blinkX + "px";
}
hoydeInp.onchange  = function () {
    if(hoydeInp.value < (vinduHoyde-250) && startet===false) {
        kuleY = vinduHoyde-250;
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
    fiende.className = "fiende" + antallFiender;
    fiende.style.position= "absolute";
    //fiende.i = "stjerne1";
    fiende.style.marginLeft = (Math.random()*(vinduBredde-200))+200 + "px";
    fiende.style.marginTop =  (Math.random()*500)+(vinduHoyde-800) + "px";
    fiende.src = "bilder/sortHull2.jpg";
    fiende.style.width = (10) + "px";
    document.body.appendChild(fiende);
    let fiendeKordinatArray = [fiende.className,fiende.style.marginLeft, fiende.style.marginTop];
    fiendeArray.push(fiendeKordinatArray);
    console.log(fiendeArray)




}


