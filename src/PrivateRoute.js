import React from "react";
import { Route, Redirect } from "react-router-dom";
var passworder = require('browser-passworder')


export const PrivateRoute = ({ component: Component, ...rest }) => {

    React.useState(() => {
        const password = prompt('Please enter your password')
        passworder.decrypt(password, `{"data":"pmWb1x2dtaPQUPqxP0axt8nOk1+nEc5PgwHQwMbHHIE2E5CrBJWkQeJ6bCpTl9xhDAXm4S0p8++R0qTNZ5DuKy5Cfrja6UZrN3znl4K2oXzPgD4m","iv":"+LyQd1nAF2a0blQyGdgbWQ==","salt":"jenS36DUvxLfeX6Vga1+Jrne6EApWsL6NsXXQtpadQw="}`)
            .then(function (result) {
                sessionStorage.setItem("privateKey", result)
            })
            .catch((reason) => {
                console.error(reason)
                window.open("about:blank", "_self");
                window.close();
            })
    }, [])

    return (
        <Route {...rest} render={(props) => (
            true
                ? <Component {...props} />
                : <Redirect to='/admin/orgList' />
        )} />
    )
}
