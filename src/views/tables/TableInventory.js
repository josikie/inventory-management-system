// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  Typography,
  Select
} from '@mui/material'
import Grid from '@mui/material/Grid'

import { collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore'
import firebase_app from 'src/configs/firebase.config'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { LoadingButton } from '@mui/lab'

const createData = (id, name, qty, unit, date) => {
  return { id, name, qty, unit, date }
}

const TableInventory = ({ refresh }) => {
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])
  const [name, setName] = useState('')
  const [qty, setQty] = useState(0)
  const [unit, setUnit] = useState('')
  const [id, setId] = useState('')
  const [open, setOpen] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  const db = getFirestore(firebase_app)

  const handleOpenEdit = val => {
    setId(val.id)
    setName(val.name)
    setQty(val.qty)
    setUnit(val.unit)
    setOpen(true)
  }

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

  const onEdit = async () => {
    setLoadingSubmit(true)
    try {
      const docRef = doc(db, 'inventory', id)
      await updateDoc(docRef, {
        name: name,
        qty: qty,
        unit: unit
      })
      setLoadingSubmit(false)
      setOpen(false)
      fetchInventory()
    } catch (e) {
      console.log(e)
      setLoadingSubmit(false)
    }
  }

  const onDelete = async () => {
    try {
      const docRef = doc(db, 'inventory', id)
      await updateDoc(docRef, {
        is_enable: false
      })
      fetchInventory()
    } catch (e) {
      console.log(e)
    }
  }

  const fetchInventory = async () => {
    try {
      setLoading(true)
      let row = []
      const querySnapshot = await getDocs(collection(db, 'inventory'))
      querySnapshot.forEach(doc => {
        const data = doc.data()
        if (data.is_enable) {
          const res = createData(data.id, data.name, data.qty, data.unit, data.added_on)
          row.push(res)
        }
      })
      row.sort((a, b) => b.added_on - a.added_on)
      setRows(row)
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const handleDelete = val => {
    setId(val.id)
    if (window.confirm('Are you sure to delete this data?')) {
      onDelete()
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [refresh])

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Qty</TableCell>
              <TableCell align='right'>Unit</TableCell>
              <TableCell align='right'>Date</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <CircularProgress size={15} />
          ) : (
            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0
                    }
                  }}
                >
                  <TableCell component='th' scope='row'>
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='right'>{row.qty}</TableCell>
                  <TableCell align='right'>{row.unit}</TableCell>
                  <TableCell align='right'>{moment(row.date).format()}</TableCell>
                  <TableCell align='right'>
                    <Button onClick={() => handleOpenEdit(row)} size='small' variant='outlined' color='warning'>
                      Edit
                    </Button>
                    &nbsp;
                    <Button onClick={() => handleDelete(row)} size='small' variant='outlined' color='error'>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className='modalWrapper'
      >
        <div className='modalContainer'>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Edit Inventory
          </Typography>
          <Grid mt={10} mb={3}>
            <TextField value={name} onChange={handleChangeName} fullWidth label='Name' />
          </Grid>
          <Grid mt={3} mb={3}>
            <TextField value={qty} onChange={handleChangeQty} fullWidth label='Qty' />
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
            <LoadingButton onClick={onEdit} loading={loadingSubmit} variant='contained'>
              Submit
            </LoadingButton>
          </Grid>
        </div>
      </Modal>
    </div>
  )
}

export default TableInventory
