export interface SVGContainerProps {
    name: string;
}

export interface GenreData {
    genre: string;
    studentCount: number;
}

export interface GenreDataEntryProps {
    data: GenreData;
    onChange: (studentCount: number) => void
}

export interface GenreDataEditorProps {
    data: GenreData[];
    total: number;
    onChange: (data: GenreData[]) => void;
}

export interface DataVisualizerProps {
    data: GenreData[];
    total: number;
}