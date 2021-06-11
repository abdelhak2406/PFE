import {useState, useEffect} from 'react'
import DataRow from './DataRow'

const DataList = (props) => {

    return (
        <div id='data-list'>
            {
                props.data.map(i => 
                    <DataRow choose={props.choose} name={i.name} key = {i.id} id = {i.id} />
                )
            }
        </div>
    )
}

export default DataList;