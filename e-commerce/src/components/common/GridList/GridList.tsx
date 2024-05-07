type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => React.ReactNode;
};

const GridList = <T extends { id?: number }>({
  records,
  renderItem,
}: GridListProps<T>) => {
  const renderList =
    records.length > 0
      ? records.map((record) => <div key={record.id}>{renderItem(record)}</div>)
      : "there are no records";
  return <div className="flex flex-row flex-wrap">{renderList}</div>;
};

export default GridList;
