import { useRouter } from "next/navigation";
import React from "react";

const RouteTo = (value: string) => {
  const router = useRouter();

  router.push(value);
};
export default RouteTo;
