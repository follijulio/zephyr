/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useParams } from "next/navigation";

const page: React.FC = () => {

  const params = useParams();

  const id = params.id ? parseInt(Array.isArray(params.id) ? params.id[0] : params.id)  + 100 : 0;


  return (
    <div>
      <div>
        {id}
      </div>
    </div>
  );
};

export default page;
