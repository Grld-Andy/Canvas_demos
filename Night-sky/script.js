const canvas = document.querySelector('#canvas')
w = canvas.width = canvas.offsetWidth
h = canvas.height = canvas.offsetHeight
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
        this.r = Math.random() + 0.5
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
            if(this.alpha <= 0){
                this.alphaChange = 1
            }else if(this.alpha >= 1){
                this.alphaChange = 0
            }
        }
    }
}

class Meteor{
    constructor(){
        this.reset()
    }
    reset(){
        this.x = Math.random() * (w+100) + 100
        this.y = 0
        this.size = (Math.random() + 2) * 0.5
        this.speed = (Math.random() + 0.5) * 15
    }
    draw(){
        ctx.save()
        ctx.strokeStyle = 'rgba(255, 255, 255, .1)'
        ctx.shadowColor = 'rgba(255, 255, 255, .1)'
        ctx.shadowBlur = 10
        ctx.lineCap = 'round'
        for(let  i = 0; i < 10; i++){
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineWidth = this.size
            ctx.lineTo(this.x + 10 * (i + 1), this.y - 10 * (i + 1))
            ctx.stroke()
            ctx.closePath()
        }
        ctx.restore()
    }
    move(){
        this.x -= this.speed
        this.y += this.speed
        if(this.y >= h + 100){
            this.reset()
        }
    }
}

const moon = new Moon()

const stars = []
for(let i = 0; i < (w + h) * 0.3; i++){
    stars[i] = new Star()
}
const meteors = []
for(let i = 0; i < 3; i++){
    meteors[i] = new Meteor()
}

function drawStars(){
    stars.forEach(star => {
        star.blink()
        star.draw()
    });
}
function drawMetoers(){
    meteors.map((meteor) => {
        meteor.draw()
        meteor.move()
    })
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawStars()
    drawMetoers()
    moon.draw()
    window.requestAnimationFrame(animate)
}

animate()


