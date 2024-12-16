import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

import cityImg from '../assets/city.jpg';
import heroImg from '../assets/hero.png';

export default function WelcomePage() {
  // useScroll()는 스크롤 위치를 추적하는 훅
  const { scrollY } = useScroll();

  // useTransform()은 스크롤 위치를 변환하는 훅
  // 변환 되어야 하는 값, 중단점으로 구성된 배열, 중단점들 사이에 있는 값들이 변환되어야 하는 값
  // 스크롤 내릴수록 점점 투명해진다
  const yCity = useTransform(scrollY, [0, 200], [0, -100]);
  const opacityCity = useTransform(scrollY, [0, 200, 300, 500], [1, 0.5, 0.5, 0]);

  const yHero = useTransform(scrollY, [0, 200], [0, -150]);
  const opacityHero = useTransform(scrollY, [0, 300, 500], [1, 1, 0]);

  const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 50, 50, 300]);
  const scaleText = useTransform(scrollY, [0, 300], [1, 1.5]);

  return (
    <>
      <header id="welcome-header">
        <motion.div id="welcome-header-content"
        style={{ scale: scaleText, y: yText }}>
          <h1>Ready for a challenge?</h1>
          <Link id="cta-link" to="/challenges">
            Get Started
          </Link>
        </motion.div>

        {/* 스크롤에 따른 투명도 설정 */}
        <motion.img
          style={{ opacity: opacityCity, y: yCity }}
          src={cityImg}
          alt="A city skyline touched by sunlight"
          id="city-image"
        />
        <motion.img 
          style={{ opacity: opacityHero, y: yHero }}
          src={heroImg} 
          alt="A superhero wearing a cape" 
          id="hero-image" 
        />
      </header>
      <main id="welcome-content">
        <section>
          <h2>There&apos;s never been a better time.</h2>
          <p>
            With our platform, you can set, track, and conquer challenges at
            your own pace. Whether it&apos;s personal growth, professional
            achievements, or just for fun, we&apos;ve got you covered.
          </p>
        </section>

        <section>
          <h2>Why Challenge Yourself?</h2>
          <p>
            Challenges provide a framework for growth. They push boundaries,
            test limits, and result in genuine progress. Here, we believe
            everyone has untapped potential, waiting to be unlocked.
          </p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Custom challenge creation: Set the rules, define your pace.</li>
            <li>
              Track your progress: See your growth over time with our analytics
              tools.
            </li>
            <li>
              Community Support: Join our community and get motivated by peers.
            </li>
          </ul>
        </section>

        <section>
          <h2>Join Thousands Embracing The Challenge</h2>
          <p>
            “I never realized what I was capable of until I set my first
            challenge here. It&apos;s been a transformative experience!” - Alex
            P.
          </p>
          {/* You can add more testimonials or even a carousel for multiple testimonials */}
        </section>
      </main>
    </>
  );
}
