import React from 'react'

export const ButtonSpinner = ( props ) => {
    const { color="white", pd='5' } = props;
    return (
        <div className={`px-${pd}`}><div className={`spinner-border text-${color} spinner-border-sm`} role="status"></div></div>
    )
}
