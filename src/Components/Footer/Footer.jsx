import style from "./Footer.module.css";
import FooterLogo from "../../assets/Images/FooterLogo.svg";
const Footer = () => {
  const socialMediaLinks = [
    {
      name: "Facebook",
      link: "https://www.facebook.com/",
      icon: "fab fa-facebook",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/",
      icon: "fab fa-twitter",
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/",
      icon: "fab fa-instagram",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/",
      icon: "fab fa-linkedin",
    },
  ];
  return (
    <footer className={style["FooterContainer"]}>
      <div className="container">
        <div className="row">
          {/* Logo and Description Column */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-3">
              <div className="position-relative">
                <div className="text-danger">
                  <img src={FooterLogo} alt="logo website" />
                </div>
              </div>
              <div className="ms-3">
                <h3 className="mb-0">
                  <span className="text-danger">P</span>ro{" "}
                  <span className="text-danger">G</span>arage
                </h3>
                <small className="opacity-75 ">
                  Driven to Fix, Built to Last
                </small>
              </div>
            </div>
            <p className="small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque euismod, nisi at facilisis hendrerit, arcu sapien
            </p>
            <div className="d-flex mt-4">
              {socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  className="me-3 text-decoration-none"
                >
                  <div
                    className={
                      "rounded-circle border border-danger p-2 d-flex justify-content-center align-items-center " +
                      style["social-icon"]
                    }
                  >
                    <i className={link.icon}></i>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Our Services Column */}
          <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
            <h5 className="mb-4">
              Our Services
              <div className={"mt-2 " + style["gradient-line"]}></div>
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span className=" me-2">•</span> Engine Diagnostics
              </li>
              <li className="mb-2">
                <span className=" me-2">•</span> Lube, Oil and Filters
              </li>
              <li className="mb-2">
                <span className=" me-2">•</span> Belts and Hoses
              </li>
              <li className="mb-2">
                <span className=" me-2">•</span> Air Conditioning
              </li>
              <li className="mb-2">
                <span className=" me-2">•</span> Brake Repair
              </li>
              <li className="mb-2">
                <span className=" me-2">•</span> Tire and Wheel Services
              </li>
              <li>
                <span className=" me-2">•</span> Other Car Services
              </li>
            </ul>
          </div>

          {/* Our Categories Column */}
          <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
            <h5 className="mb-4">
              Our Categories
              <div className={"mt-2 " + style["gradient-line"]}></div>
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span className=" me-2">•</span> Engine Diagnostics
              </li>
              <li className="mb-2">
                <span className=" me-2">•</span> Lube, Oil and Filters
              </li>
              <li className="mb-2">
                <span className=" me-2">•</span> Belts and Hoses
              </li>
              <li className="mb-2">
                <span className=" me-2">•</span> Air Conditioning
              </li>
              <li className="mb-2">
                <span className=" me-2">•</span> Brake Repair
              </li>
              <li className="mb-2">
                <span className=" me-2">•</span> Tire and Wheel Services
              </li>
              <li>
                <span className=" me-2">•</span> Other Car Services
              </li>
            </ul>
          </div>

          {/* Store Working Hours Column */}
          <div className="col-lg-3 col-sm-6">
            <h5 className="mb-4">
              Store Working Hours
              <div className={"mt-2 " + style["gradient-line"]}></div>
            </h5>
            <ul className="list-unstyled">
              <li className="d-flex gap-3 mb-2">
                <span>Saturday:</span>
                <span>7:30am - 3:00pm</span>
              </li>
              <li className="d-flex gap-3 mb-2">
                <span>Sunday:</span>
                <span>7:30am - 5:30pm</span>
              </li>
              <li className="d-flex gap-3 mb-2">
                <span>Monday:</span>
                <span>7:30am - 5:30pm</span>
              </li>
              <li className="d-flex gap-3 mb-2">
                <span>Tuesday:</span>
                <span>7:30am - 5:30pm</span>
              </li>
              <li className="d-flex gap-3 mb-2">
                <span>Wednesday:</span>
                <span>7:30am - 5:30pm</span>
              </li>
              <li className="d-flex gap-3 mb-2">
                <span>Thursday:</span>
                <span>7:30am - 5:30pm</span>
              </li>
              <li className="d-flex gap-3">
                <span>Friday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright and Links */}
        <div
          className={
            "row mt-5 pt-4 border-top border-secondary " +
            style["footer-bottom"]
          }
        >
          <div className="col-md-6 text-center mb-3 mb-md-0">
            <p className="small  mb-0">
              © 2025 Pro Garage - All rights reserved.
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-md-end">
            <a href="#" className="small me-3 text-decoration-none">
              Terms of Service
            </a>
            <a href="#" className="small me-3 text-decoration-none">
              Privacy Policy
            </a>
            <a href="#" className="small me-3 text-decoration-none">
              Security
            </a>
            <a href="#" className="text-muted small text-decoration-none">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
