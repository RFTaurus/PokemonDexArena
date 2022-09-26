export function sortArr(arr) {
  return arr.sort(
    (firstItems, nextItem) =>
      Number(firstItems.number) - Number(nextItem.number)
  );
}
