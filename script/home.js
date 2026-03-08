

const allBtn = document.getElementById('all-btn')
const openBtn = document.getElementById('open-btn')
const closedBtn = document.getElementById('closed-btn')



allBtn.classList.remove('bg-white', 'color-gray')
allBtn.classList.add('color-primary')
// console.log(allBtn, openBtn, closedBtn)

// btn color 
function switchTab(tab) {

    if (tab === 'all-btn') {
        closedBtn.classList.add('bg-white', 'color-gray')
        closedBtn.classList.remove('color-primary')

        openBtn.classList.add('bg-white', 'color-gray')
        openBtn.classList.remove('color-primary')

        allBtn.classList.remove('bg-white', 'color-gray')
        allBtn.classList.add('color-primary')
    }
    if (tab === 'open-btn') {
        closedBtn.classList.add('bg-white', 'color-gray')
        closedBtn.classList.remove('color-primary')

        allBtn.classList.add('bg-white', 'color-gray')
        allBtn.classList.remove('color-primary')


        openBtn.classList.remove('bg-white', 'color-gray')
        openBtn.classList.add('color-primary')
    }
    if (tab === 'closed-btn') {
        allBtn.classList.add('bg-white', 'color-gray')
        allBtn.classList.remove('color-primary')

        openBtn.classList.add('bg-white', 'color-gray')
        openBtn.classList.remove('color-primary')


        closedBtn.classList.remove('bg-white', 'color-gray')
        closedBtn.classList.add('color-primary')
    }

}

async function allLoadCards() {
    const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    const data = await res.json();
    displayCard(data.data)
} 

// function displayCard(card){
//     // console.log(card)
//     const card = document.createElement('div')
// }

// allLoadCards()