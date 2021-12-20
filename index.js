let gameFlow = document.querySelector('.game')
let area = document.getElementById("touch-area")
let scoreCounter = 0 // for score
let myInterval
let count = 0 // for checking last element and stop interval


let areaHeight = parseInt(window.getComputedStyle(area).getPropertyValue('height'))

let gameFlowHeight = parseInt(window.getComputedStyle(gameFlow).getPropertyValue('height'))
console.log(gameFlowHeight, 'game height')

const checkTouch = (item) => {
    let itemPosition = parseInt(window.getComputedStyle(item).getPropertyValue('top'))
    console.log(itemPosition, item.id)
    let excellentArea = itemPosition >= (gameFlowHeight - 100) + 10 && itemPosition <= gameFlowHeight - 60
    let goodArea = itemPosition >= (gameFlowHeight - 100) - 10 && itemPosition <= gameFlowHeight - 40
    if (excellentArea) {
        console.log('excellent')
        scoreCounter += 2
        //document.getElementById(item.id).remove()
        return
    } else if (goodArea) {
        console.log('correct')
        scoreCounter += 1
        return
    }
    console.log(scoreCounter)

}

const deleteBlock = (block) => {
    //document.removeEventListener('keydown', logKey)
    document.getElementById(block.id).remove()


}


const checkClick = () => {
    let leftBlocks = document.querySelectorAll('.left-arrow')
    checkTouch(leftBlocks[0])
}
const startGame = () => {
    getRandom()


}

function createEl(newCount) {
    console.log(newCount, 'newCount')
    document.addEventListener('keydown', logKey)
    let newItem = document.createElement('div')
    newItem.classList.add('left-arrow')
    let id = Date.now()
    newItem.setAttribute('id', `${id}`)
    console.log('the game is on')
    gameFlow.appendChild(newItem)
    newItem.addEventListener('animationend', () => {
        deleteBlock(newItem)
    })

    count++
    if (newCount === count) {
        clearInterval(myInterval)
    }



}

const getRandom = () => {
    let elements = Math.floor(Math.random() * 8)
    //let ms = Math.floor(Math.random() * (5000 - 1000) + 1000)
    console.log(elements, 'elements')


    myInterval = setInterval(createEl, 1000, elements)
    const allLeft = document.querySelectorAll('.left-arrow')


}


const logKey = (e) => {
    if (e.key === 'ArrowLeft') {
        //console.log('left arr')
        checkClick()
    }


}

//setInterval(checkTouch, 1)

//area.addEventListener('click', checkClick)



