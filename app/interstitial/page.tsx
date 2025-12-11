import styles from "./InterstitialPage.module.scss";
import LoadingDots from "@/components/LoadingDots/LoadingDots";
import Redirector from "./Redirector"; 
import { Metadata } from "next";

type Props = {
  searchParams?: { url?: string; where?: string };
};

export function generateMetadata(): Metadata {
  return {
    title: "Interstitial page",
    description:
      'You see this when you leave naeemgitonga.com by Naeem Gitonga',
  };
}

export default async function InterstitialPage(params: Props | any) {
  const searchParams = await params.searchParams;
  const url = searchParams?.url ?? "";
  const siteName = searchParams?.where ?? "the destination";

  const isSafe = typeof url === "string" && /^(https?:)\/\//i.test(url);

  return (
    <div className={styles.page}>
      <div id="particles-js" className={styles.hide} />
      <div className={styles.container}>
        <LoadingDots outerClassName={styles.loaderWrapper} />
        <h1 className={styles.header}>Now taking you to {siteName}...</h1>
      </div>

      {/* Minimal client-only piece */}
      <Redirector url={isSafe ? url : ""} delayMs={1000} />
    </div>
  );
}
