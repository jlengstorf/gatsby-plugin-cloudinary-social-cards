// dummy page data for demo purposes
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
