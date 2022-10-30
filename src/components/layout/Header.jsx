import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import melonlogo from "../../assets/melonlogo.png"
import { useSelector, useDispatch } from "react-redux";
import { modalTogle, __login, __join } from "../../redux/modules/membersSlice"
import { cntWriteModalTogle } from "../../redux/modules/contentsSlice"
import { getCookie, setCookie, delCookie } from '../../cookie/cookie';
import { useEffect } from 'react';
import '../../assets/font/Dongle-Regular.ttf'
import '../../assets/font/GowunBatang-Regular.ttf'
import '../../assets/font/GowunBatang-Bold.ttf'

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //날씨 정보 받은 state
    const [weather, setWeather] = useState(null)

    // 현재 위치 날씨 정보 함수
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            //latitude 위도
            let lat = position.coords.latitude;
            //longitude 경도
            let lon = position.coords.longitude;
            getWeatherByCurrentLocation(lat, lon);
        })
    }
    //openweathermap으로부터 API 정보획득
    const getWeatherByCurrentLocation = async (lat, lon) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4fec86a8af9cd23b5321c3f6ec2da608&units=metric
        `
        let response = await fetch(url);
        let data = await response.json();
        setWeather(data)
    }

    useEffect(() => {
        getCurrentLocation()
    }, [])


    let nickname = getCookie("nickname");
    //모달 상태값으로 띄우기 위해
    const { loginModal } = useSelector(state => state.membersSlice);
    const { cntWriteModal } = useSelector(state => state.contentsSlice);
    //로그인모달 상태값을 바꾸기 위해
    const loginModalToggle = () => {
        dispatch(modalTogle(!loginModal));
    }
    //글작성모달 상태값을 바꾸기 위해
    const cntWriteModalToggle = () => {
        dispatch(cntWriteModalTogle(!cntWriteModal));
    }

    return (


        <HeadContainer>
            <StHomeBtn onClick={() => { navigate("/") }}>
                {/* <IoMdHome className="head-ico" /> */}
                {/* <IoMdHome /> */}
                <img src={melonlogo}></img>
                <div style={{ margin: "5px", fontSize: "45px", width: "200px" }}>멜론 마켓</div>

            </StHomeBtn>
            {/* 현재 날씨 뿌려주기 */}
            <h5 style={{ margin: "auto", fontSize: "20px", width: "200px", color: "orange" }}>현재날씨:{weather?.main.temp}°C</h5>
            <StNavWrap>
                {getCookie("Access_Token") ? (
                    <h3>
                        <h3
                            className="nav-btn"
                            onClick={() => {
                                delCookie("Access_Token");
                                delCookie("nickname");
                                navigate("/login");
                            }}
                            style={{ textDecoration: "none" }}
                        >
                            <span style={{ color: "#FA4C1A" }}>
                                {/* `${getCookie.nickname}`님, 안녕하세요!` */}
                                {nickname}님, 안녕하세요!
                            </span>
                            로그아웃
                        </h3>
                    </h3>
                ) : (
                    <StNavItem onClick={() => { loginModalToggle() }}>로그인</StNavItem>
                )}
                {/* {<StNavItem onClick={() => { loginModalToggle() }}>Login</StNavItem> } */}
                <StNavItem style={{ color: "red" }} onClick={() => { cntWriteModalToggle() }}>판매하기</StNavItem>
            </StNavWrap>
        </HeadContainer>
    );
}
export default Header;




const HeadContainer = styled.div`
font-family: 'Dongle', sans-serif;
font-family: 'Nanum Pen Script', cursive;
  display: flex;
  flex-direction : row;
  justify-content: space-around;
  width: 100%;
  height: 60px;
  background-color: white;
  color: orange;
  position:sticky;
  top : 0;
  box-shadow: 0px 2px 10px #9dabca;
  z-index: 1;
`
const StHomeBtn = styled.a`
    width: 200px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #51e241;
.head-ico {
font-size: 1.6rem;
margin: 5px;
color: #51e241;
height: 40px;
}
&:hover {
color: orange;
}
`

const StNavWrap = styled.div`
    display: flex;
    flex-direction : row;
    justify-content: end;
    align-items : center;
    width: 80%;
    gap : 10px;
`

const StNavItem = styled.button`
    font-family: 'Gowun Batang', serif;
    font-weight: bold;
    background-color : white;
    width : 100px;
    height: 80%;
    border-radius : 100px;
    border : none;//#fff solid 1px;
    background-color: #59ed49;
    color: #fff;
    &:hover{
        background-color: #a9e5a2;
        color: white;
    }
`