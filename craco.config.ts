import path from 'path';

export default {
  webpack: {
    alias: {
      '@MainContext': path.resolve(__dirname, 'src/AppContext/Provider/DirectoryContext'),
      '@LocalStorage': path.resolve('src/AppContext/LocalStorage/localStorage'),
      '@Colours': path.resolve('src/Theme/colours'),
      '@GenericFunctions': path.resolve(__dirname, 'src/components/Support/genericFunctions'),
      '@Headers': path.resolve(__dirname, 'src/components/Support/headers'),
    },
    configure: (webpackConfig: unknown) => {
      // Custom Webpack changes can be made here
      return webpackConfig;
    },
  },
};
