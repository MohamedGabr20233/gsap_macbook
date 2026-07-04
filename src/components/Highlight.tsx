import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const Highlight = () => {

  const isMobile = useMediaQuery({ query: '(max-width : 1024px)' })

  useGSAP(() => {

    gsap.to(['.left-column', '.right-column'], {
      scrollTrigger: {
        // trigger when id highlight section shows with the user
        trigger: ".masonry",
        start: isMobile ? 'bottom bottom' : 'top top'
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power1.out'

    })
  })

  return (
    <section id="highlights">
      <h2>There's never been a better time to upgrade.</h2>
      <h3>Here's what you get with the new MacBook Pro.</h3>
      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="laptop" />
            <p>Fly through demanding tasks up tp 9.8x faster.</p>
          </div>
          <div>
            <img src="/sun.png" alt="sun" />
            <p>A stunning <br /> Liquid Retina XDR <br /> display.</p>
          </div>
        </div>
        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="ai" />
            <p>Built for <br />
              <span>Apple Intelligence</span>
            </p>

          </div>
          <div>
            <img src="/battery.png" alt="battery" />
            <p>Up to
              <span className="green-ingredient">{' '}14 more hours battery life.{' '}</span>
              <span className="text-dark-100">{' '} (Up to 24 hours total.)</span></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlight;
