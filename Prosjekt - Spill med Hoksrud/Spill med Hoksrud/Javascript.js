let player = document.getElementById("player"); // oppretter en variabel som refererer til div-elementet
let sjokomelk = document.getElementById("sjokomelk");
let moxnes = document.getElementById("moxnes");
let playerX = 1; //Startposisjon til player
let playerY= 1;

let sjokomelkX= 800+(Math.floor(Math.random()*200)); //Startposisjon til sjokolademelk (eller det du skal prøve å ta)
let sjokomelkY = Math.floor(Math.random()*400);
sjokomelk.style.marginLeft = sjokomelkX +"px";
sjokomelk.style.marginTop = sjokomelkY +"px";

let moxnesX = 1000; //Startposisjon til det som prøver å fange deg
let moxnesY = Math.floor(Math.random()*400);
moxnes.style.marginLeft= moxnesX + "px"; //faktisk endrer
moxnes.style.marginTop = moxnesY + "px";


let level = 1; //Levelet du er på
let vansklighetsgradTall = 1; //Vansklighetsgraden øker men level, men synker hvis du ikke klarer lv1
let sjekkVinn; //Variabel som jeg bruker for å sette kollisjon som enten True eller False

let lydVinn = document.getElementById("lydVinn"); //Henter lydelement fra HTML
let lydTap = document.getElementById("lydTap");

let n =0; //Variabel i sammenheng med å bytte playerIcon
let hoksrud = ["bardhoksrudRedigert1.jpg", "sjokomelkRedigert1.jpg", "moxnes2Redigert1.jpg", "Bård Hoksrud","sjokomelk","Moxnes", "ghostwhite", "hoksrudSeier.mp3","tapMoxnes.mp3",];
let fregatt =["fregattRedigert.jpg","natoRedigert.jpg", "tankskipRedigert.jpg", "Helge Ingstad","Nato", "tankskip Sola", "lightcyan" ];
let hillary = ["hillary.jpg", "whitehouse.jpg","putin.jpg", "Hillary Clinton","det hvite hus", "Putin", "lightgrey"];
let iconArray = [hoksrud, fregatt, hillary];
// Arrayer med flere egenskaper som endres i det du trykker på "bytt player icon" knappen. Enkelt å legge til flere.

window.onkeydown = function(event){
    if( event.code === "ArrowLeft" || event.code === "ArrowUp"||event.code === "ArrowDown" || event.code === "ArrowRight" ) {
        if (playerX > 0) {
            if (event.code === "ArrowLeft") {
                playerX = playerX - 5;
            }
        }
        if (playerY > 0) {
            if (event.code === "ArrowUp") {
                playerY = playerY - 5;
            }
        }
        if (playerY < 450) {
            if (event.code === "ArrowDown") {
                playerY = playerY + 5;
            }
        }
        if (playerX < 1000) {
            if (event.code === "ArrowRight") {
                playerX = playerX + 5;

            }
        }
        player.style.marginLeft = playerX + "px"; // player sin marginLeft skal være lik verdien av playerX pluss stringen "px"
        player.style.marginTop = playerY + "px";
        posisjonMoxnes();
        sjekkKollisjon();
    }
};

function posisjonMoxnes () {
    moxnesX = moxnesX - ((vansklighetsgradTall/100)*(moxnesX-playerX)); //Algoritmen for moxnes sin bevegelse, kan godt være jobbet mer med
    moxnesY = moxnesY-((vansklighetsgradTall/70)*(moxnesY-playerY));
    moxnes.style.marginLeft = moxnesX + "px";
    moxnes.style.marginTop = moxnesY + "px";

}

function sjekkKollisjon () {
    let hoksrudArray = ["Hoksrud",playerX, playerY];
    let moxnesArray = ["Moxnes", moxnesX, moxnesY];
    let sjokomelkArray = ["Sjokomelk", sjokomelkX, sjokomelkY];
    let bildeArray = [hoksrudArray, moxnesArray, sjokomelkArray];

    for (let i = 0; i <= 2; i++) {
        let a = bildeArray [i];
        console.log("A = " + a);

        for (let h = 0; h <= 1; h++) {
            let b = bildeArray[h];
            if (i !== h) {
                console.log("B = " + b);
                let vektorMellomBilder = [a[1] - b[1], a[2] - b[2]];

                let absMellomBilder = Math.round(Math.sqrt(((vektorMellomBilder[0]) * (vektorMellomBilder[0])) + ((vektorMellomBilder[1]) * (vektorMellomBilder[1]))));

                let radiusDifferanse = absMellomBilder - (100/2) - (100/2);
                console.log ("Differansen i radius er " + radiusDifferanse);

                if (radiusDifferanse <= 0) {

                    if (a[0] === "Hoksrud" && b[0] === "Moxnes"){

                        sjekkVinn = false;
                        sjekklevel ();
                        lydTap.play();
                    }
                    else if (a[0] === "Sjokomelk" && b[0] === "Hoksrud"){
                        sjekkVinn = true;
                        level++;
                        sjekklevel ();
                        lydVinn.play();
                    }

                    /*  else if (a[0] === "Sjokomelk" && b[0] === "Moxnes"){
                          prompt("Uffda, da fikk fienden sjokomelken din!")
                      }
                      Mulighet for å legge til kollisjon mellom sjokomelk og moxnes */

                }
            }
        }
    }

}
function byttPlayerIcon(){

    if ( n < iconArray.length-1) {
        n++
    }
    else {
        n=0
    }

    player.src = iconArray[n][0];
    sjokomelk.src= iconArray[n][1];
    moxnes.src=iconArray[n][2];
    document.getElementById("info").innerHTML = "Du (" + iconArray[n][3] + ") skal prøve å komme til " + iconArray[n][4] + ". Men ikke la " + iconArray[n][5] + " ta deg! ";
    document.body.style.backgroundColor = iconArray[n][6];
}
function sjekklevel(){
    playerX = 1;
    playerY= 1;
    moxnesX=1000;
    moxnesY = Math.floor(Math.random() * 400);

    document.getElementById("level").innerHTML = " level " + level;
    if (sjekkVinn === true) {

        if (level === 2) {

            vansklighetsgradTall = 1 + 0.5;

            document.getElementById("level").style.color = "lightcoral";
        }
        if (level === 3) {

            vansklighetsgradTall = vansklighetsgradTall + 0.25;

            document.getElementById("level").style.color = "darkred";
        }
        if (level > 3) {

            vansklighetsgradTall = vansklighetsgradTall + 0.1;

            document.getElementById("level").style.color = "red";
        }
    }
    else {
        if (level === 1) {
            vansklighetsgradTall = vansklighetsgradTall - 0.1;
        }
    }

    console.log("Vansklighetsgradstall = " + vansklighetsgradTall);
}





