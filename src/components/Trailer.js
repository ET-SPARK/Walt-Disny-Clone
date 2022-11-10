import styled from 'styled-components'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../firebase";

export default function Trailer() {
  const { id } = useParams();
    const [detailData, setDetailData] = useState({});

    useEffect(() => {
        db.collection("movies")
          .doc(id)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setDetailData(doc.data());
            } else {
              console.log("no such document in firebase 🔥");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }, [id]);
  return (
    <Container>
        <Wrap>
        <iframe src={detailData.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Wrap>
    </Container>
  )
}

const Container = styled.div`
position: relative;
min-height: 100vh;
overflow-x: hidden;
display: block;
top: 72px;
padding: calc(1.5vh + 5px);

&::after{
  content: "";
  position: absolute;
  inset: 0px;
  opacity: 1;
  z-index: -1;
  background: url('/images/home-background.png') center center/ cover no-repeat fixed ;
}
`
const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  /* overflow: hidden; */
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);
  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 1;
    z-index: 0;
  }
`
const ImageTitle = styled.div`
align-items: flex-end;
display: flex;
-webkit-box-pack: start;
justify-content: flex-start;
margin: 0px auto;
height: 30vw;
min-height: 170px;
padding-bottom: 24px;
width: 100%;

img{
    max-width: 600px;
    min-width: 200px;
    width: 35px;
}
`
