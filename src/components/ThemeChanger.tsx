import React from "react";
import Close from "@mui/icons-material/Close";

const ThemeChanger = ({ changeTheme }: any) => {
  return (
    <div className="themeChanger" onClick={() => changeTheme()}>
      <img
        src="https://static-00.iconduck.com/assets.00/dark-theme-icon-512x512-185rlszm.png"
        alt=""
      />
    </div>
  );
};

export default ThemeChanger;
