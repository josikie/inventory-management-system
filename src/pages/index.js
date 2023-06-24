// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import TableBasic from 'src/views/tables/TableBasic'
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import TableInventory from 'src/views/tables/TableInventory'

import { purple } from '@mui/material/colors'

import React from 'react'
import { useAuthContext } from 'src/context/authContext'
import { useRouter } from 'next/router'
import { Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import { Box } from 'mdi-material-ui'
import { LoadingButton } from '@mui/lab'
import { addDoc, collection, getFirestore, updateDoc } from 'firebase/firestore'
import firebase_app from 'src/configs/firebase.config'

const Dashboard = () => {
  const { user } = useAuthContext()
  const router = useRouter()
  const db = getFirestore(firebase_app)

  const [open, setOpen] = React.useState(false)
  const [loadingSubmit, setLoadingSubmit] = React.useState(false)
  const [refresh, setRefresh] = React.useState(false)
  const [name, setName] = React.useState('')
  const [qty, setQty] = React.useState(0)
  const [unit, setUnit] = React.useState('')

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  const handleChangeName = event => {
    setName(event.target.value)
  }

  const handleChangeQty = event => {
    setQty(parseInt(event.target.value))
  }

  const handleChangeUnit = event => {
    setUnit(event.target.value)
  }

  const onSubmit = async () => {
    setLoadingSubmit(true)
    try {
      const docRef = await addDoc(collection(db, 'inventory'), {
        name: name,
        qty: qty,
        unit: unit,
        added_on: new Date().getTime(),
        is_enable: true
      })
      // const updateRef = doc(db, "cities", "DC");
      await updateDoc(docRef, {
        id: docRef.id
      })
      setLoadingSubmit(false)
      setOpen(false)
      setRefresh(!refresh)
    } catch (e) {
      console.log(e)
      setLoadingSubmit(false)
    }
  }

  React.useEffect(() => {
    if (user == null) router.push('/pages/register')
  }, [user])

  return (
    <div>
      <Typography variant='h4' sx={{ color: purple[600] }}>
        Halo, Dunia!
      </Typography>
      <Grid container justifyContent='flex-end' mt={5}>
        <Button variant='contained' onClick={handleOpen}>
          Add Inventory
        </Button>
      </Grid>
      <Grid item xs={12} mt={3}>
        <Card>
          <CardHeader title='Inventory' titleTypographyProps={{ variant: 'h6' }} />
          <TableInventory refresh={refresh} />
        </Card>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='modalWrapper'
      >
        <div className='modalContainer'>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Inventory
          </Typography>
          <Grid mt={10} mb={3}>
            <TextField onChange={handleChangeName} fullWidth label='Name' />
          </Grid>
          <Grid mt={3} mb={3}>
            <TextField onChange={handleChangeQty} fullWidth label='Qty' />
          </Grid>
          <Grid mt={3} mb={3}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={unit}
                label='Unit'
                onChange={handleChangeUnit}
              >
                <MenuItem value='Pcs'>Pcs</MenuItem>
                <MenuItem value='Kg'>Kg</MenuItem>
                <MenuItem value='Ton'>Ton</MenuItem>
                <MenuItem value='Lt'>Lt</MenuItem>
                <MenuItem value='Cm'>Cm</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container justifyContent='flex-end'>
            <LoadingButton onClick={onSubmit} loading={loadingSubmit} variant='contained'>
              Submit
            </LoadingButton>
          </Grid>
        </div>
      </Modal>
    </div>
  )
}

export default Dashboard
