import { useState } from "react";

import "../../static/css/components/common/toggleButtonstyle.css";

const ToggleButton = ({toggle, onChange}) => {

    return(
        <div className="toggle-container">
            <button className={`toggled-btn ${ toggle ? "toggled" : ""}`}
                onClick={() => { onChange() }}
            >
                <div className="thumb"> </div>
            </button>
        </div>
    )
}

export default ToggleButton;