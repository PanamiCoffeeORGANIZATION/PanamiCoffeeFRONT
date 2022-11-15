import React from 'react'

export const FullScreenPlaceholder = () => {
    return (
        <section id="fullscreen-placeholder">
            <div className="spinner-grow text-primary blowing" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </section>
    )
}
