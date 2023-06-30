// import { defineApolloClient } from "@nuxtjs/apollo";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("apollo:error", (error) => {
    const { graphQLErrors, networkError } = error;
    const { message, locations, path } = graphQLErrors[0];
    console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`   
    )
    console.log(networkError)

  });

});
