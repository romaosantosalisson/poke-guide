import "./error.css";

interface ErrorStateProps {
  title?: string;
  message?: string;
  details?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Erro ao buscar Pokémon's!",
  message = "Não foi possível carregar a lista de Pokémon da Pokédex. Verifique sua conexão com a internet.",
  details,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="error-container">
      <div className="error-card">
        {/* Ícone estilizado de erro Pokémon */}
        <div className="error-icon-wrapper">
          <div className="error-icon-glow" />
          <div className="error-pokeball-icon">
            <svg
              className="error-svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        </div>

        {/* Informações do Erro */}
        <div className="error-info">
          <h3 className="error-title">{title}</h3>
          <p className="error-message">{message}</p>

          {/* Detalhes do erro (se fornecido) */}
          {details && (
            <div className="error-details-box">
              <span className="error-details-label">Detalhes técnicos:</span>
              <code className="error-details-text">{details}</code>
            </div>
          )}
        </div>

        {/* Ações de Recuperação */}
        <div className="error-actions">
          {onRetry && (
            <button type="button" className="error-retry-button" onClick={onRetry}>
              <svg
                className="retry-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>Tentar novamente</span>
            </button>
          )}

          <button
            type="button"
            className="error-secondary-button"
            onClick={() => window.location.reload()}
          >
            Recarregar Página
          </button>
        </div>
      </div>
    </div>
  );
}
