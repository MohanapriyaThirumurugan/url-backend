import express from 'express'
import {urlshortner,urlconntect,getclick} from '../../components/Controller/Urlshort.js'

const router=express.Router()

router.post('/', urlshortner)
router.get('/url/:smallurl',urlconntect )
router.get('/urlclick/:smallurl', getclick )



export default router