import { InferGetServerSidePropsType } from "next";
import Cumulio from "cumulio";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  CumulioDashboard,
  CumulioDashboardComponent,
} from "@cumul.io/react-cumulio-dashboard";
import { useEffect, useRef, useState } from "react";

export interface Token {
  last_used_at: Date;
  environment: string;
  integration_id: string;
  type: string;
  expiry: Date;
  inactivity_interval: number;
  username: string;
  name: string;
  email: string;
  suborganization: string;
  role: string;
  id: string;
  user_id: string;
  updated_at: Date;
  created_at: Date;
  token: string;
  ip: null;
  securables: null;
  filters: null;
  screenmode: null;
  width: null;
  height: null;
  locale_id: null;
  description: null;
  deleted_at: null;
  metadata: null;
  timezone_id: null;
  theme_id: null;
  theme: null;
  css: null;
  feature_overrides: null;
  currency_id: null;
}

export const getServerSideProps = async () => {
  var client = new Cumulio({
    api_key: "48dbe6eb-92a7-49eb-9f6f-f5a1e4633adf",
    api_token:
      "bufHdOWxwxSFqQqpeH2s8iy9wHpuE7fKRhwEcMrrzkyY9YhH91z60f6t1csWwdZYYzEgElAfoZngp4doXyNmtULQ6pJnMaYIaUnGVWr2Y1nSYDncwrHE5NjkPDQup7iyryaTt0zPZ3Sdg0RhCSYeql",
    host: "https://api.cumul.io",
  });

  const token = (await client.create("authorization", {
    integration_id: "618a68b6-188d-4ebc-9549-0b093f68db30",
    type: "sso",
    expiry: "24 hours",
    inactivity_interval: "10 minutes",
    username: "ExampleUser",
    name: "Example User",
    email: "example@example.com",
    suborganization: "client1",
    role: "viewer",
  })) as Token;

  return {
    props: { token }, // will be passed to the page component as props
  };
};

const Home = ({
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const ref = useRef<CumulioDashboard>(null);

  // Only render on the client
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Example embedding Cumulio</p>
          {isClient && (
            <CumulioDashboardComponent
              ref={ref}
              authKey={token.id}
              authToken={token.token}
              dashboardSlug="singledrilloverview"
              switchScreenModeOnResize={true}
              loaderSpinnerColor="rgb(0, 81, 126)"
              loaderSpinnerBackground="rgb(236 248 255)"
              itemsRendered={(_e: any) => console.log("itemsRendered", _e)}
            />
          )}
          <pre>{JSON.stringify(token, null, 2)}</pre>
        </div>
      </main>
    </>
  );
};

export default Home;
