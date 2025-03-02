"use client";

import { useEffect, useState } from "react";
import { User } from "@/lib/types/user";
import { fetchUser } from "@/lib/fetchdata/fetchData";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Response } from "@/lib/types/response";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const router = useRouter()

  useEffect(() => {
    async function fetch() {
      const response = await fetchUser() as Response;
      setUser(response.response as User);

      
      if(!response.situation){
        router.push('/login')
      }
      setIsLoading(false);
    }
    fetch();
  }, [router]);

  return (
    <>
    {isLoading ? (
      <div className="h-screen w-screen flex justify-center items-center">
      <LoadingSpinner />
      </div>
    ) : (
      <div>
        {user ? (
          <div>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        ) : (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </div>
    )}
  </>
  );
}


export default Page;
