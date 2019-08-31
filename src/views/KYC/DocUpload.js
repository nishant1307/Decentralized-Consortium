import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dropzone from 'react-dropzone'



export default function DocUpload(props) {
    const [companyDoc, setCompanyDoc] = useState([]);
    const [ownerDoc, setOwnerDoc] = useState([]);
    const onDrop = (type) => (acceptedFiles) => {
        let i;
        for (i = 0; i < acceptedFiles.length; i++) {
            if (type === "companyDoc")
                setCompanyDoc([...companyDoc, URL.createObjectURL(acceptedFiles[i])])
            else
                setOwnerDoc([...ownerDoc, URL.createObjectURL(acceptedFiles[i])])
        }
        props.setDoc({ acceptedFiles: acceptedFiles, type: type })
    }
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField disabled required id="cardName" defaultValue="Company Document" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Dropzone
                        onDrop={onDrop("companyDoc")}
                        accept="image/*"
                        minSize={0}
                        maxSize={1048576}
                        multiple
                    >
                        {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                            const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
                            return (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {!isDragActive && 'Click here or drop upto 3 images'}
                                    {isDragActive && !isDragReject && "Drop it here"}
                                    {isDragReject && "File type not accepted, sorry!"}
                                    {isFileTooLarge && (
                                        <div className="text-danger mt-2">
                                            File is too large.
                              </div>
                                    )}
                                    <div style={{
                                        position: 'relative',
                                        width: '200px',
                                        height: '200px',
                                        borderWidth: '2px',
                                        borderColor: 'rgb(102, 102, 102)',
                                        borderStyle: 'dashed',
                                        borderRadius: '5px',
                                    }} />
                                </div>
                            )
                        }}
                    </Dropzone>
                    {companyDoc.length > 0 ? <div>
                        <h4>{companyDoc.length} images uploaded</h4>
                        <div>{companyDoc.map((file) => <img src={file} key={Math.random()} height="50px" width="50px" />)}</div>
                    </div> : null}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField disabled required id="expDate" defaultValue="Owner Document" fullWidth />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Dropzone
                        onDrop={onDrop("ownerDoc")}
                        accept="image/*"
                        minSize={0}
                        maxSize={1048576}
                        multiple
                    >
                        {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                            const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;
                            return (
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {!isDragActive && 'Click here or drop upto 3 images'}
                                    {isDragActive && !isDragReject && "Drop it here"}
                                    {isDragReject && "File type not accepted, sorry!"}
                                    {isFileTooLarge && (
                                        <div className="text-danger mt-2">
                                            File is too large.
                              </div>
                                    )}
                                    <div style={{
                                        position: 'relative',
                                        width: '200px',
                                        height: '200px',
                                        borderWidth: '2px',
                                        borderColor: 'rgb(102, 102, 102)',
                                        borderStyle: 'dashed',
                                        borderRadius: '5px',
                                    }} />
                                </div>
                            )
                        }}
                    </Dropzone>
                    {ownerDoc.length > 0 ? <div>
                        <h4>{ownerDoc.length} images uploaded</h4>
                        <div>{ownerDoc.map((file) => <img src={file} key={Math.random()} height="50px" width="50px" />)}</div>
                    </div> : null}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}