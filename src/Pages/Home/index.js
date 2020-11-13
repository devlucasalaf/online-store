import React, { useState, useEffect } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import Header from '../../Components/Header'
import './styless.css'

const Home = () => {

  const products = [
    {
      name: 'SS Sneaker',
      price: 100.00,
      photo: './home-imgs/sssneaker.png',
      size: 34,
      qtd: 1,
      id: 1
    },
    {
      name: 'SX Sneaker',
      price: 85.00,
      photo: './home-imgs/sxsneaker.png',
      size: 34,
      qtd: 1,
      id: 2
    },
    {
      name: 'SV Sneaker',
      price: 34.00,
      photo: './home-imgs/sssneaker.png',
      size: 34,
      qtd: 1,
      id: 3
    },
    {
      name: 'SW Sneaker',
      price: 124.00,
      photo: './home-imgs/swsneaker.png',
      size: 34,
      qtd: 1,
      id: 4
    },
    {
      name: 'SB Sneaker',
      price: 78.00,
      photo: './home-imgs/sbsneaker.png',
      size: 34,
      qtd: 1,
      id: 5
    },
    {
      name: 'The RED Sneaker',
      price: 1000.00,
      photo: './home-imgs/redsneaker.png',
      size: 34,
      qtd: 1,
      id: 6
    }
  ]

  const sizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  const quantitys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const [indexUseEffect, setIndexUseEffect] = useState()
  const [newProducts, setNewProducts] = useState(products)
  const [searchPlaceHolder, setSearchPlaceHolder] = useState('Search for your sneaker')
  const [searchValue, setSearchValue] = useState('')
  const [onCartItems, setOnCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)

  const openCart = () => {
    setCartOpen(!cartOpen)
  }

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

  const addToCart = (product, id) => {
    localStorage.setItem('product' + id, JSON.stringify(product))
    setIndexUseEffect(id)
  }

  const deleteOfCart = (id) => {
    localStorage.removeItem('product' + id)
    setIndexUseEffect(id)
  }

  const onChangeQtd = (evt) => {
    const qtdValue = parseInt(evt.target.value);
    const qtdIndex = parseInt(evt.target.name);
    let productsState = newProducts;
    productsState[qtdIndex].qtd = qtdValue;
    setNewProducts(productsState)
    setIndexUseEffect(qtdIndex)
  }

  const onChangeSize = (evt) => {
    const sizeValue = parseInt(evt.target.value);
    const sizeIndex = parseInt(evt.target.name);
    let productsState = newProducts;
    productsState[sizeIndex].size = sizeValue;
    setNewProducts(productsState)
    setIndexUseEffect(sizeIndex)
  }

  useEffect(() => {
    setIndexUseEffect()

    const cartHandle = () => {
      let itemsOnCart = []
      let i = 0;

      while (i < products.length) {
        i++
        if (JSON.parse(localStorage.getItem(`product${i}`) === null)) {
        } else {
          let newItem = JSON.parse(localStorage.getItem(`product${i}`))
          itemsOnCart.push(newItem)
        }
      }
      setOnCartItems(itemsOnCart)
    }
    cartHandle()

  }, [indexUseEffect])

  return (
    <div id='home-container'>
      <Header
        title='Sneakers'
        avatarImg='./header-imgs/Avatar.png'
        qtItemsCart={onCartItems.length}
      />
      <span onClick={openCart} id='btn-open-cart'></span>
      <div className={cartOpen === false ? 'cart-preview-hide' : 'cart-preview-show'}>
        {onCartItems.map((item, index) => {
          return (
            <div className='items-on-cart' key={index}>
              <img src={item.photo} alt='item'></img>
              <div className='product-info-cart'>
                <h2>{item.name}</h2>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.qtd}</p>
              </div>
              <div className='value-item-cart'>
                <strong>$ {item.price},00</strong>
                <span onClick={() => { deleteOfCart(item.id) }}><HiOutlineTrash /></span>
              </div>
            </div>
          )
        })}
        {onCartItems.length !== 0 ?
          <div>
            <button className='btn-cart go-cart-btn'>Go to the cart</button>
            <button className='btn-cart finish-buy-btn'>Finish Buy</button>
          </div>
          :
          <div>
            <span className='no-products-on-cart'> There's no products on Cart.</span>
          </div>
        }
      </div>
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
                      <select name={index} onChange={onChangeSize} >
                        {sizes.map((size) => {
                          return (
                            <option value={size} key={`size${size}`} >{size}</option>
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
                    <output>{(newProduct.price * newProduct.qtd).toFixed(2)}</output>
                  </div>
                  <button onClick={() => { addToCart(newProduct, newProduct.id) }} className='add-cart-btn'>Add to cart</button>
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
