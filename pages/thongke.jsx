import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "@handsontable/pikaday/css/pikaday.css";
import { HotTable, HotColumn } from "@handsontable/react";
import { data } from "../utils/constants.ts";

import { addClassesToRows, alignHeaders } from "../utils/hooksCallbacks";

import "handsontable/dist/handsontable.min.css";

const App1 = () => {
  console.log(data);
  return (
    <HotTable
      data={data}
      height={450}
      colWidths={[170, 222, 130, 120, 120, 130, 156, 156, 156, 156, 156]}
      colHeaders={[
        "Name",
        "giải",
        "ngày ",
        "Có tham gia không",
        "Lệ phí",
        "tham gia x",
        "vị trí",
        "bounty",
        "jackpot",
        "trích quỹ",
        "giải thưởng",
      ]}
      dropdownMenu={true}
      hiddenColumns={{
        indicators: true,
      }}
      contextMenu={true}
      multiColumnSorting={true}
      filters={true}
      rowHeaders={true}
      afterGetColHeader={alignHeaders}
      beforeRenderer={addClassesToRows}
      manualRowMove={true}
      autoWrapRow={true}
      navigableHeaders={true}
      licenseKey="non-commercial-and-evaluation"
    >
      <HotColumn data={0} />
      <HotColumn data={1} />
      <HotColumn data={2} type="date" allowInvalid={false} />

      <HotColumn data={3} />
      <HotColumn data={4} />
      <HotColumn data={5} />
      <HotColumn data={6} type="checkbox" className="htCenter" />
      <HotColumn data={7} type="numeric" />
      <HotColumn data={8} />
      <HotColumn data={9} />
      <HotColumn data={10} />
    </HotTable>
  );
};

export default App1;
