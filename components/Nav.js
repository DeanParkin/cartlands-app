import Link from "next/link";
import Image from "next/image";
import Footer from "../components/Footer";
import logo from "../public/imgs/Cartlands_Logo-01.png";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// TODO - add the navbar links
// TODO - add the navbar logo

const ImageCss = { maxWidth: "100%", height: "auto" };

export default function Nav({ children }) {
  const route = useRouter().route.slice(1);
  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);

  const navItems = [
    { name: "home", href: "/" },
    { name: "menu", href: "/menu" },
    { name: "events", href: "/events" },
    { name: "gallery", href: "/gallery" },
    { name: "contact", href: "/contact" },
  ];

  useEffect(() => {
    let navLinks = document.querySelectorAll(".nav-link");
    let size = window.innerWidth;
    document.onload = () => {
      setAttr();
    };

    function setAttr() {
      if (size > 992) {
        navLinks.forEach((link) => {
          link.removeAttribute("data-bs-toggle");
          link.removeAttribute("data-bs-target");
        });
      } else {
        navLinks.forEach((link) => {
          link.setAttribute("data-bs-toggle", "collapse");
          link.setAttribute("data-bs-target", "#navbarToggler");
        });
      }
    }

    const updateWindowDimensions = () => {
      size = window.innerWidth;
    };
    window.addEventListener("resize", () => {
      updateWindowDimensions();
      setAttr();
    });

    setAttr();
  }, []);

  const toggleClick = () => {
    //Set new Nav State
    setNavOpen(navOpen ? false : true);

    //Add and remove cross class
    if (navOpen == true) {
      document.querySelector(".nav-icon").classList.remove("x");
    } else {
      document.querySelector(".nav-icon").classList.add("x");
    }
  };

  const linkClick = (e) => {
    e.preventDefault();
    router.push(e.target.href);
    document.querySelector(".nav-icon").classList.remove("x");
    setNavOpen(false);
  };

  return <>
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="me-2" style={{ height: "60px" }}>
          <h1 className="m-0">
            <span hidden={true}>Cartlands Independent, Kings Heath Park</span>
          </h1>
          <Link href="/" legacyBehavior>
            <div style={{ width: "140px", height: "60px" }}>
              <Image
                src={logo}
                alt="Cartlands Independent Logo"
                width={140}
                height={60}
                className={`navbar-brand ${ImageCss}`}
                priority={true}
              />
            </div>
          </Link>
        </div>
        <button
          id="toggleBtn"
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleClick}
        >
          <div className="nav-icon">
            <div></div>
          </div>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-capitalize playfair-font">
            {navItems.map((link, key) => {
              let x = link.href.slice(1);
              let activeClass =
                x == route
                  ? { class: "nav-link active" }
                  : { class: "nav-link" };
              return (
                <li className="nav-item me-2" key={key}>
                  <Link
                    href={link.href}
                    className={activeClass.class}
                    //aria-current={home.aria}
                    //aria-current="page"
                    onClick={linkClick}>

                    {link.name}

                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
    {children}
    <Footer />
  </>;
}
