"use client";

import { useEffect, useState } from "react";
import { User } from "@/lib/types/user";
import { fetchUser } from "@/hooks/useFetchData";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Response } from "@/lib/types/response";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const [userId, setUserId] = useState<string | undefined>()

  useEffect(() => {
    async function fetch() {
      const data = await fetchUser() as Response;
      if(!data.situation || data.response == null) await router.push('/login');
      setIsLoading(false);
      setUser(data.response as User)
      setUserId(user?.id)
    }
    fetch();
  }, [router, user?.id, userId]);

  const redirectNotes = () => {
    router.push(`/notes`)
  }
  return (
    <>
      {isLoading ? (
        <div className="h-screen w-screen flex justify-center items-center">
<LoadingSpinner color="white" /> 
        </div>
      ) : (
        <div className="text-white">
          {user ? (
            <div>
              <Button onClick={redirectNotes}>
Notes
              </Button>
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          ) : (
            <div>
              <LoadingSpinner color="white" /> 
            </div>
          )}
        </div>
      )}
    </>
  );
}


export default Page;
