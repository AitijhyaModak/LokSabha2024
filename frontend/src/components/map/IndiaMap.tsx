import "leaflet/dist/leaflet.css";
import { MapContainer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import type { FeatureCollection, Feature } from "geojson";
import type { Layer } from "leaflet";
import HoverContainer from "./HoverContainer";
import type { ConstituencyDetails } from "../../models/ConstituencyDetails";

const MAP_URL = "/data/india.geojson";

function IndiaMap() {
    const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
    const [hoveredConstituency, setHoveredConstituency] =
        useState<ConstituencyDetails | null>(null);

    useEffect(() => {
        fetch(MAP_URL)
            .then((res) => res.json())
            .then((data) => setGeoData(data));
    }, []);

    const onEachFeature = (feature: Feature, layer: Layer) => {
        const pcName = feature.properties?.pcName || null;
        const stName = feature.properties?.stName || null;
        const winnerCandidate = feature.properties?.winnerCandidateName || null;
        const winnerPartyName = feature.properties?.winnerPartyName || null;
        const winnerPartyColor = feature.properties?.winnerPartyColor || "#ccc";
        const constituencyId = feature.properties?.constituencyId;

        layer.on({
            mouseover: () => {
                setHoveredConstituency({
                    pcName,
                    stName,
                    winnerCandidate,
                    winnerPartyName,
                    winnerPartyColor,
                    constituencyId,
                });
            },
            mouseout: () => {
                setHoveredConstituency(null);
            },
            click: (e) => {
                // Add logic to show popup or side panel
                e.originalEvent.preventDefault();
                console.log("Clicked on", pcName);
            },
        });
    };

    return (
        <div
            style={{ height: "700px", width: "700px" }}
            className="border-2 border-red-300"
        >
            {hoveredConstituency && (
                <HoverContainer
                    constituencyDetails={hoveredConstituency}
                ></HoverContainer>
            )}
            <MapContainer
                center={[22.9734, 78.6569]}
                zoom={4.4}
                minZoom={4.4}
                maxZoom={10}
                style={{
                    height: "100%",
                    width: "100%",
                    background: "transparent",
                }}
                maxBounds={[
                    [6.4627, 68.1097], // Southwest corner of India
                    [37.1, 97.3956], // Northeast corner of India
                ]}
                maxBoundsViscosity={1.0} // makes the bounds strict
            >
                {geoData && (
                    <GeoJSON
                        onEachFeature={onEachFeature}
                        data={geoData}
                        style={(feature) => ({
                            color:
                                hoveredConstituency?.constituencyId ===
                                feature?.properties.constituencyId
                                    ? "#000"
                                    : "#555",
                            weight:
                                hoveredConstituency?.constituencyId ===
                                feature?.properties.constituencyId
                                    ? 2
                                    : 1,
                            fillOpacity:
                                hoveredConstituency?.constituencyId ===
                                feature?.properties.constituencyId
                                    ? 1
                                    : 0.9,
                            fillColor:
                                hoveredConstituency?.constituencyId ===
                                feature?.properties.constituencyId
                                    ? "black"
                                    : feature?.properties.winnerPartyColor,
                        })}
                    ></GeoJSON>
                )}
            </MapContainer>
        </div>
    );
}

export default IndiaMap;
