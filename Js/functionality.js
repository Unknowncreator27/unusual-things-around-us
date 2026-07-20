const searchBar = document.getElementById('searchInput')
const searchButton = document.getElementById('searchBtn')
const resultsGrid = document.getElementById('grid')

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
        "The boom is loud enough to rattle windows as far away as the City Bowl.",
        
    ],
    location: "Lion Battery, Signal Hill, Cape Town - established 1806"
},
{
    id: 'prestwich',
    title: 'Prestwich Memorial',
    desc: "Prestwich Memorial Visitors Centre entrance",
    image: '../res/prestwich.jpg',
    altText: "Prestwich Memorial Visitors Centre entrance",
    facts: [
        "It holds the remains of thousands of underrepresented VOC-eracitizens, slaves, and sailors.",
        "It was built to provide a respectful neutral resting place rather than covering them up.",
        "It features an outdoor memorial garden alongside an indoor reflection space."
    ],
    location: "Somerset Road , Green Point, Cape Town"
},

{
    id: 'truth-coffee',
    title: 'Truth Coffee HQ',
    desc: "A working coffee roastery styled entirely like a Victorian steampunk workshop, gears and all, tucked into a converted warehouse.",
    image: '../res/truth-coffee.jpg',
    altText: "Truth Coffee moss and neon sign",
    facts: [
        "It has been frequently ranked by international media as one of the best coffee shops in the world",
        "The massive functional vintage roasting machine sits right in the middle of the cafe.",
        "Staff dress up in full steampunk gear, integrating live performance into daily service."
    ],
    location: "36 Buitenkant St, Cape Town CBD"
},

]

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

        // append the card to the grid container
        resultsGrid.appendChild(card)
        
        // create the thumbnail wrapper and image
        const thumbDiv = document.createElement("div")
        thumbDiv.classList.add("thumb")

        const img = document.createElement("img")
        img.src = item.image
        img.alt = item.altText

        thumbDiv.appendChild(img)

        // Create the card body wrapper
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        // Create the heading and description
        const title = document.createElement('h3')
        title.textContent = item.title

        const p = document.createElement('p')
        p.textContent = item.desc
        card.appendChild(thumbDiv)
        card.appendChild(title)
        card.appendChild(p)

        // assemble the complete card
        
        card.appendChild(cardBody)
        card.style.padding = '5px'

        // append the card to the grid container
        resultsGrid.appendChild(card)


        
    });
}

// Build a function to dynamically build the details view cards
function showDetails(item){
    let detailContainer = document.getElementById('detailContainer')
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
    dl.appendChild(dt)
    dl.appendChild(dd)

    body.appendChild(h3)
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

displayItems(attractions)