import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

export const query = graphql`
  query($title: String!, $tagline: String) {
    getSocialCard(title: $title, tagline: $tagline) {
      url
    }
  }
`;

export default ({ data, pageContext: { title, tagline = '' } }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>

        {/* use the query result in image meta tags */}
        <meta name="image" content={data.getSocialCard.url} />
        <meta property="og:image" content={data.getSocialCard.url} />
        <meta name="twitter:image" content={data.getSocialCard.url} />

        {/* other social sharing tags for SEO and social previews */}
        <meta name="description" content={tagline} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={tagline} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="jlengstorf" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={tagline} />
      </Helmet>

      <h1>{title}</h1>
      <p>{tagline}</p>
    </>
  );
};
