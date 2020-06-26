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
          titleFont: 'futura',
          taglineFont: 'futura',
          titleExtraConfig: '_bold', // optional - set title font weight to bold
          textColor: '663399',
        },
      },
    },
  ],
};
