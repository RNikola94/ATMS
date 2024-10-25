import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation/Navigation.component";
import Footer from "./components/footer/Footer.component";

export default function RootLayout() {
    return (
        <div className="root-layouot">
            <Navigation />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}