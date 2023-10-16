import Header from '@components/header'
import React from 'react'

function layout({children}:any) {
  return (
    <>
        <Header />
        {children}
    </>
  )
}

export default layout