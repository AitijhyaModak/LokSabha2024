import { RiHome2Fill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { AiOutlineHeatMap } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { useAppStore } from "../../hooks/useStore";

function Navbar() {
    const enterSearch = useAppStore((s) => s.enterSearch);

    return (
        <div className="flex gap-6">
            <ul className="flex *:cursor-pointer *:hover:transition-all *:duration-200 *:hover:scale-125 px-4 py-3 bg-blue-500 border-2 border-blue-400 gap-7 w-fit rounded-xl">
                <li>
                    <RiHome2Fill></RiHome2Fill>
                </li>
                <li>
                    <MdSpaceDashboard></MdSpaceDashboard>
                </li>
                <li>
                    <IoPerson></IoPerson>
                </li>
                <li>
                    <AiOutlineHeatMap></AiOutlineHeatMap>
                </li>
                <li onClick={enterSearch}>
                    <FaSearch></FaSearch>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
