import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';
import getShareImage from '@jlengstorf/get-share-image';

export const GatsbySocialImage = ({ title, tagline, options = {} }) => {
  const { template } = useStaticQuery(graphql`
    query {
      template: cloudinarySocialCardTemplate {
        publicId
        version
        cloudName
        imageOptions
      }
    }
  `);

  const templateOptions = JSON.parse(template.imageOptions) || {};

  const url = getShareImage({
    title,
    tagline,
    imagePublicID: template.publicId,
    cloudName: template.cloudName,
    ...templateOptions,
    ...options,
  });

  return (
    <Helmet>
      <meta name="image" content={url} />
      <meta property="og:image" content={url} />
    </Helmet>
  );
};
