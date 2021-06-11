
const DataRow = (props) => {

    return (
        <div onClick = {() => {props.choose(props.id) }} >
            <span>{props.name}</span>
        </div>
    )
}

export default DataRow;
