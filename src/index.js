function qs(arg){
  return document.querySelector(arg)
}

function ce(arg){
  return document.createElement(arg)
}

let dogbar = qs('#dog-bar')
let doginfo = qs('#dog-info')

document.addEventListener('DOMContentLoaded', function(){
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(res => {
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
  })
})
