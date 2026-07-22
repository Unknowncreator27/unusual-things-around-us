const searchBar = document.getElementById('searchInput')
const searchButton = document.getElementById('searchBtn')
const resultsGrid = document.getElementById('grid')
let detailContainer = document.getElementById('detailContainer')
const favoriteItem = new Set() //To prevent possible duplicate values
const compareBtn = document.getElementById('compareBtn');

// Data array containing attractions
const attractions = [
    {
        id: 'noon-gun',
        title: 'The noon gun',
        desc: "A cannon on Signal Hill fired by hand at exactly noon every day since 1806 - most locals set their watches by it without ever seeing it.",
        image: '../res/Cape_Town_Noon_Gun_Firing.jpg',
        altText: "Smoke from the Noon Gun firing on Signal Hill",
        facts: [
            "The tradition began under British colonial rule, purely to help sailors calibrate navigation instruments.",
            "It's still loaded and fired by hand by a small team from the SA Navy, rain or shine.",
            "The boom is loud enough to rattle windows as far away as the City Bowl."
        ],
        location: "Lion Battery, Signal Hill, Cape Town - established 1806",
        researchLink: "https://www.navy.mil.za" // Add source/research link here
    },
    {
        id: 'prestwich',
        title: 'Prestwich Memorial',
        desc: "Prestwich Memorial Visitors Centre entrance",
        image: '../res/prestwich.jpg',
        altText: "Prestwich Memorial Visitors Centre entrance",
        facts: [
            "It holds the remains of thousands of underrepresented VOC-era citizens, slaves, and sailors.",
            "It was built to provide a respectful neutral resting place rather than covering them up.",
            "It features an outdoor memorial garden alongside an indoor reflection space."
        ],
        location: "Somerset Road, Green Point, Cape Town",
        researchLink: "https://www.capetown.gov.za"
    },
    {
        id: 'truth-coffee',
        title: 'Truth Coffee HQ',
        desc: "A working coffee roastery styled entirely like a Victorian steampunk workshop, gears and all, tucked into a converted warehouse.",
        image: '../res/truth-coffee.jpg',
        altText: "Truth Coffee moss and neon sign",
        facts: [
            "It has been frequently ranked by international media as one of the best coffee shops in the world.",
            "The massive functional vintage roasting machine sits right in the middle of the cafe.",
            "Staff dress up in full steampunk gear, integrating live performance into daily service."
        ],
        location: "36 Buitenkant St, Cape Town CBD",
        researchLink: "https://truth.capetown"
    },
    // --- NEW ATTRACTIONS ---
    {
        id: 'just-nuisance',
        title: 'Able Seaman Just Nuisance Statue',
        desc: "A life-sized bronze statue of the only Great Dane ever officially enlisted into the Royal Navy during WWII.",
        image: '../res/able-seaman.jpg',
        altText: "Bronze statue of Just Nuisance in Simon's Town",
        facts: [
            "He was enlisted so the Navy could pay for his train fare between Simon's Town and Cape Town.",
            "He was treated like any sailor—complete with naval discharge papers and a official service record.",
            "His grave on Red Hill is still visited by tourists and naval personnel today."
        ],
        location: "Jubilee Square, Simon's Town, Cape Town",
        researchLink: "https://simonstown.com/just-nuisance"
    },
    {
        id: 'woodstock-murals',
        title: 'Woodstock Street Art Murals',
        desc: "An outdoor gallery of giant, world-class street art murals transforming historic neighborhood walls into social commentary.",
        image: '../res/woodstock-street-art.jpg',
        altText: "Colorful street art mural on a brick wall in Woodstock",
        facts: [
            "Started as a community project to raise awareness for wildlife conservation and local heritage.",
            "Features pieces created by both local South African artists and international muralists.",
            "The artwork changes continuously as old walls are repainted with fresh stories."
        ],
        location: "Albert Road & surrounding lanes, Woodstock, Cape Town",
        researchLink: "https://www.capetown.travel/woodstock-street-art"
    },
    {
        id: 'underground-canals',
        title: 'Cape Town Underground Canals',
        desc: "A hidden network of historical stone subterranean canals flowing underneath the modern streets of Cape Town CBD.",
        image: '../res/cape-town-canals.jpg',
        altText: "Historic stone archways of Cape Town's underground canals",
        facts: [
            "Originally built by Dutch settlers in the 1600s to channel fresh water down from Table Mountain.",
            "They were roofed over in the late 1800s due to health concerns, becoming hidden under pavement.",
            "Guided underground walking tours allow visitors to explore the historic brick tunnels beneath the city."
        ],
        location: "Underneath Cape Town CBD (Tours start near Castle of Good Hope)",
        researchLink: "https://www.goodhopeadventures.com"
    }
];

