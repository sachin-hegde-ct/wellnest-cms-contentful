type Row = {
  label: string;
  value: string;
};

export function printInfoCard(title: string, rows: Row[]) {
  const labelWidth = Math.max(...rows.map((r) => r.label.length));
  const valueWidth = Math.max(...rows.map((r) => r.value.length));

  const contentWidth = labelWidth + valueWidth + 5;
  const line = "─".repeat(contentWidth);

  console.log(`\n┌${line}┐`);
  console.log(`│ ${title.padEnd(contentWidth - 1)}│`);
  console.log(`├${line}┤`);

  for (const { label, value } of rows) {
    console.log(
      `│ ${label.padEnd(labelWidth)} : ${value.padEnd(valueWidth)} │`
    );
  }

  console.log(`└${line}┘\n`);
}
