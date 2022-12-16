import React from 'react';
import { CONFETTI_COLORS, SHOW_RELEASE_DATE_PT, TIME_API_URL, WEBSITE_TITLE, WEBSITE_URL } from './constants/general';
import { Footer } from './components/Footer';
import { episodes } from './data';
import './App.css';
import { Episode } from './types';
import { EpisodeBlock } from './components/EpisodeBlock';
import { getDotEmoji, getNumberEmoji, getSquareEmoji, shuffleEpisodes } from './utils';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { CountDownTimer } from './components/CountDownTimer';

function App() {
  const [episodesList, setEpisodesList] = React.useState<Episode[]>(shuffleEpisodes(episodes));

  // Setting it to end date by default not to show the countdown timer
  const [currentUnixTime, setCurrentUnixTime] = React.useState<number>(SHOW_RELEASE_DATE_PT);
  const [copiedWatchOrder, setCopiedWatchOrder] = React.useState(false);
  const { width } = useWindowSize();

  const colorCode = episodesList.map((ep: Episode) => ep.color.charAt(0).toUpperCase()).join('');
  const numberCode = episodesList.map((ep: Episode) => ep.defaultNumber).join('');
  const episodesSquaresEmojis = episodesList.map((ep: Episode) => getSquareEmoji(ep.color)).join('');
  const episodesDotsEmojis = episodesList.map((ep: Episode) => getDotEmoji(ep.color)).join('');
  const episodesNumbersEmojis = episodesList.map((ep: Episode) => getNumberEmoji(ep.defaultNumber)).join('');

  const sharingText = `Get your unique Kaleidoscope viewing order on: ${WEBSITE_URL}\n\nMine is:\n${episodesDotsEmojis}\n${episodesSquaresEmojis}\n${episodesNumbersEmojis}\n\n`;
  const classnamesCopy = copiedWatchOrder ? 'share-button-disabled' : 'share-button-enabled';
  const unixDiffSeconds = SHOW_RELEASE_DATE_PT - currentUnixTime;

  const onMount = async () => {
    fetch(TIME_API_URL)
      .then((response) => response.json())
      .then((data) => {
        const dataCurrentUnixTime = data.unixtime;
        setCurrentUnixTime(dataCurrentUnixTime);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    onMount();
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
      <header className="App-header">
        <h1>{WEBSITE_TITLE}</h1>
        <div className="introduction">
          <div className="introduction-line">
            Created by Eric Garcia, Kaleidoscope is a{' '}
            <b>
              <div className="color-light-blue inline">
                <i>non-linear</i>
              </div>
            </b>{' '}
            8-episode show on Netflix.
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
          {unixDiffSeconds > 0 && <CountDownTimer remainingSeconds={unixDiffSeconds} />}
        </div>

        <h2>Episodes Watch List</h2>
        <div className="episodes-watch-order-introduction">
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
          <div className="episodes-watch-order-line">{episodesDotsEmojis}</div>
          <div className="episodes-watch-order-line">{episodesSquaresEmojis}</div>
          <div className="episodes-watch-order-line">{episodesNumbersEmojis}</div>
          <br />
          <CopyToClipboard options={{ message: '' }} text={sharingText} onCopy={() => setCopiedWatchOrder(true)}>
            <button className={`share-button ${classnamesCopy}`} disabled={copiedWatchOrder}>
              {copiedWatchOrder ? '📋 Copied to clipboard' : '🌐 Share your viewing order'}
            </button>
          </CopyToClipboard>
          <hr />
        </div>
        <div>
          <div>
            <b>Color Code:</b> {colorCode}
          </div>
          <div>
            <b>Number Code:</b> {numberCode}
          </div>
        </div>
      </header>
      <Footer />
    </div>
  );
}

export default App;
