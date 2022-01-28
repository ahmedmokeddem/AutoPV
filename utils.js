const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv').config();
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    process.env.GOOGLE_DRIVE_REDIRECT_URI
);
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN
});
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});
async function uploadFile(pv_name) {
    const filePath = path.join("./", `${pv_name}.docx`);
    try {
        const response = await drive.files.create({
            requestBody: {
                name: `${pv_name}.docx`,
                parents: [process.env.FOLDER_ID],
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            },
            media: {
                mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                body: fs.createReadStream(filePath),
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
async function generateUrl(fileId) {
    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'writer',
                type: 'anyone',
            },
        });

        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
        return result.data;
    } catch (error) {
        console.log(error.message);
    }
}
const read_files = () => {
    try {
        return JSON.parse(fs.readFileSync('./pv_files.json'));
    } catch (err) {
        console.log(err);
        return;
    }
};
const write_files = (data) => {
    try {
        fs.writeFileSync('./pv_files.json', JSON.stringify(data, null, 2));
    } catch (err) {
        console.log(err);
        return;
    }
};

module.exports = { uploadFile, read_files, write_files, generateUrl };