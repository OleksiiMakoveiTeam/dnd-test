const formatValue = (value: string | string[] | number | boolean) => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.map(_ => _)?.join(' ') : '-'
  }
  if (typeof value === 'string') {
    return value.length > 0 ? value : '-'
  }

  if (typeof value === 'number') {
    return value || '-'
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  return '-'
}
export default formatValue
