/* eslint-disable react/no-unescaped-entities */
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useState } from "react";

const Modal = () => {
  const [questionId, setQuestionId] = useState(1);

  const nextQuestion = (id) => {
    setQuestionId(id);
  }

  useGSAP(() => {
    gsap.to("#title", {
      duration: 0.5,
      translateY: "-50px",
      delay: 9.5,
      ease: "power1.inOut"
    });

    gsap.to("#subtitle", {
      duration: 0.5,
      translateY: "-65px",
      delay: 9.6,
      ease: "power1.inOut"
    })

    setTimeout(() => {
      gsap.to("#modal", {
        duration: 0.5,
        translateY: "0",
        ease: "power1.inOut"
      })
    }, 8000)
  }, [])

  const closeModal = () => {
    gsap.to("#modal", {
      duration: 0.5,
      translateY: "-200%",
      ease: "power1.inOut",
    })
  }

  return (
    // Overlay
    <div id="modal" className="absolute top-0 left-0 flex justify-center items-center w-full h-screen -translate-y-full bg-black/80 z-20 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10">
      {/* Close button */}
      <div className="absolute top-4 right-4 rounded-full w-10 h-10 p-2 border-2 border-white hover:bg-white/10" onClick={() => closeModal()}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain" viewBox="0 0 24 24"><path fill="#ffffff" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"/></svg>
      </div>

      {/* Message */}
      <div className="absolute top-40 left-12 rounded-xl w-[200px] flex justify-center items-center bg-zinc-900 p-4 text-white gap-4 border">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 7q.425 0 .713-.288T13 6q0-.425-.288-.712T12 5q-.425 0-.712.288T11 6q0 .425.288.713T12 7m0 8q.425 0 .713-.288T13 14v-4q0-.425-.288-.712T12 9q-.425 0-.712.288T11 10v4q0 .425.288.713T12 15m-6 3l-2.3 2.3q-.475.475-1.088.213T2 19.575V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18z"/></svg>
        <p className="text-xs font-light">Hop hop! Pas si vite, j'ai senti votre envie de dévorer ma Map, mais avant ça les réponses aux questions de la partie théorique</p>
      </div>

      {/* Modal */}
      <div className="flex absolute bottom-0 left-0">
        <img src="/modal_img.png" alt="modal" className="w-[600px]" />
      </div>

      <div className="absolute left-[300px] w-[500px] bg-zinc-800 z-20 rounded-3xl flex flex-col gap-4 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col justify-start items-center w-full h-16 py-2 bg-yellow-300 rounded-t-3xl overflow-hidden">
          <p id="title" className="text-3xl font-bold mb-8">Avant de commencer</p>
          <p id="subtitle" className="text-3xl font-bold uppercase">PARTIE THÉORIQUE</p>
        </div>

        {/* Content */}
        <div className="flex flex-col w-full">
          {/* 1st question */}
          <div className={`w-full cursor-pointer transition-colors ${questionId === 1 ? "bg-zinc-900/50" : "hover:bg-zinc-900/50"} group border-b border-zinc-900`} onClick={() => nextQuestion(1)}>
            <div className="flex justify-between items-center py-4 pl-4 pr-2 ">
              <div className="w-10/12">
                <p className="text-sm font-light text-white">Qu'est-ce qu'une API ? Donner un exemple d'utilisation d'une API dans un projet</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24"><path fill="#ffffff" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7z"/></svg>
            </div>
          </div>

          {/* 2nd question */}
          <div className={`w-full cursor-pointer transition-colors ${questionId === 2 ? "bg-zinc-900/50" : "hover:bg-zinc-900/50"} group border-b border-zinc-900`} onClick={() => nextQuestion(2)}>
            <div className="flex justify-between items-center py-4 pl-4 pr-2 ">
              <div className="w-10/12">
                <p className="text-sm font-light text-white">Qu'est-ce qu'un webhook ? Expliquer son fonctionnement et donner un exemple de son utilisation.</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24"><path fill="#ffffff" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7z"/></svg>
            </div>
          </div>

          {/* 3rd question */}
          <div className={`w-full cursor-pointer transition-colors ${questionId === 3 ? "bg-zinc-900/50" : "hover:bg-zinc-900/50"} group border-b border-zinc-900`} onClick={() => nextQuestion(3)}>
            <div className="flex justify-between items-center py-4 pl-4 pr-2 ">
              <div className="w-10/12">
                <p className="text-sm font-light text-white">Quelle est la différence entre une base de données relationnelle et une base de données non relationnelle ?</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24"><path fill="#ffffff" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7z"/></svg>
            </div>
          </div>

          {/* 4th question */}
          <div className={`w-full cursor-pointer transition-colors ${questionId === 4 ? "bg-zinc-900/50" : "hover:bg-zinc-900/50"} group border-b border-zinc-900`} onClick={() => nextQuestion(4)}>
            <div className="flex justify-between items-center py-4 pl-4 pr-2 ">
              <div className="w-10/12">
                <p className="text-sm font-light text-white">Déjà utilisé Python ? Explique brièvement ton expérience ou tes connaissances concernant le langage.</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24"><path fill="#ffffff" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7z"/></svg>
            </div>
          </div>

          {/* 5th question */}
          <div className={`w-full cursor-pointer transition-colors ${questionId === 5 ? "bg-zinc-900/50" : "hover:bg-zinc-900/50"} group`} onClick={() => nextQuestion(5)}>
            <div className="flex justify-between items-center py-4 pl-4 pr-2 ">
              <div className="w-10/12">
                <p className="text-sm font-light text-white">Déjà utilisé Wordpress ou Odoo ? Explique brièvement ton expérience ou tes connaissances concernant ces outils.</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24"><path fill="#ffffff" d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-10 right-48 flex bg-zinc-800 z-20 rounded-lg w-[500px] h-[500px] py-4 overflow-hidden">
        <div className="flex relative w-full">
          {/* Réponse 1 */}
          <div className={`absolute top-0 left-0 right-0 bottom-0 flex flex-col gap-4 ${questionId === 1 ? "translate-x-0" : "translate-x-full"} transition-all w-full px-4`}>
            <p className="text-base font-bold text-white">Qu'est-ce qu'une API ? Donner un exemple d'utilisation d'une API dans un projet</p>
            <p className="text-sm text-white/60 text-wrap break-words">
              Une API (Application Programming Interface) est un ensemble de règles et de protocoles qui permettent à des logiciels de communiquer entre eux. Cela peut inclure des requêtes et des réponses spécifiques pour accéder à des fonctionnalités ou des données.
              <br /><br/>
              Un exemple d'utilisation d'une API dans un projet serait d'utiliser l'API de JCDecaux qui fournit des données sur les stations de vélos partagés ou vélos en libre service gérées par la société JCDecaux dans plusieurs villes de France. Elle permet d'accéder aux informations sur la disponibilité des vélos, la disponibilité des stations, les emplacements des stations,...
            </p>
          </div>

          {/* Réponse 2 */}
          <div className={`absolute top-0 left-0 right-0 bottom-0 flex flex-col gap-4 overflow-auto ${questionId === 2 ? "translate-x-0" : "translate-x-full"} transition-all w-full px-4`}>
            <p className="text-base font-bold text-white">Qu'est-ce qu'un webhook ? Expliquer son fonctionnement et donner un exemple de son utilisation.</p>
            <div className="w-full flex flex-col text-white/60">
              <p className="text-sm text-wrap break-words mb-3">Un webhook est un mécanisme qui permet à une application de recevoir des notifications en temps réel à partir d'autres applications ou services. Il s'agit d'un URL spécifique qui est appelé par l'application source lorsqu'une certaine action se produit.</p>
              <p className="text-base font-bold mb-1">Fonctionnement</p>
              <ul className="space-y-2">
                <li className="text-sm">1- L'application source envoie une requête HTTP POST à l'URL du webhook, en incluant les informations nécessaires dans le corps de la requête.</li>
                <li className="text-sm">2- L'application réceptrice (ou le service) à l'URL du webhook reçoit la requête HTTP POST et effectue les actions nécessaires en réponse à l'événement.</li>
                <li className="text-sm">3- L'application réceptrice renvoie une réponse HTTP au service d'origine pour confirmer la réception de la notification.</li>
              </ul>
              <p className="text-base font-bold mt-4 mb-1">Exemple d'utilisation</p>
              <ul className="space-y-2">
                <li className="text-sm"><span className="font-semibold">1- Intégration d'un CRM avec un outil de marketing par e-mail :</span> Lorsqu'un nouveau prospect est créé dans le CRM, un webhook peut être utilisé pour notifier l'outil de marketing par e-mail, qui peut ensuite ajouter le prospect à sa liste de diffusion.</li>
                <li className="text-sm"><span className="font-semibold">2- Suivi des colis :</span> Un magasin en ligne peut utiliser des webhooks pour recevoir des notifications d'un transporteur concernant l'état des livraisons, et ainsi informer ses clients en temps réel.</li>
                <li className="text-sm"><span className="font-semibold">3- Gestion des stocks :</span> Comme dans l'exemple mentionné ci-dessus, les webhooks peuvent être utilisés pour synchroniser les niveaux de stock entre différents systèmes.</li>
              </ul>
            </div>
          </div>

          {/* Réponse 3 */}
          <div className={`absolute top-0 left-0 right-0 bottom-0 flex flex-col gap-4 overflow-auto ${questionId === 3 ? "translate-x-0" : "translate-x-full"} transition-all w-full px-4`}>
            <p className="text-base font-bold text-white">Quelle est la différence entre une base de données relationnelle et une base de données non relationnelle ?</p>
            <div className="w-full flex flex-col text-white/60">
              <p className="text-sm text-wrap break-words mb-3">
                Une base de données relationnelle est une base de données qui contient des données liées entre elles. Une base de données non relationnelle est une base de données qui ne suit pas le modèle relationnel traditionnel, les données sont stockées sous forme de documents ou de paires de clé-valeur.
                <br/><br/>
                Exemple: MySQL et PostgreSQL sont des bases de données non relationnelles. Alors que MongoDB, Cassandra et GraphQL sont systèmes de gestion de bases de données non relationnelles 
              </p>
            </div>
          </div>

          {/* Réponse 4 */}
          <div className={`absolute top-0 left-0 right-0 bottom-0 flex flex-col gap-4 overflow-auto ${questionId === 4 ? "translate-x-0" : "translate-x-full"} transition-all w-full px-4`}>
            <p className="text-base font-bold text-white">Déjà utilisé Python ? Explique brièvement ton expérience ou tes connaissances concernant le langage.</p>
            <div className="w-full flex flex-col text-white/60">
              <p className="text-sm text-wrap break-words mb-3">
                Python est un langage de programmation open-source et multiplateforme. C'est un langage interprété, ce qui signifie qu'il peut être exécuté directement sans avoir besoin d'être compilé. C'est facile à apprendre.
                <br /><br/>
                Concernant mon expérience du langage, je l'ai utilisé dans la plupart de nos projets de classe notamment:<br />
                - Le jeu du pendu<br />
                - Le jeu du morpion<br />
                - Une petite application d'enregistrement de contacts<br />
                - Le traitement et l'analyse de données avancées avec NumPy et Pandas<br />
                - La conception d'une application web de webscrapping avec Django, BeautifulSoup et Scrapy<br />
                - La programmation orientée objet avec Python<br />
                - L'utilisation de Jupyter Notebook pour exécuter des scripts Python
              </p>
            </div>
          </div>

          {/* Réponse 5 */}
          <div className={`absolute top-0 left-0 right-0 bottom-0 flex flex-col gap-4 overflow-auto ${questionId === 5 ? "translate-x-0" : "translate-x-full"} transition-all w-full px-4`}>
            <p className="text-base font-bold text-white">Déjà utilisé Wordpress ou Odoo ? Explique brièvement ton expérience ou tes connaissances concernant ces outils.</p>
            <div className="w-full flex flex-col text-white/60">
              <p className="text-sm text-wrap break-words mb-3">
                Wordpress est un CMS. C'est un outil de gestion de contenu. Il est écrit en PHP et utilise une base de données MySQL pour stocker les données du site.
                <br /><br/>
                Concernant mon expérience de l'outil, je n'ai pas véritablement utilisé WordPress, mais j'ai eu l'occasion de l'utiliser dans la plupart de nos projets de classe en 2ème année dont notamment:<br />
                - Un site web de gestion de restaurants<br />
                - Un site web de e-commerce d'appareils électroniques
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal