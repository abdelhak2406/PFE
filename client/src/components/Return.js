import {BiArrowBack} from 'react-icons/bi'

const Return = (props)=> {
    return (
        <div className='return'>
            <a href={props.url}><BiArrowBack size='30' color='#e63946' /></a>
            
            <h3 className='title'>{props.name}</h3>
            
        </div>
    )
}

export default Return
