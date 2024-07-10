const header = document.getElementById('header')
let text = header.innerText
let nextContent = 'a web developer'

setTimeout(() => {
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            if(i < text.length - 5){
                header.innerText = text.slice(0, text.length - i)
            }
        }, 100 * i)
    }
}, 1000)
setTimeout(() => {
    for (let i = 0; i < nextContent.length; i++) {
        setTimeout(() => {
            header.innerText += nextContent[i]
        }, 100 * i)
    }
}, 1500)
setTimeout(() => {
    header.innerText = 'Hi I\'m a web developer'
    console.log('starting')
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            if(i < text.length - 5){
                header.innerText = text.slice(0, text.length - i)
            }
        }, 100 * i)
    }
}, 1000 + 1300 + 1500)