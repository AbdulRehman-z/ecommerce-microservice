import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import {
  useGetCurrentUserQuery,
  useIngressCurrentUserQuery,
} from "@/store/store";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ currentUser }) {
  console.log("bjbsjbjb", currentUser);
  return (
    <>
      <h1>Main page</h1>
    </>
  );
}

Home.getInitialProps = async () => {
  // if user is on the server
  if (typeof window === "undefined") {
    // const { data, error, isFetching } = await useIngressCurrentUserQuery();
    // const { data } = await axios.get(
    //   "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
    //   {
    //     headers: {
    //       Host: "ticketing.dev",
    //     },
    //   }
    // );
    // we are on the server
    // request to get the current user
    console.log(
      "-----------------------------------------i m data----------------------------------------"
    );
    return {};
  } else {
    // we are on the browser
    // request to get the current user
    const { data, error, isFetching } = useGetCurrentUserQuery();
    console.log("i m data", data);

    return data;
  }
};
