import React, {useContext, useEffect} from 'react';
import {Container, Nav, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userActions";
import { useTranslation } from "react-i18next";
import i18n from "../lang/i18n";
import {changeLanguage} from "i18next";
import LocaleContext from "../LocaleContext";


const Header = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { locale } = useContext(LocaleContext)
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout())
    }

    const changeLocale = (l) => {
        if (locale !== l){
            i18n.changeLanguage(l)
        }
    }

    const displayLanguage = (l) => {
        switch (l){
            case "ko-KR":
                return "한국어"
            case "en-US" :
                return "English"
            case "jp-JP" :
                return "日本語"
            case "cn-CN" :
                return "中国话"
            default:
                return ""
        }
    }


    // const onChangeLang = (key) => {
    //     i18n.language === key
    //         ? i18n.changeLanguage(key)
    //         : i18n.changeLanguage(key)
    // }
    // useEffect(() => {
    //     changeLanguage()
    //
    // }, [])

    return (
        <header>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href={"/"}>{t("MainTitle")}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">{t("Selling")}</Nav.Link>
                            <Nav.Link href={"/register/product"}>{t("Product Post")}</Nav.Link>
                            <Nav.Link href={"/job"}>
                                {t("Job")}
                            </Nav.Link>
                            <NavDropdown title={displayLanguage(i18n.language)} id="basic-nav-dropdown" onClick={() => console.log("++++++++")}>
                                <NavDropdown.Item onClick={() => changeLocale("en-US")}>{t("English")}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => changeLocale("ko-KR")}>{t("Korean")}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => changeLocale("jp-JP")}> {t("Japanese")}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => changeLocale('cn-CN')}>{t("Chinese")}</NavDropdown.Item>
                            </NavDropdown>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                    <NavDropdown.Item href={"/profile"}>{t("Profile")}</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        {t("Basket")}
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        {t("Logout")}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ): (
                                <>
                                    <Nav.Link  href={"/signup"}>
                                        {t("Signup")}
                                    </Nav.Link>
                                    <Nav.Link href={"/login"}>
                                        {t("Login")}
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;