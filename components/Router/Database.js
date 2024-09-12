import express from 'express'
import {urlshortner, urlconnect,getclick} from '../../components/Controller/Urlshort.js'

const router=express.Router()

router.post('/', urlshortner)
router.get('/url/:smallurl', urlconnect )
router.get('/urlclick/:smallurl', getclick )



export default router