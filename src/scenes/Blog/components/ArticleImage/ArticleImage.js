/* @flow */
import React from 'react';

const ArticleImage = (props: { imageSrc: String, altText: String }) => {
  return (
    <div className="boldr-post__image-wrap">
      <img src={props.imageSrc} alt={props.altText} className="boldr-post__image" />
    </div>
  );
};

export default ArticleImage;
