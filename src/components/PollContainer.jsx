function PollContainer() {
    return (
        <>
            {/* Embedding poll made with https://strawpoll.com/ */}
            <div className='p-4 flex animate-in slide-in-from-top fade-in-0 ease-out duration-3s'>
                <div className='strawpoll-embed' style={{ height: "px", maxWidth: "640px", width: "100%", margin: "0 auto", display: "flex" }}>
                    <iframe title='StrawPoll Embed' src='https://strawpoll.com/embed/GJn47PbWbyz' style={{ position: "static", visibility: "visible", display: "block", width: "100%", flexGrow: 1 }}>
                        Loading...
                    </iframe>
                    <script async src='https://cdn.strawpoll.com/dist/widgets.js'></script>
                </div>
            </div>
        </>
    )
}

export default PollContainer
