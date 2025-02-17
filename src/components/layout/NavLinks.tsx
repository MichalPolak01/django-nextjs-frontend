
const NavLinks = [
    {
        label: "Dashboard",
        authRequired: false,
        href: "/",
    },
    {
        label: "Waitlist",
        authRequired: true,
        href: "/waitlist",
    },
]

export const NonUserLinks = [
    {
        label: "SignUp",
        authRequired: false,
        href: "/signup",
    },
    {
        label: "Login",
        authRequired: false,
        href: "/login",
    },
]

export default NavLinks;