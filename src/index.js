function qs(arg){
  return document.querySelector(arg)
}

function ce(arg){
  return document.createElement(arg)
}

let dogbar = qs('#dog-bar')
let doginfo = qs('#dog-info')
let dogbutton = qs('#good-dog-filter')
let filter = false
let response
let filteredData = []

function render(res){
  dogbar.innerHTML = ''
  res.forEach(function(one){
    let span = ce('span')
    span.innerText = one.name
    span.addEventListener('click', function(e){
      doginfo.innerHTML = ''
      let h2 = ce('h2')
      let img = ce('img')
      let button = ce('button')
      img.src = one.image
      h2.innerText = one.name
      one.isGoodDog ? button.innerText = 'Good Dog!' : button.innerText = 'Bad Dog!'
      button.addEventListener('click', function(){
        if(button.innerText === 'Good Dog!'){
          let data = {isGoodDog: false}
          button.innerText = 'Bad Dog!'
          one.isGoodDog = !one.isGoodDog
          fetch(`http://localhost:3000/pups/${one.id}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then(console.log('Successfully changed to Bad Dog!'))
        } else {
          let data = {isGoodDog: true}
          button.innerText = 'Good Dog!'
          one.isGoodDog = !one.isGoodDog
          fetch(`http://localhost:3000/pups/${one.id}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
          .then(console.log('Successfully changed to Good Dog!'))
        }
      })
      doginfo.append(img, h2, button)
    })
    dogbar.append(span)
  })
}


document.addEventListener('DOMContentLoaded', function(){
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(res => {
    response = res
    render(response)
  })
})

dogbutton.addEventListener('click', function(){
  filter = !filter
  if(filter){
    dogbutton.innerText = 'Filter good dogs: ON'
    filteredData = []
      for (key of response) {
        if(key.isGoodDog){
          console.log(key)
          filteredData.push(key)
        }
      }
    render(filteredData)
  } else {
    dogbutton.innerText = 'Filter good dogs: OFF'
    render(response)
  }
})
