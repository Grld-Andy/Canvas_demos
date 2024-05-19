const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

class Bubble{
    constructor(){
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height);
        this.r = Math.floor((Math.random() * 10 + 10) + Math.random() * 25)
        this.speed = Math.random() + 1
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = 'rgba(180, 180, 200, 0.5)'
        ctx.strokeStyle = 'aqua'
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        this.drawReflect()
        this.reset()
    }
    drawReflect(){
        ctx.beginPath()
        ctx.fillStyle = 'rgba(250, 250, 255, 0.6)'
        ctx.strokeStyle = 'aquamarine'
        ctx.arc(this.x - this.r/3, this.y - this.r/4, this.r/3, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
    }
    reset(){
        if(this.y + this.r < 0){
            this.x = Math.floor(Math.random() * canvas.width);
            this.y = canvas.height + this.r;
            this.r = Math.floor((Math.random() * 10 + 10) + Math.random() * 25)
            this.speed = Math.random() + 1
        }
    }
}

const bubbles = []
for (let index = 0; index < 100; index++) {
    bubbles[index] = new Bubble();
    bubbles[index].draw()
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bubbles.forEach(bubble => {
        bubble.y -= bubble.speed
        bubble.draw()
    });
    window.requestAnimationFrame(animate)
}

animate()