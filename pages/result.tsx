import { NextPage } from "next";
import { useRouter } from "next/router";

import PrintObject from "../components/PrintObject";
import Cart from "../components/Cart";
import ClearCart from "../components/ClearCart";

import { fetchGetJSON } from "../utils/api-helpers";
import useSWR from "swr";

const ResultPage: NextPage = () => {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;

  return (
    <div className="page-container">
      <PrintObject content={data ?? "loading..."} />
      <Cart>
        <ClearCart />
      </Cart>
    </div>
  );
};

export default ResultPage;