// Helper functions

function populateCompareDropDown(){
    const selectOne = document.getElementById('compareSelect1')
    const selectTwo = document.getElementById('compareSelect2')

    if(! selectOne || ! selectTwo){
        console.log("No select found");
        return;
        
    }

    selectOne.innerHTML = ""
    selectTwo.innerHTML = ""

    attractions.forEach(item => {
        let optOne = document.createElement('option')
        optOne.value = item.id
        optOne.textContent = item.title

        let optTwo = document.createElement('option')
        optTwo.value = item.id
        optTwo.textContent = item.title

        selectOne.appendChild(optOne)
        selectTwo.appendChild(optTwo)

    })

    // default selectOne to first attraction and selectTwo to second attraction

    if(attractions.length > 1){
        selectOne.selectedIndex = 0
        selectTwo.selectedIndex = 1

    }
}

// 2. Render side-by-side comparison for the 2 chosen attractions
function compareSelectedAttractions() {
    const select1 = document.getElementById('compareSelect1');
    const select2 = document.getElementById('compareSelect2');
    const table = document.getElementById('compare-table');

    if (!select1 || !select2 || !table) return;

    const item1 = attractions.find(a => a.id === select1.value);
    const item2 = attractions.find(a => a.id === select2.value);

    if (!item1 || !item2) return;

    table.innerHTML = `
        <thead>
            <tr>
                <th>Feature</th>
                <th>${item1.title}</th>
                <th>${item2.title}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="row-label">Overview</td>
                <td>${item1.desc}</td>
                <td>${item2.desc}</td>
            </tr>
            <tr>
                <td class="row-label">Location / Origin</td>
                <td>${item1.location}</td>
                <td>${item2.location}</td>
            </tr>
            <tr>
                <td class="row-label">Key Fact #1</td>
                <td>${item1.facts[0] || 'N/A'}</td>
                <td>${item2.facts[0] || 'N/A'}</td>
            </tr>
            <tr>
                <td class="row-label">Key Fact #2</td>
                <td>${item1.facts[1] || 'N/A'}</td>
                <td>${item2.facts[1] || 'N/A'}</td>
            </tr>
        </tbody>
    `;
}

// 3. Event listener for Compare Button
if (compareBtn) {
    compareBtn.addEventListener('click', compareSelectedAttractions);
}

function displayFavorites() {
    //Function to display only favorites items under its own section
    const favRow = document.getElementById('fav-row')

    favRow.innerHTML = ""

    const favoriteItems = attractions.filter(item => favoriteItem.has(item.id))

    if (favoriteItems.length === 0) {
        favRow.innerHTML = "<p class='placeholder-text'>No favourites yet — click a star to add one.</p>"
        return
    }

    favoriteItems.forEach(item => {
        const favCard = document.createElement('article')
        favCard.classList.add('fav-card')
        favCard.style.cursor = 'pointer'

        favCard.addEventListener('click', () => {
            showDetails(item)
        })

        const favThumb = document.createElement('div')
        favThumb.classList.add('fav-thumb')

        const img = document.createElement('img')
        img.src = item.image
        img.alt = item.altText

        favThumb.appendChild(img)

        const title = document.createElement('h4')
        title.textContent = item.title

        // Added a remove button here
        let removeImg = document.createElement('img')
        removeImg.src = '../res/close-outline.svg'
        removeImg.alt = 'Remove Favourite'
        removeImg.style.cursor = 'pointer'
        removeImg.classList.add('remove-fav-img')
        


        removeImg.addEventListener('click', (e) =>{
            e.stopPropagation()
            favoriteItem.delete(item.id)
            displayFavorites()
            displayItems(attractions)

            // check if details view is currently displaying the removed item
            if(detailContainer) {
                // if the details section contains an h3 element with the removed item's title, clear it
                let currentDetailTitle = detailContainer.querySelector('h3')
                if(currentDetailTitle && currentDetailTitle.textContent === item.title){
                    detailContainer.innerHTML = ""
                }
            }

        })

        favCard.appendChild(favThumb)
        favCard.appendChild(title)
        favCard.appendChild(removeImg)
        favRow.appendChild(favCard)

    })
}

