import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Dropzone from 'react-dropzone'
import { Grid, TextField } from '@material-ui/core';

const DocUpload = forwardRef((props, ref) => {
    const [companyDoc, setCompanyDoc] = useState([]);
    const [ownerDoc, setOwnerDoc] = useState([]);
    const onDrop = (type) => (acceptedFiles) => {
        let i;
        for (i = 0; i < acceptedFiles.length; i++) {
            let url = URL.createObjectURL(acceptedFiles[i])
            acceptedFiles["urlOfDoc"] = url
            if (type === "companyDoc") {
                setCompanyDoc([...companyDoc, acceptedFiles])
            }
            else {
                setOwnerDoc([...ownerDoc, acceptedFiles])
            }
        }
    }

    useEffect(() => {
        if (companyDoc.length === 0 || ownerDoc.length === 0) {
            props.error(true)
        } else {
            props.error(false)
        }
    })

    useImperativeHandle(ref, () => ({
        getDocs() {
            console.log("called");
            props.setDoc({ companyDoc: companyDoc, ownerDoc: ownerDoc })
        }
    }))

    function deleteImage({ imgURI, type }) {
        if (window.confirm("Do you want to delete the image?")) {
            if (type === "companyDoc") {
                let arr = companyDoc;
                var newArray = arr.filter((value) => value.urlOfDoc != imgURI.urlOfDoc);
                setCompanyDoc([...newArray])

            } else {
                let arr = companyDoc;
                var newArray = arr.filter((value) => value.urlOfDoc != imgURI.urlOfDoc);
                setOwnerDoc([...newArray])
            }
        }
    }

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField disabled required id="cardName" defaultValue="Company KYC Document" fullWidth />
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
                        <div>{companyDoc.map((file) => <img src={file.urlOfDoc} key={Math.random()} height="50px" width="50px" onClick={() => deleteImage({ "imgURI": file, "type": "companyDoc" })} />)}</div>
                    </div> : null}
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField disabled required id="expDate" defaultValue="User KYC Document (Admin)" fullWidth />
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
                        <div>{ownerDoc.map((file) => <img src={file.urlOfDoc} key={Math.random()} height="50px" width="50px" onClick={() => deleteImage({ "imgURI": file, "type": "ownerDoc" })} />)}</div>
                    </div> : null}
                </Grid>
            </Grid>
        </React.Fragment>
    );
})

export default DocUpload;