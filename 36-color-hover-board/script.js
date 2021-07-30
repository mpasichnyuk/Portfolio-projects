const container = document.getElementById('container')
const colors = ['#e31414', '#ffc800','#04ff00','#00f7ff','#0004ff','#ff00ae']
const SQUARES = 500;

for (let i = 0; i < SQUARES; i++) {
    const square = document.createElement('div')
    square.classList.add('square')

    square.addEventListener('mouseover', () => setColor(square))
    square.addEventListener('mouseout', () => removeColor(square))

    container.appendChild(square)

}

function setColor(element) {
    let newColor = getRandomColor()
    // console.log(color)
    element.style.background = newColor
    element.style.boxShadow = `0 0 2px ${newColor}, 0 0 10px ${newColor}`

}

function removeColor(element) {
    element.style.background = '#1d1d1d'
    element.style.boxShadow = `0 0 2px #000` 
}

function getRandomColor() {
    return colors[Math.floor(Math.random()*colors.length)]
}