// functions to dynamically build and display the cards
function displayItems(itemsToDisplay){
    // clear out any previous results first to avoid clutter
    resultsGrid.innerHTML = ""

    // if no items match the search display a message
    if(itemsToDisplay.length === 0){
        resultsGrid.innerHTML = "<p> No unusual places found matching that search.</p>"
        return
    }

    // loop through the filtered array and build the DOM elements
    itemsToDisplay.forEach(item => {
        // Create the main card article element for each card
        const card = document.createElement('article')
        card.classList.add('card')
        card.style.cursor = 'pointer'
        card.addEventListener('click', () => {
            showDetails(item)
        })
        
        // create the thumbnail wrapper and image
        const thumbDiv = document.createElement("div")
        thumbDiv.classList.add("thumb")

        const img = document.createElement("img")
        img.src = item.image
        img.alt = item.altText

        //Set up the toggling for the star icons(favorite/unfavorite)
        const starImage = document.createElement("img")
        starImage.src = favoriteItem.has(item.id) ? "../res/favorite.png" : "../res/unfavorite.png"
        starImage.alt = favoriteItem.has(item.id) ? "Favorited star" : "Unfavorited Star"
        starImage.classList.add("fav-star")
        // thumbDiv.appendChild(img)
        thumbDiv.appendChild(starImage)

        starImage.addEventListener('click', (e) => {
            e.stopPropagation()
            if (favoriteItem.has(item.id)) {
                favoriteItem.delete(item.id)
                starImage.src = '../res/unfavorite.png'
                starImage.alt = "Unfavorited Star"
            }
            else {
                favoriteItem.add(item.id)
                starImage.src = '../res/favorite.png'
                starImage.alt = "Favorited Star"
            }
            displayFavorites()
        })

        thumbDiv.appendChild(img)

        // Create the card body wrapper
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        // Create the heading and description
        const title = document.createElement('h3')
        title.textContent = item.title

        const p = document.createElement('p')
        p.textContent = item.desc
        cardBody.appendChild(title)
        cardBody.appendChild(p)

        // assemble the complete card
        card.appendChild(thumbDiv)
        card.appendChild(cardBody)
        card.style.padding = '5px'

        // append the card to the grid container
        resultsGrid.appendChild(card)


        
    });
}


