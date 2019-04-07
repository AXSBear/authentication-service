export function getNameFromClass<TEntity>(type: (new () => TEntity)): string {
  return type.name;
}
