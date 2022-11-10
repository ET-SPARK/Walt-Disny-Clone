import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from 'react-router-dom';
import { auth, provider } from "../firebase";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/userSlice";
import { useEffect } from "react";

export default function Header({props}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(()=>{
        auth.onAuthStateChanged(async (user) => {
            if(user) {
                setUser(user);
                navigate.push("/home");
            }
        });
    }, [userName])
    
    const handleAuth =() => {
        if(!userName){
            auth.signInWithPopup(provider).then((result) =>{
                setUser(result.user);
            })
            }else if(userName){
                auth.signOut().then(() => {
                    dispatch(setSignOutState())
                    navigate.push("/")
                })
            }
        }
        

        const setUser = (user) => {
            dispatch(
              setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
              })
            );
          };
  return (
    <Nav>
        <LOGO>
            <img src='/images/logo.svg' alt="logo" />
        </LOGO>
        {
            !userName ? (
            <LOGIN onClick={handleAuth}>LOGIN</LOGIN> ):(
            <> 
            <NAVMENU >
        <a href="/home">
            <img src="/images/home-icon.svg" alt="HOME" />
            <span>HOME</span>
        </a>
        <a href="/search">
            <img src="/images/search-icon.svg" alt="SEARCH" />
            <span>SERCH</span>
        </a>
        <a href="/watchlist">
            <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
            <span>WATCHLIST</span>
        </a>
        <a href="/originals">
            <img src="/images/original-icon.svg" alt="ORIGINALS" />
            <span>ORIGINALS</span>
        </a>
        <a href="/movies">
            <img src="/images/movie-icon.svg" alt="MOVIES" />
            <span>MOVIES</span>
        </a>
        <a href="/series">
            <img src="/images/series-icon.svg" alt="SERIES" />
            <span>SERIES</span>
        </a>
        </NAVMENU>
        <SIGNOUT>
        <UserImg src={userPhoto} alt={userName} />
        <DROPDOWN>
            <span onClick={handleAuth}>Sign out</span>
        </DROPDOWN>
        </SIGNOUT>
         
            </>
        )}
    </Nav>
  )
}

const Nav = styled.nav`
position: fixed;
top: 0;
left: 0;
right: 0;
height: 70px;
background-color: #090b13;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 36px;
letter-spacing: 16px;
z-index: 3;
`;

const LOGO =styled.a`
padding: 0;
width: 80px;
margin-top: 4px;
max-height: 70px;
font-size: 0;
display: inline-block;

img{
    display: block;
    width: 100%;
}
`;

const NAVMENU = styled.div`
align-items: center;
display: flex;
flex-flow: row nowrap;
height: 100%;
justify-content: flex-end;
position: relative;
margin-right: auto;
margin-left: 25px;
a{
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
        height: 20px;
        min-width: 20px;
        width: 20px;
        z-index: auto;
    }
    span {
        color: rgb(249, 249,249);
        font-size: 13px;
        letter-spacing: 1.42px;
        line-height: 1.08;
        padding: 2px 0px;
        white-space: nowrap;
        position: relative;
    

    &:before{
        background-color: rgb(249, 249,249);
        border-radius: 0px 0px 4px 4px;
        height: 2px;
        content: "";
        bottom: -6px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scalex(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45,0.94) 0s;
        visibility: hidden;
        width: auto;
       }
    }

&:hover {
    span:before{
        transform: scalex(1);
        visibility: visible;
        opacity: 1 !important;
       }
    }
}
/* @media (max-width: 760px){
    display: none;
} */
`;
const LOGIN = styled.a`
background-color: rgba(0,0,0,0.6);
padding: 8px 16px;
text-transform: uppercase;
color: white;
letter-spacing: 1.5px;
border: 1px solid white;
border-radius: 4px;
transition: all .2s ease 0s;
&:hover{
    background-color: white;
    color: #000;
    border-color: transparent;
}
`;
const UserImg = styled.img`
height: 100%;
border-radius: 50%;
`;
const DROPDOWN = styled.div`
position: absolute;
top: 48px;
right: 0px;
background: rgb(19,19,19);
border: 1px solid rgba(151,151,151,0.34);
border-radius: 4px;
box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
padding: 10px;
margin: 10px;
font-size: 14px;
letter-spacing: 3px;
width: 100px;
opacity: 0;
`
const SIGNOUT = styled.div`
position: relative;
height: 60px;
width: 60px;
display: flex;
cursor: pointer;
align-items: center;
justify-content: center;
&:hover {
    ${DROPDOWN} {
        opacity: 1;
        transition-duration: 1s;
    }
}
`