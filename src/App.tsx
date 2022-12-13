import React from 'react';
import { WEBSITE_TITLE, WEBSITE_URL } from './constants/general';
import { Footer } from './components/Footer';
import { episodes } from './data';
import './App.css';
import { Episode } from './types';
import { EpisodeBlock } from './components/EpisodeBlock';
import { getDotEmoji, getNumberEmoji, getSquareEmoji, shuffleEpisodes } from './utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [episodesList, _setEpisodesList] = React.useState<Episode[]>(shuffleEpisodes(episodes));
  const [copiedWatchOrder, setCopiedWatchOrder] = React.useState(false);
  const colorCode = episodesList
    .map((episode: Episode) => {
      const { color } = episode;
      return color.charAt(0).toUpperCase();
    })
    .join('');

  const numberCode = episodesList
    .map((episode: Episode) => {
      const { defaultNumber } = episode;
      return defaultNumber;
    })
    .join('');

  const episodesSquaresEmojis = episodesList
    .map((episode: Episode) => {
      const { color } = episode;
      return getSquareEmoji(color);
    })
    .join('');

  const episodesDotsEmojis = episodesList
    .map((episode: Episode) => {
      const { color } = episode;
      return getDotEmoji(color);
    })
    .join('');

  const episodesNumbersEmojis = episodesList
    .map((episode: Episode) => {
      const { defaultNumber } = episode;
      return getNumberEmoji(defaultNumber);
    })
    .join('');

  const sharingText = `Get your unique Kaleidoscope watch order on: ${WEBSITE_URL}\n\nMine is:\n${episodesDotsEmojis}\n${episodesSquaresEmojis}\n${episodesNumbersEmojis}\n\n`;
  const classnamesCopy = copiedWatchOrder ? 'share-button-disabled' : 'share-button-enabled';

  return (
    <div className="App">
      <header className="App-header">
        <h1>{WEBSITE_TITLE}</h1>
        <h2>Your Unique Watch Order</h2>
        <div className="episodes-watch-order">
          <div className="episodes-watch-order-line">{episodesDotsEmojis}</div>
          <div className="episodes-watch-order-line">{episodesSquaresEmojis}</div>
          <div className="episodes-watch-order-line">{episodesNumbersEmojis}</div>
          <CopyToClipboard options={{ message: '' }} text={sharingText} onCopy={() => setCopiedWatchOrder(true)}>
            <button className={`share-button ${classnamesCopy}`} disabled={copiedWatchOrder}>
              {copiedWatchOrder ? '📋 Copied to clipboard' : '🌐 Share your watch order'}
            </button>
          </CopyToClipboard>
          <hr />
        </div>
        <div>
          <div>Color Code: {colorCode}</div>
          <div>Number Code: {numberCode}</div>
        </div>
        <h2>Episodes Watch List</h2>
        <div className="episodes-list">
          {episodesList.map((episode: Episode, index: number) => {
            return <EpisodeBlock episode={episode} index={index} key={episode.defaultNumber} />;
          })}
        </div>
      </header>
      <Footer />
    </div>
  );
}

export default App;
