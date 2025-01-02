import ChefLogo from "./assets/chef_logo.png"
export default function Header() {
    return (
        <header>
            <img src={ChefLogo} alt="Chef Logo" />
            <h1>Chef Claude</h1>
        </header>
        
    )
}