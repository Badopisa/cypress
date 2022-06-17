import {NextApiRequest, NextApiResponse} from "next";
import S3 from "aws-sdk/clients/s3";

// Create S3 instance
const s3 = new S3({
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: "v4"
});

export default async (req: NextApiRequest, res: NextApiResponse) => {

    // Allow only POST method
    if (req.method !== "POST") {
        return res.status(405).json({message: "Method not allowed"});
    }

    // Get file from request
    try {
        // Retrieving name and type from the body of request
        let {name, type} = req.body;

        // Setting parameters - ACL will allow us to see a file
        const fileParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: name,
            Expires: 600,
            ContentType: type,
            ACL: "public-read",
        }

        // Generating signed URL which will allow us to upload file to S3
        const url = await s3.getSignedUrlPromise("putObject", fileParams);

        // Sending response with signed URL
        res.status(200).json({url});
    } catch (e: any) {
        console.log('server error', e);
        res.status(400).json({message: e.message});
    }
}

// Export config to set size limit of files
export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        }
    }
}
