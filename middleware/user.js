export default defineNuxtRouteMiddleware(async () => {
  console.log("user middleware");
  const user = useAuthUser();
  console.log("user", user.value);

  if (!user.value) return navigateTo({ name: "login" });

});
