import * as React from 'react';
import {
  AUTHOR_NAME,
  CHANGELOG_URL,
  CONTRIBUTOR_NAME,
  CONTRIBUTOR_URL,
  PROJECT_URL,
  WEBSITE_VERSION
} from '../constants/general';
import { getHeartEmoji, getRandomColor } from '../utils';

const Footer = () => {
  const [color, setColor] = React.useState(getRandomColor());

  const onMount = () => {
    const interval = setInterval(() => {
      setColor(getRandomColor());
    }, 3000);

    return () => clearInterval(interval);
  };

  React.useEffect(() => {
    onMount();
  }, []);

  return (
    <div className="App-footer">
      <div>
        Developed by{' '}
        <a href={PROJECT_URL} rel="noopener noreferrer" title="GitHub page for repository" target="_blank">
          {AUTHOR_NAME}
        </a>{' '}
        and{' '}
        <a
          href={CONTRIBUTOR_URL}
          rel="noopener noreferrer"
          title={`GitHub page for ${CONTRIBUTOR_NAME}`}
          target="_blank"
        >
          {CONTRIBUTOR_NAME}
        </a>{' '}
        with {getHeartEmoji(color)}
      </div>
      <div>This is not an official project: this is a fan project</div>
      <div>
        Website version{' '}
        <a href={CHANGELOG_URL} rel="noopener noreferrer" title="Website changelog" target="_blank">
          {WEBSITE_VERSION}
        </a>
      </div>
    </div>
  );
};

export { Footer };
