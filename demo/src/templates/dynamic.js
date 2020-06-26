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

export default ({ data, pageContext: { title } }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:image" content={data.getSocialCard.url} />
      </Helmet>
      <h1>{title}</h1>
    </>
  );
};
