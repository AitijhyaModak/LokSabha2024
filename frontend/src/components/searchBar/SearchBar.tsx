import { useEffect, useRef, useState, useMemo } from "react";
import { useAppStore } from "../../hooks/useStore";
import Fuse from "fuse.js";
import debounce from "lodash.debounce";
import type { SearchItem } from "../../models/SearchItem";
import { FaLocationPin } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { FaFlag } from "react-icons/fa6";
import { useTitleCase } from "../../hooks/useTitleCase";
import classNames from "classnames";

const DATA_URL = "/data/search_data.json";

function getIcon(type: "state" | "constituency" | "party" | "candidate") {
    switch (type) {
        case "state":
            return <FaLocationPin className="fill-orange-500"></FaLocationPin>;
        case "constituency":
            return <FaMapPin className="fill-red-500"></FaMapPin>;
        case "candidate":
            return <IoIosPerson className="fill-blue-500"></IoIosPerson>;
        case "party":
            return <FaFlag className="fill-amber-400"></FaFlag>;
    }
}

function SearchBar() {
    const searchRef = useRef<HTMLInputElement>(null);
    const escapeSearch = useAppStore((s) => s.escapeSearch);
    const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null);
    const [results, setResults] = useState<SearchItem[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        fetch(DATA_URL)
            .then((res) => res.json())
            .then((data: SearchItem[]) => {
                setFuse(
                    new Fuse(data, {
                        keys: ["itemDisplayName"],
                        threshold: 0.3
                    })
                )
            })
    }, [])

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        debouncedSearch(text);
        setActiveIndex(0);
    };

    const debouncedSearch = useMemo(
        () =>
            debounce((query: string) => {
                if (fuse && query.trim()) {
                    const fuseResults = fuse.search(query, { limit: 10 });
                    setResults(fuseResults.map((r) => r.item));
                }
                else {
                    setResults([]);
                }
            }, 8),
        [fuse]
    );

    const handleSelect = (item: SearchItem) => {
        // 👉 this is where you handle "Enter click" selection
        // e.g. navigate, console.log, or trigger callback
        console.log("Selected:", item);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (results.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => (prev + 1) % results.length);
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) =>
                prev <= 0 ? results.length - 1 : prev - 1
            );
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0 && activeIndex < results.length) {
                handleSelect(results[activeIndex]); // run your enter handler
            }
        }
    };

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center bg-blue-300/50">
            <input
                ref={searchRef}
                type="text"
                placeholder="Search for States, Constituencies, Candidates..."
                className="mt-32 glass rounded-lg outline-2 outline-blue-500 max-w-[600px] bg-teal-100/40 w-full h-12 p-4"
                onBlur={escapeSearch}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                spellCheck={false}
            />
            <ul className="mt-2 w-full glass max-w-[600px] border rounded-lg">
                {results.map((item, i) => (
                    <li key={i}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={classNames("rounded-lg flex items-center justify-between gap-5 px-4 py-2 cursor-pointer", i === activeIndex ? "bg-blue-300/50" : "")}>
                        <span className="font-semibold">{useTitleCase(item.itemDisplayName)}</span>{" "}
                        {getIcon(item.type)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchBar;
