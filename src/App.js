import React, {useState} from 'react';
import Main from './pages/Main'
import {RouterProvider} from "react-router-dom";
import router from "./router"
import Header from "./components/Header";
import Footer from "./components/Footer";
import i18n from "./lang/i18n";
import LocaleContext from "./LocaleContext";

const App = () => {
    const [locale, setLocale] = useState(i18n.language)

    i18n.on("languageChanged", (lng) => setLocale(i18n.language))
    return (
        <LocaleContext.Provider value={{locale, setLocale}}>
            <div>
                <Header />
                <RouterProvider router={router} />
                <Footer />
            </div>
        </LocaleContext.Provider>
    );
};

export default App;