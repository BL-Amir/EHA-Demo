export default function LoadingScreen({ drawn, exiting, onEnter }) {
  return (
    <div
      className={`loading-screen${drawn ? ' loading-screen--drawn' : ''}${exiting ? ' loading-screen--out' : ''}`}
      onClick={onEnter}
    >
      <div className="loading-screen__inner">
        <p className={`loading-screen__cue${drawn ? ' loading-screen__cue--visible' : ''}`}>
          enter
        </p>
      </div>
    </div>
  )
}
