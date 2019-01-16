let pups, pupBar, s, c, renderBar, puppers, pupShow, showImage, pupSpan, goodPups = [], selectedPup
document.addEventListener("DOMContentLoaded", function render(){

 s = function(select){return document.querySelector(select)}
 c = function(tagName){return document.createElement(tagName)} 

 //NAVBAR
 pupBar = s('#dog-bar'), pupShow = s('#dog-info'), filterButton = s('#good-dog-filter')
 showName = c('h1'), showImage = c('img'), showButton = c('button'), showStatus = c('h3')

 //FILTER
 let filter = false
 filterButton.addEventListener('click', function(){
     if(filter == false){filter = true; filterButton.innerText = "Filter good dogs: ON";
        goodPups = pups.filter(pup => pup.isGoodDog == true)
        renderBar(goodPups)}
     else{filter = false; filterButton.innerText = "Filter good dogs:OFF";
        renderBar(pups)}
 })

 //render
  function renderBar(pups){
   pupBar.innerText = ''
   pups.forEach(function(pup){
     pupSpan = c('span')
     pupSpan.addEventListener('click', function(){
        showName.innerText = pup.name
        pupShow.append(showName)
    
        showImage.src = pup.image
        pupShow.append(showImage)

        pup = selectedPup
        if(pup.isGoodDog == true){
          showStatus.innerText = "What a Good Boy!"
          showButton.innerText = "Report as Bad"

          pupShow.append(showStatus, showButton)}
        else{
          showStatus.innerText = "Bad Pup!"
          showButton.innerText = "Report as Good"
          pupShow.append(showStatus, showButton)}

          showButton.addEventListener('click', function(){
              if(pup.isGoodDog == true){
                pup.name = false
                pupShow.append(showStatus, showButton)
              }
              else{
                pup.isGoodDog = true
                pupShow.append(showStatus, showButton)
              }
          })
     })
     pupSpan.innerText = pup.name
     pupBar.append(pupSpan)
   })
 } 

 //fetch
 pups = []
 fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(res => pups = res)
    .then(renderBar)

})


