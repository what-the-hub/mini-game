let gameFlow = document.getElementById('game')
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
    const grMinHeight = 90
    const grMaxHeight = 60
    const goodMinHeight = 110
    const goodMaxHeight = 30
    const greatArea = itemPosition >= gameFlowHeight - grMinHeight && itemPosition <= gameFlowHeight - grMaxHeight
    const goodArea = itemPosition >= gameFlowHeight - goodMinHeight && itemPosition <= gameFlowHeight - goodMaxHeight

    if (greatArea) {
        scoreCounter += 2
    } else if (goodArea) {
        scoreCounter += 1
    }
    scoreElement.textContent = scoreCounter
}

const getRandom = () => {
    const elements = Math.floor((Math.random() * 20) + 5)
    const timeout = Math.floor(Math.random() * 2000 + 200)
    const itemClass = blockClasses[Math.floor(Math.random() * blockClasses.length)]

    return {
        elements,
        timeout,
        itemClass
    }
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const renderBlocks = async (elements) => {
    for (let i = 0; i < elements.length; i += 1) {
        if (i === 0) {
            gameFlow.appendChild(elements[i])
        } else {
            await delay(getRandom().timeout)
            gameFlow.appendChild(elements[i])
        }

        elements[i].addEventListener('animationend', () => {
            document.getElementById(elements[i].id).remove()
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
    document.addEventListener('keydown', logKey)
}


function logKey(e) {
    const key = e.key
    const keyToColumn = {
        'ArrowLeft': document.getElementsByClassName('left-arrow'),
        'ArrowUp': document.getElementsByClassName('up-arrow'),
        'ArrowDown': document.getElementsByClassName('down-arrow'),
        'ArrowRight': document.getElementsByClassName('right-arrow')
    }
    return keyToColumn[key].length > 0 ? checkTouch(keyToColumn[key][0]) : null
}



