import fs from 'fs';
import AWS from 'aws-sdk';
import formidable from 'formidable-serverless';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
// import formidable from 'formidable';

// const s3 = new AWS.S3({
//     endpoint: process.env.D_SPACES_URL || '',
//     // region: 'fra1',
//     accessKeyId: process.env.D_SPACES_ID || '',
//     secretAccessKey: process.env.D_SPACES_SECRET || ''
// });
const s3 = new S3Client({
    endpoint: process.env.D_SPACES_URL || '',
    region: 'nyc3',
    credentials: {
        accessKeyId: process.env.D_SPACES_ID || '',
        secretAccessKey: process.env.D_SPACES_SECRET || ''
    }
});

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req: any, res: any) {
    const form = new formidable.IncomingForm();
    // const form = formidable();
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
            try {
                const data = await s3.send(new PutObjectCommand(params));
                console.log('Successfully uploaded object: ' + params.Bucket + '/' + params.Key);
                return data;
            } catch (err) {
                console.log('Error', err);
            }
        };
        const sende = await uploadObject();
        console.log('sende', sende);
        res.send(sende);

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
