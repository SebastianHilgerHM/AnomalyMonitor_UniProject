import { createContext, useContext, useMemo, useState } from 'react';

export type AnomalyItem = {
    id: string;
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
};

type AnomalyContextType = {
    anomalies: AnomalyItem[];
    addAnomaly: (input: AddAnomalyInput) => void;
};

const AnomalyContext = createContext<AnomalyContextType | undefined>(undefined);

export function AnomalyProvider({ children }: { children: React.ReactNode }) {
    const [anomalies, setAnomalies] = useState<AnomalyItem[]>([]);

    const addAnomaly = (input: AddAnomalyInput) => {
        const item: AnomalyItem = {
            id: String(Date.now()) + Math.random().toString(16).slice(2),
            title: input.title,
            description: input.description,
            imageUri: input.imageUri,
            timestamp: new Date().toLocaleString(),
            author: 'Sebastian Hilger',
        };
        setAnomalies((prev) => [item, ...prev]);
    };
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
        throw new Error('useAnomalies must be used inside AnomalyProvider');
    }
    return ctx;
}
