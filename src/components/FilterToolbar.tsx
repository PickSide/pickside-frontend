import React, { FC, ChangeEvent, Dispatch, useState, useMemo, SetStateAction, ReactNode } from 'react'
import { styled } from '@mui/system'
import { SvgIconComponent, SportsSoccer, Height, LocationOn, Search } from '@mui/icons-material'
import { Box, Container, Grid, IconButton, InputBase, makeStyles, AppBar } from '@mui/material'
import { Select } from 'components'

interface FilterToolbarProps { }


const FilterToolbar: FC<FilterToolbarProps> = ({ ...props }) => {

    return (
        <AppBar position='relative' color="default">
            <Grid container justifyContent="center" columnSpacing={2} margin={2}>
                <Grid item>
                    <Select size='small'></Select>
                </Grid>
                <Grid item>
                    <Select size='small'></Select>
                </Grid>
                <Grid item>
                    <Select size='small'></Select>
                </Grid >
            </Grid >
        </AppBar >
    )
}

export default FilterToolbar
