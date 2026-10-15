import path from 'path';

export default {
  webpack: {
    alias: {
      '@MainContext': path.resolve(__dirname, 'src/AppContext/Provider/DirectoryContext'),
      '@LocalStorage': path.resolve(__dirname, 'src/AppContext/LocalStorage/localStorage'),
      '@Constants': path.resolve(__dirname, 'src/AppContext/Constants/constants'),
      '@Colours': path.resolve(__dirname, 'src/Theme/colours'),
      '@GenericFunctions': path.resolve(__dirname, 'src/Support/genericFunctions'),
      '@Headers': path.resolve(__dirname, 'src/Support/headers'),
    },
    configure: (webpackConfig: unknown) => {
      // Custom Webpack changes can be made here
      return webpackConfig;
    },
  },
};
