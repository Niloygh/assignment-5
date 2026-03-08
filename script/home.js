let currentStatus = "all";


const allBtn = document.getElementById('all-btn')
const openBtn = document.getElementById('open-btn')
const closedBtn = document.getElementById('closed-btn')
const cardContainer = document.getElementById('card-container')
const count = document.getElementById('count')
//  console.log(count.innerText)

const loadingSpinner = document.getElementById('loadingSpinner')

allBtn.addEventListener('click', () => {
    cardFilters('all')
    currentStatus = 'all'
    switchTab('all-btn');
})
openBtn.addEventListener('click', () => {
    cardFilters('open')
    currentStatus = 'open'
    switchTab('open-btn');
})
closedBtn.addEventListener('click', () => {
    cardFilters('closed')
    currentStatus = 'closed'
    switchTab('closed-btn');
})



,closedBtn.classList.remove('bg-white', 'color-gray')
allBtn.classList.add('color-primary')
// console.log(allBtn, openBtn, closedBtn)

const updateTotalCard = () => {
    const visibleCards = document.querySelectorAll("#card-container .card");
    let sum = 0;
    visibleCards.forEach((card) => {
        if (card.style.display !== "none") sum++;
    });
    count.innerText = sum;
};

function cardFilters(status) {

    const divEl = document.querySelectorAll('#card-container .card')
    // console.log(divEl)

    divEl.forEach((i) => {
        if (status === 'all') {
            i.style.display = 'block'
        }
        else {
            i.style.display = i.dataset.status === status ? 'block' : 'none'

        }
    })
    updateTotalCard()
    console.log(updateTotalCard())
}

function showLoading() {
    loadingSpinner.classList.remove('hidden')
    cardContainer.innerHTML = "";
}
function hideLoading() {
    loadingSpinner.classList.add('hidden')
}





// btn color 
function switchTab(tab) {

    if (tab === 'all-btn') {
        closedBtn.classList.add('bg-white', 'color-gray')
        closedBtn.classList.remove('color-primary')

        openBtn.classList.add('bg-white', 'color-gray')
        openBtn.classList.remove('color-primary')

        allBtn.classList.remove('bg-white', 'color-gray')
        allBtn.classList.add('color-primary')

        // cardFilters('all')

    }
    if (tab === 'open-btn') {
        closedBtn.classList.add('bg-white', 'color-gray')
        closedBtn.classList.remove('color-primary')

        allBtn.classList.add('bg-white', 'color-gray')
        allBtn.classList.remove('color-primary')


        openBtn.classList.remove('bg-white', 'color-gray')
        openBtn.classList.add('color-primary')

        // cardFilters('open')

    }
    if (tab === 'closed-btn') {
        allBtn.classList.add('bg-white', 'color-gray')
        allBtn.classList.remove('color-primary')

        openBtn.classList.add('bg-white', 'color-gray')
        openBtn.classList.remove('color-primary')


        closedBtn.classList.remove('bg-white', 'color-gray')
        closedBtn.classList.add('color-primary')

        // cardFilters('closed')

    }

}




async function allLoadCards() {
    showLoading()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    hideLoading()
    displayCard(data.data)
}

async function openCard() {
    showLoading()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();

    if (data.data.status === 'open') {

    }

    hideLoading()

}



function displayCard(cards) {
    // console.log(cards)
    count.innerText = cards.length
    cardContainer.innerHTML = '';

    cards.forEach(card => {
        // console.log(card.labels)



        // count = card.length
        //     {
        // "id": 48,
        // "title": "Browser console shows warnings",
        // "description": "Multiple deprecation warnings appearing in browser console. Need to update deprecated code.",
        // "status": "open",
        // "labels": [
        //     "bug"
        // ],
        // "priority": "low",
        // "author": "console_carol",
        // "assignee": "",
        // "createdAt": "2024-02-09T14:20:00Z",
        // "updatedAt": "2024-02-09T14:20:00Z"
        // }

        // console.log(card.labels)

        const div = document.createElement("div");

        // div.dataset.status = card.status


        // div.classList.add('card shadow-sm')
        div.className = 'card shadow-sm'
        div.dataset.status = card.status

        div.innerHTML = `
        <div class="h-1 rounded-t-2xl ${card.status === 'open' ? 'color-green' : 'color-primary'}"></div>
        <div class=' card-body space-y-3'>
        <div class="flex justify-between">
                    <img src="${card.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed- Status .png'}" alt="">
                    <h2 class="orange w-20 text-center rounded-full">${card.priority.toUpperCase()}</h2>
                </div>
                <h1>${card.title}</h1>
                <p>${card.description}</p>
                <div class="flex gap-5">

                    ${card.labels.map((item) =>
            `
                        <span class="${item === 'bug' ? 'orange' : item === 'help wanted' ? 'yellow' :
                'color-primary'

            }">${item === 'bug' ? 'BUG' :
                item === 'help wanted' ? 'HELP WANTED' :
                    item

            }</span>
                        `
        ).join("")}
                </div>
                
                <hr class= "color-gray">
                
                <div class="color-gray">
                    <p>${card.author}</p>
                    <p>${card.createdAt}</p>
                </div>
                </div>
        `

        cardContainer.append(div)
        cardFilters(currentStatus)
        updateTotalCard()




    });
}

// function bugDisplay() {
//     const badgeDiv = document.createElement('div')
//     badgeDiv.classList.add('orange', 'border-2', 'border-[#FECACA]', 'flex', 'gap-2', 'px-2', 'py-1', 'rounded-full')
//     badgeDiv.innerHTML = `
//         <div class="mt-1">
//             <img class="w-3" src="assets/bug.png" alt="">
//         </div>
//         <p>BUG</p>
//     `
//     cardContainer.append(badgeDiv)
// }

allLoadCards()