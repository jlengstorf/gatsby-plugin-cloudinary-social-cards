# gatsby-plugin-cloudinary-social-cards

Add social sharing cards to your Gatsby sites using [Cloudinary](https://jason.af/cloudinary)!

This plugin will:

1. Look for a template image in your repo
2. Upload that template to your Cloudinary account
3. Automatically create social media sharing images with the title (and optional tagline) of your post

## Installation

```bash
# install the plugin and its peer dependencies
npm install gatsby-plugin-cloudinary-social-cards react-helmet gatsby-plugin-react-helmet
```

Create a new API key and secret in your [Cloudinary console][cloudinary-console] and set the following environment variables (create a file called `.env` locally):

```
CLOUDINARY_API_KEY=<your API key>
CLOUDINARY_API_SECRET=<your API secret>
```

Next, configure the plugin in your `gatsby-config.js`:

```js
require('dotenv').config();

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-cloudinary-social-cards',
      options: {
        cloudName: 'jlengstorf',
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        imageTemplate: 'src/assets/social-card-template.jpg',
      },
    },
  ],
};
```

### Configuration

Option | Required | Default | Description
------ | -------- | ------- | -----------
`cloudName` | `true` | | Your Cloudinary cloud name (usually your account name).
`apiKey` | `true` | | Your Cloudinary API key ([get one here][cloudinary-console]).
`apiSecret` | `true` | | Your Cloudinary API secret ([get one here][cloudinary-console]).
`imageTemplate` | `true` | | Path to the social card image template. This should be a local file in your repo.
`uploadFolder` | | `null` | Optional subfolder where the template should be uploaded in your Cloudinary account.
`imageOptions` | | `{}` | Additional settings for your template image.

If you need a template, I wrote a post on [creating a social sharing template image](https://www.learnwithjason.dev/blog/design-social-sharing-card/).

#### `imageOptions`

The options passed in `imageOptions` can be any of the [available options for the `@jlengstorf/get-share-image` utility](https://www.npmjs.com/package/@jlengstorf/get-share-image#options).

> **NOTE:** The `cloudName`, `apiKey`, `apiSecret`, `title`, `tagline`, and `imagePublicID` settings will be overridden by the settings in the plugin.

## Usage

There are two ways to use this plugin:

1. Import the `GatsbySocialImage` component
2. Use the `getSocialCard` GraphQL query

### Import the `GatsbySocialImage` component

In most cases, the easiest solution is to use the built-in React component:

```jsx
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
```

The component adds an `og:image` meta tag to the page:

![Rendered Gatsby page with the GatsbySocialImage component.](https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_1400/v1593135024/gatsby-social-cards/react-component-demo.png)

The generated social card looks like this:

![Card with the Learn With Jason logo that says, “This page boops. I hope you like corgis.”](https://res.cloudinary.com/jlengstorf/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_760,c_fit,co_rgb:000000,g_south_west,x_480,y_254,l_text:arial_64:This%20Page%20Boops/w_760,c_fit,co_rgb:000000,g_north_west,x_480,y_445,l_text:arial_48:I%20hope%20you%20like%20corgis./gatsby-social-cards/social-card-template)

### Use the `getSocialCard` GraphQL query

You can also query for the image URL, which is an alternative for dynamically generated pages.

In `gatsby-node.js`:

```js
const pages = [
  {
    path: '/test1',
    title: 'The First Test Page',
    tagline: 'This page needs a snappy tagline.',
  },
  {
    path: '/test2',
    title: 'Another Test Page',
  },
];

exports.createPages = ({ actions }) => {
  pages.forEach((page) => {
    actions.createPage({
      path: page.path,
      component: require.resolve('./src/templates/dynamic.js'),
      context: {
        title: page.title,
        tagline: page.tagline,
      },
    });
  });
};
```

in `src/templates/dynamic.js`:

```js
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
```

The page will have the meta tag added like so:

![Rendered Gatsby page with the GatsbySocialImage component.](https://res.cloudinary.com/jlengstorf/image/upload/q_auto,f_auto,w_1400/v1593134498/gatsby-social-cards/query-demo.png)

The generated card looks like this:

![Card with the Learn With Jason logo that says, “The First Test Page. This page needs a snappy tagline.”](https://res.cloudinary.com/jlengstorf/image/upload/w_1280,h_669,c_fill,q_auto,f_auto/w_760,c_fit,co_rgb:000000,g_south_west,x_480,y_254,l_text:arial_64:The%20First%20Test%20Page/w_760,c_fit,co_rgb:000000,g_north_west,x_480,y_445,l_text:arial_48:This%20page%20needs%20a%20snappy%20tagline./gatsby-social-cards/social-card-template)

[cloudinary-console]: https://cloudinary.com/console?ap=lwj