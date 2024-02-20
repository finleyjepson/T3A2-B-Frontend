import React from 'react';

function PollContainer() {
    return (
        <>
            {/* Embedding poll made with https://strawpoll.com/ */}
            <div className="flex p-4 justify-center">
                <div className="strawpoll-embed" style={{ height: '644px', maxWidth: '640px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
                    <iframe
                        title="StrawPoll Embed"
                        src="https://strawpoll.com/embed/GJn47PbWbyz"
                        style={{ position: 'static', visibility: 'visible', display: 'block', width: '100%', flexGrow: 1 }}
                        frameBorder="0"
                        allowFullScreen
                        allowTransparency
                    >
                        Loading...        
                    </iframe>
                    <script async src="https://cdn.strawpoll.com/dist/widgets.js" charSet="utf-8"></script>
                </div>
            </div>    
        </>
    );
}

export default PollContainer;


