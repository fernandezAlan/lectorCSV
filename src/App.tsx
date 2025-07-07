import React, { useState,useEffect} from 'react';
import Papa from 'papaparse';
import Dashboard from './components/Dashboard';
import type { DataMap } from './types';
type CsvFile = {
  name: string;
  data: string[][];
};

function App() {
  const [csvFiles, setCsvFiles] = useState<CsvFile[]>([]);
  const [data,setData] = useState<DataMap | null>(null)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newCsvFiles: CsvFile[] = [];

    Array.from(files).forEach(file => {
      Papa.parse(file, {
        complete: (result: { data: string[][]; }) => {
          const parsed = result.data as string[][];
          newCsvFiles.push({
            name: file.name,
            data: parsed,
          });

          // Esperar a que todos se procesen
          if (newCsvFiles.length === files.length) {
            setCsvFiles(prev => [...prev, ...newCsvFiles]);
          }
        },
        error: (error: any) => {
          console.error(`Error parsing ${file.name}:`, error);
        }
      });
    });
  };
  useEffect(()=>{
    console.log("data:",{data})
  },[data])
  useEffect(()=>{
    console.log("csvFiles",csvFiles)
    const data:DataMap = {}
    if(csvFiles.length){
      csvFiles.map((e)=>{
        e.data.forEach((r,index)=>{
          if(index!==0 && r[r.length-1]!==''){
          const date = r[0].split(' ')[0]
          const hour = r[0].split(' ')[1].split('.')[0]
                const total = {
                  Detectados:r[1],
                  Inspeccionados:r[2],
                  Aceptados:r[3],
                  ['Con falla']:r[4],
                  ['Descartados%']: r[5],
                 // ['Tiempo referencia']:'0',
                 // ['Tiempo productivo']:'0',
                 // ['Tiempo prod. porcentual']:'0'
                }
                const parcial = {
                  Detectados:r[6],
                  Inspeccionados:r[7],
                  Aceptados:r[8],
                  ['Con falla']:r[9],
                  ['Descartados%']: r[10],
                 // ['Tiempo referencia']:'0',
                 // ['Tiempo productivo']:'0',
                 // ['Tiempo prod. porcentual']:'0'
                }
                const alldata = {total,parcial}
                if(!data[date]){
                  data[date] = {};
                }
                data[date][hour] = alldata
          }
        })
      })
      setData(data)
    }
  },[csvFiles])
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center', width:'100vw'}}>
      <h1 >📊 CSV Viewer</h1>

      <div>
        <input
          type="file"
          accept=".csv"
          multiple
          onChange={handleFileUpload}
          className="border border-gray-300 rounded p-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded file:cursor-pointer"
        />
      </div>
      {data!== null && <Dashboard data={data}/>}
      {/*
      {csvFiles.map((file, index) => (
        <div key={index} className="mb-10 bg-white shadow rounded p-4 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">{file.name}</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <tbody>
              {file.data.map((row, rowIndex) => (
                <tr key={rowIndex} className="odd:bg-gray-100">
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-300 px-2 py-1 text-sm"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      */}
    </div>
  );
}

export default App;
