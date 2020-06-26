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
        uploadFolder: 'gatsby-social-cards',
        imageOptions: {
          // for all available options, see:
          // https://www.npmjs.com/package/@jlengstorf/get-share-image#options
          titleExtraConfig: '_line_spacing_-10',
          textColor: '232129',
          // custom fonts are possible! see this post for details:
          // https://www.learnwithjason.dev/blog/upload-custom-font-cloudinary-media-library/
          titleFont: 'lwj-title.otf',
          taglineFont: 'lwj-tagline.otf',
        },
      },
    },
  ],
};
