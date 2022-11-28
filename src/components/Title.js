import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import QueryString from "query-string";
import styles from "./Title.module.css";

function Title() {
  const qs = QueryString.parse(useLocation().search);
  const search = qs.search ?? "";
  const input = useRef();
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${input.current.value}`);
  };
  const onClick = () => (input.current.value = "");
  useEffect(() => {
    if (input !== null && input !== undefined) {
      input.current.value = search;
    }
  }, [search]);
  return (
    <div className={styles.container}>
      <header>
        <h2 className={styles.title}>
          <Link to={"/"} onClick={onClick}>
            KFLIX
          </Link>
        </h2>
        <div className={styles.nav}>
          <form onSubmit={onSubmit}>
            <FaSearch style={{ marginTop: "10px" }} />
            <input ref={input} placeholder="Search..." minLength={2} />
          </form>
        </div>
      </header>
    </div>
  );
}

export default Title;
