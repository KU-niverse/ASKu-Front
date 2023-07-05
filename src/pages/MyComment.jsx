import React, { Component } from "react";
import styles from "./MyComment.module.css"
import Header from "../components/Header";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import { useState } from "react";
import Switch from "../components/Switch";

function MyComment(){
  const [isToggled, setIsToggled] = useState(false); //import하려는 페이지에 구현

  return(
    <div className={styles.container}>
      <div>
        <Header/>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.comment}>내가 쓴 댓글</p>
          <div className={styles.switch}>
          <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
          </div>
        </div>       
        <Comment/>
      </div>
      <div>
        <Footer />
      </div>
    </div>

  );
};


export default MyComment;