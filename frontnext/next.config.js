// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   webpack: function (config, options) {
//     if (!options.isServer) {
//       config.resolve.fallback.fs = false;
//     }

//     config.experi
//     return config;
//   },
// };

// export default nextConfig;


//v2 por babel
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false,
//       };
//     }
    
//     config.experiments = {
//       ...config.experiments,
//       asyncWebAssembly: true,
//     };

//     return config;
//   },
// };

// export default nextConfig;

// v3
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false,
//       };
//     }
    
//     config.experiments = {
//       ...config.experiments,
//       asyncWebAssembly: true,
//     };

//     return config;
//   },
// };

// module.exports = nextConfig;

// v4
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    return config;
  },
  // Agregamos esta configuración para manejar los módulos de WASM si es necesario
  experimental: {
    asyncWebAssembly: true,
  },
};

module.exports = nextConfig;