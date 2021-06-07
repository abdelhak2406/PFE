import { AiOutlineStar } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'

const Save = (props) => {
    return(
        <div className="save">
            {
                (props.saved === true)?  <AiFillStar color="#ffd500" size="2em" /> :  <AiOutlineStar color="#ffd500" size="2em" />
            }
        </div>
    )
}

export default Save;