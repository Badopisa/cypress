// import React, {useRef} from 'react';
// import S3 from "react-aws-s3-typescript";
//
// function Upload(props: any) {
//     const fileInput = useRef();
//     const handleClick = (event: any) => {
//         event.preventDefault();
//         let file = fileInput.current.files[0];
//         let newFileName = fileInput.current.files[0].name;
//         const config = {
//             bucketName: 'yourbuccket',
//             dirName: "yourdirectory",
//             region: 'eu-west-1',
//             accessKeyId: 'key',
//             secretAccessKey: 'secret',
//         }
//         const ReactS3Client = new S3(config);
//         ReactS3Client.uploadFile(file, newFileName).then((data: any) => {
//             console.log('upload data', data);
//             if (data.status === 204) {
//                 console.log('upload success');
//             } else {
//                 console.log('upload failed');
//             }
//         }).catch((err: any) => {
//             console.log('upload error', err);
//         });
//     };
//     return (
//         <div></div>
//     );
// }
//
// export default Upload;
// const uploadImage = () => {
//     console.log('file', file);
//     console.log('file name', fileName);
//     const config: any = {
//         bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
//         dirName: `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_LOCATION}.amazonaws.com/`,
//         region: process.env.NEXT_PUBLIC_AWS_REGION,
//         accessKeyId: process.env.NEXT_PUBLIC_WS_AWS_ACCESS_ID,
//         secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//         poolID: `${process.env.NEXT_PUBLIC_AWS_LOCATION}:eefe909d-3fdf-43ab-b100-5f304bbf6837`,
//         s3Url: "https://sonalysis-asset.s3.amazonaws.com/"
//     }
//     console.log('config', config);
//     const ReactS3Client = new S3(config);
//
//     console.log('started')
//     ReactS3Client.uploadFile(file, fileName).then((data: any) => {
//         console.log('upload data', data);
//         if (data.status === 204) {
//             console.log('upload success');
//         } else {
//             console.log('upload failed');
//         }
//     }).catch((err: any) => {
//         console.log('upload error', err);
//         console.log('upload error message', err.message);
//     });
// };
// const uploadImage = async () => {
//     let {url} = await uploadToS3(file);
//     console.log('image url', url);
// };
// const config = {
//     bucketName: 'sonalysis-asset',
//     region: 'us-east-1',
//     accessKeyId: 'AKIAUATJLZ6TPTG35KFW',
//     secretAccessKey: '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',
// }
//
// const uploadImage = async () => {
//     uploadFile(file, config)
//         .then((data: any) => console.log(data))
//         .catch((err: any) => console.error(err))
// }
