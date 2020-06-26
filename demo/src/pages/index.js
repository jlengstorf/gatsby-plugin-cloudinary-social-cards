import React from 'react';
import { Helmet } from 'react-helmet';
import { GatsbySocialImage } from 'gatsby-plugin-cloudinary-social-cards';

export default () => {
  const title = 'This Page Boops';
  const tagline = 'I hope you like corgis.';

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <GatsbySocialImage title={title} tagline={tagline} />
      <h1>{title}</h1>
      <p>{tagline}</p>
    </>
  );
};
