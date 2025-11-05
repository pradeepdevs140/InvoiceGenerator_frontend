import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const UserSyncHandler = () => {
  const [synced, setSynced] = useState(false);
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const { baseURL } = useContext(AppContext);

  useEffect(() => {
    const saveUser = async () => {
      if (!isLoaded || !isSignedIn || synced) return;

      try {
        const token = await getToken();
        const data = {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.imageUrl,
        };

        await axios.post(`${baseURL}/user/sync`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSynced(true);
      } catch {
        toast.error("User sync failed");
      }
    };

    saveUser();
  }, [isLoaded, isSignedIn, synced, user, getToken, baseURL]);

  return null;
};

export default UserSyncHandler;
