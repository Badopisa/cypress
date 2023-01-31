// // Load dependencies
// import aws from 'aws-sdk';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
//
// // Set S3 endpoint to DigitalOcean Spaces
// const spacesEndpoint = new aws.Endpoint('https://nyc3.digitaloceanspaces.com');
// const s3 = new aws.S3({
//     endpoint: spacesEndpoint
// });
//
// // const s3Client = new AWS.S3({
// //     endpoint: process.env.D_SPACES_URL || '',
// //     // region: 'fra1',
// //     credentials: {
// //         accessKeyId: process.env.D_SPACES_ID || '',
// //         secretAccessKey: process.env.D_SPACES_SECRET || ''
// //     }
// // });
//
// export const config = {
//     api: {
//         bodyParser: false
//     }
// };
//
// // Change bucket property to your Space name
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'sonalysis_upload',
//         acl: 'public-read',
//         key: function (req: any, file: any, cb: any) {
//             console.log('the file', file);
//             cb(null, file.originalname);
//         }
//     })
// }).array('upload', 1);

export default async function handler(req: any, res: any) {
    console.log(req, res);
    // upload(req, res, function (error: any) {
    //     if (error) {
    //         console.log('upload handler', error);
    //         return res.status(404).send('No file uploaded');
    //     }
    //     console.log('File uploaded successfully.');
    //     res.status(200).send('File uploaded');
    // });
}
