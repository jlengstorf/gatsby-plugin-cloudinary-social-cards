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
        <meta name="description" content={tagline} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={tagline} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="jlengstorf" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={tagline} />
      </Helmet>
      <GatsbySocialImage title={title} tagline={tagline} />

      <h1>{title}</h1>
      <p>{tagline}</p>
    </>
  );
};
