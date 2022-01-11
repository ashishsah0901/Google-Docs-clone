import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="px-4 py-2 shadow-md bg-white flex items-center sticky top-0 z-50">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="hidden md:inline-flex h-20 w-20 border-none"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="5xl" color="blue" />
      <h1 className="hidden md:inline-flex ml-2 text-gray-700 text-2xl">
        Docs
      </h1>
      <div className="flex flex-grow items-center px-5 py-2 bg-gray-100 mx-5 md:mx-20 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
        <Icon name="search" size="3xl" color="gray" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow px-5 text-base bg-transparent outline-none"
        />
      </div>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="hidden md:inline-flex ml-5 md:ml-20 h-20 w-20 border-none"
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>
      <img
        onClick={signOut}
        src={session?.user?.image}
        loading="lazy"
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        alt=""
      />
    </header>
  );
};

export default Header;
