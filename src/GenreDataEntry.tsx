import { GenreDataEntryProps } from "./dataTypes"

const GenreDataEntry = (props: GenreDataEntryProps) => {
    return <>
        <label>{props.data.genre}</label>
        <input type='number'
            value={props.data.studentCount}
            onChange={(e) => props.onChange(
                parseInt(e.target.value))}></input>
    </>

}
export { GenreDataEntry }