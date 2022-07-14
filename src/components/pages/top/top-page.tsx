import React, { useState, useCallback, useEffect } from "react"

export const TopPage = () => {
  const [text , setText] = useState("");
  const handleInputChange = useCallback(
    (e: any) => {
      setText(e.target.value);
    },
    [text]
  );

  useEffect(() => {
    console.log("text");
  }, [text]);


  return (
    <>
      <input type="text" value={text} onChange={handleInputChange} />
      <h1>入力表示：{text}</h1>
    </>
  )
}