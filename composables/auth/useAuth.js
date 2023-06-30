import { useAuthUser } from "./useAuthUser";

export const useAuth = () => {
    const authUser = useAuthUser();

    const setUser = (user) => {
        authUser.value = user;
    };

    const setCookie = (cookie) => {
        cookie.value = cookie;
    };

    // const login = async (email, password, rememberMe) => {
    //     const data = await $fetch("/auth/login", {
    //         method: "POST",
    //         body: {
    //             email,
    //             password,
    //             rememberMe,
    //         },
    //     });

    //     setUser(data.user);

    //     return authUser;
    // };

    const logout = async () => {
        const data = await $fetch("/auth/logout", {
            method: "POST",
        });

        setUser(data.user);
    };

    const me = async () => {
        if (!authUser.value) {
            try {
                const data = await $fetch("/auth/me", {
                    headers: useRequestHeaders(["cookie"]),
                });

                setUser(data.user);
            } catch (error) {
                setCookie(null);
            }
        }

        return authUser;
    };

    return {
        setUser,
        // login,
        logout,
        me,
    };
};
