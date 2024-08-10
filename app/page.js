'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'




export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  
  return (
  <Box>
     <Typography variant = "h1"> Inventory Managment</Typography>   
     {
      inventory.forEach((item)=>{
        console.log(item)
        return(<>
        {item.name}
        {item.count}
        </>)
      })
     }
  </Box>
  )
  
}

const updateInventory = async () => {
  const snapshot = query (collection(firestore, 'inventory'))
  const docs = await getDocs(snapshot)
  const inventoryList = []
  docs.forEach((doc)=>{
    inventoryList.push({
      name: doc.id,
      ...doc.data(),
  })
  })
  setInventory(inventoryList);
}

useEffect (() => {
  updateInventory()
}, [])
