import React, { useState, useEffect } from 'react'
import bill from '../../static/images/bill.jpg'
import detail from '../../static/images/detail.jpg'
import './index.css'
import Popup from '../Popup/index'
import ScrollButton from '../ScrollButton'
import { selectNumbers } from '../../network/api'
import { Loading, Toast } from 'react-vant'

export default function Home() {
  const numberRules = ["全部", "AAA+", "ABC+", "AABB+", "尾号8", "爱情号"];
  const [isPopupShow, setIsPopupShow] = useState(false)
  const [selected, setSelected] = useState(null)
  const [numberLists, setNumberLists] = useState([])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [inputValue, setInputValue] = useState('')

  const onClose = () => {
    setIsPopupShow(false)
  }

  const openSubmitPouop = (number) => {
    setIsPopupShow(true)
    setPhoneNumber(number)
  }

  const handleItemClick = (index) => {
    setSelected(index)
  }

  const data = {
    serviceName: '中国联通海南市分公司',
    count: 10
  }

  const getNumberList = () => {
    selectNumbers(data).then(res => {
      const { phoneInfos } = res
      setNumberLists(phoneInfos)
    }).catch(err => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
    })
  }

  const nextNumberLists = () => {
    getNumberList()
  }

  useEffect(() => {
    getNumberList()
  }, [])


  return (
    <div>
      <Popup isShow={isPopupShow} phoneNumber={phoneNumber} onClose={onClose} />
      <div className="banner">
        <img src={bill} alt="" />
      </div>
      <div className="func">
        <ul>
          <li>
            <h3 className="heat_search">热搜</h3>
            <ul className="number_rules">
              {numberRules.map((item, index) => {
                return (
                  <li key={index} onClick={() => { handleItemClick(index) }} >
                    <p className={selected === index ? 'number_item_click ' : 'number_item'}>{item}</p>
                  </li>
                )
              })}
            </ul>
          </li>
        </ul>
        <ul className="search_list">
          <li className="sc">
            <div className="search">
              <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='输入你心仪的数字' />
              <button onClick={() => { nextNumberLists() }}><span className="nextButton">{inputValue ? '查询' : '下一批'}</span></button>
            </div>
          </li>
        </ul>
      </div>

      <ul className="number_list">
        {numberLists ? numberLists.map((item) => {
          return (
            <li key={item.serialNumber} onClick={() => {
              openSubmitPouop(item.serialNumber)
            }}>
              <h3 className="number">
                {item.serialNumber}
                <span></span>
              </h3>
              <p>
                <s>￥99</s>
                <i>立即领取</i>
              </p>
            </li>
          )
        }) : (<Loading style={{ margin: '0 auto' }} size="24px" vertical>
          加载中
        </Loading>)}
      </ul>

      <div className="card_details">
        <button onClick={() => { nextNumberLists() }}>下一批</button>
      </div>
      <div className="card_img">
        <img src={detail} alt="" />
      </div>
      <br />
      <br />
      <br />
      <br />
      <ScrollButton />

    </div >
  )
}
