import React from "react";

const defaultValue = {
    locale : "en-US",
    setLocale : () => {}
}
export default React.createContext(defaultValue)