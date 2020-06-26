const cloudinary = require('cloudinary').v2;
const getShareImage = require('@jlengstorf/get-share-image').default;

exports.sourceNodes = async ({ actions, createNodeId }, options) => {
  const {
    cloudName = process.env.CLOUDINARY_CLOUD_NAME,
    apiKey = process.env.CLOUDINARY_API_KEY,
    apiSecret = process.env.CLOUDINARY_API_SECRET,
    imageTemplate,
    uploadFolder,
    imageOptions = {},
  } = options;

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  console.log({ imageOptions });

  const {
    asset_id,
    public_id,
    version,
    signature,
    secure_url,
    access_mode,
  } = await cloudinary.uploader.upload(imageTemplate, {
    folder: uploadFolder,
    use_filename: true,
    unique_filename: false,
    overwrite: false,
  });

  if (access_mode !== 'public') {
    console.warn(
      'Your Cloudinary social media card is not publicly accessible. This will probably cause great sadness.',
    );
  }

  actions.createNode({
    id: createNodeId(`CloudinarySocialCardTemplate-${asset_id}`),
    templateUrl: secure_url,
    publicId: public_id,
    version,
    cloudName,
    imageOptions: JSON.stringify(imageOptions),
    parent: null,
    children: [],
    internal: {
      type: 'CloudinarySocialCardTemplate',
      contentDigest: signature,
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type CloudinarySocialCard implements Node {
      url: String!
    }
  `);
};

exports.createResolvers = ({ createResolvers }, { imageOptions = {} }) => {
  createResolvers({
    Query: {
      getSocialCard: {
        type: 'CloudinarySocialCard',
        args: {
          title: 'String!',
          tagline: 'String',
        },
        resolve: async (_source, args, context) => {
          const [template] = context.nodeModel.getAllNodes({
            type: 'CloudinarySocialCardTemplate',
          });

          const img = getShareImage({
            ...imageOptions,
            title: args.title,
            tagline: args.tagline,
            cloudName: template.cloudName,
            imagePublicID: template.publicId,
          });

          return { url: img };
        },
      },
    },
  });
};
