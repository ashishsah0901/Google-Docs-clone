import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Head from "next/head";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Login</title>
      </Head>
      <Image
        src="https://links.papareact.com/1ui"
        height="300"
        width="558"
        objectFit="contain"
      />
      <Button
        className="w-44 mt-10"
        color="blue"
        buttonType="filled"
        ripple="light"
        onClick={signIn}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
