import React, { useState, useEffect } from 'react'
import { HiOutlineTrash, HiReceiptRefund } from 'react-icons/hi'
import Header from '../../Components/Header'
import './styless.css'
import { RiShoppingCartLine } from 'react-icons/ri'

const Home = () => {

  const products = [
    {
      name: 'SS Sneaker',
      price: 100.00,
      photo: './home-imgs/sssneaker.png',
      size: 34,
      qtd: 1,
      pid: 1,
      id: 134
    },
    {
      name: 'SX Sneaker',
      price: 85.00,
      photo: './home-imgs/sxsneaker.png',
      size: 34,
      qtd: 1,
      pid: 2,
      id: 234
    },
    {
      name: 'SV Sneaker',
      price: 34.00,
      photo: './home-imgs/sssneaker.png',
      size: 34,
      qtd: 1,
      pid: 3,
      id: 334
    },
    {
      name: 'SW Sneaker',
      price: 124.00,
      photo: './home-imgs/swsneaker.png',
      size: 34,
      qtd: 1,
      pid: 4,
      id: 434
    },
    {
      name: 'SB Sneaker',
      price: 78.00,
      photo: './home-imgs/sbsneaker.png',
      size: 34,
      qtd: 1,
      pid: 5,
      id: 534
    },
    {
      name: 'The RED Sneaker',
      price: 1000.00,
      photo: './home-imgs/redsneaker.png',
      size: 34,
      qtd: 1,
      pid: 6,
      id: 634
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
  const [effectBuy, setEffectBuy] = useState(false)
  const [totalCartValue, setTotalCartValue] = useState(0)

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

  const addToCart = (product, index) => {
    let statusLocalStorage = localStorage.getItem('products')

    if (statusLocalStorage === null) {
      let itemsOnStorage = []
      itemsOnStorage.push(product)
      localStorage.setItem('products', JSON.stringify(itemsOnStorage))
    } else {
      let itemsOnStorage = JSON.parse(localStorage.getItem('products'))
      const productAddedIndex = itemsOnStorage.findIndex(value => {
        return value.id === product.id
      })
      if (productAddedIndex !== -1) {
        itemsOnStorage[productAddedIndex].qtd = itemsOnStorage[productAddedIndex].qtd + product.qtd
        localStorage.setItem('products', JSON.stringify(itemsOnStorage))
      } else {
        itemsOnStorage.push(product)
        localStorage.setItem('products', JSON.stringify(itemsOnStorage))
      }
    }
    setIndexUseEffect(index)
    setEffectBuy(false)
    setEffectBuy(true)
    setTimeout(() => {
      setEffectBuy(false)
    }, 2000)
  }

  const deleteOfCart = (id) => {
    let idToBeDeleted = onCartItems.findIndex(value => {
      return value.id === id
    })
    onCartItems.splice(idToBeDeleted, 1)
    localStorage.setItem('products', JSON.stringify(onCartItems))
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
    productsState[sizeIndex].id = +(productsState[sizeIndex].pid.toString() + sizeValue.toString())
    setNewProducts(productsState)
    setIndexUseEffect(sizeIndex)
    console.log(productsState[sizeIndex].id)
  }

  const cartHandle = () => {
    if (localStorage.getItem('products') === null) {
      return
    } else {
      let itemsOnCart = JSON.parse(localStorage.getItem('products'))
      setOnCartItems(itemsOnCart)
    }
  }

  const totalValueHandle = () => {

    if (onCartItems.length === 0) {
      return
    } else {
      let newArrWithValues = []
      for (let i = 0; i < onCartItems.length; i++) {
        let val = onCartItems[i].price * onCartItems[i].qtd
        newArrWithValues.push(val)
      }

      let totalValuesSet = newArrWithValues.reduce((prevItem, currentItem) => {
        return prevItem + currentItem
      })
      setTotalCartValue(totalValuesSet)
    }
  }

  useEffect(() => {
    cartHandle()
    totalValueHandle()
    setIndexUseEffect()

  }, [indexUseEffect, onCartItems])

  return (
    <div id='home-container'>
      <Header
        title='Sneakers'
        avatarImg='./header-imgs/Avatar.png'
      />
      <div id='cart-wrapper'>
        <span onClick={openCart} id='cart-icon'><RiShoppingCartLine /></span>
        <strong id={effectBuy === false ? '' : 'item-added-strong'} onClick={openCart}><p>{onCartItems.length}</p></strong>
      </div>
      <div className={cartOpen === false ? 'cart-preview-hide' : 'cart-preview-show'}>
        {onCartItems.map((item, index) => {
          return (
            <div className='items-on-cart' key={index}>
              <img src={item.photo} alt='item'></img>
              <div className='product-info-cart'>
                <h2>{item.name}</h2>
                <p>Size: {item.size} / Quantity: {item.qtd}</p>
                <strong>$ {item.price.toFixed(2)}</strong>
              </div>
              <span id='trash-element' onClick={() => { deleteOfCart(item.id) }}><HiOutlineTrash /></span>
            </div>
          )
        })}
        {onCartItems.length !== 0 ?
          <div>
            <div id='total-cart-value'>
              <strong>Total</strong>
              <span>$ {totalCartValue.toFixed(2)}</span>
            </div>
            <a href='/payment' className='btn-cart finish-buy-btn'>Checkout</a>
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
