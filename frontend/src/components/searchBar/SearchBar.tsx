import { useEffect, useRef } from "react";
import { useAppStore } from "../../hooks/useStore";

function SearchBar() {
    const searchRef = useRef<HTMLInputElement>(null);
    const escapeSearch = useAppStore((s) => s.escapeSearch);

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    });
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-blue-300/50">
            <input
                ref={searchRef}
                type="text"
                placeholder="Search for States, Constituencies, Candidates..."
                className="border-2 border-blue-600 max-w-[600px] w-full bg-blue-300 h-12 p-4"
                onBlur={escapeSearch}
            />
        </div>
    );
}

export default SearchBar;
