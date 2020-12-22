import React from 'react';
import styles from './CacheSnapshot.module.css';

const CacheSnapshot = (props) => {

  const lines = [];

  for (let i = 0; i < props.totalLines; i++) {
    if (!props.lines.has(i)) {
      lines.push({ lineNumber: i, value: null })
    } else {
      lines.push({ lineNumber: i, value: props.lines.get(i) })
    }
  }

  return (
    <table className={"table"}>
      <thead>
        <tr>
          <th>Line #</th>
          <th>State</th>
        </tr>
      </thead>
      {lines.map(x => {

        let styling;

        if (x.value != null && x.value.isHit) {
          styling = x.value.isSuccess ? styles.successLine : styles.failureLine
        }

        return (<tr>
          <td className={styling}>{x.lineNumber}</td>
          <td className={styling}>{x.value == null ? "" : `${x.value.block}: ${x.value.label} (${x.value.addressRangeLow}:${x.value.addressRangeHigh})`}</td>
        </tr>);
      })}
    </table>);
};

export default CacheSnapshot;