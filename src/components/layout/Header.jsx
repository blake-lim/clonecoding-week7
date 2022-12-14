import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import melonlogo from "../../assets/melonlogo.png"
import { useSelector, useDispatch } from "react-redux";
import { modalTogle, __logout } from "../../redux/modules/membersSlice"
import { cntWriteModalTogle } from "../../redux/modules/contentsSlice"
import { getCookie } from '../../cookie/cookie';
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
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_WEATHER_KEY}&units=metric
        `
        let response = await fetch(url);
        let data = await response.json();
        setWeather(data)
    }

    useEffect(() => {
        getCurrentLocation()
    }, [])

    const moveToMyPage = (event) => {
        event.stopPropagation();
        navigate("/mypage")
    }


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


    const askLogOut = (event) => {
        event.stopPropagation()
        if (window.confirm("로그아웃 하시겠습니까?")) {
            dispatch(__logout());
        } else {
            alert("취소합니다")
        }


    }


    return (


        <HeadContainer>
            <StHomeBtn onClick={() => { navigate("/") }}>
                {/* <IoMdHome className="head-ico" /> */}
                {/* <IoMdHome /> */}
                <img src={melonlogo}></img>
                <div style={{ margin: "5px", fontSize: "45px", width: "fit-content", whiteSpace: "nowrap" }}>멜론 마켓</div>

            </StHomeBtn>
            {/* 현재 날씨 뿌려주기 */}
            <h5 style={{ margin: "auto", marginLeft: "9px", fontSize: "20px", width: "200px", color: "red" }}>현재날씨:{weather?.main.temp}°C</h5>
            <StNavWrap>
                <StSearchWrap>
                    <input type="text" style={{ width: "200px", height: "30px" }} />
                    <StNavItem style={{ backgroundColor: "rgb(255, 80, 88)" }}>상품검색</StNavItem>
                </StSearchWrap>
                <StNavItem2 onClick={(event) => {
                    getCookie("Access_Token") ?
                        askLogOut(event)
                        :
                        loginModalToggle()
                }}>
                    {getCookie("Access_Token") ? "로그아웃" : "로그인"}
                </StNavItem2>
                {/* {<StNavItem onClick={() => { loginModalToggle() }}>Login</StNavItem> } */}
                <StNavItem onClick={() => {
                    getCookie("Access_Token") ?
                        cntWriteModalToggle()
                        :
                        alert("로그인 후 이용해주세요.")
                }}>판매하기</StNavItem>

                {getCookie("Access_Token") ?
                    <div>
                        <span style={{ color: "white", fontSize: "17px", border: "1px solid green", borderRadius: "50px", backgroundColor: "orange", padding: "13px", fontFamily: "Arial-bold" }}
                            onClick={((event) => {
                                moveToMyPage(event)
                            })
                            }
                        >마이페이지</span>
                    </div>
                    : ""
                }
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
  height: 70px;
  background-color: white;
  color: #149730;
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
  color: #149730;
.head-ico {
font-size: 1.6rem;
margin: 5px;
color: #149730;
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
    /* font-family: 'Gowun Batang', serif; */
    font-weight: bold;
    background-color : white;
    width : 100px;
    height: 80%;
    border-radius : 100px;
    border : none;//#fff solid 1px;
    background-color: #149730;
    color: #fff;
    &:hover{
        background-color: #a9e5a2;
        color: white;
    }
`
const StNavItem2 = styled.button`
    /* font-family: 'Gowun Batang', serif; */
    font-weight: bold;
    background-color : white;
    width : 100px;
    height: 80%;
    border-radius : 100px;
    border : 1px solid #149730;//#fff solid 1px;
    background-color: white;
    color: #149730;
    &:hover{
        background-color: #a9e5a2;
        color: white;
    }
    `;
const StSearchWrap = styled.div`
    width : 30%;
    height : 80%;
    display : flex;
    flex-direction : row;
    align-items : center;
    flex-wrap:wrap;
    gap : 5px;
    input {
        height : 80%;
    }

`