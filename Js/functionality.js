const searchBar = document.getElementById('searchInput')
const searchButton = document.getElementById('searchBtn')
const resultsGrid = document.getElementById('grid')
let detailContainer = document.getElementById('detailContainer')
const favoriteItem = new Set() //To prevent possible duplicate values

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

{
    id: 'hogsback',
    title: 'Hogsback Village',
    desc: "Three flat-topped Hogsback Mountains with spectacular views, indigenous forest and plethora of romantic waterfalls. It's a truly versatile break-away destination.",
    image: '../res/hogsback.jpg',
    altText: "Stone structures with mountains in the background",
    facts: [
        "The village gets its name from three distinct mountain ridges in the Amathole range that look like the bristled back of a running wild pig.",
        "It is home to an 800-year-old, 36.5-meter-tall giant yellowwood tree, which is the largest known tree in the Eastern Cape.",
        "Many locals and visitors believe the mystical, dense forests inspired J.R.R. Tolkien’s design of The Lord of the Rings realms, as he was born in South Africa."
    ],
    location: "About 30 km north from the town Alice, positioned in a central-southern inland zone"
},

{
    id: 'mariepskop',
    title: 'Mariepskop Viewpoint',
    desc: "Towering over the Blyde River Canyon, Mariepskop offers not just panoramic views but an adventure into the diverse and rich natural beauty of the region of the Drakensberg Mountain.",
    image: '../res/mariepskop.jpg',
    altText: "View form the Drakensburg Mountain",
    facts: [
        "Stands at 1,947 meters; on a clear day, the peak offers views stretching to the Kruger National Park and the Indian Ocean.",
        "Spans three distinct biomes (bushveld, montane forest, and an isolated pocket of Cape fynbos) over a short distance.",
        "Named after Chief Maripe Mashile, whose warriors successfully defended the mountain during the 1864 Moholoholo war by rolling boulders down on attackers."
    ],
    location: "Nature reserve in the northern Drakensberg near Hoedspruit, Limpopo and Mpumalanga"
},

{
    id: 'cango-caves',
    title: 'Cango Caves',
    desc: "Though damaged through shortsighted tourism schemes in the 1960s, these caves are still worth a visit for their eerie dark tunnels and stunning limestone formations.",
    image: '../res/cango-caves.jpg',
    altText: "The inside of the Cango Caves",
    facts: [
        "The cave system is roughly 20 million years old and stretches over 4 kilometers (about 2.5 miles), though only a portion is open to the public.",
        "The first major cavern, Van Zyl's Hall, is about 107 meters long and 54 meters wide, making it large enough to hold a full soccer field.",
        "They are recognized as South Africa’s oldest tourist attraction, with early visitor regulations first established by Lord Charles Somerset in 1820 to protect the rock formations."
    ],
    location: "On the R328, Cango Valley, Oudtshoorn"
},

]


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
    // let detailContainer = document.getElementById('detailContainer')
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
displayFavorites()

