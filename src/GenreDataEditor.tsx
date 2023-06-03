import { GenreDataEntry } from "./GenreDataEntry";
import { GenreDataEditorProps } from "./dataTypes";
import './styles.css'

const GenreDataEditor = (props: GenreDataEditorProps) => {
    const { data, total } = props;

    return <div className='genreDataEditor'>
        <label className="header">Genre </label>
        <label className="header">Count</label>
        {
            data.map((d, i) => <GenreDataEntry data={d}
                onChange={(studentCount: number) => {
                    const newData = data.map((u, j) => j === i ? { ...u, studentCount } : u);
                    props.onChange(newData);
                }}></GenreDataEntry>)
        }
        <label>Total: </label>{total}
    </div>
}

export { GenreDataEditor }