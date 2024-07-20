import gsap from "gsap";
import { useGSAP } from "@gsap/react"

const Preloader = () => {

  useGSAP(() => {
    gsap.to("#welcome", {
      duration: 0.5,
      translateY: "-200%",
      delay: 5,
      ease: "power1.inOut"
    });

    gsap.to("#marker", {
      duration: 0.5,
      translateY: "300%",
      delay: 5,
      ease: "power1.inOut"
    });

    gsap.to("#left", {
      duration: 0.5,
      translateX: "-300%",
      delay: 5.5,
      ease: "power1.inOut"
    });

    gsap.to("#right", {
      duration: 0.5,
      translateX: "300%",
      delay: 5.5,
      ease: "power1.inOut"
    });

    gsap.to("#preloader", {
      duration: 0.5,
      translateY: "100%",
      delay: 5.6,
      ease: "power1.inOut",
    });
  }, []);



  return (
    <div id="preloader" className="absolute top-0 left-0 w-full h-full translate-y-0 flex justify-center items-center z-40 transition-transform overflow-hidden">
      <div className="w-full h-full flex justify-center items-center overflow-hidden">
        {/* Left side */}
        <div id="left" className="w-1/2 h-full bg-gray-200"></div>

        {/* Center */}
        <div id="blockCenter" className="absolute top-auto left-auto flex flex-col gap-8 justify-center items-center w-[500px] h-60 z-30 overflow-hidden">
          <div id="welcome" className="flex justify-between items-center gap-4">
            {/* Photo */}
            <img src="/profile.jpeg" className="w-24 h-24 rounded-full" alt="profil" />

            {/* Text */}
            <div className="flex flex-col justify-center gap-2">
              <p className="text-5xl font-bold text-gray-700 italic">
                Bikemapper
              </p>

              <p className="text-base text-gray-700 font-light">
                N'hésitez pas à mettre une ⭐ sur mon <a href="https://github.com/CodeShadowing95/velolibreservice" target="_blank" className="text-blue-500">GitHub</a>😉
              </p>
            </div>
          </div>

          {/* Pulse */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" id="svgSpinnersPulse" className="w-10 h-10" viewBox="0 0 24 24"><circle cx="12" cy="12" r="0" fill="#0f766e"><animate id="svgSpinnersPulse20" fill="freeze" attributeName="r" begin="0;svgSpinnersPulse21.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersPulse21.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></circle><circle cx="12" cy="12" r="0" fill="#0f766e"><animate id="svgSpinnersPulse21" fill="freeze" attributeName="r" begin="svgSpinnersPulse20.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="0;11"/><animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulse20.begin+0.6s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0"/></circle></svg> */}
          <div id="marker" className="w-24 h-24">
            <img src="/logo.png" className="w-full h-full animate-bounce" alt="marker" />
          </div>
        </div>

        <div className="absolute bottom-4 z-30">
          <p className="text-xs leading-3 text-gray-500">Made with ❤️ by <a href="https://patricknamegni.vercel.app/" target="_blank" className="hover:underline hover:underline-offset-2">Patrick NAMEGNI</a></p>
        </div>

        {/* Right side */}
        <div id="right" className="w-1/2 h-full bg-gray-200"></div>
      </div>
    </div>
  )
}

export default Preloader