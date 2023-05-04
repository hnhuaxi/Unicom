import React, { useState } from 'react'
import './index.css'
import closePopup from '../../static/images/close2.png'
import { Checkbox, Toast, Input, Form, Cascader, Cell, Button, Field, Dialog, Overlay } from 'react-vant'
import { QuestionO } from '@react-vant/icons'
import { useCascaderAreaData } from '@vant/area-data'
import { validAuth, preOrder, Order } from '../../network/api'
import { Link } from "react-router-dom";

export default function Popup({ isShow, phoneNumber, onClose }) {
  const [checked, setChecked] = useState(true)
  const cascaderAreaData = useCascaderAreaData();
  const clickId = window.appClickId;
  const adsetId = window.appAdsetId;

  const close = () => {
    onClose()
  }

  const onFinish = values => {
    console.log(values)
    const vaildAuthData = {
      serviceName: '中国联通海南市分公司',
      province: '50',
      city: '501',
      certNum: values.id,
      certName: values.username
    }

    const preOrderData = {
      serviceName: '中国联通海南市分公司',
      adsetId: adsetId,
      certName: values.username,
      certNo: values.id,
      contactNum: values.phone,
      postProvinceCode: values.area[0],
      postCityCode: values.area[1],
      postDistrictCode: values.area[2],
      postAddr: values.detailed,
      firstMonthFee: "A000011V000003",
      orderTotalFee: '0',
      clickId: clickId
    }

    const orderData = {
      serviceName: '中国联通海南市分公司',
      phoneNum: phoneNumber,
    }

    validAuth(vaildAuthData).then(res => {
      preOrder(preOrderData).then(res => {
        orderData.token = res.token
        Order(orderData).then(res => {
          console.log(res);
          Dialog.alert({
            message: '下单成功！',
          })
        })
      }).catch(err => {
        Dialog.alert({
          message: err.response.data.message,
        })
      })
    }).catch((err) => {
      Dialog.alert({
        message: err.response.data.message,
      })
    })
  }

  // 定义校验规则
  const rules = {
    username: [
      {
        validator: (_, value) => {
          if (/^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/.test(value)) {
            return Promise.resolve(true)
          }
          return Promise.reject(new Error('请输入正确的姓名'))
        },
      },
    ],
    id: [
      {
        validator: (_, value) => {
          if (/\d{17}[\d|x]|\d{15}/.test(value)) {
            return Promise.resolve(true)
          }
          return Promise.reject(new Error('请输入正确的身份证'))
        },
      },
    ],
    phone: [
      {
        validator: (_, value) => {
          if (/0?(13|14|15|16|18|17|19)[0-9]{9}/.test(value)) {
            return Promise.resolve(true)
          }
          return Promise.reject(new Error('请输入正确的手机号'))
        },
      },
    ],
    area: [
      { required: true, message: '请选择省、市、区' },
    ],
    detailed: [
      { required: true, message: '请输入具体地址' },
    ]
  };

  return (
    <>
      <Overlay visible={isShow} onClick={() => { close() }}>
        <div>
          <div className="form">
            <div className="package">
              <div className="selected">
                <img src={closePopup} onClick={() => { close() }} alt="" />
                <div className="selected_number">
                  <h3>{phoneNumber}</h3>
                </div>
                <div className="package_info">
                  <ul className="package_info_list">
                    <li>套餐</li>
                    <li>语音</li>
                    <li>流量</li>
                  </ul>
                  <p className="package_info_list_p1">103G流量王=100分钟/月+103G/月</p>
                  <p className="package_info_list_p2">全国通用流量 无套路</p>
                </div>
                <div className="package_txt">
                  <div className="package_txt_con">
                    <p >资费：原40元/月，参与福利活动后<span style={{ color: 'rgb(245, 129, 1)' }}>仅需30元/月</span></p>
                  </div>
                </div>
                <div className="package_txt">
                  <div className="package_txt_con">
                    <p style={{ color: 'rgb(245, 129, 1)', fontSize: '21px' }}>福利1：首充100元得340元话费</p>
                    <p style={{ color: 'rgb(245, 129, 1)', fontSize: '21px' }}>福利2：首充200元得680元话费</p>
                    <p style={{ color: 'rgb(190, 190, 190)', fontSize: '14px' }}>充值款一次性到账，赠送话费每月返还10元</p>
                  </div>
                </div>
              </div>
            </div>
            <Form onFinish={onFinish} >
              <div className="number_popup_con">
                <div className="information">
                  <div className="requirements">
                    根据国家手机号卡实名要求，请如实填写以下信息，以便我们及时为您送达。
                  </div>
                  <div className="information_all">
                    <ul className="information_all_list">
                      <li>
                        <div className="information_all_tit">
                          收货人信息（请务必填写准确哦~）
                        </div>
                      </li>
                      <li>
                        <Cell.Group>
                          <Form.Item
                            name='username'
                            label='姓名'
                            rules={rules.username}
                          >
                            <Input placeholder='你的名字，是我见过最短的情诗' />
                          </Form.Item>
                        </Cell.Group>
                      </li>
                      <li>
                        <Cell.Group>
                          <Form.Item
                            name='id'
                            label='身份证'
                            rules={rules.id}
                          >
                            <Input placeholder='放心吧，加密了很安全' />
                          </Form.Item>
                        </Cell.Group>
                      </li>
                      <li>
                        <Cell.Group>
                          <Form.Item
                            name='phone'
                            label='联系电话'
                            rules={rules.phone}
                          >
                            <Input placeholder='留下联系方式，收藏进我心里' />
                          </Form.Item>
                        </Cell.Group>
                      </li>
                      <li>
                        <div id="region" className="information_all_tit">
                          收货地区（只为早日见到您）
                        </div>
                      </li>
                      <li>
                        <Cell.Group>
                          <Form.Item
                            name='area'
                            label='收货地址：'
                            isLink
                            rules={rules.area}
                          >
                            <Cascader
                              popup={{ round: true }}
                              title='所在地区'
                              defaultValue=''
                              options={cascaderAreaData}
                            >
                              {(_, selectedRows, actions) => (
                                <Input
                                  value={selectedRows.map(el => el.text).join(',')}
                                  readOnly
                                  placeholder='请选择省/市/区'
                                  onClick={() => actions.open()}
                                />
                              )}
                            </Cascader>
                          </Form.Item>
                        </Cell.Group>
                      </li>
                      <li>
                        <Cell.Group>
                          <Form.Item
                            name='detailed'
                            rules={rules.detailed}
                          >
                            <Field
                              placeholder='亲，什么小区几幢几零几？送货上门哦'
                              clearable
                              rightIcon={<QuestionO />}
                              onClickRightIcon={() => Toast.info('请输入详细准确的地址，字数不少于6字(例如:**街道...)，且不能包含特殊符号(例如:？！/ ()等，可以输入小写-号)')}
                            />
                          </Form.Item>
                        </Cell.Group>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="agree">
                <Checkbox className="ckbox" checked={checked} onChange={setChecked}>
                  阅读并同意
                </Checkbox>
                <p>
                  <Link to="/agree"><span className="agree1">《入网服务及业务协议》</span></Link>
                  <Link to="/declare"><span className="agree2">《个人信息授权及保护声明》</span></Link>
                </p>
              </div>
              <div className="receive">
                <Button nativeType='submit' type='primary'>立即领取  包邮到家</Button>
                <p>本活动为阶段性优惠活动，发布数量有限，请保持联系号码畅通，我们可能随时与您联系，电话无人接听或恶意下单，将不予发货。</p>
              </div>
            </Form>
          </div>
        </div>
      </Overlay>
    </>
  )
}
