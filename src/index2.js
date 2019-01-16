let dogBar = document.querySelector('#dog-bar')

let pups = [] // <- Create an empty array so that way you can push the parsed data into an empty array so you can access it
let selectedPup 

fetch("http://localhost:3000/pups")   // <-returns a promise
    .then(res => res.json())  // <- The promise is resolved with "res"
    .then(res => (pups = res)
    .then(render)
    



function render(){
pups.forEach ( pup => { 
        // <- Need to iterate through each pup 
 let dogSpan = document.createElement('span') //<- Creating a span for each dog
 dogSpan.innerText = pup.name //<- Populating the span with the pup "name"
 dogBar.append(dogSpan) // <- Put it on the screen
})
}




