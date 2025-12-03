import Link from "next/link";
import Container from "../Container/Container";
import css from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={css.heroBackground}>
      <div className={css.hero}>
        <Container>
          <h1 className={css.heroTitle}>Campers of your dreams</h1>
          <p className={css.heroAfterTitle}>
            You can find everything you want in our catalog
          </p>
          <Link href="/catalog" className={`${css.heroBtn} basicBtn`}>
            View Now
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
