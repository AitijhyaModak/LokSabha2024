import { useTitleCase } from "../../hooks/useTitleCase";
import type { ConstituencyDetails } from "../../models/ConstituencyDetails";

interface PropType {
    constituencyDetails: ConstituencyDetails;
}

function HoverContainer({ constituencyDetails }: PropType) {
    const partyColor = constituencyDetails?.winnerPartyColor || "#ccc";
    const constitunecyName = useTitleCase(constituencyDetails?.pcName);
    const stateName = useTitleCase(constituencyDetails?.stName);
    const winnerCandidate = useTitleCase(constituencyDetails?.winnerCandidate);
    const winnerPartyName = useTitleCase(constituencyDetails?.winnerPartyName);

    return (
        <div className="absolute top-0 right-0 z-50 p-4 m-4 bg-white border border-gray-300 rounded-lg shadow-lg w-fit max-w-96">
            <div
                style={{ backgroundColor: partyColor }}
                className="h-1 mb-3 rounded-t-lg"
            ></div>

            <h2 className="text-lg font-semibold text-gray-800">
                {constitunecyName}
            </h2>

            <p className="text-sm text-gray-500">{stateName}</p>

            <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">
                    Winner:{" "}
                    <span className="ml-1 text-gray-900">
                        {winnerCandidate}
                    </span>
                </p>

                <div className="flex items-center mt-1">
                    <span
                        className="inline-block w-3 h-3 mr-2 rounded-full"
                        style={{ backgroundColor: partyColor }}
                    ></span>
                    <span className="text-sm text-gray-800">
                        {winnerPartyName}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default HoverContainer;
