import React, { FC, useEffect, useState } from 'react'
import { Select as MuiSelect, SelectProps as MuiSelectProps, MenuItem } from '@mui/material'

interface SelectProps extends MuiSelectProps {
    options?: any[]
}

const Select: FC<SelectProps> = ({ options, ...props }) => {
    return (
        <MuiSelect {...props}>
            {options?.map((option, idx) =>
                <MenuItem value={option.value}>{option.name}</MenuItem>
            )}
            {props.children}
        </MuiSelect>
    )
}

export default Select