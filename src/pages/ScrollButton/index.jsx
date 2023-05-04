import React, { useEffect, useState } from 'react'
import './index.css'
import zan from '../../static/images/zan.png'

export default function ScrollButton() {
  const [isShow, setIsShow] = useState(false)

  const isBtnShow = (e) => {
    const top = document.documentElement.scrollTop || document.body.scrollTop
    if (top >= 300) {
      setIsShow(true)
    } else {
      setIsShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", isBtnShow);

    return () => {
      window.removeEventListener("scroll", isBtnShow);
    };
  })

  const toTop = () => {
    window.scrollTo({
      top: 300,
      behavior: "smooth"
    })
  }

  return (
    <div className="footer_btn" onClick={() => { toTop() }} style={{ display: !isShow ? 'none' : 'block' }}>
      <button >
        <img src={zan} alt="" />
        立即选号申请
      </button>
    </div>
  )
}
