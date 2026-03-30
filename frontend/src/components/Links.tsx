import React from 'react'

interface LinkProps {
    text: string
}

function Links({ text }: LinkProps) {
    return (
        <button className='text-blue-700 font-medium cursor-pointer flex justify-center'>{text}</button>

    )
}

export default Links