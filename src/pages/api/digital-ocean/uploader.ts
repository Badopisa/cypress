import fs from 'fs';
import formidable from 'formidable-serverless';
import { Upload } from '@aws-sdk/lib-storage';
import { S3Client } from '@aws-sdk/client-s3';

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req: any, res: any) {
    // Allow only POST method
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = './';
    form.keepExtensions = true;
    form.parse(req, async (err: any, fields: any, files: any) => {
        if (err || !fields.id) return res.status(500);
        // Read file
        const file = fs.readFileSync(files.file.path);
        console.log('read file', file);

        const params = {
            Bucket: 'sonalysis-media-space', // The path to the directory you want to upload the object to, starting with your Space name.
            // Key: 'hello-world.txt', // Object key, referenced whenever you want to access this file later.
            Key: `${fields.id}/${files.file.name}`, // Specify folder and file name
            Body: file, // The object's contents. This variable is an object, not a string.
            // ACL: 'private', // Defines ACL permissions, such as private or public.
            ACL: 'public-read' // Specify whether anyone with link can access the file
            // Metadata: {
            //     // Defines metadata tags.
            //     'x-amz-meta-my-key': 'your-value'
            // }
        };

        const uploadObject = async () => {
            console.log('calling upload object with', params);
            // try {
            //     const data = await s3.send(new PutObjectCommand(params));
            //     console.log('Successfully uploaded object: ' + params.Bucket + '/' + params.Key);
            //     return data;
            // } catch (err) {
            //     console.log('Error', err);
            // }
            try {
                const parallelUploads3 = new Upload({
                    client:
                        // new S3({}) ||
                        new S3Client({
                            endpoint: process.env.D_SPACES_URL || '',
                            region: 'nyc3',
                            credentials: {
                                accessKeyId: process.env.D_SPACES_ID || '',
                                secretAccessKey: process.env.D_SPACES_SECRET || ''
                            }
                        }),
                    params: { Bucket: params.Bucket, Key: params.Key, Body: params.Body },

                    tags: [
                        /*...*/
                    ], // optional tags
                    queueSize: 4, // optional concurrency configuration
                    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
                    leavePartsOnError: false // optional manually handle dropped parts
                });

                parallelUploads3.on('httpUploadProgress', (progress) => {
                    console.log('progress =>', progress);
                    res?.socket?.server?.io?.emit('uploadProgress', progress);
                });

                await parallelUploads3.done();

                console.log('Successfully uploaded object: ' + params.Bucket + '/' + params.Key);
                const url = `${params.Bucket}/${params.Key}`;
                res.status(200).json({ url });
            } catch (error: any) {
                console.log('parallel upload Error', error);
                res.status(400).json({ message: error.message });
            }
        };
        await uploadObject();

        // s3.upload(
        //     {
        //         Bucket: process.env.D_SPACES_BUCKET || '',
        //         ACL: 'public-read', // Specify whether anyone with link can access the file
        //         Key: `${fields.id}/${files.file.name}`, // Specify folder and file name
        //         Body: file
        //     },
        //     {
        //         partSize: 10 * 1024 * 1024,
        //         queueSize: 10
        //     }
        // ).send((err, data) => {
        //     if (err) return res.status(500);
        //     console.log('aws err', err);
        //     // Unlink file
        //     fs.unlinkSync(files.file.path);
        //     // Return file url or other necessary details
        //     console.log('send data', data);
        //     return res.send({
        //         url: data.Location
        //     });
        // });
    });
}
