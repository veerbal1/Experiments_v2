import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQueries,
  useQuery,
  useQueryClient,
} from 'react-query';
import './App.css';

const client = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

function App() {
  const [metrics, setMetrics] = useState({
    impressions: 0,
    clicks: 0,
    loading: false,
  });

  return (
    <QueryClientProvider client={client}>
      <h1>App</h1>
      <Placements setMetrics={setMetrics} />
      <Metrics
        impressions={metrics.impressions}
        clicks={metrics.clicks}
        loading={metrics.loading}
      />
      <ResetButton setMetrics={setMetrics} />
    </QueryClientProvider>
  );
}

const ResetButton = ({ setMetrics }) => {
  const queryClient = useQueryClient();
  const reset = () => {
    setMetrics({ impressions: 0, clicks: 0 });
    queryClient.invalidateQueries('placements');
  };
  return <button onClick={reset}>Reset</button>;
};

const Metrics = ({ impressions, clicks, loading }) => {
  return (
    <>
      <h1>Impressions: {impressions}</h1>;
      <h1>
        Clicks: {clicks}. {loading && 'Loading...'}
      </h1>
      ;
    </>
  );
};

const usePlacements = ({ setMetrics }) => {
  const rest = useQuery(
    'placements',
    () =>
      fetch('http://localhost:3001/placement-info').then((res) => res.json()),
    {
      // select: (data) => {
      //   if (data.status === 'success' && data.payload.data !== null) {
      //     return data.payload.data;
      //   } else {
      //     return [];
      //   }
      // },
      onSuccess: (data) => {
        if (data.status === 'success' && data.payload.data !== null) {
          data.payload.data.forEach((placement, index) => {
            setMetrics((prev) => ({
              ...prev,
              loading: true,
            }));
            fetch(`http://localhost:3001/metrics`)
              .then((response) => response.json())
              .then((metrics) => {
                if (metrics.status === 'success') {
                  if (metrics.payload.data !== null) {
                    setMetrics((prev) => ({
                      ...prev,
                      impressions:
                        prev.impressions +
                        metrics.payload.data.impressions_total,
                      clicks: prev.clicks + metrics.payload.data.clicks_total,
                    }));
                    if (index === data.payload.data.length - 1) {
                      setMetrics((prev) => ({
                        ...prev,
                        loading: false,
                      }));
                    }
                    console.log(metrics.payload.data);
                  }
                }
              });
          });
          return data.payload.data;
        } else {
          return [];
        }
      },
    }
  );
  return { data: rest.data === 'undefined' ? [] : rest.data, ...rest };
};

const Placements = ({ setMetrics }) => {
  usePlacements({ setMetrics });
  return <h1>Placements</h1>;
};

export default App;
