import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
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
    // const { data, error, isFetching } = useIngressCurrentUserQuery();
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local:80/api/users/currentuser",
      {
        headers: {
          host: "ticketing.dev",
        },
      }
    );

    // we are on the server
    // request to get the current user
    return data;
  } else {
    // we are on the browser
    // request to get the current user
    const { data } = await axios.get("/api/users/currentuser");
    console.log("i m data", data);

    return data;
  }
};
