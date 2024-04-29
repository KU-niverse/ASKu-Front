import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
// @ts-expect-error TS(2307): Cannot find module '../img/threedots.png' or its c... Remove this comment to see the full error message
import threedots from "../img/threedots.png";
// @ts-expect-error TS(2307): Cannot find module './ThreedotsBadge.module.css' o... Remove this comment to see the full error message
import styles from "./ThreedotsBadge.module.css";
import { useState } from "react";
import axios from "axios";

function ThreedotsBadge({
  badge_id
}: any) {
  const onRepBadge = async () => {
    try {
      const response = await axios.put(
        // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
        process.env.REACT_APP_HOST+`/user/mypage/setrepbadge`,
        { rep_badge_id: badge_id },
        { withCredentials: true }
      );
      if (response.status === 201) {
        alert("대표 뱃지가 변경되었습니다.");
      } else if (response.status === 400) {
        alert(response.data.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  }; //대표 뱃지 변경

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Menu
      menuButton={
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <MenuButton className={styles.menubtn}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <img src={threedots} alt="Menu"/>
        </MenuButton>
      }
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <MenuItem
        className={styles.menuitem}
        value="대표 뱃지로 설정"
        onClick={(e) => {
          e.stopPropagation = true;
          // @ts-expect-error TS(2339): Property 'preventDefault' does not exist on type '... Remove this comment to see the full error message
          e.preventDefault = true;
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          onRepBadge(badge_id);
        }}
      >
        대표 뱃지로 설정
      </MenuItem>
    </Menu>
  );
}

export default ThreedotsBadge;
