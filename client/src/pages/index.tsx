import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import {
  useGetCurrentUserQuery,
  useIngressCurrentUserQuery,
} from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ currentUser }) {
  return (
    <>
      <h1>Main page</h1>
    </>
  );
}

Home.getInitialProps = async () => {
  // if user is on the server
  if (typeof window === "undefined") {
    const { data, error, isFetching } = useIngressCurrentUserQuery();
    // we are on the server
    // request to get the current user
    return data;
  } else {
    // we are on the browser
    // request to get the current user
    const { data, error, isFetching } = useGetCurrentUserQuery();
    return data;
  }
};