// Build a function to dynamically build the details view cards
function showDetails(item){
    detailContainer.innerHTML = ""

    let detailArticle = document.createElement('article')
    detailArticle.classList.add('detail-card')

    let thumb = document.createElement('div')
    thumb.classList.add('detail-thumb')
    let img = document.createElement('img')
    img.src = item.image
    img.alt = item.altText
    thumb.appendChild(img)

    let body = document.createElement('div')
    body.classList.add('detail-body')

    let detailHeader = document.createElement('div')
    detailHeader.classList.add('detail-header')

    let h3 = document.createElement("h3")
    h3.textContent = item.title

    let fullP = document.createElement('p')
    fullP.classList.add('full-desc')
    fullP.textContent = item.desc

    const h4 = document.createElement('h4')
    h4.textContent = "Interesting facts"

    let ul = document.createElement('ul')
    ul.classList.add('facts')
    item.facts.forEach(fact => {
        const li = document.createElement("li")
        li.textContent = fact
        ul.appendChild(li)
    })

    let dl = document.createElement('dl')
    dl.classList.add('meta')
    let dt = document.createElement('dt')
    dt.textContent = "Location / Origin"
    let dd = document.createElement('dd')
    dd.textContent = item.location

    if(item.researchLink){
        let dtLink = document.createElement('dt')
        dtLink.textContent = "Research Source"

        let ddLink = document.createElement('dd')
        let a = document.createElement('a')
        a.href = item.researchLink
        a.target = '_blank'
        a.rel = "noopener noreferer"
        a.textContent = " View Source "
        a.style.color = "#4a5d3a"
        a.style.fontWeight = "bold"

        dd.appendChild(a)
        dl.appendChild(dtLink)
        dl.appendChild(ddLink)
    }

    
    let printBtn = document.createElement('button')
    printBtn.textContent = 'Print Details'
    printBtn.classList.add('print-btn')
    printBtn.addEventListener('click', () => {
        window.print()
    })

    printBtn.style.padding = "10px"
    


    body.appendChild(detailHeader)

    dl.appendChild(dt)
    dl.appendChild(dd)

    detailHeader.appendChild(h3)
    detailHeader.appendChild(printBtn)
    body.appendChild(fullP)
    body.appendChild(h4)
    body.appendChild(ul)
    body.appendChild(dl)


    detailArticle.appendChild(thumb)
    detailArticle.appendChild(body)

    detailContainer.appendChild(detailArticle)
    //smooth scrolling to the details section to view details
    document.getElementById('detail-section').scrollIntoView({behavior: "smooth"})

}

searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    let searchTerm = searchBar.value.toLowerCase().trim();
    // filter based on search term
    const filteredAttractions = attractions.filter(item => {
        return item.title.toLowerCase().includes(searchTerm) || item.desc.toLocaleLowerCase().includes(searchTerm)
    })
    // render the filtered list
    displayItems(filteredAttractions)

})

function renderComparisonTable(){
    let table = document.getElementById('compare-table')

    if(!table){
        console.log('No table element found.')
        return;
    }

    // clear existing content (if any)
    table.innerHTML = ""

    let thead = document.createElement('thead')
    let headerRow = document.createElement('tr')

    const thLabel = document.createElement('th')
    thLabel.textContent = "Feature"
    headerRow.appendChild(thLabel)

    attractions.forEach(item => {
        let th = document.createElement('th')
        th.textContent = item.title
        headerRow.appendChild(th)
    })

    thead.appendChild(headerRow)
    table.appendChild(thead)

    // table body
    let tbody = document.createElement('tbody')


    // Row A: Location
    let rowLocation = document.createElement('tr')
    let locLabel = document.createElement('td')
    locLabel.textContent = "Location / Origin"
    locLabel.classList.add('row-label')
    rowLocation.appendChild(locLabel)

    attractions.forEach(item => {
        let td = document.createElement('td')
        td.textContent = item.location
        rowLocation.appendChild(td)
    })

    tbody.appendChild(rowLocation)

    // Row B: Description
    let descRow = document.createElement('tr')
    let descLabel = document.createElement('td')
    descLabel.textContent = "Overview"
    descLabel.classList.add('row-label')
    descRow.appendChild(descLabel)

    attractions.forEach(item => {
        let td = document.createElement('td')
        td.textContent = item.desc
        descRow.appendChild(td)
    })

    tbody.appendChild(descRow)

    // Row C: Top Highlight / Fact

    let factRow = document.createElement('tr')
    let factLabel = document.createElement('td')
    factLabel.textContent = "Key Highlight"
    factLabel.classList.add('row-label')
    factRow.appendChild(factLabel)

    attractions.forEach(item => {
        let td = document.createElement('td')
        // display the first fact from the facts array
        td.textContent = item.facts[0] || "N/A"
        factRow.appendChild(td)
    })

    tbody.appendChild(factRow)
    
    table.appendChild(tbody)

}

displayItems(attractions)
displayFavorites()
populateCompareDropDown()
compareSelectedAttractions()
