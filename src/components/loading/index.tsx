import "./loading.css";

interface LoadingProps {
  message?: string;
  subMessage?: string;
}

export function Loading({
  message = "Carregando Pokémon's...",
  subMessage = "Consultando a Pokédex e capturando dados...",
}: LoadingProps) {
  return (
    <div className="loading-container">
      <div className="loading-card">
        {/* Spinner Pokébola Elegante */}
        <div className="pokeball-spinner-wrapper">
          <div className="spinner-ring" />
          <div className="spinner-glow" />
          <div className="pokeball-spinner">
            <div className="pokeball-top" />
            <div className="pokeball-middle-line">
              <div className="pokeball-center-button">
                <div className="pokeball-center-dot" />
              </div>
            </div>
            <div className="pokeball-bottom" />
          </div>
        </div>

        <div className="loading-text-container">
          <h3 className="loading-title">
            {message}
            <span className="loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </h3>
          <p className="loading-submessage">{subMessage}</p>
        </div>

        <div className="loading-progress-bar">
          <div className="loading-progress-indeterminate" />
        </div>
      </div>
    </div>
  );
}
