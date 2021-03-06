module.exports = {
  port: process.env.PORT || 4000,
  path: "graphql",
  healthPath: "health",
  graphql: { graphiql: false },
  enableContentSecurityPolicy: true,
  cache: {
    dataLoaderEnabled: true,
    requestCacheEnabled: true,
    dnsCacheEnabled: true,
    redis: process.env.DISABLE_REDIS !== "1" && {
      url: process.env.REDIS_URL,
    },
  },
  loaders: {
    datapunt: {
      HOST: "https://api.data.amsterdam.nl",
      CACHE_TIMEOUT: 600,

      bag: {
        url: "/bag/v1.1/",
        cacheTimeout: 600,
      },
      bagSearch: {
        url: "/atlas/",
      },
      geoSearch: {
        url: "/geosearch/",
      },
      monument: {
        url: "/monumenten/",
      },
    },
    zoningPlan: {
      url:
        "https://afnemers.ruimtelijkeplannen.nl/afnemers/services?REQUEST=GetFeature&service=WFS&version=1.0.0&typename=ProvinciaalPlangebied",
      cacheTimeout: 600,
    },
  },
};
