import { createContext, useContext, useMemo, useRef, useState } from 'react';

export type AnomalyItem = {
    id: number;
    title: string;
    description: string;
    author: string;
    timestamp: string;
    imageUri?: string;
};

type AddAnomalyInput = {
    title: string;
    description: string;
    imageUri?: string;
    author?: string;
};

type AnomalyContextType = {
    anomalies: AnomalyItem[];
    addAnomaly: (input: AddAnomalyInput) => void;
};

const AnomalyContext = createContext<AnomalyContextType | undefined>(undefined);

export function AnomalyProvider({ children }: { children: React.ReactNode }) {
    const [anomalies, setAnomalies] = useState<AnomalyItem[]>([]);
    const nextIdRef = useRef(0);

    const addAnomaly = (input: AddAnomalyInput) => {
        // Build a new in-memory anomaly record with generated id and timestamp.
        const item: AnomalyItem = {
            id: nextIdRef.current++,
            title: input.title,
            description: input.description,
            imageUri: input.imageUri,
            timestamp: new Date().toLocaleString(),
            author: input.author ?? 'Unknown',
        };
        // Prepend newest anomalies so list screens show recent entries first.
        setAnomalies((prev) => [item, ...prev]);
    };

    // Memoize context value so consumers only update when anomaly data changes.
    const value = useMemo(
        () => ({
            anomalies,
            addAnomaly,
        }),
        [anomalies]
    );

    return <AnomalyContext.Provider value={value}>{children}</AnomalyContext.Provider>;
};

export function useAnomalies() {
    const ctx = useContext(AnomalyContext);
    if (!ctx) {
        // Guard against usage outside provider to fail fast during development.
        throw new Error('useAnomalies must be used inside AnomalyProvider');
    }
    return ctx;
}
