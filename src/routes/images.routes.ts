import * as express from 'express'
import * as multer from 'multer'
import { removeFromCloudinary, uploadToCloudinary } from '../clients/cloudinary.client'
import { safeRoute } from '../utils/routes.util'

const upload = multer({ storage: multer.memoryStorage() }).single('file')

export const createImagesRoutes = () => {
  const routes = express.Router()

  routes.post(
    '/',
    upload,
    safeRoute(async (req, res) => {
      const { file }: { file: Express.Multer.File } = req
      try {
        const result = await uploadToCloudinary(file.buffer)
        res.json({ id: result.public_id, url: result.secure_url })
      } catch (err) {
        throw { status: err.http_code, message: err.message }
      }
    })
  )

  routes.delete(
    '/:id',
    safeRoute(async (req, res) => {
      const { params } = req
      try {
        await removeFromCloudinary(params.id)
        res.status(200).send()
      } catch (err) {
        throw { status: err.http_code, message: err.message }
      }
    })
  )

  return routes
}
