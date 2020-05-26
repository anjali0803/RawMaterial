
export default function mapping () {
  const countCard = [
    {
      label: 'Up To Date',
      value: 0
    },
    {
      label: 'This Month',
      value: 0
    },
    {
      label: 'This Quarter',
      value: 0
    },
    {
      label: 'This Year',
      value: 0
    },
    {
      label: moment().add(-1, 'years').format('YYYY'),
      value: 0
    },
    {
      label: moment().add(-2, 'years').format('YYYY'),
      value: 0
    }
  ]

  return { countCard }
}
