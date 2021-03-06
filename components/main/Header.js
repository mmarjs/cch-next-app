import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "../../contexts/authContext";
import FormModal from './FormModal';

export default function Header({ openModal, isOpen }) {
  const menu = useRef(null);
  const menuBtn = useRef(null);
  const router = useRouter();
  const { asPath } = router;
  const { user } = useAuth();
  const [opened, setOpened] = useState(false);
  const [modal, setModal] = useState(isOpen?true:false);

  const menuToggleHandler = () => {
    if (window.screen.availWidth <= 416) {
      menuBtn.current.classList.toggle("active");
      menu.current.classList.toggle("active");
    }
  };

  const toggle = () => setModal(!modal);

  const cachyHandler = () => {
    menuToggleHandler();
    document.getElementsByName("cachy")[0].scrollIntoView();
  };

  useEffect(() => {
    if (asPath.replace("/", "") === "#cachy") {
      document.getElementsByName("cachy")[0].scrollIntoView();
    }

    Aos.init();
  }, []);

  return (
    <>
    <header
      data-aos="fade-in"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      className="header"
    >
      <section className="header__overlay" />
      <section
        data-aos="fade-right"
        data-aos-offset="200"
        data-aos-delay="100"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        className="header-info"
      >
        <nav className="header-info__nav">
          <h1 className="header-info__nav_title">
            <Link href="/">
              <a className={"header-info__nav_title-link"} />
            </Link>
          </h1>
          <div
            className={`auth-button-container showMobile ${
              opened ? "opened" : ""
            }`}
          >
            {user && (
              <>
                <div className="profile-image-wrappper">
                  <span
                    className="dropdown-button"
                    onClick={() => setOpened(!opened)}
                  >
                    {user.displayName ? user.displayName : "User"}
                  </span>
                  <img
                    src={user.photoURL ? user.photoURL : "/images/avatar.jpg"}
                    className="profile-image"
                    alt="Profile"
                  />
                </div>
                <ul className="dropdown dropdown--list">
                  <li className="dropdown__item">
                    <a href="/profile#orders">Orders</a>
                  </li>
                  <li className="dropdown__item">
                    <a href="/profile#profileinfo">Profile Information</a>
                  </li>
                </ul>
              </>
            )}
          </div>
          <ul ref={menu} className="header-info__nav-menu">
            <li className="header-info__nav-menu_link">
              <Link href="/modal">
                <a
                  onClick={() => toggle()} 
                  className="header-info__nav-menu_item">
                    Enroll as a talent
                </a>
              </Link>
            </li>
            {!user && (
              <>
                <li className="header-info__nav-menu_link">
                  <a
                    className="header-info__nav-menu_item showMobile"
                    onClick={() => openModal("signup")}
                  >
                    Sign Up
                  </a>
                </li>
                <li className="header-info__nav-menu_link">
                  <a
                    className="header-info__nav-menu_item showMobile"
                    onClick={() => openModal("login")}
                  >
                    Log in
                  </a>
                </li>
              </>
            )}
          </ul>
          <button
            onClick={menuToggleHandler}
            className="header-info__nav_menu-button"
          >
            <span ref={menuBtn} className="toggle-line" />
          </button>
        </nav>
        <h2 className="header-info__title">Personalized Musical Performance</h2>
        <p className="header-info__subtitle">
          CACHY is a platform where you can select a musician from our roster of
          amazing artists, request a private performance, and send it to a
          friend (or even yourself as a treat) to make any occasion extra
          special!
        </p>
        <a className="main-btn" href={"#artists"}>
          <span>Get my Cachy</span>
          <svg
            width="20"
            height="27"
            viewBox="0 0 20 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.561 10.0492C17.2904 10.0652 17.0625 10.1775 16.8765 10.386C16.6906 10.595 16.6058 10.8343 16.6218 11.1035L16.74 13.0945C16.8539 15.0129 16.2674 16.6944 14.9812 18.1388C13.6946 19.5831 12.0895 20.3624 10.166 20.4766C8.24216 20.5908 6.55603 20.0069 5.10793 18.7249C3.65954 17.4429 2.87854 15.8426 2.76464 13.9241L2.64646 11.9335C2.63048 11.6643 2.51768 11.437 2.30864 11.2511C2.09937 11.0661 1.8594 10.9816 1.58912 10.9977C1.31856 11.0137 1.09027 11.126 0.90469 11.3345C0.718762 11.5435 0.633991 11.7828 0.649973 12.052L0.768152 14.0427C0.904193 16.3342 1.78899 18.2817 3.42377 19.8856C5.05796 21.4901 7.0109 22.3497 9.28215 22.4639L9.40405 24.5172L5.41112 24.7542C5.14055 24.7703 4.91223 24.882 4.72664 25.091C4.54072 25.2995 4.4559 25.5387 4.47192 25.8085C4.4879 26.0777 4.60042 26.3049 4.80974 26.4908C5.01873 26.6759 5.25865 26.7604 5.52926 26.7443L15.5117 26.1517C15.782 26.1356 16.0102 26.0234 16.1961 25.8149C16.3817 25.6059 16.4668 25.3665 16.4508 25.0973C16.4348 24.8276 16.322 24.6003 16.113 24.415C15.9037 24.2294 15.6638 24.1455 15.3935 24.1616L11.4006 24.3986L11.2787 22.3454C13.5202 21.9629 15.3573 20.8784 16.7909 19.092C18.2238 17.306 18.8726 15.2675 18.7365 12.9759L18.6183 10.9853C18.6024 10.7161 18.4895 10.4888 18.2805 10.3029C18.071 10.1179 17.8313 10.0331 17.561 10.0492Z"
              fill="white"
            />
            <path
              d="M7.20685 10.3988L4.56822 10.5555L4.67658 12.3808L7.31521 12.2242C7.71831 12.2002 8.06425 12.5065 8.08811 12.9084C8.11197 13.3103 7.8047 13.6554 7.4016 13.6793L4.76445 13.8359C4.85221 15.1908 5.40865 16.3236 6.43596 17.2332C7.47107 18.1501 8.67536 18.5669 10.0478 18.4854C11.4203 18.4039 12.5665 17.8476 13.4861 16.8146C14.3983 15.7899 14.8171 14.5992 14.7439 13.2434L12.1987 13.3945C11.7956 13.4185 11.4496 13.1122 11.4258 12.7103C11.4019 12.3083 11.7092 11.9633 12.1123 11.9394L14.659 11.7882L14.5506 9.96286L12.004 10.114C11.6008 10.138 11.2549 9.83167 11.231 9.42979C11.2072 9.02791 11.5144 8.68282 11.9176 8.65888L14.4642 8.5077L14.349 6.56768L11.8024 6.71886C11.3993 6.7428 11.0533 6.43649 11.0295 6.03461C11.0056 5.63273 11.3129 5.28764 11.716 5.2637L14.2566 5.11288C14.1468 3.80605 13.5959 2.70817 12.5964 1.82238C11.561 0.906077 10.357 0.488647 8.98449 0.570127C7.61179 0.65162 6.46559 1.20858 5.5462 2.24093C4.65817 3.23873 4.24139 4.39405 4.28699 5.70474L6.91947 5.54846C7.32257 5.52453 7.66851 5.83079 7.69237 6.23272C7.71623 6.63465 7.40896 6.97969 7.00586 7.00362L4.36723 7.16027L4.4824 9.10029L7.12103 8.94364C7.52414 8.91971 7.87007 9.22597 7.89393 9.6279C7.91779 10.0298 7.60995 10.3749 7.20685 10.3988Z"
              fill="white"
            />
          </svg>
        </a>
      </section>
      <section data-aos="fade-left" className="header__img">
        <div className={`auth-button-container ${opened ? "opened" : ""}`}>
          {user ? (
            <>
              <div className="profile-image-wrappper">
                <span
                  className="dropdown-button"
                  onClick={() => setOpened(!opened)}
                >
                  {user.displayName ? user.displayName : "User"}
                </span>
                <img
                  src={user.photoURL ? user.photoURL : "/images/avatar.jpg"}
                  className="profile-image"
                  alt="Profile"
                />
              </div>
              {router.route === "/profile" ? (
                <ul className="dropdown dropdown--list">
                  <li className="dropdown__item">
                    <a onClick={signOut}>Log out</a>
                  </li>
                </ul>
              ) : (
                <ul className="dropdown dropdown--list">
                  <li className="dropdown__item">
                    <a href="/profile#orders">Orders</a>
                  </li>
                  <li className="dropdown__item">
                    <a href="/profile#profileinfo">Profile Information</a>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              <button
                className="btn btn-signup"
                onClick={() => openModal("signup")}
              >
                Sign Up
              </button>
              <button
                className="btn btn-login"
                onClick={() => openModal("login")}
              >
                Log In
              </button>
            </>
          )}
        </div>
        <video autoPlay muted controls>
          <source src="/video/homeintro.mp4" type="video/mp4" />
        </video>
      </section>
    </header>
    <FormModal modal={modal} toggle={toggle} />
    </>
  );
}
