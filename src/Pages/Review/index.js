import React, { useState, useEffect } from 'react'
import './styless.css'
import Header from '../../Components/Header'

const Review = () => {

  const [onCartItems, setOnCartItems] = useState([])
  const [totalCartValue, setTotalCartValue] = useState(0)
  const [indexUseEffect, setIndexUseEffect] = useState()


  const paymentMethodChoosed = localStorage.getItem('payment-method')

  const handlePlaceOrder = () => {
    localStorage.clear()

    setTimeout(() => {
      window.location.href = 'http://localhost:3000/'
    }, 2000)
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

  const attTotalValue = () => {
    if (totalCartValue === 0) {
      totalValueHandle()
    } else {
      return
    }
  }


  attTotalValue()

  useEffect(() => {
    cartHandle()
    totalValueHandle()
    setIndexUseEffect()

  }, [indexUseEffect])

  return (
    <div id='review-container' >
      <Header
        title='Review and Confirmation'
        avatarImg='./header-imgs/Avatar.png'
        backIcon='./header-imgs/Back.png'
        hrefA='/payment' />
      <div id='review-wrapper'>
        <div className='status-buying'>
          <div className='green-circle-div green-circle-left'>
            <div className='green-circle'></div>
            <p className='green-circle-info'>Cart</p>
          </div>
          <div className='green-circle-div green-circle-middle'>
            <div className='green-circle'></div>
            <p className='green-circle-info'>Payment options</p>
          </div>
          <div className='green-circle-div green-circle-right'>
            <div className='green-circle'></div>
            <p className='green-circle-info'>Receipt</p>
          </div>
        </div>
        <h1 id='review-title'>Review and Confirmation</h1>
        <div id='review-content'>
          <div id='order-summary'>
            <p id='order-summary-text'>Order Summary</p>
            {onCartItems.map(product => {
              return (
                <div key={product.id} className='review-product'>
                  <img src={product.photo} alt='product'></img>
                  <div className='review-product-info'>
                    <span>{product.name}</span>
                    <p>x {product.qtd}, Size {product.size}</p>
                    <p>Item #{product.id}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div id='review-info-content'>
            <p id='payment-method-text'>Payment Method</p>
            <div id='review-method-choosed'>
              <img src='./review-imgs/bank-icon.png' alt='bank'></img>
              <p>{paymentMethodChoosed}</p>
            </div>
            <div id='review-final-cost-info'>
              <div id='review-delivery-info'>
                <span>Total cost</span>
                <p id='delivery-included'>Delivery included</p>
              </div>
              <p id='final-value-review'>${totalCartValue}</p>
            </div>
            <button onClick={handlePlaceOrder} id='place-order-btn-desktop'>Place order</button>
          </div>
        </div>
        <button onClick={handlePlaceOrder} id='place-order-btn-mobile'>Place order</button>
      </div>
    </div>
  )
}

export default Review