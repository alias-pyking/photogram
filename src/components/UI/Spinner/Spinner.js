import React from "react";
import TopBarProgress from "react-topbar-progress-indicator";
const spinner = () =>{
    TopBarProgress.config({
        barColors: {
          "0": "#E91E63",
          "1.0": "#E91E63"
        },
        shadowBlur: 5
      });
    return(<TopBarProgress/>)
};
export default spinner;
