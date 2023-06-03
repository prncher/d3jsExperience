import React from 'react';
import './App.css';
import { GenreData } from './dataTypes';
import { GenreDataEditor } from './GenreDataEditor';
import { DataVisualizer } from './DataVisualizer';

function App() {
  const [data, setData] = React.useState<GenreData[]>([])
  const total = React.useMemo(() => {
    return data.reduce((acc, cur) => acc + cur.studentCount, 0)
  }, [data])
  React.useEffect(() => {
    (async () => {
      const r = await fetch('./genre.json')
      setData(await r.json())
    })()
  }, [])
  return (
    <div className="App">
      <GenreDataEditor data={data} total={total} onChange={setData} />
      {Number.isNaN(total) ?
        'Some of the data can not be used for visualization' :
        <DataVisualizer data={data} total={total} />}
    </div>
  );
}

export default App;
