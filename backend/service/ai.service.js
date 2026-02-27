exports.classifyDocuments = async (fileBuffer, requiredDocs) => {
  try {
    const form = new FormData();

    form.append(
      "file",
      new Blob([fileBuffer], { type: "application/pdf" }),
      "document.pdf",
    );

    form.append("requiredDocs", requiredDocs.join(","));

    const response = await fetch("http://127.0.0.1:8000/classify", {
      method: "POST",
      body: form,
    });
    
    return await response.json();
  } 
  catch(e){
    throw new Error(e);
  }
};
