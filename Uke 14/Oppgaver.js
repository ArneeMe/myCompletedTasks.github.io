//Referanser til HTML-elementer
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Bubble{
    constructor(x,y,r){
        this.x  = x;
        this.y = y;
        this.r = r;
    }
    tegn(){
        ctx.strokeStyle = "White";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
        ctx.stroke();
    }
    beveg(){
        this.x = this.x + Math.random()*40 - 20;
        this.y = this.y + Math.random()*40- 20;
    }
}
/*

class Bilde {
    constructor(x,y,bilde){
        this.x = x;
        this.y = y;

        let image = new Image;
        image.src = bilde;
        this.bilde = image;
    }
    tegn(){
        ctx.drawImage(this.bilde,this.x,this.y);
    }
}
let billClinton = new Bilde(200,200,"bill_clinton.jpg");
*/
let bobleArray = [];
for (let i = 0; i<10; i ++){
    bobleArray.push(new Bubble(Math.random()*300+100,Math.random()*400+100,Math.random()*50+20));
}

gameloop();

function gameloop(){
    tegnBakgrunn();
    for (let boble of bobleArray){
        boble.tegn();
        boble.beveg();
    }
    billClinton.tegn();
    requestAnimationFrame(gameloop);
}

function tegnBakgrunn(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height); // Tegner bakgrunnsfarge på canvaset
}