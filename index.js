let gameFlow = document.querySelector('.game')
let area = document.getElementById("touch-area")
let scoreElement = document.getElementById('score')
let scoreCounter = 0 // for score
let myInterval
let count = 0 // for checking last element and stop interval
const blockClasses = ['left-arrow','up-arrow', 'down-arrow', 'right-arrow']

class Block {
    id = setTimeout(()=>Date.now(), 10)
    className = getRandom().itemClass
    createItem () {
        const newItem = document.createElement('div')
        newItem.setAttribute('class',`${this.className} drop-block`)
        newItem.setAttribute('id', `${this.id}`)
        return newItem
    }
}


let areaHeight = parseInt(window.getComputedStyle(area).getPropertyValue('height'))

let gameFlowHeight = parseInt(window.getComputedStyle(gameFlow).getPropertyValue('height'))
console.log(gameFlowHeight, 'game height')

const checkTouch = (item) => {
    let itemPosition = parseInt(window.getComputedStyle(item).getPropertyValue('top'))
    let excellentArea = itemPosition >= (gameFlowHeight - 100) + 10 && itemPosition <= gameFlowHeight - 60
    let goodArea = itemPosition >= (gameFlowHeight - 100) - 10 && itemPosition <= gameFlowHeight - 40

    if (excellentArea) {
        scoreCounter += 2
        console.log('excellent', scoreCounter)

        scoreElement.textContent = scoreCounter
        //document.getElementById(item.id).remove()
        return
    } else if (goodArea) {
        console.log('correct')
        scoreCounter += 1
        scoreElement.textContent = scoreCounter
        return
    }

}

const deleteBlock = (block) => {
    //document.removeEventListener('keydown', logKey)
    //console.log( document.getElementById(block), "!!!!!")

    document.getElementById(block.id).remove()


}


const checkClick = (arrowDirection) => {
    let columnOfArrows = document.querySelectorAll(arrowDirection)
    console.log(columnOfArrows)
    checkTouch(columnOfArrows[0])
}


function createEl(newCount, arrowDirection) {
    //console.log(newCount, 'newCount')
    const newItem = document.createElement('div')
    const newClass = getRandom().itemClass
    newItem.setAttribute('class',`${newClass} drop-block`)
    const id = Date.now()
    document.addEventListener('keydown', {handleEvent: logKey, currentItem: newItem})

    newItem.setAttribute('id', `${id}`)
    gameFlow.appendChild(newItem)
    newItem.addEventListener('animationend', () => {
        //newItem.removeEventListener('keydown', logKey)
        deleteBlock(newItem)
    })

    count++
    if (newCount === count) {
        clearInterval(myInterval)
    }

}

const getRandom = () => {
    const elements = Math.floor((Math.random() * 20) + 5)
    const seconds = Math.floor(Math.random() * 2000 + 1000)
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

const setDelay = async (elements) => {
    for (let j = 0; j<elements.length; j+=1){
        if (j === 0) {
            gameFlow.appendChild(elements[j])
        }
        else {
            await delay(1000)
            gameFlow.appendChild(elements[j])
        }
        document.addEventListener('keydown', {handleEvent: logKey, currentItem: newItem})
        elements[j].addEventListener('animationend', () => {
            deleteBlock(elements[j])
        })

    }
}

const startGame = () => {
    console.log('the game is on')
    let elements = []
    for (let i = 1; i<= getRandom().elements; i+=1) {
        elements.push(new Block().createItem())
    }
    setDelay(elements)
    //myInterval = setInterval(createEl, 1000, getRandom().elements)
}


function logKey (e) {
    //console.log(this.className, 'className')
    console.log(this.currentItem)

    if (e.key === 'ArrowLeft') {
        //console.log('left arr')
        checkClick('.left-arrow')
    }
    if (e.key === 'ArrowUp') {
        //console.log('up arr')
        checkClick('.up-arrow')
    }

}

//setInterval(checkTouch, 1)

//area.addEventListener('click', checkClick)



