import { useState } from 'react';
import artwork from '../data/card-art.json';
import sources from '../data/card-art-sources.json';

export default function WordArtwork({ word }) {
  const [failed, setFailed] = useState(false);
  const src = Object.hasOwn(artwork, word) ? artwork[word] : null;

  if (!src || failed) return null;

  const image = (
    <img
      className="word-artwork"
      src={src}
      alt={`Иллюстрация: ${word}`}
      width="1024"
      height="768"
      decoding="async"
      fetchPriority="high"
      onError={() => setFailed(true)}
    />
  );

  const source = Object.hasOwn(sources, word) ? sources[word] : null;
  if (!source) return image;

  return (
    <figure className="word-demotivator">
      {image}
      <figcaption>
        <p>{source.caption}</p>
        <a href={source.sourceUrl} target="_blank" rel="noreferrer">{source.credit}</a>
      </figcaption>
    </figure>
  );
}
