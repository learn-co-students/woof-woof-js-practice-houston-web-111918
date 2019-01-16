// Utilities
  let s = function(selector){
    return document.querySelector(selector)}

  let c = function(tagName){
    return document.createElement(tagName)}

// HTML Elements 
  let dogBar = s('#dog-bar')
  let dogInfo = s('#dog-info')
  let toggleFilterButton = s('#good-dog-filter')

// Variables
  let pups = []
  let selectedPup = null
  let filter = false
  let pupsToDisplay
  
  
  function render(){
      dogBar.innerHTML = ''
      dogInfo.innerHTML = ''

      if (filter){
          pupsToDisplay = pups.filter(pup => pup.isGoodDog)
          toggleFilterButton.innerText = "Filter good dogs: OFF"
      } else {
          pupsToDisplay = pups 
          toggleFilterButton.innerText = "Filter good dogs: ON"
      }

      pupsToDisplay.forEach(pup => {
          let dogSpan = c('span')
          dogSpan.innerText = pup.name
          dogSpan.addEventListener('click', () => {
              selectedPup = pup
              render()
          })
        dogBar.append(dogSpan)
    })


    if(selectedPup != null){
        let showImage = c('img')
        let showName = c('h1')
        let showButton = c('button')

        showImage.src = selectedPup.image 
        showName.innerText = selectedPup.name 
        showButton.innerText = selectedPup.isGoodDog ? 'Report as Bad' : 'Report as Good'

        showButton.addEventListener('click', () => {
            selectedPup.isGoodDog = !selectedPup.isGoodDog
            render()
            fetch(`http:localhost:3000/pups/${selectedPup.id}`, {
                method:'PATCH',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(selectedPup)
            })
        })

        dogInfo.append(showImage, showName, showButton)
    }
}

toggleFilterButton.addEventListener('click', () => {
    filter = !filter
    render()
})




  

fetch("http://localhost:3000/pups")
    .then(res => res.json())  // <-recieved the response
    .then(res => pups = res) // <-Parsed the response
    .then(render)  //<- render pups 

