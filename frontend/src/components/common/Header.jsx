import Topbar from "../layout/Topbar";
import Navbar from "./Navbar";

function Header() {
    return (
        <header className="border-b border-gray-200">
            {/* Topbar */}
            <Topbar />

            {/* Navbar */}
            <Navbar />
        </header>
    );
}

export default Header;
