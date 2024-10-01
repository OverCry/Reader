import path from 'path';

export default {
  webpack: {
    alias: {
      '@GenericFunctions': path.resolve(__dirname, 'src/components/Support/genericFunctions'),
    },
    configure: (webpackConfig: unknown) => {
      // Custom Webpack changes can be made here
      return webpackConfig;
    },
  },
};
