import { gsap } from "gsap";

let isMoved = false;
export const toggleProfile = () => {
  document.querySelector(".profile-tag").addEventListener("click", () => {
    if (!isMoved) {
      gsap.to(".profile3D-container", { duration: 1, right: "43%" });
      gsap.fromTo(".title", 
        { rotationY: -15 },
        { rotationY: 0, duration: 1 }
      );
      gsap.fromTo(".profileDetail3D-container", 
        { opacity: 0, right: '0%' },
        { opacity: 1, display: 'block', right: '15%', duration: 1 }
      );
    } else {
      gsap.to(".profile3D-container", { duration: 1, right: "15%" });
      gsap.fromTo(".title", 
        { rotationY: 0 },
        { rotationY: -15, duration: 1 }
      );
      gsap.fromTo(".profileDetail3D-container", 
        { opacity: 1, right: '15%' },
        { opacity: 0, display: 'none', right: '0%', duration: 1 }
      );
    }
    isMoved = !isMoved;
  });
}