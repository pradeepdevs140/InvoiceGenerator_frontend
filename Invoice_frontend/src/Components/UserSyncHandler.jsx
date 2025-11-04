import { useAuth, useUser } from "@clerk/clerk-react";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

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

        const userData = {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          photoUrl: user.imageUrl,
        };

        await axios.post(`${baseURL}/user/sync`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSynced(true);
      } catch (error) {
        toast.error("Failed to sync user data.");
        console.error("User sync error:", error);
      }
    };

    saveUser();
  }, [isLoaded, isSignedIn, user, synced, getToken, baseURL]);

  return null;
};

export default UserSyncHandler;
