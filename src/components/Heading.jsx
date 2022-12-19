import logo from "../images/logo.png"

const Heading = () => {
    return (
        <header>
            <img src={logo} alt="Game Logo" />
            <p>Move the Photos to create striks of 4 or 3</p>
        </header>
    )
}

export default Heading;