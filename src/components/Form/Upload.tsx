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
