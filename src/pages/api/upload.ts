import fs from 'fs';
import AWS from 'aws-sdk';
import formidable from 'formidable';

const s3Client = new AWS.S3({
    endpoint: process.env.D_SPACES_URL || '',
    region: 'fral',
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

export async function handler(req: any, res: any) {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
        if (!files.demo) {
            res.status(404).send('No file uploaded');
            return;
        }
        try {
            return s3Client.putObject(
                {
                    Bucket: process.env.D_SPACES_BUCKET || '',
                    Key: files.demo.originalFilename,
                    Body: fs.createReadStream(files.demo.filepath),
                    ACL: 'public-read'
                },
                async () => res.status(201).send('File uploaded')
            );
        } catch (error) {
            console.log(e);
            res.status(500).send('Error uploading file');
        }
    });
}
