import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import './styless.css'
import { HiMinusCircle } from 'react-icons/hi'

const Payment = () => {

  const [onCartItems, setOnCartItems] = useState([])
  const [totalCartValue, setTotalCartValue] = useState(0)
  const [indexUseEffect, setIndexUseEffect] = useState()

  const paymentMethods = {
    method1: 'Online banking',
    method2: 'Card payment',
    method3: 'Apple pay'
  }

  const setMethodPayment = (method) => {
    localStorage.setItem('payment-method', method)
  }

  const deleteOfCart = (id) => {
    let idToBeDeleted = onCartItems.findIndex(value => {
      return value.id === id
    })
    onCartItems.splice(idToBeDeleted, 1)
    localStorage.setItem('products', JSON.stringify(onCartItems))
    setIndexUseEffect(id)
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

  const continueHandle = () => {
    if (localStorage.getItem('payment-method') === null) {
      alert('You must to select a payment method.')
    } else {
      window.location.href = 'https://online-store.devlucasalaf.vercel.app/review'
    }
  }

  attTotalValue()

  useEffect(() => {
    cartHandle()
    totalValueHandle()
    setIndexUseEffect()

  }, [indexUseEffect])


  return (
    <div id='payment-container'>
      <Header
        title='Payment Options'
        avatarImg='./header-imgs/Avatar.png'
        backIcon='./header-imgs/Back.png'
        hrefA='/' />
      <div id='payment-wrapper'>
        <p id='checkout-p'>Checkout</p>
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
            <div className='green-circle-off'></div>
            <p className='green-circle-info'>Receipt</p>
          </div>
        </div>
        <div id='payment-content-wrapper'>
          <div id='products-content'>
            <p id='cart-summary'>Cart summary</p>
            {onCartItems.map(product => {
              return (
                <div key={product.id} className='product-info-payment'>
                  <img src={product.photo} alt='item'></img>
                  <div className='product-detail'>
                    <h2>{product.name}</h2>
                    <p>x {product.qtd}, Size {product.size}</p>
                    <p id='product-price'>${product.price.toFixed(2)}</p>
                  </div>
                  <span id='remove-item-element' onClick={() => { deleteOfCart(product.id) }}><HiMinusCircle /></span>
                </div>
              )
            })}
          </div>
          <div id='payment-content'>
            <div id='delivery-cost-info'>
              <div id='delivery-info'>
                <span>Delivery details</span>
                <p>Lucas Alves Afonso</p>
                <p>Phone no: (21) 99843-7728</p>
                <p>Adress: Fakeland, 12.</p>
              </div>
              <div id='cost-info'>
                <span>Total cost</span>
                <div id='delivery'>
                  <p>Delivery</p>
                  <p>$ 0.00</p>
                </div>
                <div id='subtotal'>
                  <p>Subtotal</p>
                  <p>${totalCartValue.toFixed(2)}</p>
                </div>
                <div id='final-value'>
                  <p>Total</p>
                  <strong>${totalCartValue.toFixed(2)}</strong>
                </div>
              </div>
            </div>
            <div id='payment-method-info'>
              <span>Payment method</span>
              <div className='method-div' id='method-div-1'>
                <button onClick={() => { setMethodPayment(paymentMethods.method1) }} className='method-btn btn-method-1'></button>
                <span>SAVE $10</span>
                <p>Online banking</p>
                <img src='./payment-imgs/online-banking.png' alt='banks'></img>
              </div>
              <div className='method-div' id='method-div-2'>
                <button onClick={() => { setMethodPayment(paymentMethods.method2) }} className='method-btn btn-method-2'></button>
                <p>Card payment</p>
                <img src='./payment-imgs/card.png' alt='banks'></img>
              </div>
              <div className='method-div' id='method-div-3'>
                <button onClick={() => { setMethodPayment(paymentMethods.method3) }} className='method-btn btn-method-3'></button>
                <p>Apple pay</p>
                <img src='./payment-imgs/apple.png' alt='banks'></img>
              </div>
            </div>
            <button onClick={continueHandle} id='continue-btn'>Continue</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment