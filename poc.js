var arr = [
  { name: "SS Sneaker", price: 100, photo: "./home-imgs/sssneaker.png", qtd: 13 },
  { name: "SS Spro", price: 100, photo: "./home-imgs/sssneaker.png", qtd: 1 }
]


let newArrWithValues = []
for (let i = 0; i < arr.length; i++) {
  let val = arr[i].price * arr[i].qtd
  newArrWithValues.push(val)
}

let totalValues = newArrWithValues.reduce((prevItem, currentItem) => {
  return prevItem + currentItem
})

console.log(totalValues)









