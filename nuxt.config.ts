// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/apollo", "@nuxtjs/tailwindcss"],

  app: {
    head: {
      title: "Contact Ease",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "Contact Ease - Contact Management Web App",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/company_logo.svg" }],
    },
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:2000/v1/graphql",
        wsEndpoint: "ws://localhost:2000/v1/graphql",
        httpLinkOptions: {
          credentials: "same-origin",
          headers: {
            "x-hasura-admin-secret": "secret",
          },
        },
      },
    },
  },
});
