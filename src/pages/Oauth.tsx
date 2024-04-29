import React from "react";
// @ts-expect-error TS(2307): Cannot find module './History.module.css' or its c... Remove this comment to see the full error message
import styles from "./History.module.css";
// @ts-expect-error TS(6142): Module '../components/Header' was resolved to 'C:/... Remove this comment to see the full error message
import Header from "../components/Header";
// @ts-expect-error TS(2307): Cannot find module '../img/his2.png' or its corres... Remove this comment to see the full error message
import his2 from "../img/his2.png";
// @ts-expect-error TS(6142): Module '../components/AllHistoryBox' was resolved ... Remove this comment to see the full error message
import AllHistoryBox from "../components/AllHistoryBox";
import axios from "axios";
import { useState, useEffect } from "react";
// @ts-expect-error TS(6142): Module '../components/Paging' was resolved to 'C:/... Remove this comment to see the full error message
import Paging from "../components/Paging";
// @ts-expect-error TS(6142): Module '../components/FormatTimeAgo' was resolved ... Remove this comment to see the full error message
import FormatTimeAgo from "../components/FormatTimeAgo";
// @ts-expect-error TS(6142): Module '../components/Footer' was resolved to 'C:/... Remove this comment to see the full error message
import Footer from "../components/Footer";
import { useNavigate, useParams } from 'react-router-dom';



const Oauth = () => {
  const navigate = useNavigate();
  const { uuid } = useParams(); // URL의 파라미터를 가져옵니다.
  const [loggedIn, setLoggedIn] = useState(false); // Define the setLoggedIn function using the useState hook

  useEffect(() => {
    async function fetchData() {
      let response;
      try {
        //uuid로 로그인
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        response = await axios.post(process.env.REACT_APP_HOST + "/user/auth/koreapasoauth", {
          uuid: uuid,
        },
          { withCredentials: true });
        if (response.status === 200 && response.data.success === true) {
          if (response.data.data.is_registered === true) {
            setLoggedIn(true);
            navigate("/");
          }
          if (response.data.data.is_registered === false) {
            setLoggedIn(false);
            navigate("/signup", { state: { uuid: response.data.data.koreapas_uuid, nickname: response.data.data.koreapas_nickname } });
          }

        }
      } catch (error) {
        //이미 로그인되어있는 경우
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        if (error.response.status === 400) {
          setLoggedIn(true);
          navigate("/");
        }
        // @ts-expect-error TS(2571): Object is of type 'unknown'.
        if (error.response.status === 403) {
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          if (error.response.data.message === "유효하지 않은 접근입니다.") {
            alert("유효하지 않은 접근입니다.")
            setLoggedIn(false);
            navigate("/")
          }
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          if (error.response.data.message === "강등 또는 미인증 상태의 유저입니다.") {
            alert("강등 또는 미인증 상태의 유저입니다.")
            setLoggedIn(false);
            navigate("/")
          }

        }
        else {
          setLoggedIn(false);
          navigate("/");
        }

      }
    }
    fetchData();
  }, []);

  return null;
};

export default Oauth;
