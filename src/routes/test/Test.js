import DarkSpinner from 'common/components/spinner/dark/DarkSpinner'
import { SPINNER_SIZES } from 'common/constants'
import React from 'react'

function Test() {
  return (
    <div style={{ backgroundColor: 'gray', height: '90vh' }}>
        <DarkSpinner size={SPINNER_SIZES.MEDIUM} />
    </div>
  )
}

export default Test