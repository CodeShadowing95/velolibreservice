import { InteractiveMap, Preloader } from "./components";

function App() {
  return (
    <main className="relative overflow-hidden">
      {/* Chargement */}
      <Preloader />

      {/* la carte interactive */}
      <InteractiveMap />
    </main>
  )
}

export default App;