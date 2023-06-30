import { getUser } from "@/store/store";

export const useAuthUser = () => {
    if(!getUser()) {
        return null;
    }

    return getUser();
};