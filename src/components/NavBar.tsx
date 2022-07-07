import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div>
      <h1>SPWS</h1>
      <Link href="/">
        <a>HOME</a>
      </Link>
      <Link href="/blogs">
        <a>BLOGS</a>
      </Link>
      <Link href="/comments">
        <a>COMMENTS</a>
      </Link>
      <Link href="/portfolio">
        <a>PORTFOLIO</a>
      </Link>
      <Link href="/about">
        <a>ABOUT</a>
      </Link>
    </div>
  );
};

export default NavBar;
