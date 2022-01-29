const { google } = require("googleapis");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv").config();
const filesContent = require("./src/template/files_content.js");

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_CLIENT_SECRET,
    process.env.GOOGLE_DRIVE_REDIRECT_URI
);
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN,
});
const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});
async function uploadFile(pv_name) {
    const filePath = path.join("./", `${pv_name}.docx`);
    try {
        const response = await drive.files.create({
            requestBody: {
                name: `${pv_name}.docx`,
                parents: [process.env.FOLDER_ID],
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            },
            media: {
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                body: fs.createReadStream(filePath),
            },
        });
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
                role: "writer",
                type: "anyone",
            },
        });

        const result = await drive.files.get({
            fileId: fileId,
            fields: "webViewLink, webContentLink",
        });
        return result.data;
    } catch (error) {
        console.log(error.message);
    }
}
const read_files = () => {
    try {
        return JSON.parse(fs.readFileSync("./pv_files.json"));
    } catch (err) {
        console.log(err);
        return;
    }
};
const write_files = (data) => {
    try {
        fs.writeFileSync("./pv_files.json", JSON.stringify(data, null, 2));
    } catch (err) {
        console.log(err);
        return;
    }
};

function renderFile(fileName) {
    //load the template file
    const template = fs.readFileSync(
        path.resolve(__dirname, "src/template/Pv_template.docx"),
        "binary"
    );
    const zip = new PizZip(template);
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });

    doc.render(filesContent[fileName]);

    const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });

    //generating the file
    fs.writeFileSync(path.resolve(__dirname, `${fileName}.docx`), buf);
}

module.exports = {
    uploadFile,
    read_files,
    write_files,
    generateUrl,
    renderFile,
};