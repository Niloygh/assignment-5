
const allBtn = document.getElementById('all-btn')
const openBtn = document.getElementById('open-btn')
const closedBtn = document.getElementById('closed-btn')

const loadingSpinner = document.getElementById('loadingSpinner')




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
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    displayCard(data.data)
}

function displayCard(cards) {
    // console.log(cards)

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    cards.forEach(card => {
        console.log(card)

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


        const div = document.createElement("div");
        div.classList.add('card', 'card-body', 'shadow-sm', 'border-t-5', 'border-[#00A96E]', 'space-y-3')
        div.innerHTML = `
        <div class="flex justify-between">
                    <img src="${card.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed- Status .png'}" alt="">
                    <h2 class="orange w-20 text-center rounded-full">${card.priority.toUpperCase()}</h2>
                </div>
                <h1>${card.title}</h1>
                <p>${card.description}</p>
                <div class="flex gap-5">

                    <div class="orange border-2 border-[#FECACA] flex gap-2  px-2 py-1 rounded-full">
                        <div class="mt-1">
                            <img class="w-3" src="assets/bug.png" alt="">
                        </div>
                        <p>BUG</p>
                    </div>

                    
                    <div class=" yellow border-2 border-[#FDE68A] flex gap-2  px-2 py-1 rounded-full">
                        <div class="mt-1">
                            <img class="w-4" src="assets/help-wanted.png" alt="">
                        </div>
                        <p>help wanted</p>
                    </div>
                </div>
                
                <hr class= "color-gray">
                
                <div class="color-gray">
                    <p>${card.author}</p>
                    <p>${card.createdAt}</p>
                </div>
        `

        cardContainer.append(div)



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