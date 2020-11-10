import React, { useState } from 'react'
import Header from '../../Components/Header'
import './styless.css'

const Home = () => {

  const products = [
    {
      name: 'SS Sneaker',
      price: 100.00,
      photo: './home-imgs/sssneaker.png',
      qtd: 1
    },
    {
      name: 'SX Sneaker',
      price: 85.00,
      photo: './home-imgs/sxsneaker.png',
      qtd: 1
    },
    {
      name: 'SV Sneaker',
      price: 34.00,
      photo: './home-imgs/sssneaker.png',
      qtd: 1
    },
    {
      name: 'SW Sneaker',
      price: 124.00,
      photo: './home-imgs/swsneaker.png',
      qtd: 1
    },
    {
      name: 'SB Sneaker',
      price: 78.00,
      photo: './home-imgs/sbsneaker.png',
      qtd: 1
    },
    {
      name: 'The RED Sneaker',
      price: 100.00,
      photo: './home-imgs/redsneaker.png',
      qtd: 1
    }
  ]


  const sizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  const quantitys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const [newProducts, setNewProducts] = useState(products)
  const [searchPlaceHolder, setSearchPlaceHolder] = useState('Search for your sneaker')
  const [searchValue, setSearchValue] = useState('')
  const [onCartItems, setOnCartItems] = useState([])

  const onChangeSearchValue = (evt) => {
    const value = evt.target.value
    setSearchValue(value)
  }

  const searchSneakers = () => {
    if (searchValue === '') {
      setNewProducts(products)
    } else if (searchValue !== '') {
      const productsFound = products.filter((product, index) => {
        const regex = new RegExp(`(${searchValue})`, 'gim')
        return product.name.match(regex)
      })
      setNewProducts(productsFound)
    }
  }

  const clearPlaceholder = () => {
    setSearchPlaceHolder('')
  }

  const onBlurPlaceHolder = () => {
    setSearchPlaceHolder('Search for your sneaker')
  }

  const addToCart = (product, index) => {
    localStorage.setItem('produto' + (index + 1), JSON.stringify(product))
  }

  const onChangeQtd = (evt) => {
    const qtdValue = parseInt(evt.target.value);
    const qtdIndex = parseInt(evt.target.name);
    let productsState = newProducts;
    productsState[qtdIndex].qtd = qtdValue;
    setNewProducts(productsState)
  }

  return (
    <div id='home-container'>
      <Header
        title='Sneakers'
        avatarImg='./header-imgs/Avatar.png'
        qtItemsCart={onCartItems.length}
      />
      <div id='content-home'>
        <div id='search-wrapper'>
          <img src='./home-imgs/Search.png' alt='Search'></img>
          <input
            value={searchValue}
            onKeyUp={searchSneakers}
            onChange={onChangeSearchValue}
            onBlur={onBlurPlaceHolder}
            onFocus={clearPlaceholder}
            name='search'
            type='text'
            placeholder={searchPlaceHolder}></input>
        </div>
        <div id='products-wrapper'>
          {newProducts.map((newProduct, index) => {
            return (
              <div key={index} className='product-box'>
                <img className='product-appear' src={newProduct.photo} alt='product'></img>
                <div className='product-info'>
                  <h3>{newProduct.name}</h3>
                  <div className='size-qtd-info'>
                    <div className='size-wrapper'>
                      <label>Size</label>
                      <select >
                        {sizes.map((size, index) => {
                          return (
                            <option value={index + 1} key={`size${size}`} >{size}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className='quant-wrapper'>
                      <label>Quantity</label>
                      <select name={index} onChange={onChangeQtd} >
                        {quantitys.map((quantity, index) => {
                          return (
                            <option value={index + 1} key={`quantity${quantity}`}>{quantity}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='price-info'>
                    <span>$</span>
                    <output>{newProduct.price.toFixed(2)}</output>
                  </div>
                  <button onClick={() => { addToCart(newProduct, index) }} className='add-cart-btn'>Add to cart</button>
                </div>
              </div>
            )
          })
          }
          {searchValue !== '' && newProducts.length === 0 && <span id='no-found-message'>No products found in this search.</span>}
        </div>
      </div>
    </div >
  )
}

export default Home
