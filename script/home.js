let currentStatus = "all";


const allBtn = document.getElementById('all-btn')
const openBtn = document.getElementById('open-btn')
const closedBtn = document.getElementById('closed-btn')
const cardContainer = document.getElementById('card-container')
const count = document.getElementById('count')

const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
//  console.log(count.innerText)

const loadingSpinner = document.getElementById('loadingSpinner')

const cardModal = document.getElementById('card-modal')


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



closedBtn.classList.remove('bg-white', 'color-gray')
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
                <h1 onclick="openCardModal(${card.id})" >${card.title}</h1>
                <p>${card.description}</p>
                <div class="flex gap-5 flex-wrap">

                    ${card.labels.map((item) =>
            `
                        <span class="flex gap-2 ${item === 'bug' ? 'bug-color' : item === 'help wanted' ? 'help-color' :  'enhancement-color'

            }">
            ${item === 'bug' ? '<img class="w-3 h-3 mt-1" src="assets/bug.png" alt="">' : 
            item === 'help wanted' ? '<img class="w-3 h-3 mt-1" src="assets/help-wanted.png" alt="">' :
            '<img class="w-3 h-3 mt-1" src="assets/enhancement.png" alt="">'
            }
            
            ${item === 'bug' ?  'BUG' :
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

        div.addEventListener('click', function() {
            openCardModal(card.id)
        })

        cardContainer.append(div)
        cardFilters(currentStatus)
        updateTotalCard()




    });
}


async function openCardModal(issueId) {
    try {
        cardModal.innerHTML = `<div class="modal-box flex justify-center items-center"><span class="loading loading-spinner loading-xl"></span></div>`;
        cardModal.showModal();

        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`);
        const card = await res.json();
        const data = card.data;

        const badgesHTML = data.labels.map(label => {
            let colorClass, imgSrc, text;
            if(label === 'bug') {
                colorClass = 'orange border-2 border-[#FECACA] flex gap-2 px-2 py-1 rounded-full';
                imgSrc = 'assets/bug.png';
                text = 'BUG';
            } else if(label === 'help wanted') {
                colorClass = 'yellow border-2 border-[#FDE68A] flex gap-2 px-2 py-1 rounded-full';
                imgSrc = 'assets/help-wanted.png';
                text = 'HELP WANTED';
            } else {
                colorClass = 'green border-2 border-[#D1FAE5] flex gap-2 px-2 py-1 rounded-full';
                imgSrc = 'assets/enhancement.png';
                text = label.toUpperCase();
            }
            return `<div class="${colorClass}"><img class="w-3 h-3 mt-1" src="${imgSrc}" alt="">${text}</div>`;
        }).join('');

        cardModal.innerHTML = `
        <div class="modal-box space-y-2">
            <span class="flex justify-end cursor-pointer" onclick="cardModal.close()">X</span>
            <h1 class="font-bold text-2xl">${data.title}</h1>
            <div class="flex gap-2 justify-between">
                <p class="h-6 px-2 rounded-full ${data.status === 'open' ? 'bg-[#00A96E] text-white' : 'bg-[#3B82F6] text-white'}">
                    ${data.status === 'open' ? 'Opened' : 'Closed'}
                </p>
                <ul>
                    <li>Opened by ${data.author}</li>
                    <li>${new Date(data.createdAt).toLocaleDateString()}</li>
                </ul>
            </div>
            <div class="flex gap-2 flex-wrap">
                ${badgesHTML}
            </div>
            <p>${data.description}</p>
            <div class="flex gap-5 mt-3">
                <div>
                    <p>Assignee:</p>
                    <h2>${data.assignee || 'Not assigned'}</h2>
                </div>
                <div>
                    <p>Priority:</p>
                    <h2>${data.priority.toUpperCase()}</h2>
                </div>
            </div>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
        `;
    } catch (error) {
        console.error("Error fetching issue data:", error);
        alert("Failed to load issue details.");
        cardModal.close();
    }
}



function showLoader() {
    loadingSpinner.classList.remove('hidden');
    cardContainer.innerHTML = '';
}
function hideLoader() {
    loadingSpinner.classList.add('hidden');
}



const fetchIssuesBySearch = async (title) => {
    try {
        showLoader();
        const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${title}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch search results!");

        const data = await res.json();
        if (!data.data || data.data.length === 0) {
            cardContainer.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">No results found</p>`;
        } else {
            displayCard(data.data); // Use your existing displayCard function
        }
    } catch (error) {
        console.error("Search Error:", error);
        cardContainer.innerHTML = `<p class="col-span-full text-center text-gray-500 py-10">No results found</p>`;
    }
    hideLoader();
};


searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// Search button click
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    currentStatus = 'all';
    switchTab('all-btn'); // Reset filter UI

    if (!query) {
        alert("Please enter search text");
        allLoadCards(); // Fetch all issues if search is empty
        return;
    }

    fetchIssuesBySearch(query);
});


allLoadCards()