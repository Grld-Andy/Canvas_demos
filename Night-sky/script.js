const canvas = document.querySelector('#canvas')
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight
const ctx = canvas.getContext('2d')

class Moon{
    constructor(){
        this.x = 150
        this.y = 150
        this.r = 100
    }
    draw(){
        ctx.save()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(254, 247, 144, 1)'
        ctx.shadowColor = 'rgba(254, 247, 144, .7)'
        ctx.shadowBlur = 50
        ctx.fill()
        ctx.restore()
    }
}
class Star{
    constructor(){
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.r = Math.random() * 1.5 + 1
        this.blinkChance = 0.005
        this.alpha = 1
        this.alphaChange = 0
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
        ctx.fill()
    }
    blink(){
        if(this.alphaChange === 0 && Math.random() < this.blinkChance){
            this.alphaChange = -1
        }else if(this.alphaChange !== 0){
            this.alpha += this.alphaChange + 0.05
            if(this.alpha < 0){
                this.alphaChange + 1
            }else if(this.alpha >= 1){
                this.alphaChange = 0
            }
        }
    }
}

const moon = new Moon()

const stars = []
for(let i = 0; i < 100; i++){
    stars[i] = new Star()
}

function drawStars(){
    stars.forEach(star => {
        star.blink()
        star.draw()
    });
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    moon.draw()
    drawStars()
    window.requestAnimationFrame(animate)
}

animate()