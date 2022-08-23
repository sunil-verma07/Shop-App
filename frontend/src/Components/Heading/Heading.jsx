import React from 'react'
import './heading.css'

const Heading = ({heading}) => {
  return (
    <div className="heading">
        <h1>{heading}</h1>
    </div>
  )
}

export default Heading