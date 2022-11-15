import React from "react";
import CSVReader from "react-csv-reader";

const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.trim().split(" ").at(-1)?.substring(1, 4)
};

const Reader = (props: { data: any; setData: any; }) => {
    const {data, setData} = props;
    return (
        <CSVReader
            parserOptions={papaparseOptions}
            onFileLoaded={(data, fileInfo) => 
                setData({
                data: data,
                info: fileInfo
            })
        }
        /> 
    )
}

export default Reader;