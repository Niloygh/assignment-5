

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

// async function allLoadCards() {
//     try {
//         const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
//         if (!res.ok) throw new Error('Network response not OK');
//         const data = await res.json();
//         console.log(data.data); 
//     } catch (err) {
//         console.error("Fetch error:", err);
//     }
// }

// allLoadCards();


function allLoadCards(){
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            displayCards(data.data);
        });
}


function allLoadCards(){
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            displayCards(data.data);
        });
}function displayCards(cards) {
    const container = document.getElementById("card-container");
    container.innerHTML = ""; 

    cards.forEach(card => {
        const div = document.createElement("div");
        div.classList.add("card", "card-body", "shadow-sm", "border-t-5", "space-y-3");

        div.innerHTML = `
            <div class="flex justify-between">
                <img src="${card.status === 'open' ? 'assets/Open-Status.png' : 'assets/Closed-Status.png'}" alt="">
                <h2 class="orange w-20 text-center rounded-full">${card.priority.toUpperCase()}</h2>
            </div>
            <h1>${card.title}</h1>
            <p>${card.description}</p>
            <div class="flex gap-5">
                ${card.labels.map(label => `
                    <div class="${label.color} border-2 border-[${label.borderColor}] flex gap-2 px-2 py-1 rounded-full">
                        <div class="mt-1">
                            <img class="w-3" src="assets/${label.icon}.png" alt="">
                        </div>
                        <p>${label.name}</p>
                    </div>
                `).join("")}
            </div>
        `;
        container.appendChild(div);
    });
}


// async function allLoadCards(){
//     const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data.data)


    
//     // const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
//     // const data = await res.json()
//     // console.log(data)
// }

// async function allLoadCards() {
//     const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
//     const data = await res.json();
//     console.log(data.data)
// } 

// function displayCard(cards){
//     // console.log(cards)
//     cards.forEach(card => {
//         console.log(card)
//     });
// }

// allLoadCards()