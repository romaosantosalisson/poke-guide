import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "../components/card";
import { ErrorState } from "../components/error";
import { Loading } from "../components/loading";
import { Pagination } from "../components/pagination";
import type { PokemonType } from "../types";
import { getPokemons } from "../utils/pokeApi";

const ITEMS_PER_PAGE = 8;

export function Home() {
  const { t } = useTranslation();
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    async function loadPokemons() {
      try {
        const data = await getPokemons(currentPage, ITEMS_PER_PAGE);
        if (isMounted) {
          setPokemons(data.pokemons);
          setTotalPages(data.totalPages);
          setTotalCount(data.totalCount);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Erro ao buscar Pokémon:", err);
          setError(err instanceof Error ? err.message : "Erro desconhecido ao carregar os dados");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPokemons();

    return () => {
      isMounted = false;
    };
  }, [currentPage, retryCount]);

  const handlePageChange = (page: number) => {
    setLoading(true);
    setError(null);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRetryCount((prev) => prev + 1);
  };

  if (error) {
    return (
      <div style={{ width: "100%" }}>
        <ErrorState title="Erro ao buscar Pokémon's!" details={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ width: "100%" }}>
        <Loading
          message="Carregando Pokémon's..."
          subMessage={`Buscando página ${currentPage}... Capturando dados da Pokédex.`}
        />
      </div>
    );
  }

  return (
    <>
      <h2>
        {t("pokemonList")}{" "}
        {totalCount > 0 && (
          <span
            style={{
              fontSize: "1.8rem",
              color: "var(--text-secondary)",
              fontWeight: 400,
            }}
          >
            ({t("pageInfo", { currentPage, totalPages, totalCount })})
          </span>
        )}
      </h2>

      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalCount}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </>
  );
}
