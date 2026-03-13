import React, {useEffect, useRef, useState} from "react";

interface Map {
    name: string;
    mapTimings: MapTiming[];
    id: string;
    link:string;
}

interface MapTiming {
    name: string;
    description: string;
    columns: Column[];
    timings: Timing[];
}

interface Timing {
    [key: string]: string | number;
}

interface Column {
    title: string;
    key: string;
}

interface MapListProps {
    selectedId: string | null;
    onSelect: (id: string) => void;
}

const MapList: React.FC<MapListProps> = ({ selectedId, onSelect }) => {
    const [maps, setMaps] = useState<Map[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const selectedIdRef = useRef(selectedId);
    selectedIdRef.current = selectedId;

    const onSelectRef = useRef(onSelect);
    onSelectRef.current = onSelect;

    useEffect(() => {
        const fetchMaps = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/maps.json`);
                if (!response.ok) {
                    throw new Error('Could not fetch maps');
                }
                const data: Map[] = await response.json();
                setMaps(data);

                // Initialize selection based on prop, validate against fetched data
                if (selectedIdRef.current && data.find(m => m.id === selectedIdRef.current)) {
                    // selectedId is valid, keep it
                } else if (data.length > 0) {
                    // Invalid or missing selectedId, fall back to first item
                    onSelectRef.current(data[0].id);
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };
        fetchMaps();
    }, []);

    // Get selected map based on selectedId prop
    const selectedMap = maps.find(m => m.id === selectedId) ?? null;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Map Timings</h1>
            <select
                value={selectedId ?? ''}
                onChange={e => onSelect(e.target.value)}
                name="mapSelector"
                id="mapSelector"
            >
                {maps.map(map => (
                    <option key={map.id} value={map.id}>{map.name}</option>
                ))}
            </select>
            <p><a href={selectedMap?.link}>{selectedMap?.link}</a></p>
            {selectedMap?.mapTimings.map((mapTiming, mapTimingIndex) => (
                <div className={'scroll-flow'} key={mapTimingIndex}>
                    <h3>{mapTiming.name}</h3>
                    <p>{mapTiming.description}</p>
                    <table>
                        <thead>
                        <tr>
                            {mapTiming?.columns.map((column, colIndex) => (
                                <th key={colIndex}>{column.title}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {mapTiming.timings.map((timing, index) => (
                            <tr key={index}>
                                {mapTiming.columns.map((column, colIndex) => (
                                    <td key={colIndex}>{timing[column.key]}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default MapList;