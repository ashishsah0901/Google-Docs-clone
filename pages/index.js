import Icon from "@material-tailwind/react/Icon";
import Head from "next/head";
import AddDocument from "../components/AddDocument";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import { useState } from "react";
import Modal from "../components/Modal";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";

export default function Home() {
  const { data: session } = useSession();
  if (!session) return <Login />;
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [snapshot] = useCollectionOnce(
    query(
      collection(db, "userDocs", session?.user?.email, "docs"),
      orderBy("timestamp", "desc")
    )
  );
  const createDocument = () => {
    if (!input) return;
    addDoc(collection(db, "userDocs", session?.user?.email, "docs"), {
      fileName: input,
      timestamp: serverTimestamp(),
    }).catch((error) => alert(error.message));
    setShowModal(false);
    setInput("");
  };
  return (
    <div>
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <AddDocument setShowModal={setShowModal} />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        input={input}
        setInput={setInput}
        createDocument={createDocument}
      />
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl text-sm text-gray-700 mx-auto py-8">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray" />
          </div>
          {snapshot?.docs.map((doc) => (
            <DocumentRow
              key={doc.id}
              id={doc.id}
              fileName={doc.data().fileName}
              date={doc.data().timestamp}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
