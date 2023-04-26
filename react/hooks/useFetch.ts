import { useCallback, useState } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseFetchArgs {
  endpoint: string;
  method?: HttpMethod;
  initLoading?: boolean;
}

const useFetch = ({ endpoint, method = "GET", initLoading = false }: UseFetchArgs) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(initLoading);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error>();

  const fetchFunction = useCallback(
    async (queryOrBody?: any, body?: any) => {
      setLoading?.(true);

      const stringifiedBody =
        typeof body === "object"
          ? JSON.stringify(body)
          : body
          ? body.toString
          : typeof queryOrBody === "object"
          ? JSON.stringify(queryOrBody)
          : undefined;

      const handledEndpoint = typeof queryOrBody === "number" || typeof queryOrBody === "string" ? `${endpoint}/${queryOrBody}` : endpoint;

      try {
        const response = await fetch(`${handledEndpoint}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: stringifiedBody,
        });

        if (!response.ok) {
          switch (response.status) {
            case 400:
            case 404:
            case 405:
              setError?.(new Error("Dados não encontrados ou solicitação feita de maneira incorreta."));
              break;
            case 401:
              setError?.(new Error("Acesso não autorizado."));
              break;
            case 403:
              setError?.(new Error("Acesso negado."));
              break;
            case 429:
              setError?.(new Error("Limite de solicitações excedido."));
              break;
            case 500:
              setError?.(new Error("Erro interno do servidor."));
              break;
            case 503:
              setError?.(new Error("Serviço indisponível."));
              break;
            case 504:
              setError?.(new Error("Limite de tempo de resposta excedido."));
              break;
            default:
              setError?.(new Error("Erro desconhecido."));
          }
          return;
        }

        setData?.(await response.json());
        setSuccess?.(true);
        setError(undefined);
      } catch {
        setError?.(new Error("Falha na comunicação com a API"));
      } finally {
        setLoading?.(false);
      }
    },
    [endpoint, method]
  );

  return {
    data,
    setData,
    loading,
    setLoading,
    success,
    setSuccess,
    error,
    setError,
    fetchFunction,
  };
};

export default useFetch;
