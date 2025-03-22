import { randomUUID } from 'node:crypto'
import { basename, extname } from 'node:path'
import { Readable } from 'node:stream'
import { env } from '@/env'
import { Upload } from '@aws-sdk/lib-storage'
import { z } from 'zod'
import { r2 } from './client'

const uploadFileToStorageInput = z.object({
  folder: z.enum(['images', 'downloads']),
  filename: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageInput>

export async function uploadFileToStorage(input: UploadFileToStorageInput) {
  const { folder, filename, contentType, contentStream } =
    uploadFileToStorageInput.parse(input)

  const fileExtension = extname(filename)
  const fileNameWithoutExtension = basename(filename)
  const sanitizedFileName = fileNameWithoutExtension.replace(/[^a-z0-9]/g, '')
  const sanitizedFilenameWithExtension = `${sanitizedFileName}${fileExtension}`

  const uniqueFilename = `${folder}/${randomUUID()}-${sanitizedFilenameWithExtension}`

  const upload = new Upload({
    client: r2,
    params: {
      Key: uniqueFilename,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  })

  await upload.done()

  return {
    key: uniqueFilename,
    url: new URL(uniqueFilename, env.CLOUDFLARE_PUBLIC_URL).toString(),
  }
}
