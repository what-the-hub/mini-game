let gameFlow = document.querySelector('.game')
let area = document.getElementById("touch-area")
let scoreElement = document.getElementById('score')
let scoreCounter = 0 // for score

const gameFlowHeight = parseInt(window.getComputedStyle(gameFlow).getPropertyValue('height'))

const blockClasses = ['left-arrow', 'up-arrow', 'down-arrow', 'right-arrow']

class Block {
    id = Date.now
    className = getRandom().itemClass

    createItem() {
        const newItem = document.createElement('div')
        newItem.setAttribute('class', `${this.className} drop-block`)
        newItem.setAttribute('id', `${this.id}`)
        return newItem
    }
}


const checkTouch = (item) => {
    const itemPosition = parseInt(window.getComputedStyle(item).getPropertyValue('top'))
    const excellentArea = itemPosition >= (gameFlowHeight - 100) + 10 && itemPosition <= gameFlowHeight - 60
    const goodArea = itemPosition >= (gameFlowHeight - 100) - 10 && itemPosition <= gameFlowHeight - 40

    if (excellentArea) {
        scoreCounter += 2
        scoreElement.textContent = scoreCounter
        return
    } else if (goodArea) {
        console.log('correct')
        scoreCounter += 1
        scoreElement.textContent = scoreCounter
        return
    }

}

const getRandom = () => {
    const elements = Math.floor((Math.random() * 20) + 5)
    const seconds = Math.floor(Math.random() * 2000 + 200)
    const itemClass = blockClasses[Math.floor(Math.random() * blockClasses.length)]

    return {
        elements,
        seconds,
        itemClass
    }

}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const renderBlocks = async (elements) => {
    for (let j = 0; j < elements.length; j += 1) {
        if (j === 0) {
            gameFlow.appendChild(elements[j])
        } else {
            await delay(getRandom().seconds)
            gameFlow.appendChild(elements[j])
        }

        elements[j].addEventListener('animationend', () => {
            document.getElementById(elements[j].id).remove()
        })
    }
}

const startGame = () => {
    console.log('the game is on')
    let elements = []
    for (let i = 1; i <= getRandom().elements; i += 1) {
        elements.push(new Block().createItem())
    }
    renderBlocks(elements)
    document.addEventListener('keydown', {handleEvent: logKey, currentItem: 1})
}


function logKey(e) {
    const key = e.key

    let leftColumn = document.getElementsByClassName('left-arrow')
    let upColumn = document.getElementsByClassName('up-arrow')
    let downColumn = document.getElementsByClassName('down-arrow')
    let rightColumn = document.getElementsByClassName('right-arrow')

    if (leftColumn.length > 0 && key === 'ArrowLeft') {
        checkTouch(leftColumn[0])
    }
    if (upColumn.length > 0 && key === 'ArrowUp') {
        checkTouch(upColumn[0])
    }
    if (downColumn.length > 0 && key === 'ArrowDown') {
        checkTouch(downColumn[0])
    }
    if (rightColumn.length > 0 && key === 'ArrowRight') {
        checkTouch(rightColumn[0])
    } else return
}



