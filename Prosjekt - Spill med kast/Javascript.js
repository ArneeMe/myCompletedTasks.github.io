const hoydeInp = document.querySelector("#hoyde");
const vinkelInp = document.querySelector("#vinkel");
const kule = document.querySelector("#kule");
const kanon = document.querySelector("#kanon");
const blink = document.querySelector("#blink");
const tekstVinkel= document.querySelector("#tekstVinkel");
const tekstHoyde = document.querySelector("#tekstHoyde");
const tekstXpos = document.querySelector("#tekstXpos");
const tekstYpos = document.querySelector("#tekstYpos");

let fart  = 10;
let vinkel = 45;
let fartX = fart*Math.cos(vinkel*Math.PI/180);
let fartY = fart*Math.sin(vinkel*Math.PI/180);
let tyngdekraft = 0.1;
let teller  =0;
let kuleY = 400;
let kuleX = 20;
let blinkX = 700;
let blinkY= 270;

kule.style.marginTop= kuleY + "px";
kule.style.marginLeft= kuleX + "px";
kanon.style.marginTop =  (kuleY-70) + "px";
blink.style.marginTop= blinkY + "px";
blink.style.marginLeft= blinkX + "px";
let kollisjon = false;
let startet = false; // Slik at man ikke kan trykke på knappen mange ganger
let seier;

function avfyr() {
    if (startet === false) {
        startet = true;
        if (teller === 0) {
            kanon.src = "bilder/kanon.gif"
        }
        setTimeout(skudd, 420);
    }
}
function byttBilde () {
    kanon.src = "bilder/kanonFirstFrame.png"
}
function skudd () {
    teller += 1;
    kuleX += fartX;
    kuleY = kuleY - (fartY - tyngdekraft * teller);
    kule.style.marginTop = kuleY + "px";
    kule.style.marginLeft = kuleX + "px";
    tekstXpos.innerHTML = `X-posisjon er ${kuleX.toFixed(0)}`;
    tekstYpos.innerHTML = `Y-posisjon er ${kuleY.toFixed(0)}`;
    console.log("X = " + kuleX + ", Y er = " + kuleY);
    regnUtKollisjon();
    setTimeout(byttBilde, 420)
    if (kollisjon === false) {
        requestAnimationFrame(skudd);
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
    console.log(startet)
    if (radiusDifferanse <= 0) {
        console.log("Du traff blinken");
        kollisjon = true;
        seier = true;

    }
    else if (kuleX > 800 || kuleX<0 || kuleY > 500 || kuleY <0)  {
        console.log("Du bomma! Prøv igjen");
        kollisjon = true;
        seier = false;

    }
}

function reset() {
    kuleY = 400- hoydeInp.value;
    kuleX = 20;
    teller = 0;
    fart  = 10;
    fartX = fart*Math.cos(vinkel*Math.PI/180);
    fartY = fart*Math.sin(vinkel*Math.PI/180);
    tyngdekraft = 0.1;
    kule.style.marginTop=kuleY + "px";
    kule.style.marginLeft=kuleX + "px";
    tekstXpos.innerHTML = `X-posisjon er ${kuleX.toFixed(0)}`;
    tekstYpos.innerHTML = `Y-posisjon er ${kuleY.toFixed(0)}`;
    kollisjon = false;
    seier = false;
    startet= false;
}
hoydeInp.onchange  = function () {
    if(hoydeInp.value < 400) {
        kuleY = 400;
        kuleY = kuleY - hoydeInp.value;
        kule.style.marginTop = kuleY + "px";
        tekstHoyde.innerHTML = `Høyden er ${hoydeInp.value}`;
        kanon.style.marginTop = (kuleY-70)  + "px";
    }
};

vinkelInp.onchange = function () {
    vinkel = vinkelInp.value;
    tekstVinkel.innerHTML = `Vinkelen er ${vinkel} grader`;
    fartX = fart*Math.cos(vinkel*Math.PI/180);
    fartY = fart*Math.sin(vinkel*Math.PI/180);
    let kanonCSS = [
        {
            transform: "rotate(0deg)"
        },
        {

            transform: "rotate("+vinkel+"deg)"
        }
    ];

    kanon.animate(kanonCSS,{duration:3000});
};


