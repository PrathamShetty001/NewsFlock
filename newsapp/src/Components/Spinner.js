import React from 'react'
import loading from './loading.gif'

const Spinner = ()=> {
    return (
        <div className="text-center" >
        <img className="my-3"src={loading} alt="loading" style={{width:'120px' , height:"100px"}}/>
      </div>
    )
  }

export default Spinner
