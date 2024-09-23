
let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let c = canvas.getContext('2d');


let mouse = {
    x: undefined,
    y:undefined
}

let maxRadius = 100;
//let minRadius = 10;

let colorArray = [
    '#ff5226',
    '#4411aa',
    '#55ff5aa',
    '#00ff00',
    '#99ff444',
]

window.addEventListener('mousemove',
function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);
})

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
        this.dx = -this.dx;
        }

         if(this.y + this.radius > innerHeight || this.y - this.radius <0){
        this.dy = -this.dy;
        }
   
         this.x += this.dx;
         this.y += this.dy;

         //Interactivity

         if (mouse.x - this.x < 80 && mouse.x - this.x > - 80
            && mouse.y - this.y < 80 && mouse.y - this.y > - 80){
                if(this.radius < maxRadius){
                    this.radius += 1;
                }


            } else if (this.radius > this.minRadius){
                this.radius -= 1;
            }

         this.draw();
    }
}

let CircleArray = [];

for (let i = 0; i < 500; i++){

let radius = Math.random() * 3 + 1;
let x = Math.random() * (innerWidth - radius*2) + radius;
let y =  Math.random()*(innerHeight - radius*2) + radius;
let dx = (Math.random()-0.5);
let dy = (Math.random()-0.5);

CircleArray.push(new Circle(x,y,dx,dy,radius));

}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect (0,0, innerWidth, innerHeight);

    for (var i= 0; i < CircleArray.length; i ++)
    {
        CircleArray[i].update();
    }
}

animate();
