from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from classifier import classify_pdf

app = FastAPI()

@app.get("/")
def health():
    return {"status" : "AI Services running"}

@app.post("/classify")
async def classify(
    file: UploadFile = File(...),
    requiredDocs: str = Form(...)
):
    try:
        file_bytes = await file.read()
        required_docs = requiredDocs.split(",")
    
        result = classify_pdf(file_bytes,required_docs)
        
        return {
            "success" : True,
            "data" : result
        }
    
    except Exception as e:
        print("Error: ", e)
        raise HTTPException(
            status_code = 500,
            detail=str(e)
        )
    