const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');


canvas.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  vy = (Math.random()* -1 - 1);
  isDrawing = true;
  this.velocityY=0;
  main();
});

canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    x = e.offsetX;
    return y = e.offsetY; //Track mouse movement and use position for spawning bubbles
    main();
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {

  }
});



class Bubble {
    constructor(positionX, positionY, velocityY) {
        this.positionX = positionX;
        this.positionY = positionY;
        
        this.velocityX = Math.random()* (1 - -1) +-1;  
        //make bubbles 'spew' out of cursor
        
        this.velocityY = velocityY;
        this.radius = Math.random () * 20 + 5;
        this.lifetime = 0; //
    }
    
    update() {
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;
        this.velocityY -=0.05;
        this.lifetime += 1;
        //track how long bubbles have been active for
        
        if (this.positionY <= this.radius/2) {
            this.velocityY *=-0.5;
            this.positionY =+ 10; //bubbles 'bounce' below the surface until they pop
        }
    }
    
    draw() {

        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.globalCompositeOperation = 'source-over';
    
        
    }
}

const bubbles = [];
let frameCount = 0;

function main() {
    requestAnimationFrame(main);
    
    ctx.clearRect(0, 0, 1024, 768);
    

    
    if (frameCount % 5 == 0 ) {
        bubbles.push(new Bubble(x,y,vy));
    }
    
    for (let i = 0 ; i < bubbles.length; i++) {
        if (bubbles[i].lifetime >= 250) {
            bubbles.splice(i,1); //attempt to destroy old bubbles after a certain amount of time
        }
        
        bubbles[i].update();
        bubbles[i].draw();


    }
        
    frameCount++;
}




