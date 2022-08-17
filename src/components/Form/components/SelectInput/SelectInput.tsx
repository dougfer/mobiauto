import React from 'react'
import { FormControl, styled, Select, InputLabel, Box, SelectChangeEvent, MenuItem } from '@mui/material'
import { Options } from 'src/types'

type SelectInputProps = {
  label: string
  value: string
  handleChange: (event: SelectChangeEvent) => void
  options?: Options[]
  disabled?: boolean
}

export const SelectInput: React.FC<SelectInputProps> = (props) => {

  const { label, handleChange, value, options, disabled } = props

  const InputContent = styled(Box)({
    marginBottom: 20,
    width: '100%',
    '& .MuiFilledInput-root': {
      backgroundColor: 'transparent',
      border: '1px solid black',
      borderRadius: '5px'
    }
  })

  return (
    <FormControl variant='filled' fullWidth>
      <InputContent>
        <InputLabel id={label}>
          {label}
        </InputLabel>
        <Select
          disabled={disabled}
          disableUnderline
          sx={{ width: '100%' }}
          labelId={label}
          onChange={handleChange}
          value={value}
        >
          {options && options.map((option) => <MenuItem value={option.code} key={option.code}>{option.label}</MenuItem>)}
        </Select>
      </InputContent>
    </FormControl>
  )
}
