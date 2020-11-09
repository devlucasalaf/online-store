import React, { useState } from 'react'
import Header from '../../Components/Header'
import './styless.css'

const Home = () => {

  const Products = [
    {
      name: 'SS Sneaker',
      price: 100.00,
      photo: './home-imgs/sssneaker.png'
    },
    {
      name: 'SX Sneaker',
      price: 85.00,
      photo: './home-imgs/sxsneaker.png'
    },
    {
      name: 'SV Sneaker',
      price: 34.00,
      photo: './home-imgs/sssneaker.png'
    },
    {
      name: 'SW Sneaker',
      price: 124.00,
      photo: './home-imgs/swsneaker.png'
    },
    {
      name: 'SB Sneaker',
      price: 78.00,
      photo: './home-imgs/sbsneaker.png'
    },
    {
      name: 'The RED Sneaker',
      price: 100.00,
      photo: './home-imgs/redsneaker.png'
    }
  ]

  const sizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  const quantitys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const [searchPlaceHolder, setSearchPlaceHolder] = useState('Search for your sneaker')

  const clearPlaceholder = () => {
    setSearchPlaceHolder('')
  }

  const blurPlaceHolder = () => {
    setSearchPlaceHolder('Search for your sneaker')
  }

  return (
    <div id='home-container'>
      <Header
        title='Sneakers'
        avatarImg='./header-imgs/Avatar.png'
      />
      <div id='content-home'>
        <div id='search-wrapper'>
          <img src='./home-imgs/Search.png' alt='Search'></img>
          <input onBlur={blurPlaceHolder} onFocus={clearPlaceholder} name='search' type='text' placeholder={searchPlaceHolder}></input>
        </div>
        <div id='products-wrapper'>
          {Products.map((product, index) => {
            return (
              <div key={index} className='product-box'>
                <img className='product-appear' src={product.photo} alt='product'></img>
                <div className='product-info'>
                  <h3>{product.name}</h3>
                  <div className='size-qtd-info'>
                    <div className='size-wrapper'>
                      <label>Size</label>
                      <select>
                        {sizes.map(size => {
                          return (
                            <option key={`size${size}`} >{size}</option>
                          )
                        })}
                      </select>
                    </div>
                    <div className='quant-wrapper'>
                      <label>Quantity</label>
                      <select>
                        {quantitys.map(quantity => {
                          return (
                            <option key={`quantity${quantity}`}>{quantity}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='price-info'>
                    <span>$</span>
                    <output>{product.price.toFixed(2)}</output>
                  </div>
                  <button className='add-cart-btn'>Add to cart</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div >
  )
}

export default Home
