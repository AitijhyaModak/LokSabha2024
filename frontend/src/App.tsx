import { useEffect } from "react";
import IndiaMap from "./components/map/IndiaMap";
import Navbar from "./components/navbar/Navbar";
import SearchBar from "./components/searchBar/SearchBar";
import { useAppStore } from "./hooks/useStore";
import classNames from "classnames";

function App() {
    const isSearching = useAppStore((s) => s.isSearching);
    const toggleSearch = useAppStore((s) => s.toggleSearch);

    // handles escape key (enables or disables search bar)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                toggleSearch();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    return (
        <div className="relative w-full h-screen p-4">
            {isSearching && <SearchBar></SearchBar>}
            <div className={classNames(isSearching ? "blur-sm" : "")}>
                <Navbar></Navbar>
                <IndiaMap />
            </div>
        </div>
    );
}

export default App;
