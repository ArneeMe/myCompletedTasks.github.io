let mdgIcon= document.getElementById("mdgIcon");
let spIcon = document.getElementById("spIcon");
let mdgNavn = document.getElementById("mdgNavn");
let spNavn = document.getElementById("spNavn");
let mdgRepresentant = document.getElementById("mdgRepresentant");
let spRepresentant =document.getElementById("spRepresentant");
let mdgSlagord = document.getElementById("mdgSlagord");
let spSlagord = document.getElementById("spSlagord");
//Oppretter variabler for alle tekst og bilde jeg har i den øverste delen av nettsiden

//Oppretter funkjsoner for når bruker: Tar musen over ikonet. Og fjerner musen fra ikonet.
mdgIcon.onmouseover = function(){
    spNavn.innerHTML=""; //Nullstilt
    mdgNavn.innerHTML = "NAVN: Miljøpartiet de Grønne"; //Navn, slagord og antall representanter blr skrevet inn
    mdgRepresentant.innerHTML = "1 representant på stortinget";
    mdgSlagord.innerHTML = "SLAGORD: Ta vare på fremtiden!";
    mdgIcon.style.borderColor="red"; //Farge på borderen til teksten kommer. Burde kanskje være en annen farge enn rød?
    document.getElementById("tekstBorder").style.border="2px solid red";

};
mdgIcon.onmouseleave = function (){
    mdgNavn.innerHTML = "Hold musen over logoene for å se info!";
    mdgRepresentant.innerHTML="";
    mdgSlagord.innerHTML="";
    mdgIcon.style.borderColor="#67962e";
    document.getElementById("tekstBorder").style.border="";
};

spIcon.onmouseover = function (){
    spNavn.innerHTML="";
    mdgNavn.innerHTML = "";
    spNavn.innerHTML = "NAVN: Senterpartiet";
    spRepresentant.innerHTML ="19 representanter på stortinget";
    spSlagord.innerHTML = "SLAGORD: Vi tror på hele Norge";
    spIcon.style.borderColor="red";
    document.getElementById("tekstBorder").style.border="2px solid red";
};
spIcon.onmouseleave = function (){
    mdgNavn.innerHTML = "Hold musen over logoene for å se info!";
    spNavn.innerHTML = "";
    spRepresentant.innerHTML ="";
    spSlagord.innerHTML = "";
    spIcon.style.borderColor="#008542";
    document.getElementById("tekstBorder").style.border="";
};

let bilde = document.getElementById("bildeSrc");
let bildeArraySP = ["fredag/bilder/sp01.jpg", "fredag/bilder/sp02.jpg", "fredag/bilder/sp03.jpg"];
let bildeArrayMDG = ["fredag/bilder/mdg01Redigert.jpg", "fredag/bilder/mdg02.jpg", "fredag/bilder/mdg03.jpg"];
let hvilkenArray = "mdg";
let n = 0;
//Oppretter de variablene jeg trenger for bilderotasjonen, inkludert to ulike arrays med bilder.
//og ja, alle bildene er skalart ned til 300px 300px

function buttonMDG(){
    hvilkenArray = "mdg";
    bilde.src=bildeArrayMDG[0];
    n=0;
}
function buttonSP() {
    hvilkenArray="sp";
    bilde.src=bildeArraySP[0];
    n=0;
}
//bruker "hvilkenArray" til å finne ut hvilke bilder bruker ønsker å se på. Her resettes n hvis bruker bytter.
function forrigeBilde(){
    if (n >0 ) {
        n--
    }
    else {
        n=2
    }
    if (hvilkenArray==="mdg"){
        bilde.src=bildeArrayMDG[n];
    }
    else if (hvilkenArray==="sp"){
        bilde.src=bildeArraySP[n]
    }
}
function nesteBilde(){
    if ( n < 2) {
        n++
    }
    else {
        n=0
    }
    if (hvilkenArray==="mdg"){
        bilde.src=bildeArrayMDG[n];
    }
    else if (hvilkenArray==="sp"){
        bilde.src=bildeArraySP[n]
    }
}
//n brukes til å telle opp og ned i gjennom arrayene. tallet n er også hvor i arrayene vi er.


