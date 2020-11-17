import React, { useState } from 'react'
import './styless.css'

const Header = (props) => {
  return (
    < div id='header-container' >
      <div id='header-wrapper'>
        {props.backIcon === undefined ? <div></div> : <a href={props.hrefA}><img id='back-icon' src={props.backIcon} alt='back-icon'></img></a>}
        <p>{props.title}</p>
        <img id='avatar-img' src={props.avatarImg} alt='avatar-img'></img>
      </div>
    </div >
  )
}

export default Header