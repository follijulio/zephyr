/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useParams } from "next/navigation";

const page: React.FC = () => {
  const params = useParams();

  const id = params.id;

  return (
    <div>
      <div>
        {id}
      </div>
    </div>
  );
};

export default page;
