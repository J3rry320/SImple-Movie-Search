import React from 'react'
import ReactDOM from 'react-dom'
const Detail=(props)=>{
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    console.log(props,props.data)
    if(props.data!=null){
        return(
            <div>

                {props.data.title}
                {props.data.overview}

            </div>
        )
    }
    else{
        return("")
    }

}
export default Detail;