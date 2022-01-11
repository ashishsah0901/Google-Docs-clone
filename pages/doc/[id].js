import Icon from "@material-tailwind/react/Icon";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import Login from "../../components/Login";
import { useRouter } from "next/router";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../firebase";
import Button from "@material-tailwind/react/Button";
import TextEditor from "../../components/TextEditor";

const Doc = () => {
  const { data: session } = useSession();
  if (!session) return <Login />;
  const router = useRouter();
  const { id } = router.query;
  const [snapshot, loading] = useDocumentOnce(
    doc(db, "userDocs", session?.user?.email, "docs", id)
  );
  if (!loading && !snapshot?.data()?.fileName) {
    router.replace("/");
  }
  return (
    <div>
      <Head>
        <title>Document</title>
      </Head>
      <header className="flex justify-between items-center p-3 pb-1">
        <span className="cursor-pointer" onClick={() => router.push("/")}>
          <Icon name="description" size="5xl" color="blue" />
        </span>
        <div className="flex-grow px-2">
          <h2>{snapshot?.data()?.fileName}</h2>
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">Edit</p>
            <p className="option">View</p>
            <p className="option">Insert</p>
            <p className="option">Format</p>
            <p className="option">Tools</p>
          </div>
        </div>
        <Button
          color="lightBlue"
          buttonType="filled"
          size="regular"
          className="hidded md:inline-flex h-30"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
        >
          <Icon name="people" size="md" />
          Share
        </Button>
        <img
          src={session.user.image}
          className="cursor-pointer rounded-full h-10 w-10 ml-2"
          alt=""
        />
      </header>
      <TextEditor />
    </div>
  );
};

export default Doc;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
