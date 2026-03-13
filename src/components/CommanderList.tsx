import React, { useEffect, useRef, useState } from 'react';

interface BuildStep {
    supplyCount: number;
    description: string;
}

interface Commander {
    name: string;
    id: string;
    recommendedBuildOrder: BuildStep[];
    link: string;
}

interface CommanderListProps {
    selectedId: string | null;
    onSelect: (id: string) => void;
}

const CommanderList: React.FC<CommanderListProps> = ({ selectedId, onSelect }) => {
    const [commanders, setCommanders] = useState<Commander[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const selectedIdRef = useRef(selectedId);
    selectedIdRef.current = selectedId;

    const onSelectRef = useRef(onSelect);
    onSelectRef.current = onSelect;

    useEffect(() => {
        const fetchCommanders = async () => {
            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/commanders.json`);
                if (!response.ok) {
                    throw new Error("Could not fetch commanders");
                }
                const data: Commander[] = await response.json();
                setCommanders(data);

                // Initialize selection based on prop, validate against fetched data
                if (selectedIdRef.current && data.find(c => c.id === selectedIdRef.current)) {
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
        }
        fetchCommanders();
    }, []);

    // Get selected commander based on selectedId prop
    const selectedCommander = commanders.find(c => c.id === selectedId) ?? null;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Build Orders</h1>
            <select
                value={selectedId ?? ''}
                onChange={(e) => onSelect(e.target.value)}
            >
                {commanders.map((commander) => (
                    <option key={commander.id} value={commander.id}>
                        {commander.name}
                    </option>
                ))}
            </select>
            <p><a href={selectedCommander?.link}>{selectedCommander?.link}</a></p>
            <h2>Build Order</h2>
            <pre>
                <code>
                    {selectedCommander?.recommendedBuildOrder.map((buildStep, index) => (
                        <React.Fragment key={`${buildStep.supplyCount}-${index}`}>
                            {index > 0 && <span>{"\n"}</span>}
                            {buildStep.supplyCount} {buildStep.description}
                        </React.Fragment>
                    ))}
                </code>
            </pre>
        </div>
    )
};

export default CommanderList;

