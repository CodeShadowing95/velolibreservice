import { InteractiveMap, Modal, Preloader } from "./components";

function App() {
  return (
    <main className="relative overflow-hidden">
      {/* Chargement */}
      <Preloader />

      {/* Modal pour répondre aux questions du test */}
      <Modal />

      {/* la carte interactive */}
      <InteractiveMap />
    </main>
  )
}

export default App;