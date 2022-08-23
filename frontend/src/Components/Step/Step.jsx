import React from 'react'
import { Stepper ,Step } from 'react-form-stepper';
import {FaTruck,FaCheckSquare} from 'react-icons/fa'
import {MdAccountBalance} from 'react-icons/md'

const CheckOutSteps = ({activeStep}) => {

  return (
    <div>
   
     <Stepper activeStep={activeStep} styleConfig={{
      activeBgColor: '#000',
      activeTextColor: '#FFFFFF',
      inactiveBgColor: '#FFFFFF',
      inactiveTextColor: 'grey',
      completedBgColor: '#FFFFFF',
      completedTextColor: '#000',
      size: '3em'
    }}>
<Step label="Shippind Details" children={<FaTruck/>} />
<Step label="Confirm Order" children={<FaCheckSquare/>} />
<Step label="Payment" children={<MdAccountBalance/>} />
</Stepper>
   

    </div>
  )
}

export default CheckOutSteps