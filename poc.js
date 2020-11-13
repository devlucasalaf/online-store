var arr = [
  { name: "SS Sneaker", price: 100, photo: "./home-imgs/sssneaker.png", qtd: 1 },
  { name: "SS Spro", price: 100, photo: "./home-imgs/sssneaker.png", qtd: 1 }
]

const products = { name: "SS Sneaker", price: 100, photo: "./home-imgs/sssneaker.png", qtd: 1 }
const regex = new RegExp(`(${JSON.stringify(products)})`, 'gim')

const blim = arr.indexOf(products)
console.log(blim)

var arr2 = [{ id: 2, nome: 'Blim' }];
var obj1 = { id: 1, nome: 'Wallace' }
arr2.push(obj1);
const index = arr2.indexOf(obj1)
console.log(index)
console.log(arr2)
arr2.splice(index, 1)
console.log(arr2)


if (JSON.stringify(arr).match(regex) == null) {
  return (console.log('Cadastro de produto efetuado com sucesso!'))
} else {
  return (console.log('Produto já cadastrado!'))
}







