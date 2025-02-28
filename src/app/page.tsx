"use client";

import { useEffect, useState } from "react";
import { User } from "@/lib/types/user";
import { fetchUser } from "@/lib/fetchdata/fetchData";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const Page: React.FC = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    async function fetch() {
      const response = await fetchUser();
      const data = response;
      setUser(data);
    }
    fetch();
  }, []);

  return (
    <div>
      {user
        ? <div>
            <pre>
              {JSON.stringify(user)}
            </pre>
          </div>
        : <div>
            <LoadingSpinner className="" />
          </div>}
    </div>
  );
};

export default Page;
