import React from 'react';
import { CONFETTI_COLORS, EPISODE_COUNT, SHOW_RELEASE_DATE_PT, WEBSITE_TITLE, WEBSITE_URL } from './constants/general';
import { Footer } from './components/Footer';
import { episodes } from './data';
import './App.css';
import { Episode } from './types';
import { EpisodeBlock } from './components/EpisodeBlock';
import {
  getHeartEmoji,
  getNumberEmoji,
  reverseEpisodes,
  sortToChronologicalEpisodes,
  sortToDefaultEpisodes,
  shuffleEpisodes
} from './utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { CountDownTimer } from './components/CountDownTimer';

function App() {
  const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

  const [shareableEpisodes, setShareableEpisodes] = React.useState(EPISODE_COUNT);
  const [episodesList, setEpisodesList] = React.useState<Episode[]>(shuffleEpisodes(episodes));

  const [currentTimestamp, setCurrentTimestamp] = React.useState(getCurrentTimestamp());
  const [copiedWatchOrder, setCopiedWatchOrder] = React.useState(false);
  const { width } = useWindowSize();

  const episodesHeartEmoji = episodesList
    .slice(0, shareableEpisodes)
    .map((ep: Episode) => getHeartEmoji(ep.color))
    .join('');

  const episodesNumbersEmojis = episodesList
    .slice(0, shareableEpisodes)
    .map((ep: Episode) => getNumberEmoji(ep.defaultNumber))
    .join('');

  const sharingText = `Get your unique Kaleidoscope viewing order on: ${WEBSITE_URL}\n\nMine is:\n${episodesHeartEmoji}\n${episodesNumbersEmojis}\n\n#kaleidoscope #netflix\n\n`;
  const classnamesCopy = copiedWatchOrder ? 'button-disabled' : 'button-enabled';
  const diffTimestamp = SHOW_RELEASE_DATE_PT - currentTimestamp;

  const onMount = () => {
    setCurrentTimestamp(getCurrentTimestamp());
  };

  React.useEffect(() => {
    setCopiedWatchOrder(false);
  }, [episodesList, shareableEpisodes]);

  React.useEffect(() => {
    onMount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {copiedWatchOrder && (
        <Confetti
          colors={CONFETTI_COLORS}
          initialVelocityX={1}
          width={width}
          height={document.body.scrollHeight > window.innerHeight ? document.body.scrollHeight : window.innerHeight}
          recycle={false}
        />
      )}
      <section className="main">
        <h1>{WEBSITE_TITLE}</h1>
        <div className="introduction">
          <div className="introduction-line">
            Created by Eric Garcia, Kaleidoscope is a{' '}
            <b>
              <div className="color-light-blue inline">
                <i>non-linear</i>
              </div>
            </b>{' '}
            8-episode show on{' '}
            <a
              className="link-netflix"
              href="https://www.netflix.com/tudum/articles/kaleidoscope-release-date-photos-cast"
              rel="noopener noreferrer"
              title="Official Netflix article explaining what Kaleidoscope is"
              target="_blank"
            >
              Netflix
            </a>
            .
          </div>
          <div className="introduction-line">
            The first 7 episodes can be watched in any order. Then the finale unlocks.
          </div>
          <div className="introduction-line">
            This webpage allows you to{' '}
            <b>
              <div className="color-light-blue inline">
                <i>create and share</i>
              </div>
            </b>{' '}
            a viewing order among the 5040 viewing possibilities!
          </div>
          {diffTimestamp > 0 && <CountDownTimer remainingSeconds={diffTimestamp} />}
        </div>

        <h2>Episodes Watch List</h2>
        <div className="episodes-watch-order-introduction">
          <div className="episodes-watch-order-introduction-line">
            A viewing order has been selected randomly for you
          </div>
          <div className="episodes-watch-order-introduction-line">
            The buttons below allow you to select a different sort
          </div>
          <div className="inline-block buttons">
            <button
              className="basic-button sort-button button-enabled"
              onClick={() => setEpisodesList(sortToDefaultEpisodes(episodesList))}
            >
              🔢 Default
            </button>
            <button
              className="basic-button sort-button button-enabled"
              onClick={() => setEpisodesList(sortToChronologicalEpisodes(episodesList))}
            >
              🕒 Chronological
            </button>
            <button
              className="basic-button sort-button button-enabled"
              onClick={() => setEpisodesList(shuffleEpisodes(episodesList))}
            >
              🔀 Shuffle
            </button>
            <button
              className="basic-button sort-button button-enabled"
              onClick={() => setEpisodesList(reverseEpisodes(episodesList))}
            >
              🔄 Reverse
            </button>
          </div>
          <div className="episodes-watch-order-introduction-line">
            Interact with 🔼 and 🔽 to change the order of one specific episode (except the finale)
          </div>
        </div>
        <div className="episodes-list">
          {episodesList.map((episode: Episode, index: number) => {
            return (
              <EpisodeBlock
                episode={episode}
                index={index}
                key={episode.defaultNumber}
                episodesList={episodesList}
                setEpisodesList={setEpisodesList}
              />
            );
          })}
        </div>

        <h2>Your Unique Viewing Order</h2>
        <div className="episodes-watch-order">
          <div className="share-range-text">{`Number of episodes to share: ${shareableEpisodes}`}</div>
          <div className="share-range">
            <input
              min="1"
              max={EPISODE_COUNT}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setShareableEpisodes(Number(e.target.value));
              }}
              value={shareableEpisodes}
              type="range"
            />
          </div>
          <div className="episodes-watch-order-line">{episodesHeartEmoji}</div>
          <div className="episodes-watch-order-line">{episodesNumbersEmojis}</div>
          <br />
          <CopyToClipboard options={{ message: '' }} text={sharingText} onCopy={() => setCopiedWatchOrder(true)}>
            <button className={`basic-button ${classnamesCopy}`} disabled={copiedWatchOrder}>
              {copiedWatchOrder ? '📋 Copied to clipboard' : '🌐 Share your viewing order'}
            </button>
          </CopyToClipboard>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
