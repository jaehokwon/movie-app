import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import styles from "./Detail.module.css";
import { FaStar, FaHeart } from "react-icons/fa";
import { TfiVideoClapper } from "react-icons/tfi";
import { MdDateRange } from "react-icons/md";
import { VscTypeHierarchy } from "react-icons/vsc";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <img className={styles.bg} src={movie.background_image_original} />
          <div className={styles.detail}>
            <h2 className={styles.title}>
              {movie.title}({movie.year})
            </h2>
            <div className={styles.detail__info}>
              <img src={movie.large_cover_image} />
              <div className={styles.detail__right}>
                <p>
                  <MdDateRange style={{ color: "ffbb00" }} />{" "}
                  {movie.date_uploaded.slice(0, 10)}
                </p>
                <p>
                  <FaStar style={{ color: "ffff8f" }} /> {movie.rating}{" "}
                  <FaHeart style={{ color: "f15f5f" }} /> {movie.like_count}{" "}
                  <TfiVideoClapper style={{ color: "b7f0b1" }} />{" "}
                  {movie.runtime} min.
                </p>
                <p>
                  <VscTypeHierarchy style={{ color: "a566ff" }} />{" "}
                  {movie.genres.join(" / ")}
                </p>
                <p className={styles.summary}>{movie.description_full}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
